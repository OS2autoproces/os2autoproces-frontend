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
            :value="timeSpentPerOccurance.minutes"
            @change="updateTimeSpentPerOccurance({ minutes: $event })"
            >m</InputField
          >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="timeSpentPerOccurance.seconds"
            @change="updateTimeSpentPerOccurance({ seconds: $event })"
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
            @change="update({ timeSpendPercentageDigital: $event })"
            >%</InputField
          >
        </WellItem>
        <WellItem
          labelWidth="70%"
          label="Manuelt tidsforbrug i timer"
          tooltip="Udregningen for det manuelle årlige tidsforbrug er: antal gange processen foretages * tidsforbrug i minutter / 60"
        >
          <InputField disabled :value="timeSpendHours">timer</InputField>
        </WellItem>
        <WellItem
          labelWidth="70%"
          label="Forventet årligt effektiviseringspotentiale"
          tooltip="Udregning af det forventet årligt effektiviseringspotentiale er: antal gange processen foretages * tidsforbrug i minutter / 60 * automatiseringsgrad"
        >
          <InputField disabled :value="exptectedYearlyPotential">timer</InputField>
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
            @change="update({ timeSpendEmployeesDoingProcess: $event })"
          />
        </WellItem>
        <WellItem labelWidth="70%" label="Er borgere påvirket?">
          <MappedSelectionField
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.targetsCitizens"
            @change="update({ targetsCitizens: $event })"
            :items="yesNoItems"
          />
        </WellItem>
        <WellItem labelWidth="70%" label="Er virksomheder påvirket?">
          <MappedSelectionField
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.targetsCompanies"
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

  get timeSpentPerOccurance(): { minutes: string; seconds: string } {
    let time = this.state.timeSpendPerOccurance;
    const minutes: number = parseInt(time); // remove decimals
    const seconds: number = (time - minutes) * 60; // remove minute part and convert decimals to seconds
    return { minutes: minutes.toFixed(0), seconds: seconds.toFixed(0) }; // ensure no decimals are returned
  }

  get state() {
    return this.$store.state.process;
  }

  updateTimeSpentPerOccurance(changeEvents: { minutes: string; seconds: string }) {
    // get old state
    let newMinutes = parseInt(this.timeSpentPerOccurance.minutes);
    let newSeconds = parseInt(this.timeSpentPerOccurance.seconds);

    // handle minutes or seconds changed event and update state accordingly
    if (changeEvents.minutes || changeEvents.minutes === '') {
      newMinutes = parseInt(changeEvents.minutes || '0');
      this.timeSpentPerOccurance.minutes = newMinutes.toString();
    }

    // handle how seconds are changed. We don't care about values larger than 59, as they are calculated into minutes.
    // Maybe we should limit the amount of characters a user is allowed to input?
    if (changeEvents.seconds || changeEvents.seconds === '') {
      newSeconds = parseInt(changeEvents.seconds || '0');
      this.timeSpentPerOccurance.seconds = newSeconds.toString();
    }

    // use original state containing a decimal number for minutes/seconds and propagate that
    let calculatedTimeSpentMinutes = newMinutes + newSeconds / 60;
    this.update({ timeSpendPerOccurance: calculatedTimeSpentMinutes });
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
