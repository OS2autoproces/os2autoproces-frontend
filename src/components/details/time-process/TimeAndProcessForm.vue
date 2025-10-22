<template>
  <FormSection
    :invalid="!state.isTimeAndProcessValid"
    heading="Tid og proces"
    id="time-and-process"
    :disabled="state.disabled.timeAndProcessEdit"
    @edit="update({ disabled: { timeAndProcessEdit: $event } })"
    :expandOnMount="shouldBeOpen"
  >
    <Well>
      <div>
        <WellItem
          id="timeSpendOccurancesPerEmployee"
          labelWidth="70%"
          label="Antal gange processen foretages årligt"
          :required="false"
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
          :required="false"
        >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="minutesAndSecondsPerOccurance.minutes !== null && !isNaN(minutesAndSecondsPerOccurance.minutes) ? minutesAndSecondsPerOccurance.minutes.toFixed(0) : ''"
            @change="updateTimeSpentPerOccurance({ minutes: $event })"
            >min</InputField
          >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="minutesAndSecondsPerOccurance.seconds !== null && !isNaN(minutesAndSecondsPerOccurance.seconds) ? minutesAndSecondsPerOccurance.seconds.toFixed(0) : ''"
            @change="updateTimeSpentPerOccurance({ seconds: $event })"
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
          :required="false"
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
        <WellItem
          id="expectedDevelopmentTime"
          labelWidth="70%"
          label="Forventet timeforbrug på udvikling"
          tooltip="Dette felt udfyldes af en person som har teknisk viden omkring udvikling."
          :required="false"
        >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="hoursAndMinutesExpectedDevelopmentTime.hours !== null && !isNaN(hoursAndMinutesExpectedDevelopmentTime.hours) ? hoursAndMinutesExpectedDevelopmentTime.hours.toFixed(0) : ''"
            @change="updateExpectedDevelopmentTime({ hours: $event })"
            :hasError="isInErrors('expectedDevelopmentTime')"
            >tim</InputField
          >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="hoursAndMinutesExpectedDevelopmentTime.minutes !== null && !isNaN(hoursAndMinutesExpectedDevelopmentTime.minutes) ? hoursAndMinutesExpectedDevelopmentTime.minutes.toFixed(0) : ''"
            @change="updateExpectedDevelopmentTime({ minutes: $event })"
            :hasError="isInErrors('expectedDevelopmentTime')"
            >min</InputField
          >
        </WellItem>
      </div>
    </Well>

    <div class="grid-container">
      <div class="grid-child" id="timeSpendComment">
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
      <div class="grid-child">
        <span>Data om indberetter organisationen</span>
        <InfoTooltip class="time-proces-tooltip">Tal fra organisationens grundlæggende oplysninger</InfoTooltip>
        <WellItem labelWidth="180px" label="Antal indbyggere:">
          <span class="value-span">{{ state.inhabitants }}</span>
        </WellItem>
        <WellItem labelWidth="180px" label="Antal medarbejdere:">
          <span class="value-span">{{ state.employees }}</span>
        </WellItem>
      </div>
    </div>
    
  </FormSection>
</template>

<script lang="ts">
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import InputField from '@/components/common/inputs/InputField.vue';
import MappedSelectionField from '@/components/common/inputs/MappedSelectionField.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import FormSection from '@/components/details/FormSection.vue';
import { PhaseKeys } from '@/models/phase';
import { ErrorModule } from '@/store/modules/error';
import { ProcessModule, ProcessState } from '@/store/modules/process';
import { Component, Vue } from 'vue-property-decorator';

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
    { value: null, text: '' },
    { value: true, text: 'Ja' },
    { value: false, text: 'Nej' }
  ];

  secondRules: Array<(value: string) => boolean | string> = [
    value => Number.isInteger(Number(value)) || 'Sekunder skal være heltal',
    value => parseInt(value, 10) < 60 || 'Sekunder kan højest være 59',
    value => parseInt(value, 10) >= 0 || 'Sekunder kan ikke være negative'
  ];

  minuteRules: Array<(value: string) => boolean | string> = [
    value => Number.isInteger(Number(value)) || 'Minutter skal være heltal',
    value => parseInt(value, 10) < 60 || 'Minutter kan højest være 59',
    value => parseInt(value, 10) >= 0 || 'Minutter kan ikke være negative'
  ];

  hoursRules: Array<(value: string) => boolean | string> = [
    value => Number.isInteger(Number(value)) || 'Timer skal være heltal',
    value => parseInt(value, 10) >= 0 || 'Timer kan ikke være negative'
  ];

  get state() {
    return ProcessModule;
  }

  get timeSpendOccurancesPerEmployee() {
    return Number(ProcessModule.timeSpendOccurancesPerEmployee);
  }

  get timeSpendPerOccurance() {
    return ProcessModule.timeSpendPerOccurance == null ? null : Number(ProcessModule.timeSpendPerOccurance);
  }

  get expectedDevelopmentTime() {
    return ProcessModule.expectedDevelopmentTime == null ? null : Number(ProcessModule.expectedDevelopmentTime);
  }

  get timeSpendPercentageDigital() {
    return Number(ProcessModule.timeSpendPercentageDigital);
  }

  get timeSpendTotal() {
    if (this.timeSpendOccurancesPerEmployee == null || this.timeSpendPerOccurance == null) {
      return 0;
    } else {
      return this.timeSpendOccurancesPerEmployee * this.timeSpendPerOccurance;
    }
  }

  get timeSpendHours() {
    const hours = (this.timeSpendTotal / 60).toFixed(2) || '0';
    return hours;
  }

  // Number of times this process is repeated yearly * amount of time required pr. process in minutes / 60 * automation potential / 100
  get exptectedYearlyPotential() {
    if (this.timeSpendPercentageDigital == null) {
      return '0';
    } else {
      const hours = ((this.timeSpendTotal / 60) * (this.timeSpendPercentageDigital / 100)).toFixed(2) || '0';
      return hours;
    }
  }

  get minutesAndSecondsPerOccurance(): { minutes: number | null; seconds: number | null } {
    if (this.timeSpendPerOccurance == null) {
      const minutes = null;
      const seconds = null;
      return { minutes, seconds };
    } else {
      const minuteString = this.timeSpendPerOccurance.toString();
      const minutes = parseInt(minuteString ?? '', 10); // remove decimals
      const seconds = (this.timeSpendPerOccurance - minutes) * 60; // remove minute part and convert decimals to seconds
      return { minutes, seconds };
    }
  }

  get hoursAndMinutesExpectedDevelopmentTime(): { hours: number | null; minutes: number | null } {
    if (this.expectedDevelopmentTime == null) {
      const hours = null;
      const minutes = null;
      return { hours, minutes };
    } else {
      const hoursString = this.expectedDevelopmentTime.toString()
      const hours = parseInt(hoursString ?? '', 10); // remove decimals
      const minutes = (this.expectedDevelopmentTime - hours) * 60; // remove hour part and convert decimals to minutes
      return { hours, minutes };
    }
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
      if (this.state.timeSpendComment?.toLowerCase().includes(searchLowerCase)) {
        return true;
      }
    }

    return false;
  }

  update(state: Partial<ProcessState>) {
    ProcessModule.update(state);
  }

  isInErrors(name: string) {
    return ErrorModule.errorInField(ErrorModule.timeAndProcess, name);
  }

  updateTimeSpentPerOccurance({ minutes, seconds }: { minutes: string; seconds: string }) {
    let newSeconds = null;
    if (seconds !== '' && seconds != null) {
      newSeconds = parseInt(seconds, 10);
    } else if (seconds == null) {
      newSeconds = this.minutesAndSecondsPerOccurance.seconds;
    }
    
    let newMinutes = null;
    if (minutes !== '' && minutes != null) {
      newMinutes = parseInt(minutes, 10);
    } else if (minutes == null) {
      newMinutes = this.minutesAndSecondsPerOccurance.minutes;
    }

    if (newSeconds == null && newMinutes == null) {
      ProcessModule.update({ timeSpendPerOccurance: `${null}` });
    } else {
      if (newSeconds == null) {
        newSeconds = 0;
      }

      if (newMinutes == null) {
        newMinutes = 0
      }
      
      const timeSpendPerOccurance = newMinutes + newSeconds / 60;
      ProcessModule.update({ timeSpendPerOccurance: `${timeSpendPerOccurance}` });
    }
  }

  updateExpectedDevelopmentTime({ hours, minutes }: { hours: string; minutes: string }) {
    let newHours = null;
    if (hours !== '' && hours != null) {
      newHours = parseInt(hours, 10);
    } else if (hours == null) {
      newHours = this.hoursAndMinutesExpectedDevelopmentTime.hours;
    }
    
    let newMinutes = null;
    if (minutes !== '' && minutes != null) {
      newMinutes = parseInt(minutes, 10);
    } else if (minutes == null) {
      newMinutes = this.hoursAndMinutesExpectedDevelopmentTime.minutes;
    }

    if (newHours == null && newMinutes == null) {
      ProcessModule.update({ expectedDevelopmentTime: `${null}` });
    } else {
      if (newHours == null) {
        newHours = 0;
      }

      if (newMinutes == null) {
        newMinutes = 0
      }
      
      const expectedDevelopmentTime = newHours + newMinutes / 60;
      ProcessModule.update({ expectedDevelopmentTime: `${expectedDevelopmentTime}` });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    padding-top: 1rem;
}

.grid-child {
  vertical-align: baseline;

  span {
    color: $color-primary;
    margin-right: 1rem;
  }
  .time-proces-tooltip {
    vertical-align: middle;
  }
  .value-span {
    color: $color-text;
  }
}
</style>
