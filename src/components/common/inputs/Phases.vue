<template>
  <div class="phases">
    <MappedSelectionField
      :hasError="hasError"
      :disabled="disabled"
      :value="value"
      @change="$emit('change', $event)"
      :items="phases"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MappedSelectionField from './MappedSelectionField.vue';
import { Phase, PhaseKeys, PhaseLabels } from '@/models/phase';

@Component({
  components: {
    MappedSelectionField
  }
})
export default class Phases extends Vue {
  @Prop(String)
  private value!: string;

  @Prop(Boolean)
  private disabled!: boolean;
  @Prop(Boolean)
  private hasError!: boolean;

  private phases = [
    { value: PhaseKeys.RAPID, text: PhaseLabels.RAPID },
    { value: PhaseKeys.IDEA, text: PhaseLabels.IDEA },
    { value: PhaseKeys.PREANALYSIS, text: PhaseLabels.PREANALYSIS },
    { value: PhaseKeys.SPECIFICATION, text: PhaseLabels.SPECIFICATION },
    { value: PhaseKeys.DEVELOPMENT, text: PhaseLabels.DEVELOPMENT },
    { value: PhaseKeys.IMPLEMENTATION, text: PhaseLabels.IMPLEMENTATION },
    { value: PhaseKeys.OPERATION, text: PhaseLabels.OPERATION },
    { value: PhaseKeys.DECOMMISSIONED, text: PhaseLabels.DECOMMISSIONED }
  ];
}
</script>

<style lang="scss" scoped></style>
