<template>
  <FormSection :invalid="isImplementationValid" v-if="minPhase(PhaseKeys.DEVELOPMENT)" heading="Udvikling og implementering" id="implementation" :disabled="state.disabled.implementationEdit" @edit="update({disabled: {implementationEdit: $event}})">

    <div v-if="minPhase(PhaseKeys.IMPLEMENTATION)">
      <h2>Teknisk implementering</h2>
      <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
      <TextArea :max-length="3000" :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({technicalImplementationNotes: $event})" :disabled="state.disabled.implementationEdit" :value="state.technicalImplementationNotes" />
    </div>

    <div v-if="minPhase(PhaseKeys.IMPLEMENTATION)">
      <h2>Organisatorisk implementering</h2>
      <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
      <TextArea :max-length="3000" :twoColumnBreakpoint="twoColumnBreakpoint" @change="update({organizationalImplementationNotes: $event})" :disabled="state.disabled.implementationEdit" :value="state.organizationalImplementationNotes" />
    </div>

    <div>
      <h2>Anvendt teknologi</h2>
      <InfoTooltip> Lorem ipsum dolor sit ... </InfoTooltip>
      <TagSelector @add="addTechnology($event)" @remove="removeTechnology($event)" :disabled="state.disabled.implementationEdit" :value="state.technologies" />
    </div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action, Getter } from 'vuex-class';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TagSelector from '@/components/common/inputs/TagSelector.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';
import { PhaseKeys, Phase } from '@/models/phase';

@Component({
  components: {
    TextArea,
    FormSection,
    InfoTooltip,
    TagSelector
  }
})
export default class ImplementationForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;
  @Action(processActionTypes.ADD_TECHNOLOGY) addTechnology: any;
  @Action(processActionTypes.REMOVE_TECHNOLOGY) removeTechnology: any;

  @Getter(processGetterTypes.IS_IMPLEMENTATION_VALID) isImplementationValid!: any;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

  PhaseKeys = PhaseKeys;

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
