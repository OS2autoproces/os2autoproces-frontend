<template>
  <div class="challenges">
    <div class="challenges-unit">
      <h2>Beskrivelse</h2>
      <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="updatechallenges({description: $event})" :disabled="disabled" :value="challenges.description" />
    </div>
    <div class="challenges-unit">
      <h2>Idéer og løsning</h2>
      <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="updatechallenges({ideasSolution: $event})" :disabled="disabled" :value="challenges.ideasSolution" />
    </div>
    <div class="challenges-unit">
      <h2>Nuværende process</h2>
      <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="updatechallenges({currentProcess: $event})" :disabled="disabled" :value="challenges.currentProcess" />
    </div>
    <div class="challenges-unit">
      <h2>Udfordringer ved nuværende process</h2>
      <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="updatechallenges({challenges: $event})" :disabled="disabled" :value="challenges.challenges" />
      <Well>
        <div class="section-col">
          <div class="labels">
            Nuværende system:
          </div>
          <div class="fields">
            <SelectionField :items="processItems" :value="challenges.currentProcessTitle" :disabled="disabled" @change="updatechallenges({currentProcessTitle: $event})" />
          </div>
        </div>
        <div>
          <div class="section-col">
            <div class="labels">
              Startdato:
            </div>
            <div class="fields">
              <DatePicker :disabled="disabled" :value="challenges.startDate" @change="updatechallenges({startDate: $event})" />
            </div>
          </div>
          <div class="section-col">
            <div class="labels">
              Forventet slutdato:
            </div>
            <div class="fields">
              <DatePicker :disabled="disabled" :value="challenges.expectedEndDate" @change="updatechallenges({expectedEndDate: $event})" />
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
    Well,
  }
})
export default class ChallengesForm extends Vue {
  @Action(ChallengesActionTypes.UPDATE_CHALLENGES) updatechallenges: any;
  @Prop({ default: true })
  disabled!: boolean;
  twoColumnBreakpoint = 1600;

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
