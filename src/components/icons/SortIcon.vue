<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.81 25.99">
        <polygon points="11.4 25.73 8.71 25.73 8.71 6.5 1.9 13.3 0 11.4 11.4 0 11.4 25.73" />
        <polygon points="18.41 25.99 18.41 0.26 21.11 0.26 21.11 19.5 27.91 12.69 29.81 14.6 18.41 25.99" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class SortIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

polygon {
  fill: $color-primary;
}
</style>
