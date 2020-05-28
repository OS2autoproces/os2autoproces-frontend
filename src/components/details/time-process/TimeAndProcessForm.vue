<template>
  <FormSection
    :invalid="!isTimeAndProcessValid"
    heading="Tid og proces"
    id="time-and-process"
    :disabled="state.disabled.timeAndProcessEdit"
    @edit="update({ disabled: { timeAndProcessEdit: $event } })"
  >
    <Well>
      <div>
        <WellItem
          labelWidth="70%"
          label="Antal gange processen foretages årligt"
          :required="minPhase(PhaseKeys.PREANALYSIS)"
        >
          <InputField
            :type="'number'"
            :value="state.timeSpendOccurancesPerEmployee"
            :hasError="isInErrors('timeSpendOccurancesPerEmployee')"
            id="timeSpendOccurancesPerEmployee"
            :disabled="state.disabled.timeAndProcessEdit"
            @change="update({ timeSpendOccurancesPerEmployee: $event })"
          />
        </WellItem>
        <WellItem
          labelWidth="70%"
          label="Tidsforbrug pr. proces i minutter og sekunder"
          :required="minPhase(PhaseKeys.PREANALYSIS)"
        >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="timeSpentPerOccurance.minutes.toFixed(0)"
            @change="updateTimeSpentPerOccurance({ minutes: $event })"
            >m</InputField
          >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="timeSpentPerOccurance.seconds.toFixed(0)"
            @change="updateTimeSpentPerOccurance({ seconds: $event })"
            :rules="secondRules"
            :hasError="isInErrors('timeSpendPerOccurance')"
            id="timeSpendPerOccurance"
            >s</InputField
          >
        </WellItem>
        <WellItem
          labelWidth="70%"
          label="Forventet automatiseringsgrad"
          tooltip="Hvor meget af processen vurderer du kan automatiseres på en skala fra 0-100."
        >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.timeSpendPercentageDigital"
            :hasError="isInErrors('timeSpendPercentageDigital')"
            id="timeSpendPercentageDigital"
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
          labelWidth="70%"
          label="Antal medarbejdere der foretager processen"
          :required="minPhase(PhaseKeys.PREANALYSIS)"
        >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.timeSpendEmployeesDoingProcess"
            :hasError="isInErrors('timeSpendEmployeesDoingProcess')"
            id="timeSpendEmployeesDoingProcess"
            @change="update({ timeSpendEmployeesDoingProcess: $event })"
          />
        </WellItem>
        <WellItem labelWidth="70%" label="Er borgere påvirket?">
          <MappedSelectionField
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.targetsCitizens"
            :hasError="isInErrors('targetsCitizens')"
            id="targetsCitizens"
            @change="update({ targetsCitizens: $event })"
            :items="yesNoItems"
          />
        </WellItem>
        <WellItem labelWidth="70%" label="Er virksomheder påvirket?">
          <MappedSelectionField
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.targetsCompanies"
            :hasError="isInErrors('targetsCompanies')"
            id="targetsCompanies"
            @change="update({ targetsCompanies: $event })"
            :items="yesNoItems"
          />
        </WellItem>
      </div>
    </Well>

    <div class="comments-wrap">
      <span>Kommentar vedr. tidsforbrug</span>
      <InfoTooltip class="time-proces-tooltip"
        >Her kan du uddybe eller kommentere på de indtastede værdier ovenfor og på tidsforbruget generelt. F.eks.
        hvordan det er målt.</InfoTooltip
      >
      <TextArea
        :value="state.timeSpendComment"
        :hasError="isInErrors('timeSpendComment')"
        id="timeSpendComment"
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
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';
import { Phase, PhaseKeys } from '@/models/phase';

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
  @Action(processActionTypes.UPDATE) update: any;
  @Getter(processGetterTypes.IS_TIME_AND_PROCESS_VALID) isTimeAndProcessValid!: any;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;
  PhaseKeys = PhaseKeys;

  yesNoItems = [{ value: true, text: 'Ja' }, { value: false, text: 'Nej' }];

  secondRules: Array<(value: string) => boolean | string> = [
    value => Number.isInteger(Number(value)) || 'Sekunder skal være heltal',
    value => parseInt(value, 10) < 60 || 'Sekunder kan højest være 59',
    value => parseInt(value, 10) >= 0 || 'Sekunder kan ikke være negative'
  ];

  get timeSpendHours() {
    const hours =
      ((this.state.timeSpendOccurancesPerEmployee * this.state.timeSpendPerOccurance) / 60).toFixed(2) || '0';
    return hours;
  }
  // Number of times this process is repeated yearly * amount of time required pr. process in minutes / 60 * automation potential / 100
  get exptectedYearlyPotential() {
    const hours =
      (
        ((this.state.timeSpendOccurancesPerEmployee * this.state.timeSpendPerOccurance) / 60) *
        (this.state.timeSpendPercentageDigital / 100)
      ).toFixed(2) || '0';
    return hours;
  }

  get timeSpentPerOccurance(): { minutes: number; seconds: number } {
    const time = this.state.timeSpendPerOccurance;
    const minutes = parseInt(time, 10); // remove decimals
    const seconds = (time - minutes) * 60; // remove minute part and convert decimals to seconds
    return { minutes, seconds };
  }

  get state() {
    return this.$store.state.process;
  }

  isInErrors(name: string) {
    return this.$store.state.error.timeAndProcess.errors.some((e: any) => e.name === name);
  }

  updateTimeSpentPerOccurance({ minutes, seconds }: { minutes: string; seconds: string }) {
    const newMinutes = !!minutes || minutes === '' ? parseInt(minutes || '0', 10) : this.timeSpentPerOccurance.minutes;
    const newSeconds = !!seconds || seconds === '' ? parseInt(seconds || '0', 10) : this.timeSpentPerOccurance.seconds;
    const timeSpendPerOccurance = newMinutes + newSeconds / 60;
    this.update({ timeSpendPerOccurance });
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
