<template>
    <FormSection heading="Grundlæggende oplysninger" id="general-information" :disabled="state.disabled" @edit="update({disabled: $event})" always-open>
        <div class="general-information-wrapper">
            <Well>
                <div>
                    <WellItem label="KLE-nr:">
                        <SelectionField :disabled="state.disabled" :value="state.kleNumber" @change="update({kleNumber: $event})" :items="kleNumbers" />
                    </WellItem>
                    <WellItem label="ID:">
                        <InputField disabled :value="state.id" />
                    </WellItem>
                    <WellItem label="Lov of paragraf:">
                        <InputField :disabled="state.disabled" :value="state.paragraf" @change="update({paragraf: $event})" />
                    </WellItem>
                </div>

                <div>
                    <WellItem label="Afdeling:">
                        <SelectionField :disabled="state.disabled" :value="state.department" @change="update({department: $event})" :items="departments" />
                    </WellItem>
                    <WellItem label="Fagområde:">
                        <SelectionField :disabled="state.disabled" :value="state.field" @change="update({field: $event})" :items="fields" />
                    </WellItem>
                    <WellItem label="Synlighed:">
                        <SelectionField :disabled="state.disabled" :value="state.visibility" @change="update({visibility: $event})" :items="visibilityLevels" />
                    </WellItem>
                </div>

                <div>
                    <WellItem label="Kontaktperson:">
                        <SelectionField :disabled="state.disabled" :value="state.contactPerson" @change="update({contactPerson: $event})" :items="contactPersons" />
                    </WellItem>
                    <WellItem label="Mail:">
                        <SelectionField :disabled="state.disabled" :value="state.email" @change="update({email: $event})" :items="emails" />
                    </WellItem>
                    <WellItem label="Procestid:">
                        <InputField :disabled="state.disabled" :value="state.processTime" @change="update({processTime: $event})" />
                    </WellItem>
                </div>

                <div>
                    <WellItem label="Leverandør:">
                        <SelectionField :disabled="state.disabled" :value="state.supplier" @change="update({supplier: $event})" :items="suppliers" />
                    </WellItem>
                    <WellItem label="Projektleder:">
                        <SelectionField :disabled="state.disabled" :value="state.projectManager" @change="update({projectManager: $event})" :items="projectManagers" />
                    </WellItem>
                </div>

                <AssociatedPersonsInput slot="well-footer" :disabled="state.disabled" />
            </Well>
        </div>

        <div class="resume-phases">
            <div class="resume">
                <h2>Resume</h2>
                <TextArea :disabled="state.disabled" @change="update({resume: $event})" :value="state.resume" />
            </div>
            <div class="general-phases">
                <Phases :disabled="state.disabled" :value="state.phase" @change="phaseChanged($event)" />
                <SelectionField :disabled="state.disabled" class="status-selection" :value="state.status" @change="update({status: $event})" :items="statuses" />
            </div>
        </div>

        <div v-if="isPhaseChanged" class="phased-changed">
            <WarningIcon />
            <div>
                Når du skifter fase, skal yderligere information om processen udfyldes
            </div>
        </div>

        <div>
            <div v-if="state.status === Status.waiting">
                <WarningIcon />
                <h2 class="comments-heading">Hvorfor Afventes processen?</h2>
                <TextArea class="status-comment-field" :disabled="state.disabled" @change="update({waiting: $event})" :value="state.waiting" />
            </div>

            <div v-if="state.status === Status.disapproved">
                <WarningIcon />
                <h2 class="comments-heading">Hvorfor er processen afvist?</h2>
                <TextArea class="status-comment-field" :disabled="state.disabled" @change="update({disapproved: $event})" :value="state.disapproved" />
            </div>

            <div v-if="state.status === Status.stored">
                <WarningIcon />
                <h2 class="comments-heading">Hvorfor er processen arkiveret?</h2>
                <TextArea class="status-comment-field" :disabled="state.disabled" @change="update({stored: $event})" :value="state.stored" />
            </div>

            <div v-if="state.status === Status.unsuccessful">
                <WarningIcon />
                <h2 class="comments-heading">Hvorfor er processen mislykket?</h2>
                <TextArea class="status-comment-field" :disabled="state.disabled" @change="update({unsuccessful: $event})" :value="state.unsuccessful" />
            </div>
        </div>
    </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { generalInformationActionTypes } from '@/store/modules/details/general-information/actions';

import InputField from '@/components/common/inputs/InputField.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Phases from '@/components/common/inputs/Phases.vue';
import AssociatedPersonsInput from '@/components/details/general-information/AssociatedPersonsInput.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import FormSection from '@/components/details/FormSection.vue';
import { Status } from '@/store/modules/details/general-information/state';
import WarningIcon from '@/components/icons/WarningIcon.vue';

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
  @Action(generalInformationActionTypes.UPDATE_GENERAL_INFORMATION) update: any;
  Status = Status;

  isPhaseChanged = false;

  get state() {
    return this.$store.state.details.generalInformation;
  }

  get statuses() {
    return Object.values(Status);
  }

  phaseChanged(phase: any) {
    this.isPhaseChanged = true;
    this.update({ phase });
  }

  fields = ['Teknik', 'Diverse', 'ETC'];

  visibilityLevels = ['Privat', 'Tværkommunalt', 'Kommunalt'];

  kleNumbers = ['1234', '134324', '54353'];

  departments = ['some-department'];

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
    width: 30%;
    h2 {
      @include textarea-heading;
      margin-bottom: $size-unit/2;
    }
  }
  .general-phases {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    .status-selection {
      align-self: center;
      max-width: 230px;
    }
  }
}

.comments-heading {
  @include textarea-heading;
  display: inline;
  vertical-align: middle;
  margin-left: $size-unit;
}

.status-comment-field {
  padding-top: $size-unit;
}

.phased-changed {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $size-unit;
  > div {
    color: $color-secondary;
    padding-left: $size-unit;
    width: 300px;
  }
  svg {
    vertical-align: middle;
    width: 40px;
    height: 40px;
  }
}
</style>
