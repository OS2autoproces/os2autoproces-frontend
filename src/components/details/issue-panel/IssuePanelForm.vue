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
        <div class="current-proces">
          <div>
            Nuværende system:
          </div>
          <SelectionField :items="procesItems" :value="issuePanel.currentProcesTitle" :disabled="false" @change="updateIssuePanel({currentProcesTitle: $event})" />
        </div>

        <div class="date-box-container">
          <div class="date-box">
            <div class="date-box-title">
              Start dato:
            </div>
            <DatePicker :disabled="false" :value="issuePanel.startDate" @change="updateIssuePanel({startDate: $event})" />
          </div>
          <div class="date-box">
            <div class="date-box-title">
              Forventet sletdato:
            </div>
            <DatePicker :disabled="false" :value="issuePanel.expectedEndDate" @change="updateIssuePanel({expectedEndDate: $event})" />
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
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DatePicker from '@/components/common/inputs/DatePicker.vue';

@Component({
  components: {
    TextArea,
    SelectionField,
    DatePicker
  }
})
export default class GeneralInformationForm extends Vue {
  @Action(issuePanelActionTypes.UPDATE_ISSUE_PANEL) updateIssuePanel: any;
  @Prop({ default: true })
  disabled!: boolean;

  get issuePanel() {
    return this.$store.state.details.issuePanel;
  }

  procesItems = ['KITOS', 'KITOS1', 'KITOS2', 'KITOS3'];
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
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 35%;
      border-right: 1px solid white;
      margin: $size-unit;
      padding-right: $size-unit*2;
    }

    .date-box-container {
      padding: $size-unit;
      width: 30%;
      .date-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: $size-unit;
        .date-box-title {
          width: 40%;
        }
      }
    }
  }
}
</style>
