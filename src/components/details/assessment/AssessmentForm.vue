<template>
    <FormSection heading="Faglig vurdering" id="assessment" :disabled="state.disabled" @edit="update({ disabled: $event })">
        <div class="assessment" :class="{ disabled: state.disabled }">
            <div class="question">
                <div class="label">I hvor høj grad er der faglig vurdering?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.levelOfProfessionalAssessment" @change="update({ levelOfProfessionalAssessment: $event })" />
            </div>

            <div class="question">
                <div class="label">I hvor høj grad er processen præget af hyppige ændringer?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.levelOfChange" @change="update({ levelOfChange: $event })" />
            </div>

            <div class="question">
                <div class="label">I hvor høj grad er processen baseret på struktureret information?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.levelOfStructuredInformation" @change="update({ levelOfStructuredInformation: $event })" />
            </div>

            <div class="question">
                <div class="label">Er der variation i hvordan processen løses?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.levelOfUniformity" @change="update({ levelOfUniformity: $event })" />
            </div>

            <div class="question">
                <div class="label">Er data og informationer, der skal bruges i processen tilgængelige?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.levelOfDigitalInformation" @change="update({ levelOfDigitalInformation: $event })" />
            </div>

            <div class="question">
                <div class="label">Bidrager automatisering til højere kvalitet eller højere service?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.levelOfRoiFromAutomization" @change="update({ levelOfRoiFromAutomization: $event })" />
            </div>

            <div class="question">
                <div class="label">I hvor høj grad vurderes det at processen kan automatiseres?
                    <InfoTooltip class="tooltip" />
                </div>
                <LikertScale :disabled="state.disabled" :value="state.evaluatedLevelOfRoi	" @change="update({ evaluatedLevelOfRoi	: $event })" />
            </div>
        </div>
    </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AssessmentActionTypes } from '@/store/modules/details/assessment/actions';
import { AssessmentState } from '@/store/modules/details/assessment/state';
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
    return this.$store.state.details.assessment as AssessmentState;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.assessment {
  margin: 4 * $size-unit;
  margin-top: $size-unit;
  padding: 2 * $size-unit;
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
  vertical-align: middle;
}
</style>
