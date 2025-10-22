<template>
  <FormSection
    :invalid="!state.isGeneralInformationValid"
    heading="Hurtig deling"
    id="rapid-form"
    :disabled="state.disabled.rapidEdit"
    @edit="update({ disabled: { rapidEdit: $event } })"
    always-open
  >
    <div class="title-row" id="title">
      <div class="title-label">Titel: *</div>
      <span v-if="state.disabled.rapidEdit" class="title-field flex-grow">{{ state.title }}</span>
      <InputField
        v-if="!state.disabled.rapidEdit"
        class="title-field flex-grow"
        :value="state.title"
        :disabled="state.disabled.rapidEdit"
        :hasError="isInErrors('title')"
        :class="{ disabled: state.disabled.rapidEdit }"
        @change="update({ title: $event })"
        :maxLength="65"
      />
      <MunicipalityLogo :src="logo" />
    </div>

    <div class="action-row" v-if="!isReporting">
        <div class="left-container" style="width: 33%">
          <p>Set af <b>{{ state.seenByCount }}</b> unikke brugere</p>
        </div>
        <div class="middle-container" style="width: 33%; display: inline-flex;">
          <div style="margin-left: 20px; margin-right: 10px;">
            <p>Favorit</p>
          </div>
          <div class="bookmark-button" role="button" style="vertical-align:middle" @click="setBookmark(!state.hasBookmarked)">
            <StarIcon :class="{ selected: state.hasBookmarked }" />
          </div>
        </div>
        <div class="right-container" style="width: 33%;"></div>
    </div>

    <Well>
      <div>
        <WellItem labelWidth="200px" label="ID:">
          <InputField disabled :value="state.id" />
        </WellItem>
        <WellItem labelWidth="180px" label="Organisation:">
          <a :href="'/organisation/' + state.cvr">{{ state.municipalityName }}</a>
        </WellItem>
        <WellItem labelWidth="180px" label="Indberetter:" v-if="isWithinMunicipality">
          <SelectionField disabled :value="state.reporter" itemText="name" />
        </WellItem>
        <WellItem
          id="otherContactEmail"
          labelWidth="180px"
          label="Anden kontaktinformation:"
          tooltip="Ønsker du anden kontakt information end en oprettet bruger i OS2autoproces, noter da information og email i dette felt. Eksempel: fællespostkassen OS2, xxxx@os2.dk. Disse oplysninger erstatter oplysningerne i feltet Kontaktperson, når processen læses af andre organisationer. Dette felt kan være låst, hvis der er opsat en kontakt på organisationssiden."
          v-if="isWithinMunicipality || (!isWithinMunicipality && state.otherContactEmail != null)"
        >
          <InputField
            :value="calculatedOtherContact"
            :disabled="state.disabled.rapidEdit || !canEditOtherContact"
            :hasError="isInErrors('otherContactEmail')"
            @change="update({ otherContactEmail: $event })"
          />
        </WellItem>
      </div>

      <div>
        <WellItem label="Oprettet:">
          <DatePicker :value="state.created" id="created" disabled />
        </WellItem>
        <WellItem label="Sidst opdateret:">
          <DatePicker :value="state.lastChanged" id="lastChanged" disabled />
        </WellItem>
      </div>
    </Well>

    <div class="resume-phases">
      <div class="resume" id="shortDescription">
        <h2>
          Resume *
          <InfoTooltip>Resume er en helt kort opsummering der vises på søgeoversigten.</InfoTooltip>
        </h2>
        <TextArea
          :disabled="state.disabled.rapidEdit"
          @change="update({ shortDescription: $event })"
          :value="state.shortDescription"
          :hasError="isInErrors('shortDescription')"
          :maxLength="140"
          :minHeight="'50px'"
        />
      </div>
      <div class="general-phases" id="phase">
        <div>
          <div class="field-label">Fase:</div>
          <Phases
            class="phase-field"
            :disabled="state.disabled.rapidEdit"
            :value="state.phase"
            :hasError="isInErrors('phase')"
            @change="phaseChanged($event)"
          />
        </div>

        <div class="rapid-warning">
          <WarningIcon class="rapid-warning-icon" />
          <div>Vælg en fase, hvis du ønsker at styre din udviklingsproces i OS2autoproces</div>
        </div>
      </div>
    </div>

    <div class="rapid-section">
      <h2>Problemstillinger</h2>
      <div id="longDescription">
        <h3>
          Beskrivelse
          <InfoTooltip>Her kan du beskrive den nuværende proces i detaljer.</InfoTooltip>
        </h3>
        <RichTextArea
          :twoColumnBreakpoint="twoColumnBreakpoint"
          @change="update({ longDescription: $event })"
          :disabled="state.disabled.rapidEdit"
          :value="state.longDescription"
          :hasError="isInErrors('longDescription')"
          :maxLength="10000"
        />
      </div>
    </div>

    <div class="rapid-section">
      <h2>Bilag og links</h2>
      <div class="mb">
        <h3>Links</h3>
        <div>
          <TextArea
            :readonly-html="readonlyLinks"
            :value="state.disabled.rapidEdit ? '' : state.codeRepositoryUrl"
            @change="state.update({ codeRepositoryUrl: $event })"
            :disabled="state.disabled.rapidEdit"
            :max-length="10000"
          />
        </div>
      </div>
      <div class="mb">
        <h3>Bilag</h3>
        <div>
          <div v-if="!isReporting">
            <AttachmentUpload :disabled="state.disabled.rapidEdit" />
          </div>
          <div v-else>Det er først muligt at tilføje et bilag, efter du har klikket på Gem første gang.</div>
        </div>
      </div>
      
    </div>

    <div class="rapid-section">
      <h2>Udvikling og implementering</h2>
      <div class="tech-automation-wrapper">
        <div class="technology" id="technologies">
          <h3 class="with-margin">
            Anvendt teknologi
            <InfoTooltip
            >Her kan angive teknologier anvendt i løsningen fra listen. Hvis du mangler en teknologi, så kontakt
            OS2autoproces koordinationsgruppen, så vil de oprette den for dig.</InfoTooltip
          >
          </h3>
          
          <TagSelectorTechnologies
            @add="state.addTechnology($event)"
            @remove="state.removeTechnology($event)"
            :disabled="state.disabled.implementationEdit"
            :value="state.technologies"
            :hasError="isInErrors('technologies')"
            :items="technologies"
          />
        </div>
        <div class="automation" id="automations">
          <h3 class="with-margin">
            Automatiseringen anvender følgende systemer/snitflader
            <InfoTooltip
            >Her kan du angive de systemer og snitflader som løsningen gør brug af ud fra listen. Hvis du mangler et
            system/snitflade, så kontakt OS2autoproces koordinationsgruppen, så vil de oprette den for dig.
          </InfoTooltip>
          </h3>
          
          <TagSelectorITSystems
            @add="state.addServices($event)"
            @remove="state.removeServices($event)"
            :disabled="state.disabled.implementationEdit"
            :value="state.services"
            :hasError="isInErrors('services')"
            :items="itSystems"
          />
        </div>
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
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Phases from '@/components/common/inputs/Phases.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import FormSection from '@/components/details/FormSection.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import { StatusKeys, StatusLabels } from '@/models/status';
import { VisibilityKeys, VisibilityLabels } from '@/models/visibility';
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
import { ProcessModule, ProcessState } from '@/store/modules/process';
import { ErrorModule } from '@/store/modules/error';
import DatePicker from '@/components/common/inputs/DatePicker.vue';
import { OrganisationModule } from '@/store/modules/organisation';
import RichTextArea from '@/components/common/inputs/RichTextArea.vue';
import AttachmentUpload from '@/components/common/inputs/AttachmentUpload.vue';
import TagSelectorTechnologies from '@/components/common/inputs/TagSelectorTechnologies.vue';
import TagSelectorITSystems from '@/components/common/inputs/TagSelectorITSystems.vue';

@Component({
  components: {
    TagSelectorTechnologies,
    TagSelectorITSystems,
    InputField,
    SelectionField,
    InfoTooltip,
    StarIcon,
    TextArea,
    MunicipalityLogo,
    Phases,
    Well,
    FormSection,
    WellItem,
    WarningIcon,
    AppDialog,
    DialogContent,
    Button,
    DatePicker,
    RichTextArea,
    AttachmentUpload
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
    { value: StatusKeys.NOT_RATED, text: StatusLabels.NOT_RATED },
    { value: StatusKeys.NOT_RELEVANT, text: StatusLabels.NOT_RELEVANT }
  ];

  get isWithinMunicipality() {
    return AuthModule.user?.cvr === ProcessModule?.cvr;
  }

  get logo() {
    if (this.state.base64Logo != null) {
      return this.state.base64Logo;
    } else {
      return `/logos/${ProcessModule?.cvr}.png`;
    }
  }

  get state() {
    return ProcessModule;
  }

  get common() {
    return CommonModule;
  }

  get technologies() {
    return CommonModule.technologies;
  }

  get itSystems() {
    return CommonModule.itSystems;
  }

  get canEditOtherContact() {
    if (this.isReporting) {
      if (OrganisationModule.autoOtherContactEmail == null || OrganisationModule.autoOtherContactEmail === "") {
        return true;
      }
      return false;
    } else {
      return ProcessModule.canEditOtherContact;
    }
  }

  get calculatedOtherContact() {
    if (this.isReporting) {
      if (OrganisationModule.autoOtherContactEmail == null || OrganisationModule.autoOtherContactEmail === "") {
        return ProcessModule.otherContactEmail;
      } else {
        return OrganisationModule.autoOtherContactEmail;
      }
    } else {
      return ProcessModule.otherContactEmail;
    }
  }

  get readonlyLinks() {
    // This function parses links and makes them clickable when the user is not editing.
    // First, it uses a long regex that matches urls (from http://urlregex.com) to match all urls in the text. Then it wraps them with an 'a' html tag.
    const firstPass = !ProcessModule.disabled?.attachmentsEdit
      ? ''
      : ProcessModule.codeRepositoryUrl?.replace(
          /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g,
          '<a href="$1" target="_blank">$1</a>'
        );
    // After wrapping the links with an 'a' tag, all matched links that start with 'www' but lack a protocol get an http protocol prepended in the href attribute.
    // Finally, the result is returned.
    return firstPass?.replace(/href="www/g, 'href="http://www');
    // TODO: Fix mails without schema and maybe other edge cases
  }

  assign(state: Partial<ProcessState>) {
    ProcessModule.assign(state);
  }

  update(state: Partial<ProcessState>) {
    ProcessModule.update(state);
  }

  isInErrors(name: string) {
    return ErrorModule.errorInField(ErrorModule.generalInformation, name);
  }

  phaseChanged(phase: any) {
    this.isPhaseChanged = true;
    ProcessModule.update({ phase });

    if (
      (phase === PhaseKeys.OPERATION || phase === PhaseKeys.DECOMMISSIONED) &&
      ProcessModule.visibility !== VisibilityKeys.PUBLIC
    ) {
      this.openPublicVisibilityDialog();
    }
  }

  search(name: string) {
    const request: UserSearchRequest = { name: `${name}`, cvr: '' };
    if (AuthModule.user) {
      request.cvr = AuthModule.user.cvr;
      CommonModule.searchUsers(request);
    } else {
      CommonModule.searchUsers(request);
    }
  }

  openPublicVisibilityDialog() {
    this.publicVisibilityDialogOpen = true;
  }

  closePublicVisibilityDialog() {
    this.publicVisibilityDialogOpen = false;
  }

  setPublicVisibilityAndCloseDialog() {
    ProcessModule.setVisibility(VisibilityKeys.PUBLIC);
    this.closePublicVisibilityDialog();
  }

  setBookmark(bookmarked: boolean) {
    ProcessModule.setBookmark(bookmarked);
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

h2, h3 {
  color: $color-primary;
}

h2 {
  margin-bottom: 15px;
}

.comments-heading {
  @include textarea-heading;
  vertical-align: middle;
  padding: 1rem 0;
}

.rapid-warning {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: left;

  svg {
    flex-shrink: 0;
  }

  > div {
    color: $color-primary;
    padding-left: 1rem;
    width: 250px;
  }
}

.rapid-warning-icon {
  vertical-align: middle;
  width: 40px;
  height: 40px;
}

.title-row {
  display: flex;
  align-items: center;

  .title-label {
    margin-right: 1rem;
    color: $color-primary;
  }

  .title-label,
  .title-field {
    @include heading;
    font-size: 2rem;
  }

  .title-field {
    word-break: break-all;
  }
}

.bookmark-button {
  height: 2rem;
  width: 2rem;
  margin-left: 5px;
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

.action-row {
  color: $color-primary;
  display: flex;
  align-items: center;
  line-height: 40px;
}

.rapid-section {
  margin: 20px 0px;
}

.tech-automation-wrapper {
  display: flex;
  gap: 2rem;
  
  .technology,
  .automation {
    flex: 1;
  }
}

.mb {
  margin-bottom: 15px;
}

::v-deep .attachment-upload h2 {
  font-size: 1em;
  color: $color-text;
}

</style>
