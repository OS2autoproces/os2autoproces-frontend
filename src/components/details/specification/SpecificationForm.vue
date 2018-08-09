<template>
  <FormSection :invalid="!isSpecificationValid" v-if="minPhase(PhaseKeys.SPECIFICATION)" heading="Specifikation" id="specification" :disabled="state.disabled.specificationEdit" @edit="update({disabled: { specificationEdit: $event}})">

    <h2>Sagsreference i ESDH *</h2>
    <InfoTooltip>Skriv sagsreferencen eller indsæt et direkte link til sagen i ESDH systemet.</InfoTooltip>
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
import { Phase, PhaseKeys } from '@/models/phase';

@Component({
  components: {
    TextArea,
    FormSection,
    InfoTooltip
  }
})
export default class SpecificationForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;

  @Getter(processGetterTypes.IS_SPECIFICATION_VALID) isSpecificationValid!: any;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

  PhaseKeys = PhaseKeys;

  get isWithinMunicipality() {
    const state = this.$store.state;
    return state.auth.user.cvr === state.process.cvr;
  }

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
