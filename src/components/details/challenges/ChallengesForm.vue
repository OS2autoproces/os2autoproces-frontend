<template>
  <FormSection heading="Problemstillinger" id="challenges" :disabled="state.disabled.challengesEdit" @edit="update({ disabled: { challengesEdit: $event}})">
    <div v-if="minPhase(PhaseKeys.PREANALYSIS)">
      <h2>Løsningsbeskrivelse</h2>
      <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
      <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({solutionRequests: $event})" :disabled="state.disabled.challengesEdit" :value="state.solutionRequests" />
    </div>

    <div v-if="minPhase(PhaseKeys.PREANALYSIS)">
      <h2>Proces udfordringer</h2>
      <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
      <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({processChallenges: $event})" :disabled="state.disabled.challengesEdit" :value="state.processChallenges" />
    </div>

    <Well class="challenges-well">
      <div>
        <WellItem label="Oprettet:">
          <DatePicker :value="state.created" disabled/>
        </WellItem>
      </div>

      <div>
        <WellItem labelWidth="55%" label="Sidst opdateret:">
          <DatePicker :value="state.lastChanged" disabled />
        </WellItem>
      </div>

      <div slot="well-footer" class="well-item-footer" v-if="minPhase(PhaseKeys.PREANALYSIS)">
        <WellItem label="Nuværende system:">
          <SelectionField :items="itSystems" :value="state.itSystems[0]" itemText="name" :disabled="state.disabled.challengesEdit" @change="saveItSystem($event)" />
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
import { CommonState } from '@/store/modules/common/state';
import { processGetterTypes } from '@/store/modules/process/getters';
import { Phase, PhaseKeys } from '@/models/phase';

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
  @Action(processActionTypes.SAVE_IT_SYSTEM) saveItSystem!: (itSystem: ITSystem) => void;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

  twoColumnBreakpoint = 1600;
  PhaseKeys = PhaseKeys;

  get state() {
    return this.$store.state.process;
  }

  get itSystems() {
    return this.$store.state.common.itSystems;
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

.well-item-footer {
  padding-top: $size-unit;
}
</style>
