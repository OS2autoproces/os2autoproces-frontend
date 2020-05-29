<template>
  <FormSection
    :invalid="!isAssessmentValid"
    v-if="minPhase(PhaseKeys.PREANALYSIS)"
    heading="Faglig vurdering"
    id="assessment"
    :disabled="state.disabled.assessmentEdit"
    @edit="update({ disabled: { assessmentEdit: $event } })"
  >
    <div class="assessment" :class="{ disabled: state.disabled.assessmentEdit }">
      <div class="question">
        <div class="label">
          I hvor høj grad indgår der faglig vurdering i processen?
          <InfoTooltip class="tooltip"
            >En faglig vurdering kan f.eks. være, at en sagsbehandler foretager et skøn eller tager en beslutning der
            har betydning for processens forløb.</InfoTooltip
          >
        </div>
        <LikertScale
          :disabled="state.disabled.assessmentEdit"
          :value="state.levelOfProfessionalAssessment"
          @change="update({ levelOfProfessionalAssessment: $event })"
        />
      </div>
      <div class="question">
        <div class="label">
          I hvor høj grad er processen præget af hyppige ændringer?
          <InfoTooltip class="tooltip"
            >Du skal her vurdere, om processen ofte bliver ændret. Det kan f.eks. skyldes ændringer i
            lovgivningen.</InfoTooltip
          >
        </div>
        <LikertScale
          :disabled="state.disabled.assessmentEdit"
          :value="state.levelOfChange"
          @change="update({ levelOfChange: $event })"
        />
      </div>
      <div class="question">
        <div class="label">
          I hvor høj grad er processen baseret på struktureret information?
          <InfoTooltip class="tooltip">Det kan f.eks. være ved brug af en formular.</InfoTooltip>
        </div>
        <LikertScale
          :disabled="state.disabled.assessmentEdit"
          :value="state.levelOfStructuredInformation"
          @change="update({ levelOfStructuredInformation: $event })"
        />
      </div>
      <div class="question">
        <div class="label">
          Er der variation i den måde processen løses?
          <InfoTooltip class="tooltip"
            >Kan processen f.eks. starte eller slutte forskelligt fra gang til gang processen udføres, eller er der
            forskellige udfaldsrum i løbet af processen.</InfoTooltip
          >
        </div>
        <LikertScale
          :disabled="state.disabled.assessmentEdit"
          :value="state.levelOfUniformity"
          @change="update({ levelOfUniformity: $event })"
        />
      </div>
      <div class="question">
        <div class="label">
          Er de data og informationer, der skal bruges i processen, tilgængelige digitalt i IT-systemer?
        </div>
        <LikertScale
          :disabled="state.disabled.assessmentEdit"
          :value="state.levelOfDigitalInformation"
          @change="update({ levelOfDigitalInformation: $event })"
        />
      </div>
      <div class="question">
        <div class="label">
          Vil en automatiseret løsning bidrage til en højere kvalitet, som er mere ensrettet og med færre fejl?
          <InfoTooltip class="tooltip"
            >Her skal du vurdere, hvad en digital assistent kan betyde for kvaliteten af processen.</InfoTooltip
          >
        </div>
        <LikertScale
          :disabled="state.disabled.assessmentEdit"
          :value="state.levelOfQuality"
          @change="update({ levelOfQuality: $event })"
        />
      </div>
      <div class="question">
        <div class="label">
          Vil en automatiseret løsning bidrage til en hurtigere og mere fyldestgørende service?
          <InfoTooltip class="tooltip"
            >Her skal du vurdere, hvad en digital assistent kan betyde for serviceniveauet. Det kunne f.eks. være at
            borgerne vil få svar hurtigere.</InfoTooltip
          >
        </div>
        <LikertScale
          :disabled="state.disabled.assessmentEdit"
          :value="state.levelOfSpeed"
          @change="update({ levelOfSpeed: $event })"
        />
      </div>
      <div class="question">
        <div class="label">
          Vil automatisering frigive tid og nedbringe rutineopgaver, som skaber en bedre trivsel blandt medarbejderne?
          <InfoTooltip class="tooltip"
            >Her skal du vurdere, hvad en digital assistent vil betyde for din egne trivsel som medarbejder. F.eks. ved
            at lette nogle af de trivielle og tidskrævende arbejdsopgaver.</InfoTooltip
          >
        </div>
        <LikertScale
          :disabled="state.disabled.assessmentEdit"
          :value="state.levelOfRoutineWorkReduction"
          @change="update({ levelOfRoutineWorkReduction: $event })"
        />
      </div>
      <div class="question">
        <div class="label">
          I hvor høj grad vurderes det at processen kan automatiseres?
          <InfoTooltip class="tooltip"
            >Der henvises til, om det er hele processen eller nogle mindre dele af processen der kan
            automatiseres.</InfoTooltip
          >
        </div>
        <LikertScale
          :disabled="state.disabled.assessmentEdit"
          :value="state.evaluatedLevelOfRoi"
          @change="update({ evaluatedLevelOfRoi: $event })"
        />
      </div>
    </div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import LikertScale from '@/components/common/inputs/LikertScale.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import FormSection from '@/components/details/FormSection.vue';
import { ProcessState, ProcessModule } from '@/store/modules/process';
import { PhaseKeys, Phase } from '@/models/phase';

@Component({
  components: {
    LikertScale,
    InfoTooltip,
    FormSection
  }
})
export default class AssessmentForm extends Vue {
  PhaseKeys = PhaseKeys;

  get state() {
    return ProcessModule.state;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.assessment {
  margin: 4rem;
  margin-top: 1rem;
  padding: 2rem;
  border: 1px solid transparent;

  &:not(.disabled) {
    border-color: $color-primary;
    border-radius: 1rem;
  }
}

.question:not(:last-of-type) {
  margin-bottom: 3rem;
}

.label {
  @include heading;
  color: $color-secondary;
  margin-bottom: 1rem;
}

.tooltip {
  margin-left: 1rem;
  vertical-align: middle;
}
</style>
