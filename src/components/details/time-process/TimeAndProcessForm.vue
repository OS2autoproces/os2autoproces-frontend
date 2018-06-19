<template>
  <FormSection heading="Tid og proces" id="time-and-process" :disabled="state.disabled" @edit="update({disabled: $event})">
    <div class="time-and-process">
      <div class="comments-wrap">
        <div class="time-process-tool-tip">
          <span>Kommentar vedr. tidsforbrug</span>
          <InfoTooltip>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse unde neque eos, non et vel, aspernatur quod dolore perspiciatis dolorem minus rerum amet animi architecto mollitia alias! Debitis, eveniet sint!
          </InfoTooltip>
        </div>
        <TextArea :disabled="disabled" />
      </div>
    </div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Well from '@/components/common/Well.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import FormSection from '@/components/details/FormSection.vue';
import { Action } from 'vuex-class';
import { TimeAndProcessActionTypes } from '@/store/modules/details/time-process/actions';

@Component({
  components: {
    Well,
    InfoTooltip,
    TextArea,
    FormSection
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

.time-and-process {
  display: flex;
  .comments-wrap {
    width: 50%;
    .time-process-tool-tip {
      display: flex;
      align-items: center;
      > span {
        margin-right: $size-unit/2;
      }
    }
  }
}
</style>
