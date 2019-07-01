<template>
  <div class="dialog-content elevation-4">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class DialogContent extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.dialog-content {
  width: 100%;
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.1rem solid $color-primary;
}
</style>

