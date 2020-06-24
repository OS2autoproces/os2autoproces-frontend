<template>
  <FormSection
    :invalid="!state.isTimeAndProcessValid"
    heading="Tid og proces"
    id="time-and-process"
    :disabled="state.disabled.timeAndProcessEdit"
    @edit="update({ disabled: { timeAndProcessEdit: $event } })"
  >
    <Well>
      <div>
        <WellItem
          id="timeSpendOccurancesPerEmployee"
          labelWidth="70%"
          label="Antal gange processen foretages årligt"
          :required="state.minPhase(PhaseKeys.PREANALYSIS)"
        >
          <InputField
            :type="'number'"
            :value="state.timeSpendOccurancesPerEmployee"
            :hasError="isInErrors('timeSpendOccurancesPerEmployee')"
            :disabled="state.disabled.timeAndProcessEdit"
            @change="update({ timeSpendOccurancesPerEmployee: $event })"
          />
        </WellItem>
        <WellItem
          id="timeSpendPerOccurance"
          labelWidth="70%"
          label="Tidsforbrug pr. proces i minutter og sekunder"
          :required="state.minPhase(PhaseKeys.PREANALYSIS)"
        >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="minutesAndSecondsPerOccurance.minutes.toFixed(0)"
            @change="updateTimeSpentPerOccurance({ minutes: $event })"
            >min</InputField
          >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="minutesAndSecondsPerOccurance.seconds.toFixed(0)"
            @change="updateTimeSpentPerOccurance({ seconds: $event })"
            :rules="secondRules"
            :hasError="isInErrors('timeSpendPerOccurance')"
            >sek</InputField
          >
        </WellItem>
        <WellItem
          id="timeSpendPercentageDigital"
          labelWidth="70%"
          label="Forventet automatiseringsgrad"
          tooltip="Hvor meget af processen vurderer du kan automatiseres på en skala fra 0-100."
        >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.timeSpendPercentageDigital"
            :hasError="isInErrors('timeSpendPercentageDigital')"
            @change="update({ timeSpendPercentageDigital: $event })"
            >%</InputField
          >
        </WellItem>
        <WellItem
          labelWidth="70%"
          label="Manuelt tidsforbrug i timer"
          tooltip="Udregningen for det manuelle årlige tidsforbrug er: antal gange processen foretages * tidsforbrug i minutter / 60"
        >
          <InputField disabled :value="timeSpendHours" id="timeSpendHours">timer</InputField>
        </WellItem>
        <WellItem
          labelWidth="70%"
          label="Forventet årligt effektiviseringspotentiale"
          tooltip="Udregning af det forventet årligt effektiviseringspotentiale er: antal gange processen foretages * tidsforbrug i minutter / 60 * automatiseringsgrad"
        >
          <InputField disabled :value="exptectedYearlyPotential" id="exptectedYearlyPotential">timer</InputField>
        </WellItem>
      </div>

      <div>
        <WellItem
          id="timeSpendEmployeesDoingProcess"
          labelWidth="70%"
          label="Antal medarbejdere der foretager processen"
          :required="state.minPhase(PhaseKeys.PREANALYSIS)"
        >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.timeSpendEmployeesDoingProcess"
            :hasError="isInErrors('timeSpendEmployeesDoingProcess')"
            @change="update({ timeSpendEmployeesDoingProcess: $event })"
          />
        </WellItem>
        <WellItem labelWidth="70%" label="Er borgere påvirket?" id="targetsCitizens">
          <MappedSelectionField
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.targetsCitizens"
            :hasError="isInErrors('targetsCitizens')"
            @change="update({ targetsCitizens: $event })"
            :items="yesNoItems"
          />
        </WellItem>
        <WellItem labelWidth="70%" label="Er virksomheder påvirket?" id="targetsCompanies">
          <MappedSelectionField
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.targetsCompanies"
            :hasError="isInErrors('targetsCompanies')"
            @change="update({ targetsCompanies: $event })"
            :items="yesNoItems"
          />
        </WellItem>
      </div>
    </Well>

    <div class="comments-wrap" id="timeSpendComment">
      <span>Kommentar vedr. tidsforbrug</span>
      <InfoTooltip class="time-proces-tooltip"
        >Her kan du uddybe eller kommentere på de indtastede værdier ovenfor og på tidsforbruget generelt. F.eks.
        hvordan det er målt.</InfoTooltip
      >
      <TextArea
        :value="state.timeSpendComment"
        :hasError="isInErrors('timeSpendComment')"
        :disabled="state.disabled.timeAndProcessEdit"
        @change="update({ timeSpendComment: $event })"
        :maxLength="10000"
      />
    </div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import MappedSelectionField from '@/components/common/inputs/MappedSelectionField.vue';
import InputField from '@/components/common/inputs/InputField.vue';
import FormSection from '@/components/details/FormSection.vue';
import { Action, Getter } from 'vuex-class';
import { Phase, PhaseKeys } from '@/models/phase';
import Process, { ProcessModule, ProcessState } from '@/store/modules/process';
import { ErrorModule } from '@/store/modules/error';

@Component({
  components: {
    Well,
    InfoTooltip,
    TextArea,
    FormSection,
    MappedSelectionField,
    InputField,
    WellItem
  }
})
export default class TimeAndProcessForm extends Vue {
  PhaseKeys = PhaseKeys;

  yesNoItems = [
    { value: true, text: 'Ja' },
    { value: false, text: 'Nej' }
  ];

  secondRules: Array<(value: string) => boolean | string> = [
    value => Number.isInteger(Number(value)) || 'Sekunder skal være heltal',
    value => parseInt(value, 10) < 60 || 'Sekunder kan højest være 59',
    value => parseInt(value, 10) >= 0 || 'Sekunder kan ikke være negative'
  ];

  get state() {
    return ProcessModule;
  }

  get timeSpendOccurancesPerEmployee() {
    return Number(ProcessModule.timeSpendOccurancesPerEmployee);
  }

  get timeSpendPerOccurance() {
    return Number(ProcessModule.timeSpendPerOccurance);
  }

  get timeSpendPercentageDigital() {
    return Number(ProcessModule.timeSpendPercentageDigital);
  }

  get timeSpendTotal() {
    return this.timeSpendOccurancesPerEmployee * this.timeSpendPerOccurance;
  }

  get timeSpendHours() {
    const hours = (this.timeSpendTotal / 60).toFixed(2) || '0';
    return hours;
  }
  // Number of times this process is repeated yearly * amount of time required pr. process in minutes / 60 * automation potential / 100
  get exptectedYearlyPotential() {
    const hours = ((this.timeSpendTotal / 60) * (this.timeSpendPercentageDigital / 100)).toFixed(2) || '0';
    return hours;
  }

  get minutesAndSecondsPerOccurance(): { minutes: number; seconds: number } {
    const minutes = parseInt(ProcessModule.timeSpendPerOccurance ?? '', 10); // remove decimals
    const seconds = (this.timeSpendPerOccurance - minutes) * 60; // remove minute part and convert decimals to seconds
    return { minutes, seconds };
  }

  update(state: Partial<ProcessState>) {
    ProcessModule.update(state);
  }

  isInErrors(name: string) {
    return ErrorModule.errorInField(ErrorModule.timeAndProcess, name);
  }

  updateTimeSpentPerOccurance({ minutes, seconds }: { minutes: string; seconds: string }) {
    const newMinutes =
      !!minutes || minutes === '' ? parseInt(minutes || '0', 10) : this.minutesAndSecondsPerOccurance.minutes;
    const newSeconds =
      !!seconds || seconds === '' ? parseInt(seconds || '0', 10) : this.minutesAndSecondsPerOccurance.seconds;
    const timeSpendPerOccurance = newMinutes + newSeconds / 60;
    ProcessModule.update({ timeSpendPerOccurance: `${timeSpendPerOccurance}` });
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.comments-wrap {
  width: 50%;
  padding-top: 1rem;
  vertical-align: baseline;

  span {
    color: $color-secondary;
    margin-right: 1rem;
  }
  .time-proces-tooltip {
    vertical-align: middle;
  }
}
</style>
