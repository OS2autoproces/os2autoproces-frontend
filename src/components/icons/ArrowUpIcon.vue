<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.52 10.5">
        <path class="cls-1" d="M41.77,46.91l8-8H48l8,8a1.25,1.25,0,0,0,1.77-1.77l-8-8a1.27,1.27,0,0,0-1.77,0l-8,8a1.25,1.25,0,0,0,1.77,1.77h0Z" transform="translate(-39.63 -36.77)" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class CheckIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

path {
  fill: $color-primary;
}
</style>
