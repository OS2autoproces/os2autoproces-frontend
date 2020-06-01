<template>
  <div class="page">
    <div class="side-bar">
      <div class="side-bar-content">
        <router-link to="/search" class="search-page-link"> <ArrowLeftIcon />Tilbage til søgning </router-link>

        <ProcessMenu :phase="phase" :canEdit="state.canEdit" :isReporting="isReporting" />

        <Button primary v-if="isReporting" class="report-button" @click="report">Gem</Button>
        <Button primary v-if="!isReporting" class="save-button" @click="save">Gem</Button>
      </div>
    </div>

    <div class="details-wrapper">
      <div class="details-content">
        <ProcessHeader :isReporting="isReporting" />

        <ProcessParents :parents="state.parents" />

        <div class="form-sections">
          <GeneralInformationForm :isReporting="isReporting" />
          <ChallengesForm />
          <TimeAndProcessForm />
          <AssessmentForm />
          <ImplementationForm />
          <OperationForm />
          <AttachmentsForm :showPlaceholder="isReporting" v-if="state.minPhase(PhaseKeys.PREANALYSIS)" />

          <FormSection
            v-if="state.canEdit"
            id="internal-notes"
            heading="Interne noter"
            :disabled="state.disabled.internalNotesEdit"
            @edit="update({ disabled: { internalNotesEdit: $event } })"
            tooltip="Her kan du tilføje noter til og om processen, der kun vil være synlige for tilknyttede personer. Noterne bliver heller ikke delt, hvis processen deles med alle brugere i OS2autoproces."
          >
            <InternalNotes :internalNotes="state.internalNotes" :disabled="state.disabled.internalNotesEdit" />
          </FormSection>
        </div>

        <div class="comments" v-if="!isReporting">
          <h2 class="comments-heading">Kommentarer</h2>
          <Comments :comments="state.comments" @submit="saveComment({ message: $event })" />
        </div>
      </div>
    </div>

    <SnackBar showButton :timeout="0" color="error" :value="snack" @clicked="clearErrors">
      <div>
        <h3>Følgende felter er ugyldige:</h3>
        <div class="snack-bar-list-container">
          <!-- TODO Fix v if in v for and computation in template -->
          <div v-if="hasErrors">
            <ul class="section-errors" v-for="section in errors" :key="section.section">
              <span class="section-errors-title">{{ section.section }}</span>
              <li v-for="(field, i) in section.errors" :key="i">
                <div class="snack-bar-list-item">{{ field }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SnackBar>

    <SnackBar
      :showButton="false"
      :value="showSaveSuccess"
      :timeout="3000"
      color="success"
      @onSnackClose="showSaveSuccess = false"
      >Processen er gemt!</SnackBar
    >

    <SnackBar
      :showButton="false"
      :value="showSaveError"
      :timeout="5000"
      color="error"
      @onSnackClose="showSaveError = false"
      >Processen er IKKE gemt - prøv igen!</SnackBar
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import InternalNotes from '@/components/common/inputs/InternalNotes.vue';
import { Phase, PhaseKeys } from '@/models/phase';
import Comments from '@/components/details/Comments.vue';
import IntervalSelector from '@/components/common/inputs/IntervalSelector.vue';
import FormSection from '@/components/details/FormSection.vue';
import ProcessMenu from '@/components/details/process/ProcessMenu.vue';
import ProcessHeader from '@/components/details/process/ProcessHeader.vue';
import ProcessParents from '@/components/details/process/ProcessParents.vue';
import GeneralInformationForm from '@/components/details/general-information/GeneralInformationForm.vue';
import Button from '@/components/common/inputs/Button.vue';
import ChallengesForm from '@/components/details/challenges/ChallengesForm.vue';
import AssessmentForm from '@/components/details/assessment/AssessmentForm.vue';
import ImplementationForm from '@/components/details/implementation/ImplementationForm.vue';
import TimeAndProcessForm from '@/components/details/time-process/TimeAndProcessForm.vue';
import AttachmentsForm from '@/components/details/attachments/AttachmentsForm.vue';
import OperationForm from '@/components/details/operation/OperationForm.vue';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import { ErrorState, ErrorModule } from '@/store/modules/error';
import SnackBar from '@/components/common/SnackBar.vue';
import { isEmpty } from 'lodash';
import { CommonModule } from '@/store/modules/common';
import { ProcessModule } from '@/store/modules/process';
import { AuthModule } from '../../../store/modules/auth';

@Component({
  components: {
    FormSection,
    ProcessMenu,
    ProcessHeader,
    ProcessParents,
    GeneralInformationForm,
    Comments,
    IntervalSelector,
    ChallengesForm,
    AssessmentForm,
    TimeAndProcessForm,
    AttachmentsForm,
    ImplementationForm,
    OperationForm,
    Button,
    ArrowLeftIcon,
    EditIcon,
    SnackBar,
    InternalNotes
  }
})
export default class Process extends Vue {
  @Prop(Boolean)
  isReporting!: boolean;
  @Prop(Number)
  id!: number;
  @Prop(String)
  phase!: Phase;

  PhaseKeys = PhaseKeys;

  showSaveSuccess = false;
  showSaveError = false;

  get state() {
    return ProcessModule;
  }

  get errors() {
    return ErrorModule;
  }

  get hasErrors() {
    return ErrorModule.hasErrors;
  }

  get snack() {
    return !!Object.keys(ErrorModule).find(section => !isEmpty(ErrorModule[section as keyof ErrorState].errors));
  }

  get isWithinMunicipality() {
    return AuthModule.user?.cvr === ProcessModule.cvr;
  }

  clearErrors() {
    ErrorModule.clearErrors();
  }

  beforeCreate() {
    ErrorModule.clearErrors();
  }

  mounted() {
    CommonModule.loadKles();
    CommonModule.loadITSystems();
    CommonModule.loadOrgUnits();

    if (this.isReporting) {
      ProcessModule.update({
        phase: this.phase,
        canEdit: true,
        hasChanged: false,
        cvr: AuthModule.user?.cvr,
        disabled: {
          generalInformationEdit: false,
          challengesEdit: false,
          timeAndProcessEdit: false,
          assessmentEdit: false,
          operationEdit: false,
          implementationEdit: false,
          attachmentsEdit: false,
          internalNotesEdit: false
        }
      });
    } else {
      ProcessModule.loadComments();
    }
  }

  async save() {
    try {
      await ProcessModule.save();
      this.showSaveSuccess = true;
    } catch (e) {
      if (ErrorModule.hasErrors) {
        this.showSaveError = true;
      }
    }
  }

  async report() {
    try {
      const processId = await ProcessModule.createReport();
      this.showSaveSuccess = true;
      this.$router.push(`/details/${processId}`);
    } catch (e) {
      if (ErrorModule.hasErrors) {
        this.showSaveError = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  display: flex;
}

.side-bar {
  flex: 0 0 200px;
  margin-left: 1rem;

  .side-bar-content {
    position: fixed;
    top: calc(80px + 2rem);
  }
}

.details-wrapper {
  flex-grow: 1;
  margin-bottom: 5rem;
}

.details-content {
  margin-top: 1rem;
  margin: 0 auto;
  max-width: 1200px;
}

.form-sections {
  border: 1px solid $color-secondary;
  border-radius: 1rem;
  margin-top: 2rem;

  > *:not(:last-of-type) {
    border-bottom: 1px solid $color-secondary;
  }
}

.comments {
  margin-top: 5rem;
}

.save-button,
.report-button {
  margin: 2rem;
}

.search-page-link {
  @include heading;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  svg {
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
  }
}

.comments-heading {
  @include heading;
  color: $color-secondary;
  margin-top: 2rem;
  padding: 1rem 2rem;
}

.snack-bar-list-container {
  display: flex;
  flex-wrap: wrap;

  .section-errors-title {
    font-weight: bold;
  }

  .section-errors {
    margin-top: 1rem;
  }

  .snack-bar-list-item {
    width: 15rem;
    overflow: wrap;

    .error {
      text-decoration: none;
    }
  }
}
</style>
