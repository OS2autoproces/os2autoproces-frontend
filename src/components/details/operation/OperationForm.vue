<template>
  <FormSection
    :invalid="!isOperationValid"
    v-if="minPhase(PhaseKeys.OPERATION)"
    heading="Drift"
    id="operation"
    :disabled="state.disabled.operationEdit"
    @edit="update({ disabled: { operationEdit: $event } })"
  >
    <div class="rating-wrapper" :class="{ disabled: state.disabled.operationEdit }">
      <div class="rating-label">
        I hvor høj grad indfriede løsningen de forventede gevinster? *
        <InfoTooltip>Skalaen lav, mellem, høj angiver graden af gevinstrealisering.</InfoTooltip>
      </div>
      <Rating
        class="rating"
        @change="update({ rating: $event })"
        :disabled="state.disabled.operationEdit"
        :value="state.rating"
      />
    </div>

    <Well>
      <div>
        <WellItem labelWidth="55%" label="Sidst kontrolleret i forhold til §">
          <DatePicker
            @change="update({ legalClauseLastVerified: $event })"
            :disabled="state.disabled.operationEdit"
            :value="state.legalClauseLastVerified"
          />
        </WellItem>
      </div>
      <div>
        <WellItem labelWidth="55%" label="Løsning taget ud af drift">
          <DatePicker
            @change="update({ decommissioned: $event })"
            :disabled="state.disabled.operationEdit"
            :value="state.decommissioned"
          />
        </WellItem>
      </div>
    </Well>

    <h2>Kommentar til realiseret gevinster</h2>
    <TextArea
      :max-length="10000"
      @change="update({ ratingComment: $event })"
      :disabled="state.disabled.operationEdit"
      :value="state.ratingComment"
    />
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Rating from '@/components/common/inputs/Rating.vue';
import { Action, Getter } from 'vuex-class';
import DatePicker from '@/components/common/inputs/DatePicker.vue';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';
import { Phase, PhaseKeys } from '@/models/phase';

@Component({
  components: {
    TextArea,
    DatePicker,
    FormSection,
    Well,
    WellItem,
    InfoTooltip,
    Rating
  }
})
export default class OperationForm extends Vue {
  @Action(processActionTypes.UPDATE)
  update: any;

  @Getter(processGetterTypes.IS_OPERATION_VALID)
  isOperationValid!: any;
  @Getter(processGetterTypes.MIN_PHASE)
  minPhase!: (phase: Phase) => boolean;

  PhaseKeys = PhaseKeys;

  get state() {
    return this.$store.state.process;
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
  }
  .rating {
    margin-top: 0.5rem;
    width: 160px;

    >>> svg {
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
  color: $color-secondary;
  margin-bottom: 0.5rem;
  display: inline-block;
  margin-right: 1rem;
  margin-top: 2rem;
}
</style>
