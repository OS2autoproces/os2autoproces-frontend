<template>
  <div class="issue-panel">
    <div class="issue-panel-unit">
      <h2>Beskrivelse</h2>
      <TextArea v-if="!disabled" @change="updateIssuePanel({description: $event})" :disabled="disabled" :value="issuePanel.description" />
      <div v-if="disabled" :class="{'double-column':issuePanel.description.length > 1600 }" class="issue-description">
        {{issuePanel.description}}
      </div>
    </div>
    <div class="issue-panel-unit">
      <h2>Idéer og løsning</h2>
      <TextArea v-if="!disabled" @change="updateIssuePanel({ideasSolution: $event})" :disabled="disabled" :value="issuePanel.ideasSolution" />
      <div v-if="disabled" :class="{'double-column':issuePanel.ideasSolution.length > 1600 }" class="issue-description">
        {{issuePanel.ideasSolution}}
      </div>
    </div>
    <div class="issue-panel-unit">
      <h2>Nuværende proces</h2>
      <TextArea v-if="!disabled" @change="updateIssuePanel({currentProces: $event})" :disabled="disabled" :value="issuePanel.currentProces" />
      <div v-if="disabled" :class="{'double-column':issuePanel.currentProces.length > 1600 }" class="issue-description">
        {{issuePanel.currentProces}}
      </div>
    </div>
    <div class="issue-panel-unit">
      <h2>Udfordringer ved nuværende proces</h2>
      <TextArea v-if="!disabled" @change="updateIssuePanel({challenges: $event})" :disabled="disabled" :value="issuePanel.challenges" />
      <div v-if="disabled" :class="{'double-column':issuePanel.challenges.length > 1600 }" class="issue-description">
        {{issuePanel.challenges}}
      </div>

      <div class="date-proces-box">
        <div v-if="!disabled" class="current-proces">
          Nuværende system:
          <span>{{issuePanel.currentProcesTitle}}</span>
        </div>

        <div class="date-box-container">
          <div v-if="!disabled" class="date-box">
            Start dato:
            <span>{{issuePanel.startDate}}</span>
          </div>
          <div v-if="!disabled" class="date-box">
            Forventet sletdato:
            <span>{{issuePanel.expectedEndDate}}</span>
          </div>
        </div>
      </div>
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
  @Prop({ default: true })
  disabled!: boolean;

  get issuePanel() {
    return this.$store.state.details.issuePanel;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.issue-panel {
  display: block;
  .issue-panel-unit {
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

  .date-proces-box {
    display: flex;
    justify-content: center;
    background-color: $color-edit-background;
    border-radius: 12px;
    
    .current-proces {
      padding: $size-unit;
      width: 30%;
      margin-right: auto;
      border-right: 1px solid white;
      margin: $size-unit;
      > span {
        float: right;
        margin-right: $size-unit*4;
      }
    }

    .date-box-container {
      padding: $size-unit;
      width: 30%;
      .date-box {
        margin: $size-unit;
        > span {
          float: right;
        }
      }
    }
  }
}
</style>
