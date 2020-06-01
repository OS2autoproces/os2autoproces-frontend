<template>
  <FormSection
    :invalid="!state.isGeneralInformationValid"
    heading="Grundlæggende oplysninger"
    id="general-information"
    :disabled="state.disabled.generalInformationEdit"
    @edit="update({ disabled: { generalInformationEdit: $event } })"
    always-open
  >
    <div class="title-row">
      <div class="title-label">Titel: *</div>
      <InputField
        class="title-field flex-grow"
        :value="state.title"
        :disabled="state.disabled.generalInformationEdit"
        :class="{ disabled: state.disabled.generalInformationEdit }"
        @change="update({ title: $event })"
      />
      <div v-if="!isReporting" class="bookmark-button" role="button" @click="setBookmark(!state.hasBookmarked)">
        <StarIcon :class="{ selected: state.hasBookmarked }" />
      </div>
      <MunicipalityLogo :src="logo" />
    </div>

    <Well>
      <div>
        <WellItem labelWidth="200px" label="ID:">
          <InputField disabled :value="state.id" />
        </WellItem>
        <WellItem labelWidth="180px" label="Indberetter:" v-if="isWithinMunicipality">
          <SelectionField disabled :value="state.reporter" itemText="name" />
        </WellItem>
        <WellItem
          labelWidth="180px"
          label="Fagligkontaktperson:"
          tooltip="Er en person der varetager processen til daglig og derfor har stort kendskab til den."
          v-if="isWithinMunicipality"
          :required="state.minPhase(PhaseKeys.SPECIFICATION)"
        >
          <SelectionField
            itemSubText="email"
            :disabled="state.disabled.generalInformationEdit"
            :value="state.owner"
            itemText="name"
            @search="search($event)"
            isItemsPartial
            @change="update({ owner: $event })"
            :items="common.users"
          />
        </WellItem>
        <WellItem
          labelWidth="180px"
          label="Kontaktperson:"
          tooltip="En person der har teknisk viden omkring løsningen."
        >
          <SelectionField
            itemSubText="email"
            :disabled="state.disabled.generalInformationEdit"
            :value="state.contact"
            itemText="name"
            @search="search($event)"
            isItemsPartial
            @change="update({ contact: $event })"
            :items="common.users"
            clearable
          />
        </WellItem>
        <WellItem v-if="state.contact" labelWidth="180px" label="Mail:">{{ state.contact.email }}</WellItem>
      </div>

      <div>
        <WellItem
          labelWidth="120px"
          label="Synlighed:"
          tooltip="Synligheden ’Egen organisation’ betyder at alle brugere i din organisation kan se processen. Synligheden ’Alle i OS2autoproces’ betyder at brugere i andre kommuner og regioner kan se processen. Privat betyder at det kun er dig og din superbruger der kan se processen."
        >
          <MappedSelectionField
            :disabled="!!state.parents.length || state.disabled.generalInformationEdit"
            :value="state.visibility"
            @change="update({ visibility: $event })"
            :items="visibilityLevels"
          />
        </WellItem>
        <WellItem labelWidth="120px" label="Fagområder:">
          <DomainsField
            :disabled="state.disabled.generalInformationEdit"
            :value="state.domains"
            @change="assign({ domains: $event })"
          />
        </WellItem>
        <WellItem labelWidth="120px" label="Afdelinger:" v-if="isWithinMunicipality">
          <SelectionField
            :disabled="state.disabled.generalInformationEdit"
            :value="state.orgUnits"
            @change="assign({ orgUnits: $event })"
            :items="common.orgUnits"
            multiple
            itemText="name"
          />
        </WellItem>
        <WellItem
          v-if="state.minPhase(PhaseKeys.DEVELOPMENT)"
          labelWidth="180px"
          label="Leverandør:"
          tooltip="Her skrives enten kommunens navn eller en ekstern leverandør der har lavet løsningen."
        >
          <InputField
            :disabled="state.disabled.generalInformationEdit"
            :value="state.vendor"
            @change="update({ vendor: $event })"
          />
        </WellItem>
        <WellItem v-if="state.sepMep" labelWidth="120px" label="SEP/MEP:">
          <Checkbox :disabled="true" :value="state.sepMep" @change="update({ sepMep: $event })" />
        </WellItem>
      </div>

      <div>
        <WellItem v-if="state.minPhase(PhaseKeys.PREANALYSIS)" labelWidth="120px" label="Lovparagraf:">
          <InputField
            :disabled="state.disabled.generalInformationEdit || state.form"
            :value="state.legalClause"
            @change="update({ legalClause: $event })"
          />
        </WellItem>
        <WellItem labelWidth="200px" label="KLE:">
          <SelectionField
            :disabled="state.disabled.generalInformationEdit"
            :value="state.kle"
            @change="setKle($event)"
            :items="common.kles"
            itemText="name"
            itemSubText="code"
            clearable
          />
        </WellItem>
        <WellItem labelWidth="200px" label="FORM:" v-if="state.kle">
          <SelectionField
            :disabled="state.disabled.generalInformationEdit"
            :value="state.form"
            @change="update({ form: $event })"
            :items="common.forms"
            itemText="description"
            itemSubText="code"
            clearable
          />
        </WellItem>
        <WellItem labelWidth="200px" label="KL ID:">
          <InputField
            :disabled="state.disabled.generalInformationEdit"
            :value="state.klId"
            @change="update({ klId: $event })"
          />
        </WellItem>
        <WellItem
          labelWidth="200px"
          label="KL’s Arbejdsgangsbank:"
          tooltip="KL’s Arbejdsgangsbank nummeret henviser til en proces fra KL’s Arbejdsgangsbank."
        >
          <MaskableInput
            :disabled="state.disabled.generalInformationEdit"
            mask="##.##.##.##.##"
            :value="state.kla"
            @change="setKla"
          />
        </WellItem>
      </div>

      <AssociatedPersonsInput
        v-if="state.minPhase(PhaseKeys.PREANALYSIS) && isWithinMunicipality"
        slot="well-footer"
        :disabled="state.disabled.generalInformationEdit"
      />
    </Well>

    <div class="resume-phases">
      <div class="resume">
        <h2>
          Resume *
          <InfoTooltip>Resume er en helt kort opsummering der vises på søgeoversigten.</InfoTooltip>
        </h2>
        <TextArea
          :disabled="state.disabled.generalInformationEdit"
          @change="update({ shortDescription: $event })"
          :value="state.shortDescription"
          :maxLength="140"
          :minHeight="'50px'"
        />
      </div>
      <div class="general-phases">
        <div>
          <div class="field-label">Fase:</div>
          <Phases
            class="phase-field"
            :disabled="state.disabled.generalInformationEdit"
            :value="state.phase"
            @change="phaseChanged($event)"
          />
        </div>
        <div>
          <div class="field-label">Status:</div>
          <MappedSelectionField
            class="status-field"
            :disabled="state.disabled.generalInformationEdit"
            :value="state.status"
            @change="update({ status: $event })"
            :items="statusLevels"
          />
        </div>

        <div v-if="isPhaseChanged" class="phase-changed">
          <WarningIcon class="general-information-warning-icon" />
          <div>Når du skifter fase, skal yderligere information om processen udfyldes</div>
        </div>
      </div>
    </div>

    <div>
      <div v-if="state.status !== StatusKeys.INPROGRESS && state.status !== StatusKeys.NOT_RATED">
        <h2 class="comments-heading" v-if="state.status === StatusKeys.FAILED">Hvorfor er processen mislykket?</h2>
        <h2 class="comments-heading" v-if="state.status === StatusKeys.PENDING">Hvorfor afventer processen?</h2>
        <h2 class="comments-heading" v-if="state.status === StatusKeys.REJECTED">Hvorfor er processen afvist?</h2>
        <TextArea
          :disabled="state.disabled.generalInformationEdit"
          @change="update({ statusText: $event })"
          :value="state.statusText"
        />
      </div>
    </div>
    <AppDialog :open="publicVisibilityDialogOpen" @close="closePublicVisibilityDialog">
      <DialogContent>
        <h2 class="form-header">Vil du ikke også ændre synligheden til 'Alle i OS2Autoproces'?</h2>
        <div class="public-visibility-form">
          <div class="dialog-actions">
            <Button @click="closePublicVisibilityDialog()">Nej</Button>
            <Button :primary="true" @click="setPublicVisibilityAndCloseDialog()">Ja</Button>
          </div>
        </div>
      </DialogContent>
    </AppDialog>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import InputField from '@/components/common/inputs/InputField.vue';
import MaskableInput from '@/components/common/inputs/MaskableInput.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import MappedSelectionField from '@/components/common/inputs/MappedSelectionField.vue';
import Checkbox from '@/components/common/inputs/Checkbox.vue';
import DomainsField from '@/components/common/inputs/DomainsField.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Phases from '@/components/common/inputs/Phases.vue';
import AssociatedPersonsInput from '@/components/details/general-information/AssociatedPersonsInput.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import FormSection from '@/components/details/FormSection.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import { StatusKeys, StatusLabels } from '@/models/status';
import { VisibilityKeys, VisibilityLabels } from '@/models/visibility';
import { Domain, DomainKeys, DomainLabels } from '@/models/domain';
import { Kle, Form, UserSearchRequest, OrgUnit } from '@/store/modules/commonInterfaces';
import { CommonModule } from '@/store/modules/common';
import { Phase, PhaseKeys } from '@/models/phase';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import MunicipalityLogo from '@/components/common/MunicipalityLogo.vue';
import StarIcon from '@/components/icons/StarIcon.vue';
import AppDialog from '@/components/common/Dialog.vue';
import DialogContent from '@/components/common/DialogContent.vue';
import Button from '@/components/common/inputs/Button.vue';
import { AuthModule, User } from '@/store/modules/auth';
import { ProcessModule } from '@/store/modules/process';
// TODO - split this component. No component should be 500 lines
@Component({
  components: {
    InputField,
    Checkbox,
    DomainsField,
    SelectionField,
    InfoTooltip,
    MappedSelectionField,
    StarIcon,
    TextArea,
    MunicipalityLogo,
    Phases,
    AssociatedPersonsInput,
    Well,
    FormSection,
    MaskableInput,
    WellItem,
    WarningIcon,
    AppDialog,
    DialogContent,
    Button
  }
})
export default class GeneralInformationForm extends Vue {
  @Prop(Boolean)
  isReporting!: boolean;
  isPhaseChanged = false;
  publicVisibilityDialogOpen = false;
  StatusKeys = StatusKeys;
  PhaseKeys = PhaseKeys;

  visibilityLevels = [
    { value: VisibilityKeys.PERSONAL, text: VisibilityLabels.PERSONAL },
    { value: VisibilityKeys.MUNICIPALITY, text: VisibilityLabels.MUNICIPALITY },
    { value: VisibilityKeys.PUBLIC, text: VisibilityLabels.PUBLIC }
  ];

  statusLevels = [
    { value: StatusKeys.REJECTED, text: StatusLabels.REJECTED },
    { value: StatusKeys.FAILED, text: StatusLabels.FAILED },
    { value: StatusKeys.PENDING, text: StatusLabels.PENDING },
    { value: StatusKeys.INPROGRESS, text: StatusLabels.INPROGRESS },
    { value: StatusKeys.NOT_RATED, text: StatusLabels.NOT_RATED }
  ];

  get isWithinMunicipality() {
    return AuthModule.user?.cvr === ProcessModule?.cvr;
  }

  get logo() {
    return `/logos/${ProcessModule?.cvr}.png`;
  }

  get state() {
    return ProcessModule;
  }

  get common() {
    return CommonModule;
  }

  setKla(kla: string) {
    // Inserts periodes for every 2 characters, to match format: ##.##.##.##.##
    ProcessModule.update({ kla: kla.replace(/(\d{2})(?=\d)/g, '$1.') });
  }

  setKle(kle: Kle) {
    if (!kle) {
      ProcessModule.update({ kle, form: null });
    } else {
      ProcessModule.update({ kle });
    }
    CommonModule.loadFormsByKle(kle);
  }

  phaseChanged(phase: any) {
    this.isPhaseChanged = true;
    ProcessModule.update({ phase });

    if (phase === PhaseKeys.OPERATION && this.state.visibility !== VisibilityKeys.PUBLIC) {
      this.openPublicVisibilityDialog();
    }
  }

  search(name: string) {
    if (AuthModule.user) {
      CommonModule.searchUsers(AuthModule.user.cvr, name);
    } else {
      CommonModule.searchUsers('', name);
    }
  }

  openPublicVisibilityDialog() {
    this.publicVisibilityDialogOpen = true;
  }

  closePublicVisibilityDialog() {
    this.publicVisibilityDialogOpen = false;
  }

  setPublicVisibilityAndCloseDialog() {
    this.state.visibility = VisibilityKeys.PUBLIC;
    this.closePublicVisibilityDialog();
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.resume-phases {
  background-color: white;
  border-radius: 0;
  display: flex;
  margin-top: 2rem;

  .resume {
    flex-grow: 1;

    h2 {
      @include textarea-heading;
      margin-bottom: 0.5rem;
    }
  }

  .general-phases {
    flex: 0 0 400px;
    margin-left: 2rem;

    .field-label {
      display: inline-block;
      width: 100px;
      margin-bottom: 1rem;
    }

    .status-field,
    .phase-field {
      display: inline-block;
      width: 200px;
    }
  }
}

.comments-heading {
  @include textarea-heading;
  vertical-align: middle;
  padding: 1rem 0;
}

.phase-changed {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: left;

  svg {
    flex-shrink: 0;
  }

  > div {
    color: $color-secondary;
    padding-left: 1rem;
    width: 250px;
  }
}

.general-information-warning-icon {
  vertical-align: middle;
  width: 40px;
  height: 40px;
}

.title-row {
  display: flex;
  align-items: center;

  .title-label {
    margin-right: 1rem;
    color: $color-secondary;
  }

  .title-label,
  .title-field {
    @include heading;
    font-size: 2rem;
  }
}

.bookmark-button {
  height: 2rem;
  width: 2rem;
  margin-left: 50px;
}

.form-header {
  margin-bottom: 1rem;
}

.public-visibility-form {
  display: block;

  .dialog-actions {
    display: flex;
    justify-content: flex-end;

    button {
      margin: 1rem 0.5rem;
    }
  }
}
</style>
