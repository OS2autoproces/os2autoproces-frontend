<template>
  <FormSection heading="Grundlæggende oplysninger" id="general-information" :disabled="state.disabled.generalInformationEdit" @edit="update({disabled: { generalInformationEdit: $event} })" always-open>
    <div class="general-information-wrapper">
      <Well>
        <div>
          <WellItem labelWidth="100px" label="ID:">
            <InputField disabled :value="state.id" />
          </WellItem>
          <WellItem labelWidth="100px" label="KLE-nr:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.kle" @change="update({kle: $event})" :items="kleNumbers" />
          </WellItem>
          <WellItem labelWidth="100px" label="Lokalt ID:">
            <InputField :disabled="state.disabled.generalInformationEdit" :value="state.localId" />
          </WellItem>
          <WellItem labelWidth="100px" label="KL ID:">
            <InputField :disabled="state.disabled.generalInformationEdit" :value="state.klId" />
          </WellItem>
        </div>

        <div>
          <WellItem labelWidth="100px" label="Leverandør:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.vendor" @change="update({vendor: $event})" :items="suppliers" />
          </WellItem>
          <WellItem labelWidth="100px" label="Projektleder:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.projectManager" @change="update({projectManager: $event})" :items="projectManagers" />
          </WellItem>
          <WellItem labelWidth="100px" label="Kontaktperson:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.contact" @change="update({contact: $event})" :items="contactPersons" />
          </WellItem>
          <WellItem labelWidth="100px" label="Mail:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.contact" @change="update({email: $event})" :items="emails" />
          </WellItem>
        </div>

        <div>
          <WellItem labelWidth="100px" label="Afdeling:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="displayDepartments" @change="update({orgUnits: getOrgUnit($event)})" :items="departments" />
          </WellItem>
          <WellItem labelWidth="100px" label="Fagområde:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.domain" @change="update({domain: $event})" :items="domainLevels" />
          </WellItem>
          <WellItem labelWidth="100px" label="Synlighed:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.visibility" @change="update({visibility: $event})" :items="visibilityLevels" />
          </WellItem>
        </div>

        <div>
          <WellItem labelWidth="100px" label="Lov of paragraf:">
            <InputField :disabled="state.disabled.generalInformationEdit" :value="state.legalClause" @change="update({legalClause: $event})" />
          </WellItem>
        </div>

        <AssociatedPersonsInput slot="well-footer" :disabled="state.disabled.generalInformationEdit" />
      </Well>
    </div>

    <div class="resume-phases">
      <div class="resume">
        <h2>Resume</h2>
        <TextArea :disabled="state.disabled.generalInformationEdit" @change="update({shortDescription: $event})" :value="state.shortDescription" />
      </div>
      <div class="general-phases">
        <Phases :disabled="state.disabled.generalInformationEdit" :value="state.phase" @change="phaseChanged($event)" />
        <SelectionField :disabled="state.disabled.generalInformationEdit" class="status-selection" :value="state.status" @change="update({status: $event})" :items="statusLevels" />

        <div v-if="isPhaseChanged" class="phase-changed">
          <WarningIcon class="general-information-warning-icon" />
          <div>Når du skifter fase, skal yderligere information om processen udfyldes</div>
        </div>
      </div>
    </div>

    <div>
      <div>
        <h2 class="comments-heading">Kommentar til status: </h2>
        <TextArea class="status-comment-field" :disabled="state.disabled.generalInformationEdit" @change="update({statusText: $event})" :value="state.statusText ? state.statusText : ''" />
      </div>
    </div>

  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import InputField from '@/components/common/inputs/InputField.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Phases from '@/components/common/inputs/Phases.vue';
import AssociatedPersonsInput from '@/components/details/general-information/AssociatedPersonsInput.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import FormSection from '@/components/details/FormSection.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { StatusKeys, StatusLabels } from '@/models/status';
import { OrgUnit } from '@/store/modules/process/state';
import { VisibilityLabels, VisibilityKeys } from '@/models/visibility';
import { HTTP } from '@/services/http-service';
import { DomainKeys, DomainLabels } from '@/models/domain';

@Component({
  components: {
    InputField,
    SelectionField,
    TextArea,
    Phases,
    AssociatedPersonsInput,
    Well,
    FormSection,
    WellItem,
    WarningIcon
  }
})
export default class GeneralInformationForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;

  isPhaseChanged = false;

  get state() {
    return this.$store.state.process;
  }

  get displayDepartments(): string {
    const orgs: OrgUnit[] = this.$store.state.process.orgUnits;
    if (!orgs) {
      return '';
    }
    return orgs.map(d => d.name).join(', ');
  }

  get departments(): string[] {
    const orgs: OrgUnit[] = this.$store.state.process.orgUnits;
    if (!orgs) {
      return [''];
    }
    return orgs.map(d => d.name);
  }

  getOrgUnit(deparmentName: string) {
    const orgs: OrgUnit[] = this.$store.state.process.orgUnits;
    if (!orgs) {
      return '';
    }
    return orgs.find((o: OrgUnit) => o.name === deparmentName);
  }

  phaseChanged(phase: any) {
    this.isPhaseChanged = true;
    this.update({ phase });
  }

  visibilityLevels = [
    { value: VisibilityKeys.PERSONAL, text: VisibilityLabels.PERSONAL },
    { value: VisibilityKeys.MUNICIPALITY, text: VisibilityLabels.MUNICIPALITY },
    { value: VisibilityKeys.PUBLIC, text: VisibilityLabels.PUBLIC },
  ];

  domainLevels = [
    { value: DomainKeys.WORK, text: DomainLabels.WORK },
    { value: DomainKeys.HEALTH, text: DomainLabels.HEALTH },
    { value: DomainKeys.CHILDREN, text: DomainLabels.CHILDREN },
    { value: DomainKeys.ENVIRONMENT, text: DomainLabels.ENVIRONMENT },
    { value: DomainKeys.DEMOCRACY, text: DomainLabels.DEMOCRACY },
    { value: DomainKeys.ADMINISTRATION, text: DomainLabels.ADMINISTRATION },
  ];

  statusLevels = [
    {value: StatusKeys.REJECTED, text: StatusLabels.REJECTED},
    {value: StatusKeys.FAILED, text: StatusLabels.FAILED},
    {value: StatusKeys.PENDING, text: StatusLabels.PENDING},
    {value: StatusKeys.INPROGRESS, text: StatusLabels.INPROGRESS},
  ]

  kleNumbers = ['1234', '134324', '54353'];

  contactPersons = ['Christian', 'Lars', 'Henrik'];

  suppliers = ['Christian', 'Lars', 'Henrik'];

  emails = ['mail1@1', 'mail2@2', 'mail3@3'];

  projectManagers = ['Christian', 'Lars', 'Henrik'];
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
  display: inline;
  vertical-align: middle;
}

.status-comment-field {
  padding-top: $size-unit;
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
