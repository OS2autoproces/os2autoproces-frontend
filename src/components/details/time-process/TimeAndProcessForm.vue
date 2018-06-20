<template>
  <FormSection heading="Tid og proces" id="time-and-process" :disabled="state.disabled" @edit="update({disabled: $event})">

    <Well>
      <div>
        <WellItem labelWidth="70%" label="Antal gange processen gentages om året pr. medarbejder">
          <InputField :value="state.processRepetition" :disabled="state.disabled" @change="update({processRepetition: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Tidsforbrug pr. proces i minutter">
          <InputField :disabled="state.disabled" :value="state.processTimeConsumptionMinutes" @change="update({processTimeConsumptionMinutes: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Tidsbesparelse pr. proces i minutter">
          <InputField :disabled="state.disabled" :value="state.processTimeSavingMinutes" @change="update({processTimeSavingMinutes: $event})" />
        </WellItem>
      </div>

      <div>
        <WellItem labelWidth="70%" label="Antal medarbejdere der foretager processen">
          <InputField :disabled="state.disabled" :value="state.coWorkersUsingTheProcess" @change="update({coWorkersUsingTheProcess: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Samlet tidsforbrug på nuværende proces">
          <InputField :disabled="state.disabled" :value="state.totalTimeConsumption" @change="update({totalTimeConsumption: $event})" />
        </WellItem>
      </div>

      <div>
        <WellItem labelWidth="70%" label="Er borgere påvirket?">
          <SelectionField :disabled="state.disabled" :value="state.isUserAffected" @change="update({isUserAffected: $event})" />
        </WellItem>
        <WellItem labelWidth="70%" label="Er virksomheder påvirket?">
          <SelectionField :disabled="state.disabled" :value="state.isCorporationAffected" @change="update({isCorporationAffected: $event})" />
        </WellItem>
      </div>
    </Well>

    <div class="comments-wrap">
      <span>Kommentar vedr. tidsforbrug</span>
      <InfoTooltip class="time-proces-tooltip">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse unde neque eos, non et vel, aspernatur quod dolore perspiciatis dolorem minus rerum amet animi architecto mollitia alias! Debitis, eveniet sint!
      </InfoTooltip>
      <TextArea :value="state.timeConsumptionComments" :disabled="state.disabled" @change="update({timeConsumptionComments: $event})" />
    </div>

    <FileUpload :disabled="state.disabled" />

  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import FileUpload from '@/components/common/inputs/FileUpload.vue';
import InputField from '@/components/common/inputs/InputField.vue';
import FormSection from '@/components/details/FormSection.vue';
import { Action } from 'vuex-class';
import { TimeAndProcessActionTypes } from '@/store/modules/details/time-process/actions';

@Component({
  components: {
    Well,
    InfoTooltip,
    TextArea,
    FormSection,
    SelectionField,
    FileUpload,
    InputField,
    WellItem
  }
})
export default class TimeAndProcessForm extends Vue {
  @Action(TimeAndProcessActionTypes.UPDATE_TIME_AND_PROCESS) update: any;

  get state() {
    return this.$store.state.details.timeAndProcess;
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