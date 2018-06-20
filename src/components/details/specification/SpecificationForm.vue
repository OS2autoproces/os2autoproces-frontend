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

        <FileUpload />
    </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { SpecificationActionTypes } from '@/store/modules/details/specification/actions';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action } from 'vuex-class';
import FileUpload from '@/components/common/inputs/FileUpload.vue';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';

@Component({
  components: {
    TextArea,
    FileUpload,
    FormSection,
    InfoTooltip
  }
})
export default class SpecificationForm extends Vue {
  @Action(SpecificationActionTypes.UPDATE) update: any;

  twoColumnBreakpoint = 1600;

  get state() {
    return this.$store.state.details.specification;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

h2 {
  @include heading;
  color: $color-secondary;
  margin-bottom: $size-unit;
  display: inline-block;
  margin-right: $size-unit;
}
</style>
