<template>
  <FormSection heading="Specifikation" id="specification" :disabled="state.disabled.specificationEdit" @edit="update({disabled: { specificationEdit: $event}})">

    <h2>Sagsreference i ESDH</h2>
    <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
    <TextArea :max-length="300" @change="update({esdhCaseReference: $event})" :disabled="state.disabled.specificationEdit" :value="state.esdhCaseReference" />

  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action } from 'vuex-class';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import { processActionTypes } from '@/store/modules/process/actions';

@Component({
  components: {
    TextArea,
    FormSection,
    InfoTooltip
  }
})
export default class SpecificationForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;

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
