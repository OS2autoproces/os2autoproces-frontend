<template>
  <button type="button" @click="click" :class="{ 'primary-button': primary }">
    <slot />
  </button>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop(Boolean)
  primary!: boolean;

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
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  min-width: 100px;
  color: $color-primary;

  &.primary-button {
    color: white;
    background-color: $color-primary;
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 0.5rem 2rem;
  }
}
</style>

