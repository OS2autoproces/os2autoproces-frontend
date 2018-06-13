<template>
  <div class="challenges">
    <div class="challenges-unit">
      <h2>Beskrivelse</h2>
      <TextArea v-if="!disabled" @change="updatechallenges({description: $event})" :disabled="disabled" :value="challenges.description" />
      <div v-if="disabled" :class="{'double-column': challenges.description.length > 1600 }" class="challenges-description">
        {{challenges.description}}
      </div>
    </div>
    <div class="challenges-unit">
      <h2>Idéer og løsning</h2>
      <TextArea v-if="!disabled" @change="updatechallenges({ideasSolution: $event})" :disabled="disabled" :value="challenges.ideasSolution" />
      <div v-if="disabled" :class="{'double-column': challenges.ideasSolution.length > 1600 }" class="challenges-description">
        {{challenges.ideasSolution}}
      </div>
    </div>
    <div class="challenges-unit">
      <h2>Nuværende process</h2>
      <TextArea v-if="!disabled" @change="updatechallenges({currentProcess: $event})" :disabled="disabled" :value="challenges.currentProcess" />
      <div v-if="disabled" :class="{'double-column': challenges.currentProcess.length > 1600 }" class="challenges-description">
        {{challenges.currentProcess}}
      </div>
    </div>
    <div class="challenges-unit">
      <h2>Udfordringer ved nuværende proces</h2>
      <TextArea v-if="!disabled" @change="updatechallenges({challenges: $event})" :disabled="disabled" :value="challenges.challenges" />
      <div v-if="disabled" :class="{'double-column': challenges.challenges.length > 1600 }" class="challenges-description">
        {{challenges.challenges}}
      </div>
      <Well>
        <div class="section-col">
          <div class="labels">
            Nuværende system:
          </div>
          <div class="fields">
            <SelectionField :items="processItems" :value="challenges.currentProcessTitle" :disabled="false" @change="updatechallenges({currentProcesTitle: $event})" />
          </div>
        </div>
        <div>
          <div class="section-col">
            <div class="labels">
              Startdato:
            </div>
            <div class="fields">
              <DatePicker :disabled="false" :value="challenges.startDate" @change="updatechallenges({startDate: $event})" />
            </div>
          </div>
          <div class="section-col">
            <div class="labels">
              Forventet slutdato:
            </div>
            <div class="fields">
              <DatePicker :disabled="false" :value="challenges.expectedEndDate" @change="updatechallenges({expectedEndDate: $event})" />
            </div>
          </div>
        </div>
      </Well>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  namespace,
  ChallengesActionTypes
} from '@/store/modules/details/challenges/actions';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action } from 'vuex-class';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DatePicker from '@/components/common/inputs/DatePicker.vue';
import Well from '@/components/common/Well.vue';

@Component({
  components: {
    TextArea,
    SelectionField,
    DatePicker,
    Well
  }
})
export default class ChallengesForm extends Vue {
  @Action(ChallengesActionTypes.UPDATE_CHALLENGES) updatechallenges: any;
  @Prop({ default: true })
  disabled!: boolean;

  get challenges() {
    return this.$store.state.details.challenges;
  }

  processItems = ['KITOS', 'KITOS1', 'KITOS2', 'KITOS3'];
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.challenges {
  display: block;
  .challenges-unit {
    .challenges-description {
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

  .section-col {
    display: flex;
    align-items: baseline;
    .labels {
      width: 50%;
      > div {
        line-height: $size-unit * 2;
      }
    }

    .label > div,
    .fields > * {
      margin-bottom: $size-unit;
    }
  }
}
</style>
