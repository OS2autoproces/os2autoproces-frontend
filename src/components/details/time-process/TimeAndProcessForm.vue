<template>
  <FormSection heading="Tid og proces" id="time-and-process" :disabled="state.disabled.timeAndProcessEdit" @edit="update({disabled: {timeAndProcessEdit: $event}})">

    <Well>
      <div>
        <WellItem labelWidth="70%" label="Antal gange processen gentages om året pr. medarbejder">
          <InputField :value="state.timeSpendOccurancesPerEmployee" :disabled="state.disabled.timeAndProcessEdit" @change="update({timeSpendOccurancesPerEmployee: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Total tidsforbrug">
          <InputField :disabled="state.disabled.timeAndProcessEdit" :value="state.timeSpendComputedTotal" @change="update({timeSpendComputedTotal: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Tidsforbrug pr. proces i minutter">
          <InputField :disabled="state.disabled.timeAndProcessEdit" :value="state.timeSpendPerOccurance" @change="update({timeSpendPerOccurance: $event})" />
        </WellItem>
      </div>

      <div>
        <WellItem labelWidth="70%" label="Antal medarbejdere der foretager processen">
          <InputField :disabled="state.disabled.timeAndProcessEdit" :value="state.timeSpendEmployeesDoingProcess" @change="update({timeSpendEmployeesDoingProcess: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Digital procent besparelse">
          <InputField :disabled="state.disabled.timeAndProcessEdit" :value="state.timeSpendPercentageDigital" @change="update({timeSpendPercentageDigital: $event})" />
        </WellItem>
      </div>

      <div>
        <WellItem labelWidth="70%" label="Er borgere påvirket?">
          <SelectionField :disabled="state.disabled.timeAndProcessEdit" :value="state.targestsCitizens" @change="update({targestsCitizens: $event})" :items="this.affectedItems" />
        </WellItem>
        <WellItem labelWidth="70%" label="Er virksomheder påvirket?">
          <SelectionField :disabled="state.disabled.timeAndProcessEdit" :value="state.targetsCompanies" @change="update({targetsCompanies: $event})" :items="this.affectedItems" />
        </WellItem>
      </div>
    </Well>

    <div class="comments-wrap">
      <span>Kommentar vedr. tidsforbrug</span>
      <InfoTooltip class="time-proces-tooltip">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse unde neque eos, non et vel, aspernatur quod dolore perspiciatis dolorem minus rerum amet animi architecto mollitia alias! Debitis, eveniet sint!
      </InfoTooltip>
      <TextArea :value="state.timeSpendComment" :disabled="state.disabled.timeAndProcessEdit" @change="update({timeSpendComment: $event})" />
    </div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import InputField from '@/components/common/inputs/InputField.vue';
import FormSection from '@/components/details/FormSection.vue';
import { Action } from 'vuex-class';
import { processActionTypes } from '@/store/modules/process/actions';

@Component({
  components: {
    Well,
    InfoTooltip,
    TextArea,
    FormSection,
    SelectionField,
    InputField,
    WellItem
  }
})
export default class TimeAndProcessForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;

  affectedItems = [
    'ja',
    'nej'
  ];

  get state() {
    return this.$store.state.process;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.comments-wrap {
  width: 50%;
  padding-top: $size-unit;
  vertical-align: baseline;

  span {
    color: $color-secondary;
    margin-right: $size-unit;
  }
  .time-proces-tooltip {
    vertical-align: middle;
  }
}
</style>
