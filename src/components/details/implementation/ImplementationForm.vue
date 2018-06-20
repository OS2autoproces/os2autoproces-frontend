<template>
    <FormSection heading="Udvikling og implementering" id="implementation" :disabled="state.disabled" @edit="update({disabled: $event})">
        <h2>Løsnings beskrivelse</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :max-length="1200" :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({solution: $event})" :disabled="state.disabled" :value="state.solution" />

        <h2>Anvendt teknologi</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TagSelector @add="addTechnology($event)" @remove="removeTechnology($event)" :disabled="state.disabled" :value="state.technologies" />

        <h2>Teknisk implementering</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :max-length="3000" :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({technicalImplementation: $event})" :disabled="state.disabled" :value="state.technicalImplementation" />

        <h2>Organisatorisk implementering</h2>
        <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
        <TextArea :max-length="3000" :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({organizationalImplementation: $event})" :disabled="state.disabled" :value="state.organizationalImplementation" />

        <FileUpload />
    </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ImplementationActionTypes } from '@/store/modules/details/implementation/actions';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action } from 'vuex-class';
import FileUpload from '@/components/common/inputs/FileUpload.vue';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TagSelector from '@/components/common/inputs/TagSelector.vue';

@Component({
  components: {
    TextArea,
    FileUpload,
    FormSection,
    InfoTooltip,
    TagSelector
  }
})
export default class ImplementationForm extends Vue {
  @Action(ImplementationActionTypes.UPDATE) update: any;
  @Action(ImplementationActionTypes.ADD_TECHNOLOGY) addTechnology: any;
  @Action(ImplementationActionTypes.REMOVE_TECHNOLOGY) removeTechnology: any;

  twoColumnBreakpoint = 1600;

  get state() {
    return this.$store.state.details.implementation;
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
