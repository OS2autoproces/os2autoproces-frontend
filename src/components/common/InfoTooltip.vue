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

  height: $size-unit;
  width: $size-unit;
}

.info-tooltip-wrapper {
  display: inline-block;
  position: relative;
  height: $size-unit;
  cursor: help;

  &:not(:hover) .info-tooltip {
    display: none;
  }
}

.info-tooltip {
  position: absolute;
  top: -$size-unit/2;
  left: -$size-unit/2;
  width: 275px;
  z-index: 1;

  padding: $size-unit / 2;
  padding-top: 2 * $size-unit;
  border: 1px solid $color-primary;
  border-radius: $size-unit;

  background-color: $color-background;
}
</style>
