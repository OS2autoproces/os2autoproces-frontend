<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.8 95.87">
        <polygon points="0 24.19 21.3 0 72 0 72 95.86 0 95.86 0 24.19" />
        <rect x="38.17" y="45.02" width="16.25" height="10.5" />
        <rect x="38.17" y="32.85" width="16.25" height="11.17" />
        <rect x="20.92" y="32.85" width="16.25" height="11.17" />
        <rect x="20.92" y="45.02" width="16.25" height="10.5" />
        <rect x="38.17" y="56.52" width="16.25" height="10.83" />
        <rect x="20.92" y="56.52" width="16.25" height="10.83" />
        <rect x="20.92" y="19.68" width="16.25" height="12.17" />
        <rect x="38.17" y="19.68" width="16.25" height="12.17" />
        <rect x="24" y="50.46" width="58.3" height="31.59" />
        <path d="M90.8,94.68H31.5V62.09H90.8V94.68Zm-58.3-1H89.8V63.09H32.5V93.68Z" transform="translate(-8 -12.13)" />
        <path d="M40.67,83.89l4.65-7.1-4.21-6.5h3.21L47,74.66l2.67-4.37h3.18l-4.23,6.61,4.65,7H50l-3-4.7-3,4.7H40.67Z" transform="translate(-8 -12.13)" />
        <path d="M55.93,79.46l2.67-.26a3.26,3.26,0,0,0,1,2,3,3,0,0,0,2,.63,3.05,3.05,0,0,0,2-.56,1.67,1.67,0,0,0,.67-1.31A1.24,1.24,0,0,0,64,79.12a2.26,2.26,0,0,0-1-.59q-0.48-.17-2.2-0.59a7.45,7.45,0,0,1-3.1-1.34,3.54,3.54,0,0,1-1.25-2.74A3.5,3.5,0,0,1,57,71.91a3.69,3.69,0,0,1,1.7-1.38,6.81,6.81,0,0,1,2.68-.47,5.74,5.74,0,0,1,3.85,1.12,4,4,0,0,1,1.36,3l-2.75.12a2.33,2.33,0,0,0-.76-1.51,2.77,2.77,0,0,0-1.74-.46,3.13,3.13,0,0,0-1.87.49,1,1,0,0,0-.44.84,1,1,0,0,0,.41.83A7.22,7.22,0,0,0,62,75.4a13.32,13.32,0,0,1,3,1,3.81,3.81,0,0,1,1.5,1.38,4.28,4.28,0,0,1-.11,4.36,3.89,3.89,0,0,1-1.84,1.52,7.72,7.72,0,0,1-3,.5,5.89,5.89,0,0,1-4-1.19A5.18,5.18,0,0,1,55.93,79.46Z" transform="translate(-8 -12.13)" />
        <path d="M71.27,83.89V70.4H74V81.6h6.83v2.29H71.27Z" transform="translate(-8 -12.13)" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class FileExcelIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

polygon,
rect {
  fill: $color-secondary;
  stroke-miterlimit: 10;
}

rect {
  stroke: $color-background;
}

path {
  fill: $color-background;
}
</style>
