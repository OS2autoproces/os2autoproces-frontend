<template>
  <div>
    <div class="side-bar">
      <div class="side-bar-content">
        <router-link to="/search" class="search-page-link">
          <ArrowLeftIcon /> Tilbage til søgning
        </router-link>

        <ProcessMenu />

        <Button v-if="isReporting" class="report-button" @click="report">Indberet</Button>
        <Button v-if="!isReporting" class="save-button" @click="save">Gem</Button>
      </div>
    </div>

    <div class="details-wrapper">
      <div class="details-content">
        <ProcessHeader :isReporting="isReporting" />

        <ProcessParents :parents="state.parents" />

        <div class="form-sections">
          <GeneralInformationForm />
          <ChallengesForm />
          <TimeAndProcessForm />
          <AssessmentForm />
          <SpecificationForm />
          <ImplementationForm />
          <OperationForm />
          <AttachmentsForm v-if="!isReporting" />
        </div>

        <div>
          <h2 class="internal-notes-heading">Interne noter</h2>
          <InternalNotes title="Interne noter" :internalNotes="state.internalNotes" />
        </div>

        <div class="comments" v-if="!isReporting">
          <h2 class="comments-heading">Kommentarer</h2>
          <Comments :comments="state.comments" @submit="saveComment({ message: $event })" />
        </div>

      </div>
    </div>

    <SnackBar :timeout="0" color="error" :value="snack" @clicked="updateProcessErrors({processErrors: []})">
      <div>
        Følgende felter er ugyldige:
        <ul>
          <li v-for="field in errors" :key="field">{{field}}</li>
        </ul>
      </div>
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
  @Prop(Boolean) isReporting!: boolean;
  @Prop(Number) id!: number;
  @Prop(String) phase!: Phase;

  @Action(processActionTypes.UPDATE) update: any;
  @Action(processActionTypes.SAVE_COMMENT) saveComment!: (message: string) => Promise<void>;
  @Action(processActionTypes.LOAD_COMMENTS) loadComments!: () => Promise<void>;
  @Action(commonActionTypes.LOAD_IT_SYSTEMS) loadItSystems!: () => Promise<void>;
  @Action(errorActionTypes.UPDATE_PROCESS_ERRORS) updateProcessErrors!: (processErrors: Partial<ErrorState>) => void;

  get state() {
    return this.$store.state.process;
  }

  get errors() {
    return this.$store.state.error.processErrors;
  }

  get snack() {
    return !isEmpty(this.$store.state.error.processErrors);
  }

  mounted() {
    this.loadItSystems();

    if (this.isReporting) {
      this.update({ phase: this.phase, canEdit: true, cvr: this.$store.state.auth.user.cvr });
    }
  }

  save() {
    this.$store.dispatch(processActionTypes.SAVE);
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
}

.details-wrapper {
  flex-grow: 1;
  margin-bottom: 5 * $size-unit;
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
  margin-top: 5 * $size-unit;
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
