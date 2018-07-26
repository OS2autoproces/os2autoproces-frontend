<template>
  <div>
    <div class="side-bar">
      <div class="side-bar-content">
        <router-link to="/search" class="search-page-link">
          <ArrowLeftIcon /> Tilbage til søgning
        </router-link>

        <Button v-if="isReporting" class="report-button" @click="report">Indberet</Button>
        <Button v-if="!isReporting" class="save-button" @click="save">Gem</Button>
      </div>
    </div>

    <div class="details-wrapper">
      <div class="details-content">
        <ProcessHeader />

        <div class="form-sections">
          <UmbrellaForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import InternalNotes from '@/components/common/inputs/InternalNotes.vue';
import { processActionTypes, NewComment } from '@/store/modules/process/actions';
import { Type } from '@/models/types';
import { commonActionTypes } from '@/store/modules/common/actions';

import Comments from '@/components/details/Comments.vue';
import IntervalSelector from '@/components/common/inputs/IntervalSelector.vue';
import FormSection from '@/components/details/FormSection.vue';
import ProcessHeader from '@/components/details/process/ProcessHeader.vue';
import UmbrellaForm from '@/components/details/umbrella/UmbrellaForm.vue';
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
    ProcessHeader,
    UmbrellaForm,
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
export default class Umbrella extends Vue {
  @Prop(Boolean) isReporting!: boolean;
  @Prop(Number) id!: number;
  @Prop(String) type!: Type;

  @Action(processActionTypes.SAVE) save: any;
  @Action(processActionTypes.UPDATE) update: any;
  @Action(processActionTypes.SAVE_COMMENT) saveComment!: (message: string) => Promise<void>;
  @Action(processActionTypes.LOAD_COMMENTS) loadComments!: () => Promise<void>;
  @Action(commonActionTypes.LOAD_IT_SYSTEMS) loadItSystems!: () => Promise<void>;
  @Action(commonActionTypes.LOAD_KLES) loadKles!: () => Promise<void>;
  @Action(errorActionTypes.UPDATE_PROCESS_ERRORS) updateProcessErrors!: (processErrors: Partial<ErrorState>) => void;


  mounted() {
    this.$store.dispatch(commonActionTypes.LOAD_KLES);

    if (this.isReporting) {
      this.update({ type: this.type, canEdit: true, cvr: this.$store.state.auth.user.cvr });
    } else {
      this.$store.dispatch(processActionTypes.LOAD_PROCESS_DETAILS, this.id);
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

.search-page-link {
  @include heading;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  text-decoration: none;

  svg {
    height: $size-unit;
    width: $size-unit;
    margin-right: $size-unit / 2;
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
  border-bottom: 1px solid $color-secondary;
}

.side-bar {
  flex: 0 0 200px;
  margin-left: $size-unit;

  .side-bar-content {
    position: fixed;
    top: 80px + 2 * $size-unit;
  }

  .save-button,
  .report-button {
    margin-top: 2 * $size-unit;
  }
}
</style>
