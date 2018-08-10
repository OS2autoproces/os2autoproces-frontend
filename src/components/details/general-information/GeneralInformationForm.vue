<template>
  <FormSection :invalid="!isGeneralInformationValid" heading="Grundlæggende oplysninger" id="general-information" :disabled="state.disabled.generalInformationEdit" @edit="update({disabled: { generalInformationEdit: $event} })" always-open>
    <div class="general-information-wrapper">
      <Well>
        <div>
          <WellItem labelWidth="120px" label="ID:">
            <InputField disabled :value="state.id" />
          </WellItem>
          <WellItem labelWidth="120px" label="KLE-nr:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.kle" @change="setKle($event)" :items="kles" itemText="code" clearable />
          </WellItem>
          <WellItem labelWidth="120px" label="FORM:" v-if="state.kle">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.form" @change="update({form: $event})" :items="forms" itemText="code" clearable />
          </WellItem>
          <WellItem labelWidth="120px" label="Lokalt ID:">
            <InputField :disabled="state.disabled.generalInformationEdit" :value="state.localId" @change="update({localId: $event})" />
          </WellItem>
          <WellItem labelWidth="120px" label="KL ID:">
            <InputField :disabled="state.disabled.generalInformationEdit" :value="state.klId" @change="update({klId: $event})" />
          </WellItem>
          <WellItem labelWidth="120px" label="KLA:">
            <MaskableInput :disabled="state.disabled.generalInformationEdit" mask="##.##.##.##.##" :value="state.kla" @change="setKla" />
          </WellItem>
        </div>

        <div>
          <WellItem v-if="minPhase(PhaseKeys.DEVELOPMENT)" labelWidth="120px" label="Leverandør:" :required="minPhase(PhaseKeys.DEVELOPMENT)">
            <InputField :disabled="state.disabled.generalInformationEdit" :value="state.vendor" @change="update({vendor: $event})" />
          </WellItem>
          <WellItem labelWidth="120px" label="Indberetter:" v-if="isWithinMunicipality">
            <SelectionField disabled :value="state.reporter" itemText="name" />
          </WellItem>
          <WellItem labelWidth="120px" label="Ejer:" v-if="isWithinMunicipality" :required="minPhase(PhaseKeys.SPECIFICATION)">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.owner" itemText="name" @search="search($event)" isItemsPartial @change="update({owner: $event})" :items="users" />
          </WellItem>
          <WellItem labelWidth="120px" label="Kontaktperson:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.contact" itemText="name" @search="search($event)" isItemsPartial @change="update({contact: $event})" :items="users" clearable />
          </WellItem>
          <WellItem v-if="state.contact" labelWidth="120px" label="Mail:">
            {{state.contact.email}}
          </WellItem>
        </div>

        <div>
          <WellItem labelWidth="120px" label="Fagområder:">
            <DomainsField :disabled="state.disabled.generalInformationEdit" :value="state.domains" @change="assign({domains: $event})" />
          </WellItem>
          <WellItem labelWidth="120px" label="Afdelinger:" v-if="isWithinMunicipality">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.orgUnits" @change="assign({orgUnits: $event})" :items="orgUnits" multiple itemText="name" />
          </WellItem>
          <WellItem labelWidth="120px" label="Synlighed:">
            <MappedSelectionField :disabled="state.parents.length || state.disabled.generalInformationEdit" :value="state.visibility" @change="update({visibility: $event})" :items="visibilityLevels" />
          </WellItem>
          <WellItem v-if="minPhase(PhaseKeys.PREANALYSIS)" labelWidth="120px" label="Lov of paragraf:">
            <InputField :disabled="state.disabled.generalInformationEdit" :value="state.legalClause" @change="update({legalClause: $event})" />
          </WellItem>
        </div>

        <AssociatedPersonsInput v-if="minPhase(PhaseKeys.PREANALYSIS) && isWithinMunicipality" slot="well-footer" :disabled="state.disabled.generalInformationEdit" />
      </Well>
    </div>

    <div class="resume-phases">
      <div class="resume">
        <h2>Resume *</h2>
        <TextArea :disabled="state.disabled.generalInformationEdit" @change="update({shortDescription: $event})" :value="state.shortDescription" :maxLength="140" />
      </div>
      <div class="general-phases">
        <Phases :disabled="state.disabled.generalInformationEdit" :value="state.phase" @change="phaseChanged($event)" />
        <MappedSelectionField :disabled="state.disabled.generalInformationEdit" class="status-selection" :value="state.status" @change="update({status: $event})" :items="statusLevels" />

        <div v-if="isPhaseChanged" class="phase-changed">
          <WarningIcon class="general-information-warning-icon" />
          <div>Når du skifter fase, skal yderligere information om processen udfyldes</div>
        </div>
      </div>
    </div>

    <div>
      <div v-if="state.status !== StatusKeys.INPROGRESS">
        <h2 class="comments-heading">Kommentar til status</h2>
        <TextArea :disabled="state.disabled.generalInformationEdit" @change="update({statusText: $event})" :value="state.statusText" />
      </div>
    </div>

  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import InputField from '@/components/common/inputs/InputField.vue';
import MaskableInput from '@/components/common/inputs/MaskableInput.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import MappedSelectionField from '@/components/common/inputs/MappedSelectionField.vue';
import DomainsField from '@/components/common/inputs/DomainsField.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Phases from '@/components/common/inputs/Phases.vue';
import AssociatedPersonsInput from '@/components/details/general-information/AssociatedPersonsInput.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import FormSection from '@/components/details/FormSection.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';
import { commonActionTypes, UserSearchRequest } from '@/store/modules/common/actions';
import { User } from '@/store/modules/auth/state';
import { StatusKeys, StatusLabels } from '@/models/status';
import { VisibilityKeys, VisibilityLabels } from '@/models/visibility';
import { OrgUnit } from '@/store/modules/process/state';
import { DomainKeys, DomainLabels } from '@/models/domain';
import { Kle, Form } from '@/store/modules/common/actions';
import { Domain } from '@/models/domain';
import { Phase, PhaseKeys } from '@/models/phase';

@Component({
  components: {
    InputField,
    DomainsField,
    SelectionField,
    MappedSelectionField,
    TextArea,
    Phases,
    AssociatedPersonsInput,
    Well,
    FormSection,
    MaskableInput,
    WellItem,
    WarningIcon
  }
})
export default class GeneralInformationForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;
  @Action(commonActionTypes.LOAD_FORMS) loadForms: any;
  @Action(processActionTypes.ASSIGN) assign: any;
  @Action(commonActionTypes.SEARCH_USERS) searchUsers!: ({ name, cvr }: UserSearchRequest) => Promise<void>;

  @Getter(processGetterTypes.IS_GERNERAL_INFORMATION_VALID) isGeneralInformationValid!: any;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

  isPhaseChanged = false;
  StatusKeys = StatusKeys;
  PhaseKeys = PhaseKeys;

  get isWithinMunicipality() {
    const { auth, process } = this.$store.state;
    return auth.user.cvr === process.cvr;
  }

  get state() {
    return this.$store.state.process;
  }

  get users() {
    return this.$store.state.common.users;
  }

  get kles() {
    return this.$store.state.common.kles;
  }

  get forms() {
    return this.$store.state.common.forms;
  }

  get orgUnits() {
    return this.$store.state.common.orgUnits;
  }

  setKla(kla: string) {
    // Inserts periodes for every 2 characters, to match format: ##.##.##.##.##
    this.update({ kla: kla.replace(/(\d{2})(?=\d)/g, '$1.') });
  }

  setKle(kle: Kle) {
    if (!kle) {
      this.update({ kle: kle, form: null });
    } else {
      this.update({ kle: kle });
    }
    this.loadForms(kle);
  }

  phaseChanged(phase: any) {
    this.isPhaseChanged = true;
    this.update({ phase });
  }

  search(name: string) {
    this.searchUsers({ name, cvr: this.$store.state.auth.user.cvr });
  }

  visibilityLevels = [
    { value: VisibilityKeys.PERSONAL, text: VisibilityLabels.PERSONAL },
    { value: VisibilityKeys.MUNICIPALITY, text: VisibilityLabels.MUNICIPALITY },
    { value: VisibilityKeys.PUBLIC, text: VisibilityLabels.PUBLIC }
  ];

  statusLevels = [
    { value: StatusKeys.REJECTED, text: StatusLabels.REJECTED },
    { value: StatusKeys.FAILED, text: StatusLabels.FAILED },
    { value: StatusKeys.PENDING, text: StatusLabels.PENDING },
    { value: StatusKeys.INPROGRESS, text: StatusLabels.INPROGRESS }
  ];
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.general-information-wrapper {
  background-color: $color-edit-background;
  border-radius: 12px;

  .general-information {
    display: flex;
    flex-direction: row;
    padding: $size-unit;
  }
}

.resume-phases {
  background-color: white;
  border-radius: 0;
  display: flex;
  margin-top: $size-unit * 2;

  .resume {
    flex-grow: 1;

    h2 {
      @include textarea-heading;
      margin-bottom: $size-unit/2;
    }
  }

  .general-phases {
    flex: 0 0 400px;
    margin-left: 2 * $size-unit;
    text-align: center;

    .status-selection {
      width: 200px;
      text-align: center;
      margin: 0 auto;
    }
  }
}

.comments-heading {
  @include textarea-heading;
  vertical-align: middle;
  padding: $size-unit 0;
}

.phase-changed {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $size-unit;
  text-align: left;

  svg {
    flex-shrink: 0;
  }

  > div {
    color: $color-secondary;
    padding-left: $size-unit;
    width: 250px;
  }
}

.general-information-warning-icon {
  vertical-align: middle;
  width: 40px;
  height: 40px;
}
</style>
