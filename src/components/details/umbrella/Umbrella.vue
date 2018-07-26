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
import UmbrellaHeader from '@/components/details/umbrella/UmbrellaHeader.vue';
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
    UmbrellaHeader,
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

  report() {
    // TODO
  }

  save() {
    // TODO
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
