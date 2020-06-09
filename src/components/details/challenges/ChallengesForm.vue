<template>
  <FormSection
    :invalid="!state.isChallengesValid"
    heading="Problemstillinger"
    id="challenges"
    :disabled="state.disabled.challengesEdit"
    @edit="update({ disabled: { challengesEdit: $event } })"
  >
    <div>
      <h2>Beskrivelse</h2>
      <InfoTooltip>Her kan du beskrive den nuværende proces i detaljer.</InfoTooltip>
      <RichTextArea
        :twoColumnBreakpoint="twoColumnBreakpoint"
        @change="update({ longDescription: $event })"
        :disabled="state.disabled.challengesEdit"
        :value="state.longDescription"
        :hasError="isInErrors('longDescription')"
        id="longDescription"
        :maxLength="10000"
      />
    </div>

    <div v-if="minPhase(PhaseKeys.PREANALYSIS)">
      <h2 class="with-margin">Idéer til løsning</h2>
      <InfoTooltip
        >Her kan tilføjes de ønsker, du har til en fremtidig løsning. Ønskerne kan både være teknologiske (f.eks. RPA)
        og/eller ændringer til måden processen udføres på.</InfoTooltip
      >
      <RichTextArea
        :twoColumnBreakpoint="twoColumnBreakpoint"
        @change="update({ solutionRequests: $event })"
        :disabled="state.disabled.challengesEdit"
        :value="state.solutionRequests"
        :hasError="isInErrors('solutionRequests')"
        id="solutionRequests"
        :maxLength="10000"
      />
    </div>

    <div v-if="state.minPhase(PhaseKeys.PREANALYSIS)">
      <h2 class="with-margin">Udfordringer i den nuværende proces *</h2>
      <InfoTooltip
        >Her kan du beskrive de trivielle handlinger, udfordringer eller vaskeligheder der opleves i udførelsen af den
        nuværende proces.</InfoTooltip
      >
      <RichTextArea
        :twoColumnBreakpoint="twoColumnBreakpoint"
        @change="update({ processChallenges: $event })"
        :disabled="state.disabled.challengesEdit"
        :value="state.processChallenges"
        :hasError="isInErrors('processChallenges')"
        id="processChallenges"
        :maxLength="10000"
      />
    </div>

    <Well class="challenges-well">
      <div>
        <WellItem label="Oprettet:">
          <DatePicker :value="state.created" disabled />
        </WellItem>

        <WellItem
          label="Nuværende systemer:"
          tooltip="Vælg hvilke systemer der understøtter den nuværende proces. Listen kommer fra KITOS."
        >
          <SelectionField
            :items="itSystems"
            :value="state.itSystems"
            :hasError="isInErrors('itSystems')"
            itemText="name"
            :disabled="state.disabled.challengesEdit"
            @change="update({ itSystems: $event })"
            id="itSystems"
            multiple
          />
        </WellItem>
      </div>

      <div>
        <WellItem labelWidth="30%" label="Sidst opdateret:">
          <DatePicker :value="state.lastChanged" id="lastChanged" disabled />
        </WellItem>

        <WellItem
          labelWidth="30%"
          label="Andre nuværende systemer:"
          tooltip="Hvis der er systemer du ikke kan finde på listen kan du notere dem her."
        >
          <TextArea
            @change="update({ itSystemsDescription: $event })"
            fullWidth
            :disabled="state.disabled.challengesEdit"
            :value="state.itSystemsDescription"
            :hasError="isInErrors('itSystemsDescription')"
            id="itSystemsDescription"
            :maxLength="10000"
          />
        </WellItem>
      </div>
    </Well>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import RichTextArea from '@/components/common/inputs/RichTextArea.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DatePicker from '@/components/common/inputs/DatePicker.vue';
import FormSection from '@/components/details/FormSection.vue';
import Well from '@/components/common/Well.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import WellItem from '@/components/common/WellItem.vue';
import { ITSystem } from '@/store/modules/commonInterfaces';
import { HTTP } from '@/services/http-service';
import { Phase, PhaseKeys } from '@/models/phase';
import { ProcessModule, ProcessState } from '@/store/modules/process';
import Process from '@/store/modules/process';
import { CommonModule } from '@/store/modules/common';
import { ErrorModule } from '@/store/modules/error';
import { RootState } from '@/store';

@Component({
  components: {
    TextArea,
    RichTextArea,
    SelectionField,
    DatePicker,
    Well,
    FormSection,
    InfoTooltip,
    WellItem
  }
})
export default class ChallengesForm extends Vue {
  twoColumnBreakpoint = 1600;
  PhaseKeys = PhaseKeys;

  get state() {
    return ProcessModule;
  }

  get itSystems() {
    return CommonModule.itSystems;
  }

  minPhase(phase: Phase) {
    return ProcessModule.minPhase(phase);
  }

  update(state: Partial<ProcessState>) {
    ProcessModule.update(state);
  }

  isInErrors(name: string) {
    return ErrorModule.errorInField(ErrorModule.challenges, name);
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
