<template>
  <FormSection :invalid="!isChallengesValid" heading="Problemstillinger" id="challenges" :disabled="state.disabled.challengesEdit" @edit="update({ disabled: { challengesEdit: $event}})">
    <div>
      <h2>Beskrivelse</h2>
      <InfoTooltip>Her kan beskrive den nuværende proces i detaljer.</InfoTooltip>
      <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({longDescription: $event})" :disabled="state.disabled.challengesEdit" :value="state.longDescription" :maxLength="1200" />
      </div>

    <div v-if="minPhase(PhaseKeys.PREANALYSIS)">
      <h2 class="with-margin">Idéer til løsning</h2>
      <InfoTooltip>Her kan tilføjes de ønsker, du har til en fremtidig løsning. Ønskerne kan både være teknologiske (f.eks. RPA) og/eller ændringer til måden processen udføres på.</InfoTooltip>
      <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({solutionRequests: $event})" :disabled="state.disabled.challengesEdit" :value="state.solutionRequests" :maxLength="2400" />
    </div>

    <div v-if="minPhase(PhaseKeys.PREANALYSIS)">
      <h2 class="with-margin">Udfordringer i den nuværende proces *</h2>
      <InfoTooltip>Her kan du beskrive de trivielle handlinger, udfordringer eller vaskeligheder der opleves i udførelsen af den nuværende proces.</InfoTooltip>
      <TextArea :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({processChallenges: $event})" :disabled="state.disabled.challengesEdit" :value="state.processChallenges" :maxLength="1200" />
    </div>

    <Well class="challenges-well">
      <div>
        <WellItem label="Oprettet:">
          <DatePicker :value="state.created" disabled/>
        </WellItem>

        <WellItem label="Nuværende systemer:" tooltip="Vælg hvilke systemer der understøtter den nuværende proces. Listen kommer fra KITOS.">
          <SelectionField :items="itSystems" :value="state.itSystems" itemText="name" :disabled="state.disabled.challengesEdit" @change="assign({itSystems: $event})" multiple />
        </WellItem>
      </div>

      <div>
        <WellItem labelWidth="30%" label="Sidst opdateret:">
          <DatePicker :value="state.lastChanged" disabled />
        </WellItem>

        <WellItem labelWidth="30%" label="Andre nuværende systemer:" v-if="minPhase(PhaseKeys.PREANALYSIS)" tooltip="Hvis der er systemer du ikke kan finde på listen kan du notere dem her.">
          <TextArea @change="update({itSystemsDescription: $event})" fullWidth :disabled="state.disabled.challengesEdit" :value="state.itSystemsDescription" :maxLength="300" />
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
  @Action(processActionTypes.UPDATE)
  update: any;
  @Action(processActionTypes.ASSIGN)
  assign: any;
  @Action(processActionTypes.SAVE_IT_SYSTEM)
  saveItSystem!: (itSystem: ITSystem) => void;

  @Getter(processGetterTypes.IS_CHALLENGES_VALID)
  isChallengesValid!: any;
  @Getter(processGetterTypes.MIN_PHASE)
  minPhase!: (phase: Phase) => boolean;

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

  &.with-margin {
    margin-top: 2rem;
  }

  margin-bottom: 0.5rem;
  display: inline-block;
  margin-right: 1rem;
}

.challenges-well {
  margin: 1.5rem 0;
}

.well-item-footer {
  padding-top: 1rem;
}
</style>
