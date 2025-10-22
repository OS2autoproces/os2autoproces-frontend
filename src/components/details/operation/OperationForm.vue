<template>
  <FormSection
    :invalid="!state.isOperationValid"
    v-if="state.minPhase(PhaseKeys.OPERATION)"
    heading="Drift"
    id="operation"
    :disabled="state.disabled.operationEdit"
    @edit="update({ disabled: { operationEdit: $event } })"
    :expandOnMount="shouldBeOpen"
  >
    <h2 id="automationDescription" style="margin-top: 0px;">
      Beskrivelse af automatisering
      <InfoTooltip>Her kan du beskrive den idriftsatte automatisering i detaljer.</InfoTooltip>
    </h2>
    <RichTextArea
      :max-length="10000"
      @change="update({ automationDescription: $event })"
      :disabled="state.disabled.operationEdit"
      :value="state.automationDescription"
      :hasError="isInErrors('automationDescription')"
    />

    <div
      class="rating-wrapper"
      :class="{ disabled: state.disabled.operationEdit, 'has-error': isInErrors('rating') }"
      style="margin-top: 1rem;"
    >
      <div class="rating-label" id="rating">
        I hvor høj grad indfriede løsningen de forventede gevinster?
        <InfoTooltip>Skalaen lav, mellem, høj angiver graden af gevinstrealisering.</InfoTooltip>
      </div>
      <Rating
        class="rating"
        @change="update({ rating: $event })"
        :disabled="state.disabled.operationEdit"
        :value="state.rating"
        :hasError="isInErrors('rating')"
      />
    </div>

    <Well>
      <div>
        <WellItem labelWidth="55%" label="Løsning sat i drift" id="putIntoOperation">
          <DatePicker
            @change="update({ putIntoOperation: $event })"
            :disabled="state.disabled.operationEdit"
            :value="state.putIntoOperation"
            :hasError="isInErrors('putIntoOperation')"
          />
        </WellItem>
      </div>
      <div>
        <WellItem labelWidth="55%" label="Løsning taget ud af drift" id="decommissioned">
          <DatePicker
            @change="update({ decommissioned: $event })"
            :disabled="state.disabled.operationEdit"
            :value="state.decommissioned"
            :hasError="isInErrors('decommissioned')"
          />
        </WellItem>
      </div>
      <div>
        <WellItem labelWidth="55%" label="Sidst kontrolleret i forhold til §" id="legalClauseLastVerified">
          <DatePicker
            @change="update({ legalClauseLastVerified: $event })"
            :disabled="state.disabled.operationEdit"
            :value="state.legalClauseLastVerified"
            :hasError="isInErrors('legalClauseLastVerified')"
          />
        </WellItem>
      </div>
    </Well>

    <h2 id="ratingComment">Kommentar til realiseret gevinster</h2>
    <RichTextArea
      :max-length="10000"
      @change="update({ ratingComment: $event })"
      :disabled="state.disabled.operationEdit"
      :value="state.ratingComment"
      :hasError="isInErrors('ratingComment')"
    />
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RichTextArea from '@/components/common/inputs/RichTextArea.vue';
import Rating from '@/components/common/inputs/Rating.vue';
import { Action, Getter } from 'vuex-class';
import DatePicker from '@/components/common/inputs/DatePicker.vue';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import { Phase, PhaseKeys } from '@/models/phase';
import { ProcessModule, ProcessState } from '@/store/modules/process';
import { ErrorModule } from '@/store/modules/error';

@Component({
  components: {
    RichTextArea,
    DatePicker,
    FormSection,
    Well,
    WellItem,
    InfoTooltip,
    Rating
  }
})
export default class OperationForm extends Vue {
  PhaseKeys = PhaseKeys;

  get state() {
    return ProcessModule;
  }

  get shouldBeOpen(): boolean {
    const href = window.location.href;
    const url = new URL(href);
    const params = url.searchParams;
    let search = null;
    for (const [key, value] of params) {
      if (key === 'search') {
        search = value;
        break;
      }
    }

    if (search != null) {
      const searchLowerCase = search.toLowerCase();
      if (this.state.automationDescription?.toLowerCase().includes(searchLowerCase)) {
        return true;
      } else if (this.state.ratingComment?.toLowerCase().includes(searchLowerCase)) {
        return true;
      }
    }

    return false;
  }

  update(state: Partial<ProcessState>) {
    ProcessModule.update(state);
  }

  isInErrors(name: string) {
    return ErrorModule.errorInField(ErrorModule.operation, name);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.rating-wrapper {
  padding: 1rem;
  display: inline-block;
  text-align: center;
  margin-bottom: 1rem;
  border: 1px solid transparent;

  &:not(.disabled) {
    border-color: $color-primary;
    border-radius: 1rem;
    &.has-error {
      border-color: $color-error;
      border-width: 0.1em;
    }
  }
  .rating {
    margin-top: 0.5rem;
    width: 160px;

    ::v-deep svg {
      height: 2rem;
      width: 2rem;
    }
  }

  .rating-label {
    display: flex;
    align-items: center;
  }
}

h2 {
  @include heading;
  color: $color-primary;
  margin-bottom: 0.5rem;
  display: inline-block;
  margin-right: 1rem;
  margin-top: 2rem;
}
</style>
