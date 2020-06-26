<template>
  <div class="scale" :class="{ disabled, 'has-error': hasError }">
    <div class="scale-option" v-for="likert in items" :key="likert.value" @click="select(likert.value)">
      <Checkbox class="checkbox" :disabled="disabled" :value="likert.value === value" :hasError="hasError" />
      <div class="label">{{ likert.label }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Checkbox from './Checkbox.vue';
import { LikertScaleKeys, LikertScaleLabels } from '@/models/likert-scale';

@Component({
  components: {
    Checkbox
  }
})
export default class LikertScale extends Vue {
  @Prop(String) value!: string;
  @Prop(Boolean) disabled!: boolean;
  @Prop(Boolean) hasError!: boolean;

  items = [
    { value: LikertScaleKeys.VERY_HIGH, label: LikertScaleLabels.VERY_HIGH },
    { value: LikertScaleKeys.HIGH, label: LikertScaleLabels.HIGH },
    { value: LikertScaleKeys.LOW, label: LikertScaleLabels.LOW },
    { value: LikertScaleKeys.VERY_LOW, label: LikertScaleLabels.VERY_LOW },
    { value: LikertScaleKeys.UNKNOWN, label: LikertScaleLabels.UNKNOWN }
  ];

  LikertScaleLabels = LikertScaleLabels;

  select(key: string) {
    if (!this.disabled) {
      this.$emit('change', key);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.scale {
  display: flex;
  justify-content: space-between;

  &:not(.disabled) .scale-option {
    cursor: pointer;
  }

  &.has-error {
    border: 0.2em solid $color-error;
    border-width: 0.2em;
    min-height: 50px;
    border-radius: 20px;
  }
}

.scale-option {
  text-align: center;

  &:last-of-type .checkbox ::v-deep .checkbox-icon {
    border-color: $color-grey;
  }
}

.checkbox ::v-deep .checkbox-icon {
  height: 2rem;
  width: 2rem;
}

.label {
  white-space: nowrap;
  font-style: italic;
  color: $color-secondary;
}
</style>
