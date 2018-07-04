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

          <div class="comments">
            <div class="comments-heading">Kommentarer</div>
            <Comments :comments="state.comments" @submit="saveComment({ id: state.id, message: $event })" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import NavBar from '../components/common/NavBar.vue';
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
import { processActionTypes, NewComment } from "@/store/modules/process/actions";
import { Phase } from '@/models/phase';

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
    EditIcon
  }
})
export default class Details extends Vue {
  @Prop({type: String}) phase!: Phase;
  @Prop() id!: string;

  @Action(processActionTypes.SAVE) save: any;
  @Action(processActionTypes.UPDATE)
  update: any;
  @Action(processActionTypes.SAVE_COMMENT)
  saveComment!: (newComment: NewComment) => Promise<void>;
  @Action(processActionTypes.LOAD_COMMENTS)
  loadComments!: (processId: number) => Promise<void>;

  get state() {
    return this.$store.state.process;
  }

  async report() {
    const processId = await this.$store.dispatch(processActionTypes.REPORT);
    this.$router.push(`/details/${processId}`);
  }

  mounted() {
    this.$store.dispatch(processActionTypes.LOAD_PROCESS_DETAILS, Number(this.id));
    
    if (this.phase) {
      this.update({ phase: this.phase });
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

.usage,
.comments {
  margin: 5 * $size-unit 0;
}

.usage {
  text-align: center;

  .usage-heading {
    font-style: italic;
    margin: $size-unit / 2 0;

    .usage-edit-icon {
      display: inline-block;
      margin-left: $size-unit;
      height: $size-unit;
      width: $size-unit;
      fill: $color-secondary;
    }

    &:not(.disabled) {
      .usage-edit-icon svg /deep/ path {
        fill: $color-primary;
      }
    }
  }

  .comments-heading {
    font-style: italic;
    margin: $size-unit / 2 0;
  }
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
</style>
