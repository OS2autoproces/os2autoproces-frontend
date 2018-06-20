<template>
    <FormSection heading="Problemstillinger" id="challenges" :disabled="state.disabled" @edit="update({disabled: $event})">
        <h2>Beskrivelse</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({description: $event})" :disabled="state.disabled" :value="state.description" />

        <h2>Idéer og løsning</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({ideasSolution: $event})" :disabled="state.disabled" :value="state.ideasSolution" />

        <h2>Nuværende process</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({currentProcess: $event})" :disabled="state.disabled" :value="state.currentProcess" />

        <h2>Udfordringer ved nuværende process</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({challenges: $event})" :disabled="state.disabled" :value="state.challenges" />
        
        <Well>
            <div class="section-col">
                <div class="labels">
                    Nuværende system:
                </div>
                <div class="fields">
                    <SelectionField :items="processItems" :value="state.currentProcessTitle" :disabled="state.disabled" @change="update({currentProcessTitle: $event})" />
                </div>
            </div>
            <div>
                <div class="section-col">
                    <div class="labels">
                        Startdato:
                    </div>
                    <div class="fields">
                        <DatePicker :disabled="state.disabled" :value="state.startDate" @change="update({startDate: $event})" />
                    </div>
                </div>
                <div class="section-col">
                    <div class="labels">
                        Forventet slutdato:
                    </div>
                    <div class="fields">
                        <DatePicker :disabled="state.disabled" :value="state.expectedEndDate" @change="update({expectedEndDate: $event})" />
                    </div>
                </div>
            </div>
        </Well>
    </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ChallengesActionTypes } from '@/store/modules/details/challenges/actions';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action } from 'vuex-class';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DatePicker from '@/components/common/inputs/DatePicker.vue';
import FormSection from '@/components/details/FormSection.vue';
import Well from '@/components/common/Well.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';

@Component({
  components: {
    TextArea,
    SelectionField,
    DatePicker,
    Well,
    FormSection,
    InfoTooltip
  }
})
export default class ChallengesForm extends Vue {
  @Action(ChallengesActionTypes.UPDATE_CHALLENGES) update: any;

  twoColumnBreakpoint = 1600;

  get state() {
    return this.$store.state.details.challenges;
  }

  processItems = ['KITOS', 'KITOS1', 'KITOS2', 'KITOS3'];
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

h2 {
  @include heading;
  color: $color-secondary;
  margin-bottom: $size-unit;
  display: inline-block;
  margin-right: $size-unit;
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
</style>
