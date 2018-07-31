<template>
  <FormSection :invalid="!isOperationValid" v-if="minPhase(PhaseKeys.IMPLEMENTATION)" heading="Drift" id="operation" :disabled="state.disabled.operationEdit" @edit="update({disabled: {operationEdit: $event}})">
    <div class="rating-wrapper" :class="{disabled: state.disabled.operationEdit}">
      <div>I hvor høj grad realiserer processen sit potentiale?</div>
      <Rating class="rating" @change="update({rating: $event})" :disabled="state.disabled.operationEdit" :value="state.rating" />
    </div>

    <Well>
      <div>
        <WellItem labelWidth="55%" label="Sidst kontrolleret i forhold til §">
          <DatePicker @change="update({legalClauseLastVerified: $event})" :disabled="state.disabled.operationEdit" :value="state.legalClauseLastVerified" />
        </WellItem>
      </div>
      <div>
        <WellItem labelWidth="55%" label="Løsning taget ud af drift">
          <DatePicker @change="update({decommissioned: $event})" :disabled="state.disabled.operationEdit" :value="state.decommissioned" />
        </WellItem>
      </div>
    </Well>

    <h2>Kommentar til realiseret løsningspotentiale</h2>
    <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
    <TextArea :max-length="1200" @change="update({ratingComment: $event})" :disabled="state.disabled.operationEdit" :value="state.ratingComment" />
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
  @Action(processActionTypes.UPDATE) update: any;

  @Getter(processGetterTypes.IS_OPERATION_VALID) isOperationValid!: any;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

  PhaseKeys = PhaseKeys;

  get state() {
    return this.$store.state.process;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.rating-wrapper {
  padding: $size-unit;
  display: inline-block;
  text-align: center;
  margin-bottom: $size-unit;
  border: 1px solid transparent;

  &:not(.disabled) {
    border-color: $color-primary;
    border-radius: $size-unit;
  }
  .rating {
    margin-top: $size-unit/2;
    width: 160px;

    /deep/ svg {
      height: 2 * $size-unit;
      width: 2 * $size-unit;
    }
  }
}

h2 {
  @include heading;
  color: $color-secondary;
  margin-bottom: $size-unit / 2;
  display: inline-block;
  margin-right: $size-unit;
  margin-top: 2 * $size-unit;
}
</style>
