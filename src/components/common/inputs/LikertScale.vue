<template>
    <div class="scale" :class="{ disabled }">
        <div class="scale-option" v-for="key in items" :key="key" @click="select(key)">
            <Checkbox class="checkbox" :disabled="disabled" :value="key === value" />
            <div class="label">{{LikertScaleLabels[key]}}</div>
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
  @Prop() value!: string;
  @Prop() disabled!: boolean;

  items = [
    LikertScaleKeys.VERY_LOW,
    LikertScaleKeys.LOW,
    LikertScaleKeys.HIGH,
    LikertScaleKeys.VERY_HIGH,
    LikertScaleKeys.UNKNOWN,
  ];

  LikertScaleLabels = LikertScaleLabels;

  select(key: any) {
    if (!this.disabled) {
      console.log(key)
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

.checkbox {
  height: 2 * $size-unit;
  width: 2 * $size-unit;
}

.label {
  white-space: nowrap;
  font-style: italic;
  color: $color-secondary;
}
</style>

