<template>
    <FormSection heading="Specifikation" id="specification" :disabled="state.disabled" @edit="update({disabled: $event})">
        <h2>Proces udfordringer</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :max-length="1200" :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({challenges: $event})" :disabled="state.disabled" :value="state.challenges" />

        <h2>Forventet løsningsdesign</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :max-length="2400" :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({solution: $event})" :disabled="state.disabled" :value="state.solution" />

        <h2>Sagsreference i ESDH</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :max-length="300" :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({esdhCaseReference: $event})" :disabled="state.disabled" :value="state.esdhCaseReference" />
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

  twoColumnBreakpoint = 1600;

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
