<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.61 14.61">
        <circle cx="7.3" cy="7.3" r="7.3" />
        <text transform="translate(6.12 10.11)">i</text>
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class CheckIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

circle {
  fill: $color-secondary;
}

text {
  font-size: 8.1px;
  fill: $color-background;
  font-family: Arial;
  font-weight: 700;
}
</style>
