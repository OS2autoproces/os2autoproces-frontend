<template>
    <FormSection heading="Drift" id="operation" :disabled="state.disabled" @edit="update({disabled: $event})">
        <div class="rating-wrapper" :class="{disabled: state.disabled}">
            <div>I hvor høj grad realiserer processen sit potentiale?</div>
            <Rating class="operation-rating" @change="update({potential: $event})" :disabled="state.disabled" :value="state.potential" />
        </div>

        <Well>
            <div>
                <WellItem labelWidth="55%" label="Sidst opdateret">
                    <DatePicker @change="update({lastUpdated: $event})" :disabled="state.disabled" :value="state.lastUpdated" />
                </WellItem>
            </div>
            <div>
                <WellItem labelWidth="55%" label="Sidst kontrolleret i forhold til §">
                    <DatePicker @change="update({lastChecked: $event})" :disabled="state.disabled" :value="state.lastChecked" />
                </WellItem>
            </div>
            <div>
                <WellItem labelWidth="55%" label="Løsning taget ud af drift">
                    <DatePicker @change="update({decommissioned: $event})" :disabled="state.disabled" :value="state.decommissioned" />
                </WellItem>
            </div>
        </Well>

        <h2>Kommentar til realiseret løsningspotentiale</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :max-length="1200" :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({realizedPotential: $event})" :disabled="state.disabled" :value="state.realizedPotential" />

        <FileUpload />
    </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { OperationActionTypes } from '@/store/modules/details/operation/actions';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Rating from '@/components/common/inputs/Rating.vue';
import { Action } from 'vuex-class';
import FileUpload from '@/components/common/inputs/FileUpload.vue';
import DatePicker from '@/components/common/inputs/DatePicker.vue';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';

@Component({
  components: {
    TextArea,
    FileUpload,
    DatePicker,
    FormSection,
    Well,
    WellItem,
    InfoTooltip,
    Rating
  }
})
export default class OperationForm extends Vue {
  @Action(OperationActionTypes.UPDATE) update: any;

  twoColumnBreakpoint = 1600;

  get state() {
    return this.$store.state.details.operation;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.rating-wrapper {
  padding: $size-unit;
  margin-bottom: $size-unit;
  border: 1px solid transparent;
  display: inline-block;

  &:not(.disabled) {
    border-color: $color-primary;
    border-radius: $size-unit;
  }
  .operation-rating {
    width: 10 * $size-unit;
    margin: 0 auto;
    margin-top: $size-unit/2;

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
