<template>
  <div class="page">
    <NavBar />

    <div class="wrapper">
      <div class="title">
        <b>{{ municipalityName }}</b>
        <p>Her kan du se de grundlæggende oplysninger om din organisation samt de teknologier og systemer, I arbejder med. Oplysningerne bruges til at anbefale relevante processer og til automatisk at udfylde data, når I tilføjer processer.</p>
      </div>
      
      <div class="form-sections" id="generalInformation">
          <OrganisationFormSection
            heading="Grundlæggende oplysninger om organisationen"
            id="generalInformationSection"
            :canEdit="canEdit"
            :disabled="state.generalInformationEdit"
            @edit="update({ generalInformationEdit: $event })"
            always-open
          >

          <Well>
            <div>
              <WellItem id="inhabitantCount" labelWidth="180px" label="Antal indbyggere:">
                <MappedSelectionField
                  :disabled="state.generalInformationEdit"
                  :value="state.inhabitants"
                  @change="update({ inhabitants: $event })"
                  :items="inhabitantLevels"
                />
              </WellItem>

              <WellItem id="employeeCount" labelWidth="180px" label="Antal medarbejdere:">
                <MappedSelectionField
                  :disabled="state.generalInformationEdit"
                  :value="state.employees"
                  @change="update({ employees: $event })"
                  :items="employeeLevels"
                />
              </WellItem>

              <WellItem id="logoUpload" labelWidth="180px" label="Logo:" tooltip="Logo'et der uploades, skal være i PNG format. Bemærk at logo'et nedskaleres til 85 pixel i højden, så undlad at uploade et billede der er mange gange større end dette, og test evt at logo'et ser godt ud ved neskalering til 85 pixel i højde.">
                <LogoComponent
                  :logoName="logoName"
                  :logo="logoPlaceholder"
                  :disabled="state.generalInformationEdit"
                  @remove="removeLogo()"
                />
                <div v-if="!state.generalInformationEdit">
                  <label class="upload-button-wrapper">
                    <input type="file" @change="chooseLogo($event.target.files)" ref="fileInput" accept="image/*" />
                    <Button class="upload-button">
                      Vælg logo
                    </Button>
                  </label>

                  <Button class="upload-button" v-if="logoPlaceholder" v-on:click="uploadFiles">Upload</Button>
                </div>
              </WellItem>

            </div>

            <div>
              <WellItem
                id="autoOtherContactEmail"
                labelWidth="180px"
                label="Autoudfyldt “Anden kontaktinformation”:"
                tooltip="Dette felt autoudfylder feltet “Anden kontaktinformation” på alle jeres processer. På den måde skal I kun vedligeholde et sted, hvis der sker ændringer."
              >
                <InputField
                  :value="state.autoOtherContactEmail"
                  :disabled="state.generalInformationEdit"
                  @change="update({ autoOtherContactEmail: $event })"
                />
              </WellItem>

              <WellItem
                id="localAdmin"
                labelWidth="180px"
                label="Lokal administrator af OS2autoproces:"
              >
                <SelectionField
                  itemSubText="email"
                  :disabled="state.generalInformationEdit"
                  :value="state.localAdmin"
                  itemText="name"
                  @search="searchUser($event)"
                  isItemsPartial
                  @change="update({ localAdmin: $event })"
                  :items="common.users"
                  clearable
                />
              </WellItem>
            </div>
          </Well>
            
          </OrganisationFormSection>
      </div>
      
      <div class="form-sections" id="technologies">

          <OrganisationFormSection
            heading="Teknologier og systemer"
            id="technologiesSection"
            :canEdit="canEdit"
            :disabled="state.technologiesEdit"
            @edit="update({ technologiesEdit: $event })"
            always-open
          >

          <div class="grid-container">
            <div class="technology" id="technologies">
              <label>Anvendte teknologier i organisationen</label>
              <InfoTooltip>
                Her kan du angive teknologier som I anvender til automatisering i jeres organisation. De teknologier du udpeger her, vil blive vist på procesoverblikket når du vælger filtret ”Anbefalet til min organisation”.
              </InfoTooltip>
              <TagSelectorTechnologies
                @add="state.addTechnology($event)"
                @remove="state.removeTechnology($event)"
                :disabled="state.technologiesEdit"
                :value="state.technologies"
                :items="technologies"
              />
            </div>

            <div class="itSystems" id="itSystems">
              <label>Systemer der automatiseres til i organisationen</label>
              <InfoTooltip>
                Her kan du angive systemer som I automatiserer op imod i jeres organisation. De teknologier du udpeger her, vil blive vist på procesoverblikket når du vælger filtret ”Anbefalet til min organisation”.
              </InfoTooltip>
              <TagSelectorITSystems
                @add="state.addITSystems($event)"
                @remove="state.removeITSystems($event)"
                :disabled="state.technologiesEdit"
                :value="state.itSystems"
                :items="itSystems"
              />
            </div>
          </div>
                
          </OrganisationFormSection>
      </div>

      <div style="margin-top: 30px;">
        <Button primary v-if="canEdit" class="save-button" @click="save">Gem</Button>
      </div>
      
    </div>
    
    <SnackBar
      :showButton="false"
      :value="showSaveSuccess"
      :timeout="3000"
      color="success"
      @onSnackClose="showSaveSuccess = false"
      >Organisationen er gemt!</SnackBar
    >

    <SnackBar
      :showButton="false"
      :value="showSaveError"
      :timeout="5000"
      color="error"
      @onSnackClose="showSaveError = false"
      >Organisationen kunne ikke gemmes, da en ukendt fejl opstod. Prøv igen.</SnackBar
    >

    <SnackBar
      :showButton="false"
      :value="showUploadSuccess"
      :timeout="3000"
      color="success"
      @onSnackClose="assign({ showUploadSuccess: false })"
      >Det nye logo er uploadet!</SnackBar
    >

    <SnackBar
      :showButton="false"
      :value="showUploadError"
      :timeout="5000"
      color="error"
      @onSnackClose="assign({ showUploadError: false })"
      >Det nye logo kunne ikke uploades. Prøv igen.</SnackBar
    >

    <SnackBar
      :showButton="false"
      :value="showRemoveLogoSuccess"
      :timeout="3000"
      color="success"
      @onSnackClose="assign({ showRemoveLogoSuccess: false })"
      >Logoet er fjernet!</SnackBar
    >

    <SnackBar
      :showButton="false"
      :value="showRemoveLogoError"
      :timeout="5000"
      color="error"
      @onSnackClose="assign({ showRemoveLogoError: false })"
      >Logoet kunne ikke fjernes. Prøv igen.</SnackBar
    >
    
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import NavBar from '@/components/common/NavBar.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import InputField from '@/components/common/inputs/InputField.vue';
import MappedSelectionField from '@/components/common/inputs/MappedSelectionField.vue'
import {LogoFile, OrganisationModule, OrganisationState } from '@/store/modules/organisation';
import { AuthModule, UserRole } from '@/store/modules/auth';
import OrganisationFormSection from '@/components/organisation/OrganisationFormSection.vue';
import { InhabitantsKeys, InhabitantsLabels } from '@/models/inhabitants';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import { EmployeesKeys, EmployeesLabels } from '@/models/employees';
import SnackBar from '@/components/common/SnackBar.vue';
import Button from '@/components/common/inputs/Button.vue';
import { CommonModule } from '@/store/modules/common';
import { UserSearchRequest } from '@/store/modules/commonInterfaces';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TagSelectorTechnologies from '@/components/common/inputs/TagSelectorTechnologies.vue';
import TagSelectorITSystems from '@/components/common/inputs/TagSelectorITSystems.vue';
import LogoComponent from '@/components/common/inputs/Logo.vue';


@Component({
  components: {
    NavBar,
    OrganisationFormSection,
    SelectionField,
    MappedSelectionField,
    Well,
    WellItem,
    SnackBar,
    Button,
    InputField,
    InfoTooltip,
    TagSelectorTechnologies,
    TagSelectorITSystems,
    LogoComponent
  }
})
export default class Organisation extends Vue {
  @Prop(String) cvr!: string;

  showSaveSuccess = false;
  showSaveError = false;
  logoPlaceholder: LogoFile | null = null;
  maxFileSize = 10000000;

  inhabitantLevels = [
    { value: InhabitantsKeys.BELOW_30000, text: InhabitantsLabels.BELOW_30000 },
    { value: InhabitantsKeys.BELOW_45000, text: InhabitantsLabels.BELOW_45000 },
    { value: InhabitantsKeys.BELOW_60000, text: InhabitantsLabels.BELOW_60000 },
    { value: InhabitantsKeys.BELOW_100000, text: InhabitantsLabels.BELOW_100000 },
    { value: InhabitantsKeys.ABOVE_100000, text: InhabitantsLabels.ABOVE_100000 }
  ];

  employeeLevels = [
    { value: EmployeesKeys.BELOW_1500, text: EmployeesLabels.BELOW_1500 },
    { value: EmployeesKeys.BELOW_3000, text: EmployeesLabels.BELOW_3000 },
    { value: EmployeesKeys.BELOW_5000, text: EmployeesLabels.BELOW_5000 },
    { value: EmployeesKeys.BELOW_10000, text: EmployeesLabels.BELOW_10000 },
    { value: EmployeesKeys.ABOVE_10000, text: EmployeesLabels.ABOVE_10000 }
  ];

  get canEdit() {
    return AuthModule.user && AuthModule.user.cvr === this.cvr && AuthModule.user.roles && AuthModule.user.roles.includes(UserRole.superUser);
  }

  get municipalityName() {
    return OrganisationModule.municipalityName;
  }

  get state() {
    return OrganisationModule;
  }

  get showUploadError() {
    return this.state.showUploadError;
  }

  get showUploadSuccess() {
    return this.state.showUploadSuccess;
  }

  get showRemoveLogoError() {
    return this.state.showRemoveLogoError;
  }

  get showRemoveLogoSuccess() {
    return this.state.showRemoveLogoSuccess;
  }


  get logoName() {
    if (this.logoPlaceholder != null) {
      return this.logoPlaceholder.fileName;
    } else if (this.state.municipalityLogo != null) {
      return this.state.municipalityLogo.fileName;
    }
    return "";
  }

  get technologies() {
    return CommonModule.technologies;
  }

  get itSystems() {
    return CommonModule.itSystems;
  }

  get common() {
    return CommonModule;
  }

  async mounted() {
    OrganisationModule.loadMunicipalityDetails(this.cvr);
    CommonModule.loadTechnologies();
    CommonModule.loadITSystems();
  }

  update(state: Partial<OrganisationState>) {
    OrganisationModule.update(state);
  }

  assign(state: Partial<OrganisationState>) {
    OrganisationModule.assign(state);
  }

  async save() {
    try {
      const success = await OrganisationModule.save();
      this.showSaveSuccess = success;
    } catch (e) {
      this.showSaveError = true;
    }
  }

  chooseLogo(files: FileList) {
    Array.from(files).forEach(file => {
      this.logoPlaceholder = {
        fileName: file.name,
        file
      };
    });
    this.clearFileInput();
  }

  async removeLogo() {
    await OrganisationModule.removeLogo();
    this.logoPlaceholder = null;
  }

  clearFileInput() {
    const input = this.$refs.fileInput as HTMLInputElement;
    input.type = 'text';
    input.type = 'file';
  }

  async uploadFiles() {
    if (this.logoPlaceholder != null && this.logoPlaceholder.file.size < this.maxFileSize) {
      await OrganisationModule.uploadLogo(this.logoPlaceholder);
      this.logoPlaceholder = null;
    } else {
      this.assign({ showUploadError: true });
    }
  }

  searchUser(name: string) {
    const request: UserSearchRequest = { name: `${name}`, cvr: '' };
    if (AuthModule.user) {
      request.cvr = AuthModule.user.cvr;
      CommonModule.searchUsers(request);
    } else {
      CommonModule.searchUsers(request);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

  .wrapper {
    width: 60%;
    margin: 0 auto;
  }

  .title {
    margin-top: 0.75rem;
  }

  .form-sections {
  border: 1px solid $color-primary;
  border-radius: 1rem;
  margin-top: 2rem;

  > *:not(:last-of-type) {
    border-bottom: 1px solid $color-primary;
  }

  .upload-button {
    margin-right: 1rem;
  }

  .upload-button-wrapper {
    display: inline-block;
    cursor: pointer;

    .upload-button {
      pointer-events: none;
    }

    input {
      display: none;
    }
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

    label {
      color: $color-primary
    }
  }
}
</style>
