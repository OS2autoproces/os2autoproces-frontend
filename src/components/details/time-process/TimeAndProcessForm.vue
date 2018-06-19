<template>
  <FormSection heading="Tid og proces" id="time-and-process" :disabled="state.disabled" @edit="update({disabled: $event})">
    <Well>
      <div>
        <div class="section-col">
          <div class="labels">
            <div>Antal gange processen gentages om året pr. medarbejder</div>
            <div>Tidsforbrug pr. proces i minutter</div>
            <div>Tidsbesparelse pr. proces i minutter</div>
          </div>
          <div class="fields">
            <InputField :disabled="disabled" @change="update({processRepetition: $event})" />
            <InputField :disabled="disabled" @change="update({processTimeConsumptionMinutes: $event})" />
            <InputField :disabled="disabled" @change="update({processTimeSavingMinutes: $event})" />
          </div>
        </div>
      </div>

      <div>
        <div class="section-col">
          <div class="labels">
            <div>Antal medarbejdere der foretager processen</div>
            <div>Samlet tidsforbrug på nuværende proces</div>
          </div>
          <div class="fields">
            <InputField :disabled="disabled" @change="update({coWorkersUsingTheProcess: $event})"/>
            <InputField :disabled="disabled" @change="update({totalTimeConsumption: $event})"/>
          </div>
        </div>
      </div>

      <div>
        <div class="section-col">
          <div class="labels">
            <div>Er borgere påvirket?</div>
            <div>Er virksomheder påvirket?</div>
          </div>
          <div class="fields">
            <SelectionField :disabled="disabled" @change="update({isUserAffected: $event})"/>
            <SelectionField :disabled="disabled" @change="update({isCorporationAffected: $event})" />
          </div>
        </div>
      </div>
    </Well>

    <div class="comments-wrap">
      <div class="time-process-tool-tip">
        <span>Kommentar vedr. tidsforbrug</span>
        <InfoTooltip>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse unde neque eos, non et vel, aspernatur quod dolore perspiciatis dolorem minus rerum amet animi architecto mollitia alias! Debitis, eveniet sint!
        </InfoTooltip>
      </div>
      <TextArea :disabled="disabled" @change="update({timeConsumptionComments: $event})"/>
    </div>

    <FileUpload :disabled="disabled" />

  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Well from '@/components/common/Well.vue';
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
    InputField
  }
})
export default class TimeAndProcessForm extends Vue {
  @Action(TimeAndProcessActionTypes.UPDATE_TIME_AND_PROCESS) update: any;
  @Prop() disabled!: boolean;

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

  .time-process-tool-tip {
    display: flex;
    align-items: center;
    > span {
      margin-right: $size-unit/2;
    }
  }
}

.section-col {
  display: flex;
  align-items: baseline;

  .labels {
    width: 70%;
    margin-bottom: $size-unit;
    > div {
      line-height: $size-unit * 1.5;
    }
  }

  .fields > * {
    margin-bottom: $size-unit;
  }
}
</style>
