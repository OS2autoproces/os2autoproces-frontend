<template>
  <div class="well-item-wrap">
    <div class="well-item-label" :style="{flexBasis: labelWidth}">{{label}}</div>
    <slot class="well-input" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class WellItem extends Vue {
  @Prop() label!: string;
  @Prop({ default: '50%' })
  labelWidth!: string;
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.well-item-wrap {
  display: flex;
  align-items: center;

  .well-item-label {
    @include field-label;
    flex-shrink: 0;
    margin-right: $size-unit;
  }

  .well-input {
    @include field-input-text;
    flex-grow: 1;
  }
}
</style>
