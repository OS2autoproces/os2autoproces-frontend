<template>
    <div class="well-container">
        <div class="section-wrap">
            <slot />
        </div>
        <slot name="well-footer" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Well extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.well-container {
  display: flex;
  flex-direction: column;
  background-color: $color-background-grey;
  padding: 1.5rem;
  border-radius: 1rem;

  .section-wrap {
    display: flex;
    flex-grow: 1;

    > * {
      flex: 1 1 1px;
      padding: 0 .5rem;

      > *:not(:last-child) {
        margin-bottom: 1rem;
      }

      &:not(:last-of-type) {
        border-right: 1px solid $color-background;
      }

      &:last-of-type {
        padding-right: 0;
      }

      &:first-of-type {
        padding-left: 0;
      }
    }
  }
}
</style>
