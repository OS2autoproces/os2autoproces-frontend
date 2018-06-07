<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.52 10.5">
        <path d="M56,37.14l-8,8h1.77l-8-8A1.25,1.25,0,0,0,40,38.91l8,8a1.27,1.27,0,0,0,1.77,0l8-8A1.25,1.25,0,0,0,56,37.14h0Z" transform="translate(-39.63 -36.77)" />
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
