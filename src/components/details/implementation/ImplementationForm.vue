<template>
  <FormSection
    :invalid="!isImplementationValid"
    v-if="minPhase(PhaseKeys.DEVELOPMENT)"
    heading="Udvikling og implementering"
    id="implementation"
    :disabled="state.disabled.implementationEdit"
    @edit="update({disabled: {implementationEdit: $event}})"
  >
    <div v-if="minPhase(PhaseKeys.IMPLEMENTATION)">
      <h2>Teknisk implementering</h2>
      <InfoTooltip>Her kan du notere, hvordan den tekniske implementering er forløbet og eventuelle ting, som andre bør være opmærksomme på.</InfoTooltip>
      <TextArea
        :max-length="10000"
        :twoColumnBreakpoint="twoColumnBreakpoint"
        @change="update({technicalImplementationNotes: $event})"
        :disabled="state.disabled.implementationEdit"
        :value="state.technicalImplementationNotes"
      />
    </div>

    <div v-if="minPhase(PhaseKeys.IMPLEMENTATION)">
      <h2 class="with-margin">Organisatorisk implementering</h2>
      <InfoTooltip>Her kan du notere, hvordan den organisatoriske implementering er forløbet og eventuelle opmærksomhedspunkter omkring det.</InfoTooltip>
      <TextArea
        :max-length="10000"
        :twoColumnBreakpoint="twoColumnBreakpoint"
        @change="update({organizationalImplementationNotes: $event})"
        :disabled="state.disabled.implementationEdit"
        :value="state.organizationalImplementationNotes"
      />
    </div>

    <div class="technology-run-period">
      <div class="technology">
        <h2 class="with-margin">Anvendt teknologi *</h2>
        <InfoTooltip>Her kan angive teknologier anvendt i løsningen fra listen. Hvis du mangler en teknologi, så kontakt din administrator, så vil de oprette den for dig.</InfoTooltip>
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
        <div>
          <MappedSelectionField
            class="run-period-field"
            :disabled="state.disabled.implementationEdit"
            :value="state.runPeriod"
            @change="update({runPeriod: $event})"
            :items="runPeriods"
          />
        </div>
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
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';
import { Technology } from '@/store/modules/process/state';
import { commonActionTypes } from '@/store/modules/common/actions';
import { PhaseKeys, Phase } from '@/models/phase';
import { RunPeriodKeys, RunPeriodLabels } from '@/models/runperiod';

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
  @Action(processActionTypes.UPDATE) update: any;
  @Action(processActionTypes.ADD_TECHNOLOGY) addTechnology: any;
  @Action(processActionTypes.REMOVE_TECHNOLOGY) removeTechnology: any;

  @Getter(processGetterTypes.IS_IMPLEMENTATION_VALID) isImplementationValid!: any;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

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
    return this.$store.state.common.technologies;
  }

  get state() {
    return this.$store.state.process;
  }

  async mounted() {
    this.$store.dispatch(commonActionTypes.LOAD_TECHNOLOGIES);
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
  background-color: white;
  border-radius: 0;
  display: flex;
  margin-top: 2rem;

  .technology {
    flex-grow: 1;
  }

  .run-period {
    flex: 0 0 400px;
    margin-left: 2rem;

    .run-period-field {
      display: inline-block;
      width: 200px;
    }
  }

  h2 {
    @include textarea-heading;
    margin-bottom: 0.5rem;
  }
}
</style>
