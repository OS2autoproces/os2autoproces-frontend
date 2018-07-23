<template>
  <FormSection heading="Problemstillinger" id="challenges" :disabled="state.process.disabled.challengesEdit" @edit="update({ disabled: { challengesEdit: $event}})">
    <h2>Beskrivelse</h2>
    <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
    <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({longDescription: $event})" :disabled="state.process.disabled.challengesEdit" :value="state.process.longDescription" />

    <h2>Løsningsbeskrivelse</h2>
    <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
    <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({solutionRequests: $event})" :disabled="state.process.disabled.challengesEdit" :value="state.process.solutionRequests" />

    <h2>Proces udfordringer</h2>
    <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
    <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({processChallenges: $event})" :disabled="state.process.disabled.challengesEdit" :value="state.process.processChallenges" />

    <Well class="challenges-well">
      <div>
        <WellItem label="Nuværende system:">
          <SelectionField v-if="state.process.itSystems[0]" :items="itSystems" :text="state.process.itSystems[0].name" :value="state.process.itSystems[0]" :disabled="state.process.disabled.challengesEdit" @change="saveItSystem($event)" />
        </WellItem>
      </div>

      <div>
        <WellItem label="Oprettet:">
          <DatePicker :value="state.process.created" disabled/>
        </WellItem>
      </div>
    </Well>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action } from 'vuex-class';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DatePicker from '@/components/common/inputs/DatePicker.vue';
import FormSection from '@/components/details/FormSection.vue';
import Well from '@/components/common/Well.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import WellItem from '@/components/common/WellItem.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { ITSystem } from '@/store/modules/process/state';
import { HTTP } from '@/services/http-service';
import { commonActionTypes } from '@/store/modules/common/actions';
import { CommonState } from '@/store/modules/common/state';

@Component({
  components: {
    TextArea,
    SelectionField,
    DatePicker,
    Well,
    FormSection,
    InfoTooltip,
    WellItem
  }
})
export default class ChallengesForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;
  @Action(processActionTypes.SAVE_IT_SYSTEM)
  saveItSystem!: (itSystem: ITSystem) => void;

  twoColumnBreakpoint = 1600;

  get itSystems() {
    return this.$store.state.common.itSystems.map((s: ITSystem) => ({
      text: s.name,
      value: s
    }));
  }

  get state() {
    return this.$store.state;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

h2 {
  @include heading;
  color: $color-secondary;

  &:not(:first-of-type) {
    margin-top: $size-unit * 2;
  }
  margin-bottom: $size-unit / 2;
  display: inline-block;
  margin-right: $size-unit;
}

.challenges-well {
  margin-top: $size-unit * 1.5;
}
</style>
