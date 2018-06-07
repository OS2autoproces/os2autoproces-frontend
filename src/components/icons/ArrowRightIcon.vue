<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 18.52">
        <path d="M44.8,35.31l8,8V41.55l-8,8a1.25,1.25,0,0,0,1.77,1.77l8-8a1.27,1.27,0,0,0,0-1.77l-8-8a1.25,1.25,0,0,0-1.77,1.77h0Z" transform="translate(-44.43 -33.17)" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class ArrowRightIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

path {
  fill: $color-primary;
}
</style>
