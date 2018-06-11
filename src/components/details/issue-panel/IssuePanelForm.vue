<template>
    <div class="issue-panel-form">
        <h2>Beskrivelse</h2>
        <TextArea v-if="!disabled" @change="updateIssuePanel({description: $event})" :disabled="disabled" :value="issuePanel.description" />
        <div v-if="disabled" :class="{'double-column':issuePanel.description.length > 1600 }" class="issue-description">
            {{issuePanel.description}}
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  namespace,
  issuePanelActionTypes
} from '@/store/modules/details/issue-panel/actions';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action } from 'vuex-class';

@Component({
  components: {
    TextArea
  }
})
export default class GeneralInformationForm extends Vue {
  @Action(issuePanelActionTypes.UPDATE_ISSUE_PANEL) updateIssuePanel: any;
  @Prop() disabled!: boolean;

  get issuePanel() {
    return this.$store.state.details.issuePanel;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.issue-panel-form {
  .issue-description {
    width: 40%;
    &.double-column {
      width: 100%;
      column-count: 2;
      column-gap: 5rem;
    }
  }
  h2 {
    @include heading;
    color: $color-secondary;
    margin-bottom: $size-unit;
  }
}
</style>
