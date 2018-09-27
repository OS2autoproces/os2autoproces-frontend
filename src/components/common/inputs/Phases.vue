<template>
  <div class="phases">
    <MappedSelectionField :disabled="disabled" :value="value" @change="$emit('change', $event)" :items="phases" />
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

  private phases = [
    { value: PhaseKeys.IDEA, text: PhaseLabels.IDEA },
    { value: PhaseKeys.PREANALYSIS, text: PhaseLabels.PREANALYSIS },
    { value: PhaseKeys.SPECIFICATION, text: PhaseLabels.SPECIFICATION },
    { value: PhaseKeys.DEVELOPMENT, text: PhaseLabels.DEVELOPMENT },
    { value: PhaseKeys.IMPLEMENTATION, text: PhaseLabels.IMPLEMENTATION },
    { value: PhaseKeys.OPERATION, text: PhaseLabels.OPERATION }
  ];
}
</script>

<style lang="scss" scoped>
</style>
