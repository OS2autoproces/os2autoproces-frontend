<template>
  <div class="info-tooltip-wrapper">
    <InfoIcon class="info-icon" />
    <div class="info-tooltip">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import InfoIcon from '../icons/InfoIcon.vue';

@Component({
  components: {
    InfoIcon
  }
})
export default class ExpandPanel extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.info-icon {
  z-index: 2;
  position: relative;

  height: 1rem;
  width: 1rem;
}

.info-tooltip-wrapper {
  display: inline-flex;
  margin-left: 0.3rem;
  position: relative;
  height: 1rem;
  cursor: help;

  &:hover {
    z-index: 10;
  }

  &:not(:hover) .info-tooltip {
    display: none;
  }
}

.info-tooltip {
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  width: 275px;
  z-index: 1;

  padding: 0.5rem;
  padding-top: 2rem;
  border: 1px solid $color-primary;
  border-radius: 1rem;

  background-color: $color-background;
}
</style>
