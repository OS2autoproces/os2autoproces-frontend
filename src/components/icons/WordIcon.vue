<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.67 75">
    <rect x="50" y="12.5" width="16.67" height="50" />
    <path d="M25.78,82.89l46.67,12.5v-75L25.78,32.89v50ZM38.61,41.22l2.83,23.67,4.08-23.67h7.17l3.75,23.67,3.33-23.67h6.5L61.44,70.05H52.61L49,48.05l-3.75,22H36.53L31.78,41.22h6.83Z" transform="translate(-25.78 -20.39)" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class WordIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

rect,
path {
  fill: $color-secondary;
}
</style>
