<template>
  <div class="scale" :class="{ disabled }">
    <div class="scale-option" v-for="likert in items" :key="likert.value" @click="select(likert.value)">
      <Checkbox class="checkbox" :disabled="disabled" :value="likert.value === value" />
      <div class="label">{{likert.label}}</div>
    </div>
  </div>
</template>

<script lang='ts'>
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
}

.scale-option {
  text-align: center;

  &:last-of-type .checkbox {
    border-color: $color-grey;
  }
}

.checkbox /deep/ .checkbox-icon {
  height: 2 * $size-unit;
  width: 2 * $size-unit;
}

.label {
  white-space: nowrap;
  font-style: italic;
  color: $color-secondary;
}
</style>

