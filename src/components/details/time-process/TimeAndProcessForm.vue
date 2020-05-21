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
          label="Tidsforbrug pr. proces i minutter"
          :required="minPhase(PhaseKeys.PREANALYSIS)"
        >
          <InputField
            :type="'number'"
            :disabled="state.disabled.timeAndProcessEdit"
            :value="state.timeSpendPerOccurance"
            :hasError="isInErrors('timeSpendPerOccurance')"
            id="timeSpendPerOccurance"
            @change="update({ timeSpendPerOccurance: $event })"
          />
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

  yesNoItems = [
    { value: true, text: 'Ja' },
    { value: false, text: 'Nej' }
  ];

  get timeSpendHours() {
    const hours =
      ((this.state.timeSpendOccurancesPerEmployee * this.state.timeSpendPerOccurance) / 60)
        .toString()
        .substring(0, 4) || '0';
    return hours;
  }
  // Number of times this process is repeated yearly * amount of time required pr. process in minutes / 60 * automation potential / 100
  get exptectedYearlyPotential() {
    const hours =
      (
        ((this.state.timeSpendOccurancesPerEmployee * this.state.timeSpendPerOccurance) / 60) *
        (this.state.timeSpendPercentageDigital / 100)
      ).toFixed(1) || '0';
    return hours;
  }

  get state() {
    return this.$store.state.process;
  }

  isInErrors(name: string) {
    return this.$store.state.error['timeAndProcess']['errors'].some((e: any) => e['name'] === name);
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
