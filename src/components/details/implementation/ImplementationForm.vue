<template>
  <FormSection
    :invalid="!state.isImplementationValid"
    v-if="state.minPhase(PhaseKeys.DEVELOPMENT)"
    heading="Udvikling og implementering"
    id="implementation"
    :disabled="state.disabled.implementationEdit"
    @edit="update({ disabled: { implementationEdit: $event } })"
  >
    <div v-if="state.minPhase(PhaseKeys.IMPLEMENTATION)">
      <h2>Teknisk implementering</h2>
      <InfoTooltip
        >Her kan du notere, hvordan den tekniske implementering er forløbet og eventuelle ting, som andre bør være
        opmærksomme på.</InfoTooltip
      >
      <TextArea
        :max-length="10000"
        :twoColumnBreakpoint="twoColumnBreakpoint"
        @change="update({ technicalImplementationNotes: $event })"
        :disabled="state.disabled.implementationEdit"
        :value="state.technicalImplementationNotes"
      />
    </div>

    <div v-if="state.minPhase(PhaseKeys.IMPLEMENTATION)">
      <h2 class="with-margin">Organisatorisk implementering</h2>
      <InfoTooltip
        >Her kan du notere, hvordan den organisatoriske implementering er forløbet og eventuelle opmærksomhedspunkter
        omkring det.</InfoTooltip
      >
      <TextArea
        :max-length="10000"
        :twoColumnBreakpoint="twoColumnBreakpoint"
        @change="update({ organizationalImplementationNotes: $event })"
        :disabled="state.disabled.implementationEdit"
        :value="state.organizationalImplementationNotes"
      />
    </div>

    <div class="technology-run-period">
      <div class="technology">
        <h2 class="with-margin">Anvendt teknologi *</h2>
        <InfoTooltip
          >Her kan angive teknologier anvendt i løsningen fra listen. Hvis du mangler en teknologi, så kontakt
          OS2autoproces koordinationsgruppen, så vil de oprette den for dig.</InfoTooltip
        >
        <TagSelector
          @add="addTechnology($event)"
          @remove="removeTechnology($event)"
          :disabled="state.disabled.implementationEdit"
          :value="state.technologies"
          :items="technologies"
        />
      </div>
      <div class="run-period">
        <h2 class="with-margin">Skedulering</h2>
        <MappedSelectionField
          class="run-period-field"
          :disabled="state.disabled.implementationEdit"
          :value="state.runPeriod"
          @change="update({ runPeriod: $event })"
          :items="runPeriods"
        />
      </div>
    </div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action, Getter } from 'vuex-class';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TagSelector from '@/components/common/inputs/TagSelector.vue';
import MappedSelectionField from '@/components/common/inputs/MappedSelectionField.vue';
import { Technology } from '@/store/modules/commonInterfaces';
import { CommonModule } from '@/store/modules/common';
import { PhaseKeys, Phase } from '@/models/phase';
import { RunPeriodKeys, RunPeriodLabels } from '@/models/runperiod';
import { ProcessModule } from '@/store/modules/process';

@Component({
  components: {
    TextArea,
    FormSection,
    InfoTooltip,
    TagSelector,
    MappedSelectionField
  }
})
export default class ImplementationForm extends Vue {
  PhaseKeys = PhaseKeys;

  twoColumnBreakpoint = 1600;

  runPeriods = [
    { value: RunPeriodKeys.ONCE, text: RunPeriodLabels.ONCE },
    { value: RunPeriodKeys.ONDEMAND, text: RunPeriodLabels.ONDEMAND },
    { value: RunPeriodKeys.DAILY, text: RunPeriodLabels.DAILY },
    { value: RunPeriodKeys.WEEKLY, text: RunPeriodLabels.WEEKLY },
    { value: RunPeriodKeys.MONTHLY, text: RunPeriodLabels.MONTHLY },
    { value: RunPeriodKeys.QUATERLY, text: RunPeriodLabels.QUATERLY },
    { value: RunPeriodKeys.YEARLY, text: RunPeriodLabels.YEARLY }
  ];

  get technologies() {
    return CommonModule.technologies;
  }

  get state() {
    return ProcessModule;
  }

  mounted() {
    CommonModule.loadTechnologies();
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

h2 {
  @include heading;
  color: $color-secondary;
  margin-bottom: 0.5rem;
  display: inline-block;
  margin-right: 1rem;

  &.with-margin {
    margin-top: 2rem;
  }
}

.technology-run-period {
  display: flex;

  .technology {
    flex: 1 1 50%;
  }

  .run-period {
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .run-period-field {
      display: inline-block;
      min-width: 12rem;
    }
  }

  h2 {
    margin-bottom: 0.5rem;
  }
}
</style>
