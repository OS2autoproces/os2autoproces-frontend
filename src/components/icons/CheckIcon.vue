<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.14 29.31">
        <path d="M49.68,50.47l7.17,10.36a2.54,2.54,0,0,0,4.57-.6l7.82-24.46c1-3.07-3.84-4.39-4.82-1.33L56.6,58.9l4.57-.6L54,47.94c-1.82-2.63-6.16-.13-4.32,2.52h0Z" transform="translate(-49.23 -32.7)" />
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
