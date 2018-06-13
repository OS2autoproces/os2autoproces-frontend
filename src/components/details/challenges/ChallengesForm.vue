<template>
  <div class="challenges">
    <div class="challenges-unit">
      <h2>Beskrivelse</h2>
      <TextArea v-if="!disabled" @change="updatechallenges({description: $event})" :disabled="disabled" :value="challenges.description" />
      <div v-if="disabled" :class="{'double-column':challenges.description.length > 1600 }" class="challenges-description">
        {{challenges.description}}
      </div>
    </div>
    <div class="challenges-unit">
      <h2>Idéer og løsning</h2>
      <TextArea v-if="!disabled" @change="updatechallenges({ideasSolution: $event})" :disabled="disabled" :value="challenges.ideasSolution" />
      <div v-if="disabled" :class="{'double-column':challenges.ideasSolution.length > 1600 }" class="challenges-description">
        {{challenges.ideasSolution}}
      </div>
    </div>
    <div class="challenges-unit">
      <h2>Nuværende proces</h2>
      <TextArea v-if="!disabled" @change="updatechallenges({currentProces: $event})" :disabled="disabled" :value="challenges.currentProces" />
      <div v-if="disabled" :class="{'double-column':challenges.currentProces.length > 1600 }" class="challenges-description">
        {{challenges.currentProces}}
      </div>
    </div>
    <div class="challenges-unit">
      <h2>Udfordringer ved nuværende proces</h2>
      <TextArea v-if="!disabled" @change="updatechallenges({challenges: $event})" :disabled="disabled" :value="challenges.challenges" />
      <div v-if="disabled" :class="{'double-column':challenges.challenges.length > 1600 }" class="challenges-description">
        {{challenges.challenges}}
      </div>

      <div class="date-proces-box">
        <div class="current-proces">
          <div>
            Nuværende system:
          </div>
          <SelectionField :items="procesItems" :value="challenges.currentProcesTitle" :disabled="false" @change="updatechallenges({currentProcesTitle: $event})" />
        </div>

        <div class="date-box-container">
          <div class="date-box">
            <div class="date-box-title">
              Start dato:
            </div>
            <DatePicker :disabled="false" :value="challenges.startDate" @change="updatechallenges({startDate: $event})" />
          </div>
          <div class="date-box">
            <div class="date-box-title">
              Forventet sletdato:
            </div>
            <DatePicker :disabled="false" :value="challenges.expectedEndDate" @change="updatechallenges({expectedEndDate: $event})" />
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
  challengesActionTypes
} from '@/store/modules/details/challenges/actions';
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
  @Action(challengesActionTypes.UPDATE_CHALLENGES) updatechallenges: any;
  @Prop({ default: true })
  disabled!: boolean;

  get challenges() {
    return this.$store.state.details.challenges;
  }

  procesItems = ['KITOS', 'KITOS1', 'KITOS2', 'KITOS3'];
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
