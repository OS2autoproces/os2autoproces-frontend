<template>
    <button type="button" @click="click">
        <slot />
    </button>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  click(event: any) {
    this.$emit('click', event);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

button {
  @include heading;
  border: 1px solid $color-primary;
  border-radius: $size-unit/2;
  padding: $size-unit/2 $size-unit;
  min-width: 40px;
  color: $color-primary;
}
</style>

