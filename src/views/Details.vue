<template>
  <div class="details">
    <NavBar />
    <div class="page">
      <div class="side-bar">
        <div class="side-bar-content">
          <router-link to="/search" class="search-page-link">
            <ArrowLeftIcon /> Tilbage til søgning
          </router-link>

          <DetailsMenu />

          <Button v-if="phase" class="report-button" @click="report">Indberet</Button>
          <Button v-else class="save-button" @click="save">Gem</Button>
        </div>
      </div>

      <div class="details-wrapper">
        <div class="details-content">
          <DetailsHeader />

          <div class="form-sections">
            <GeneralInformationForm />
            <ChallengesForm />
            <TimeAndProcessForm />
            <AssessmentForm />
            <SpecificationForm />
            <ImplementationForm />
            <OperationForm />
            <AttachmentsForm />
          </div>

          <div>
            <h2 class="internal-notes-heading">Interne noter</h2>
            <InternalNotes title="Interne noter" :internalNotes="state.internalNotes" />
          </div>

          <div class="comments">
            <h2 class="comments-heading">Kommentarer</h2>
            <Comments :comments="state.comments" @submit="saveComment({ message: $event })" />
          </div>

        </div>
      </div>
    </div>
    <SnackBar :timeout="0" color="error" :value="snack" @clicked="updateProcessErrors({processErrors: []})">
      <div>
        <p>Kunne ikke gemme, følgende felter er invalide:</p>
        <p v-for="field in errors" :key="field">
          {{field}}
        </p>
      </div>
    </SnackBar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import NavBar from '../components/common/NavBar.vue';
import InternalNotes from '@/components/common/inputs/InternalNotes.vue';
import { processActionTypes, NewComment } from '@/store/modules/process/actions';
import { Phase } from '@/models/phase';
import { commonActionTypes } from '@/store/modules/common/actions';

import Comments from '../components/details/Comments.vue';
import IntervalSelector from '../components/common/inputs/IntervalSelector.vue';
import FormSection from '@/components/details/FormSection.vue';
import DetailsMenu from '@/components/details/DetailsMenu.vue';
import DetailsHeader from '@/components/details/DetailsHeader.vue';
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
import store from '@/store/store';

@Component({
  components: {
    NavBar,
    FormSection,
    DetailsMenu,
    DetailsHeader,
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
export default class Details extends Vue {
  @Prop(String) phase!: Phase;
  @Prop(String) id!: string;

  @Action(processActionTypes.SAVE) save: any;
  @Action(processActionTypes.UPDATE) update: any;
  @Action(processActionTypes.SAVE_COMMENT) saveComment!: (message: string) => Promise<void>;
  @Action(processActionTypes.LOAD_COMMENTS) loadComments!: () => Promise<void>;
  @Action(commonActionTypes.LOAD_IT_SYSTEMS) loadItSystems!: () => Promise<void>;
  @Action(commonActionTypes.LOAD_KLES) loadKles!: () => Promise<void>;
  @Action(errorActionTypes.UPDATE_PROCESS_ERRORS) updateProcessErrors!: (processErrors: Partial<ErrorState>) => void;

  get state() {
    return store.state.process;
  }

  get errors() {
    return store.state.error.processErrors;
  }

  get snack() {
    return !isEmpty(this.$store.state.error.processErrors);
  }

  beforeCreate() {
    this.$store.dispatch(processActionTypes.CLEAR_PROCESS);
  }

  mounted() {
    this.$store.dispatch(processActionTypes.LOAD_PROCESS_DETAILS, Number(this.id));
    this.loadItSystems();
    this.loadKles();

    if (this.phase) {
      this.update({ phase: this.phase });
    }
  }

  async report() {
    const processId = await this.$store.dispatch(processActionTypes.REPORT);
    if (!processId) {
      return;
    }
    this.$router.push(`/details/${processId}`);
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
  margin-left: $size-unit;

  .side-bar-content {
    position: fixed;
    top: 80px + 2 * $size-unit;
  }

  .save-button {
    margin: 2 * $size-unit;
  }
}

.details-wrapper {
  flex-grow: 1;
}

.details-content {
  margin-top: $size-unit;
  margin: 0 auto;
  max-width: 1200px;
}

.form-sections {
  border: 1px solid $color-secondary;
  border-radius: $size-unit;
  margin-top: 2 * $size-unit;

  > *:not(:last-of-type) {
    border-bottom: 1px solid $color-secondary;
  }
}

.comments {
  margin: 5 * $size-unit 0;
}

.save-button,
.report-button {
  margin: 2 * $size-unit;
}

.search-page-link {
  @include heading;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  svg {
    height: $size-unit;
    width: $size-unit;
    margin-right: $size-unit / 2;
  }
}

.comments-heading,
.internal-notes-heading {
  @include heading;
  color: $color-secondary;
  margin-top: 2 * $size-unit;
  padding: $size-unit 2 * $size-unit;
}
</style>
