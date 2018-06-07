<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 18.52">
        <path d="M53.78,49.15l-8-8v1.77l8-8A1.25,1.25,0,0,0,52,33.13l-8,8a1.27,1.27,0,0,0,0,1.77l8,8a1.25,1.25,0,0,0,1.77-1.77h0Z" transform="translate(-43.64 -32.76)" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class ArrowLeftIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

path {
  fill: $color-primary;
}
</style>
