<template>
  <FormSection v-if="isVisibleFromPhaseNumber(2)" heading="Specifikation" id="specification" :disabled="state.disabled.specificationEdit" @edit="update({disabled: { specificationEdit: $event}})">

    <h2>Sagsreference i ESDH</h2>
    <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
    <TextArea :max-length="300" @change="update({esdhReference: $event})" :disabled="state.disabled.specificationEdit" :value="state.esdhReference" />

  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action, Getter } from 'vuex-class';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';

@Component({
  components: {
    TextArea,
    FormSection,
    InfoTooltip
  }
})
export default class SpecificationForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;
  @Getter(processGetterTypes.IS_VISIBLE_FROM_PHASE_NUMBER) isVisibleFromPhaseNumber!: (phase: number) => boolean;
  get state() {
    return this.$store.state.process;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

h2 {
  @include heading;
  color: $color-secondary;
  margin-bottom: $size-unit / 2;
  display: inline-block;
  margin-right: $size-unit;

  &:not(:first-of-type) {
    margin-top: 2 * $size-unit;
  }
}
</style>
