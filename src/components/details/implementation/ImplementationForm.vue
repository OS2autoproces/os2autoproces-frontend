<template>
  <FormSection
    :invalid="!state.isImplementationValid"
    v-if="state.minPhase(PhaseKeys.DEVELOPMENT)"
    heading="Udvikling og implementering"
    id="implementation"
    :disabled="state.disabled.implementationEdit"
    @edit="update({ disabled: { implementationEdit: $event } })"
    :expandOnMount="shouldBeOpen"
  >
    <div v-if="state.minPhase(PhaseKeys.IMPLEMENTATION)" id="technicalImplementationNotes">
      <h2>Teknisk implementering</h2>
      <InfoTooltip
        >Her kan du notere, hvordan den tekniske implementering er forløbet og eventuelle ting, som andre bør være
        opmærksomme på.</InfoTooltip
      >
      <RichTextArea
        :max-length="10000"
        :twoColumnBreakpoint="twoColumnBreakpoint"
        @change="update({ technicalImplementationNotes: $event })"
        :disabled="state.disabled.implementationEdit"
        :value="state.technicalImplementationNotes"
        :hasError="isInErrors('technicalImplementationNotes')"
      />
    </div>

    <div v-if="state.minPhase(PhaseKeys.IMPLEMENTATION)" id="organizationalImplementationNotes">
      <h2 class="with-margin">Organisatorisk implementering</h2>
      <InfoTooltip
        >Her kan du notere, hvordan den organisatoriske implementering er forløbet og eventuelle opmærksomhedspunkter
        omkring det.</InfoTooltip
      >
      <RichTextArea
        :max-length="10000"
        :twoColumnBreakpoint="twoColumnBreakpoint"
        @change="update({ organizationalImplementationNotes: $event })"
        :disabled="state.disabled.implementationEdit"
        :value="state.organizationalImplementationNotes"
        :hasError="isInErrors('organizationalImplementationNotes')"
      />
    </div>

    <div class="technology-run-period">
      <div class="technology" id="technologies">
        <h2 class="with-margin">Anvendt teknologi *</h2>
        <InfoTooltip
          >Her kan angive teknologier anvendt i løsningen fra listen. Hvis du mangler en teknologi, så kontakt
          OS2autoproces koordinationsgruppen, så vil de oprette den for dig.</InfoTooltip
        >
        <TagSelectorTechnologies
          @add="state.addTechnology($event)"
          @remove="state.removeTechnology($event)"
          :disabled="state.disabled.implementationEdit"
          :value="state.technologies"
          :hasError="isInErrors('technologies')"
          :items="technologies"
        />
      </div>
      <div class="run-period" id="runPeriod">
        <h2 class="with-margin">Skedulering *</h2>
        <MappedSelectionField
          class="run-period-field"
          :disabled="state.disabled.implementationEdit"
          :value="state.runPeriod"
          :hasError="isInErrors('runPeriod')"
          @change="update({ runPeriod: $event })"
          :items="runPeriods"
        />
      </div>
      <div class="automation" id="automations">
        <h2 class="with-margin">Automatiseringen anvender følgende systemer/snitflader</h2>
        <InfoTooltip
          >Her kan du angive de systemer og snitflader som løsningen gør brug af ud fra listen. Hvis du mangler et
          system/snitflade, så kontakt OS2autoproces koordinationsgruppen, så vil de oprette den for dig.
        </InfoTooltip>
        <TagSelectorITSystems
          @add="state.addServices($event)"
          @remove="state.removeServices($event)"
          :disabled="state.disabled.implementationEdit"
          :value="state.services"
          :hasError="isInErrors('services')"
          :items="itSystems"
        />
      </div>
    </div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RichTextArea from '@/components/common/inputs/RichTextArea.vue';
import { Action, Getter } from 'vuex-class';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TagSelectorTechnologies from '@/components/common/inputs/TagSelectorTechnologies.vue';
import TagSelectorITSystems from '@/components/common/inputs/TagSelectorITSystems.vue';
import MappedSelectionField from '@/components/common/inputs/MappedSelectionField.vue';
import { Technology } from '@/store/modules/commonInterfaces';
import { CommonModule } from '@/store/modules/common';
import { PhaseKeys, Phase } from '@/models/phase';
import { RunPeriodKeys, RunPeriodLabels } from '@/models/runperiod';
import { ProcessModule, ProcessState } from '@/store/modules/process';
import { ErrorModule } from '@/store/modules/error';

@Component({
  components: {
    RichTextArea,
    FormSection,
    InfoTooltip,
    TagSelectorTechnologies,
    TagSelectorITSystems,
    MappedSelectionField
  }
})
export default class ImplementationForm extends Vue {
  PhaseKeys = PhaseKeys;

  twoColumnBreakpoint = 1600;

  runPeriods = [
    { value: RunPeriodKeys.NOT_CHOSEN_YET, text: RunPeriodLabels.NOT_CHOSEN_YET },
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

  get itSystems() {
    return CommonModule.itSystems;
  }

  get state() {
    return ProcessModule;
  }

  get shouldBeOpen(): boolean {
    const href = window.location.href;
    const url = new URL(href);
    const params = url.searchParams;
    let search = null;
    for (const [key, value] of params) {
      if (key === 'search') {
        search = value;
        break;
      }
    }

    if (search != null) {
      const searchLowerCase = search.toLowerCase();
      if (this.state.technicalImplementationNotes?.toLowerCase().includes(searchLowerCase)) {
        return true;
      } else if (this.state.organizationalImplementationNotes?.toLowerCase().includes(searchLowerCase)) {
        return true;
      }
    }

    return false;
  }

  update(state: Partial<ProcessState>) {
    ProcessModule.update(state);
  }

  isInErrors(name: string) {
    return ErrorModule.errorInField(ErrorModule.implementation, name);
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
