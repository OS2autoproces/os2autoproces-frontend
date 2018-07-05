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
          <SelectionField :items="itSystems" :value="state.process.itSystems" :disabled="state.process.disabled.challengesEdit" @change="saveItSystem($event)" />
        </WellItem>
      </div>

      <div>
        <WellItem label="Oprettet:">
          <DatePicker :disabled="state.process.disabled.challengesEdit" :value="state.process.created" @change="update({created: $event})" />
        </WellItem>
      </div>
    </Well>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action, Getter } from 'vuex-class';
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
import {
  commonGetterTypes,
  ItSystemItem
} from '@/store/modules/common/getters';
import { CommonState } from '@/store/modules/common/state';

interface Item {
  value: any;
  text: string;
}

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
  @Action(commonActionTypes.LOAD_IT_SYSTEMS)
  loadItSystems!: () => Promise<void>;
  @Action(processActionTypes.SAVE_IT_SYSTEM) saveItSystem!: (itSystem: ITSystem) => void;

  twoColumnBreakpoint = 1600;

  mounted() {
    this.loadItSystems();
  }

  get itSystems() {
    return this.state.common.itSystems.map((s: ITSystem) => ({ text: s.name, value: s }));
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
