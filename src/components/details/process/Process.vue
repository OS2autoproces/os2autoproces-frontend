<template>
  <div class="page">
    <div class="side-bar">
      <div class="side-bar-content">
        <router-link to="/search" class="search-page-link">
          <ArrowLeftIcon /> Tilbage til søgning
        </router-link>

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
          <SpecificationForm v-if="isWithinMunicipality" />
          <ImplementationForm />
          <OperationForm />
          <AttachmentsForm v-if="!isReporting" />
          <FormSection v-if="state.canEdit" id="internal-notes" heading="Interne noter" :disabled="state.disabled.internalNotesEdit" @edit="update({disabled: { internalNotesEdit: $event} })" tooltip="Her kan du tilføje noter til og om processen, der kun vil være synlige for tilknyttede personer. Noterne bliver heller ikke delt, hvis processen deles tværkommunalt.">
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
          <ul class="spacing" v-for="section in errors" v-if="section.errors.length > 0" :key="section.section">
            <span class="bold">{{section.section}}</span>
            <li v-for="field in section.errors" :key="field">
              <div class="snack-bar-list-item">
                {{field}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </SnackBar>

    <SnackBar :showButton="false" :value="showSaveSuccess" :timeout="3000" color="success" @onSnackClose="showSaveSuccess = false">
      Processen er gemt!
    </SnackBar>

    <SnackBar :showButton="false" :value="showSaveError" :timeout="5000" color="error" @onSnackClose="showSaveError = false">
      Processen er IKKE gemt - prøv igen!
    </SnackBar>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import InternalNotes from '@/components/common/inputs/InternalNotes.vue';
import { processActionTypes, NewComment } from '@/store/modules/process/actions';
import { Phase } from '@/models/phase';
import { commonActionTypes } from '@/store/modules/common/actions';

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
import SpecificationForm from '@/components/details/specification/SpecificationForm.vue';
import ImplementationForm from '@/components/details/implementation/ImplementationForm.vue';
import TimeAndProcessForm from '@/components/details/time-process/TimeAndProcessForm.vue';
import AttachmentsForm from '@/components/details/attachments/AttachmentsForm.vue';
import OperationForm from '@/components/details/operation/OperationForm.vue';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import { errorActionTypes } from '@/store/modules/error/actions';
import { ErrorState } from '@/store/modules/error/state';
import SnackBar from '@/components/common/SnackBar.vue';
import { isEmpty } from 'lodash';

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
    SpecificationForm,
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

  @Action(processActionTypes.UPDATE)
  update: any;
  @Action(processActionTypes.SAVE_COMMENT)
  saveComment!: (message: string) => Promise<void>;
  @Action(errorActionTypes.UPDATE_PROCESS_ERRORS)
  updateProcessErrors!: (processErrors: Partial<ErrorState>) => void;
  @Action(errorActionTypes.CLEAR_ERRORS)
  clearErrors!: () => void;

  showSaveSuccess = false;
  showSaveError = false;

  get state() {
    return this.$store.state.process;
  }

  get errors() {
    return this.$store.state.error;
  }

  get snack() {
    const errorState = this.$store.state.error;
    let empty = false;
    Object.keys(errorState).forEach(section => {
      empty = empty || !isEmpty(errorState[section].errors);
    });
    return empty;
  }

  get isWithinMunicipality() {
    const { auth, process } = this.$store.state;
    return auth.user.cvr === process.cvr;
  }

  beforeCreate() {
    this.$store.dispatch(errorActionTypes.CLEAR_ERRORS);
  }

  mounted() {
    this.$store.dispatch(commonActionTypes.LOAD_KLES);
    this.$store.dispatch(commonActionTypes.LOAD_IT_SYSTEMS);
    this.$store.dispatch(commonActionTypes.LOAD_ORGUNITS, this.$store.state.auth.user.cvr);

    if (this.isReporting) {
      this.update({
        phase: this.phase,
        canEdit: true,
        hasChanged: false,
        cvr: this.$store.state.auth.user.cvr,
        disabled: {
          generalInformationEdit: false,
          challengesEdit: false,
          timeAndProcessEdit: false,
          assessmentEdit: false,
          operationEdit: false,
          specificationEdit: false,
          implementationEdit: false,
          attachmentsEdit: false,
          internalNotesEdit: false
        }
      });
    } else {
      this.$store.dispatch(processActionTypes.LOAD_COMMENTS);
    }
  }

  async save() {
    try {
      await this.$store.dispatch(processActionTypes.SAVE);
      this.showSaveSuccess = true;
    } catch (e) {
      if (this.errors.length === 0) {
        this.showSaveError = true;
      }
    }
  }

  async report() {
    try {
      const processId = await this.$store.dispatch(processActionTypes.REPORT);
      this.showSaveSuccess = true;
      this.$router.push(`/details/${processId}`);
    } catch (e) {
      if (this.errors.length === 0) {
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

  .bold {
    font-weight: bold;
  }

  .spacing {
    margin-top: 1rem;
  }

  .snack-bar-list-item {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 15rem;
    overflow: hidden;
  }
}
</style>
