<template>
    <FormSection heading="Faglig vurdering" id="assessment" :disabled="state.disabled" @edit="update({ disabled: $event })" always-open>
        <div class="assessment" :class="{ disabled: state.disabled }">
            <div class="question">
                <div class="label">I hvor høj grad er der faglig vurdering?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.degreeOfAssessment" @change="update({ degreeOfAssessment: $event })" />
            </div>

            <div class="question">
                <div class="label">I hvor høj grad er processen præget af hyppige ændringer?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.degreeOfFrequentChanges" @change="update({ degreeOfFrequentChanges: $event })" />
            </div>

            <div class="question">
                <div class="label">I hvor høj grad er processen baseret på struktureret information?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.degreeOfStructuredInformation" @change="update({ degreeOfStructuredInformation: $event })" />
            </div>

            <div class="question">
                <div class="label">Er der variation i hvordan processen løses?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.degreeOfSolutionVariation" @change="update({ degreeOfSolutionVariation: $event })" />
            </div>

            <div class="question">
                <div class="label">Er data og informationer, der skal bruges i processen tilgængelige?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.degreeOfAvailableInformation" @change="update({ degreeOfAvailableInformation: $event })" />
            </div>

            <div class="question">
                <div class="label">Bidrager automatisering til højere kvalitet eller højere service?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.degreeOfAutomationGain" @change="update({ degreeOfAutomationGain: $event })" />
            </div>

            <div class="question">
                <div class="label">I hvor høj grad vurderes det at processen kan automatiseres?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.degreeOfAutomationPotential" @change="update({ degreeOfAutomationPotential: $event })" />
            </div>
        </div>
    </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AssessmentActionTypes } from '@/store/modules/details/assessment/actions';
import { Action } from 'vuex-class';
import LikertScale from '@/components/common/inputs/LikertScale.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import FormSection from '@/components/details/FormSection.vue';

@Component({
  components: {
    LikertScale,
    InfoTooltip,
    FormSection
  }
})
export default class AssessmentForm extends Vue {
  @Action(AssessmentActionTypes.UPDATE) update: any;

  get state() {
    return this.$store.state.details.assessment;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.assessment {
  margin: 4 * $size-unit;
  margin-top: $size-unit;
  padding: $size-unit;
  border: 1px solid transparent;

  &:not(.disabled) {
    border-color: $color-primary;
    border-radius: $size-unit;
  }
}

.question:not(:last-of-type) {
  margin-bottom: 3 * $size-unit;
}

.label {
  @include heading;
  color: $color-secondary;
  margin-bottom: $size-unit;
}

.tooltip {
  margin-left: $size-unit;
}
</style>
