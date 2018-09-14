<template>
  <FormSection :invalid="!isTimeAndProcessValid" heading="Tid og proces" id="time-and-process" :disabled="state.disabled.timeAndProcessEdit" @edit="update({disabled: {timeAndProcessEdit: $event}})">

    <Well>
      <div>
        <WellItem labelWidth="70%" label="Antal gange processen foretages årligt" :required="minPhase(PhaseKeys.PREANALYSIS)">
          <InputField :value="state.timeSpendOccurancesPerEmployee" :disabled="state.disabled.timeAndProcessEdit" @change="update({timeSpendOccurancesPerEmployee: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Tidsforbrug pr. proces i minutter" :required="minPhase(PhaseKeys.PREANALYSIS)">
          <InputField :disabled="state.disabled.timeAndProcessEdit" :value="state.timeSpendPerOccurance" @change="update({timeSpendPerOccurance: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Total tidsforbrug" tooltip="Det samlede tidsforbrug udregnes automatisk når processen gemmes.">
          <InputField disabled :value="state.timeSpendComputedTotal" />
        </WellItem>
      </div>

      <div>
        <WellItem labelWidth="70%" label="Antal medarbejdere der foretager processen" :required="minPhase(PhaseKeys.PREANALYSIS)">
          <InputField :disabled="state.disabled.timeAndProcessEdit" :value="state.timeSpendEmployeesDoingProcess" @change="update({timeSpendEmployeesDoingProcess: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Digital procent besparelse" :required="minPhase(PhaseKeys.PREANALYSIS)">
          <InputField :disabled="state.disabled.timeAndProcessEdit" :value="state.timeSpendPercentageDigital" @change="update({timeSpendPercentageDigital: $event})" />
        </WellItem>
      </div>

      <div>
        <WellItem labelWidth="70%" label="Er borgere påvirket?">
          <MappedSelectionField :disabled="state.disabled.timeAndProcessEdit" :value="state.targetsCitizens" @change="update({targetsCitizens: $event})" :items="yesNoItems" />
        </WellItem>
        <WellItem labelWidth="70%" label="Er virksomheder påvirket?">
          <MappedSelectionField :disabled="state.disabled.timeAndProcessEdit" :value="state.targetsCompanies" @change="update({targetsCompanies: $event})" :items="yesNoItems" />
        </WellItem>
      </div>
    </Well>

    <div class="comments-wrap">
      <span>Kommentar vedr. tidsforbrug</span>
      <InfoTooltip class="time-proces-tooltip">Her kan du uddybe eller kommentere på de indtastede værdier ovenfor og på tidsforbruget generelt. F.eks. hvordan det er målt.</InfoTooltip>
      <TextArea :value="state.timeSpendComment" :disabled="state.disabled.timeAndProcessEdit" @change="update({timeSpendComment: $event})" :maxLength="300" />
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

  get state() {
    return this.$store.state.process;
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
