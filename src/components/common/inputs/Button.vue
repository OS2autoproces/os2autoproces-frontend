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
  background-color: $color-background;
  border: 1px solid $color-secondary;
  border-radius: .5rem;
  padding: .5rem 1rem;
  min-width: 100px;
  color: $color-primary;
}
</style>

