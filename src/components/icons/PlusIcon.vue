<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.49 100.49">
        <polygon points="100.49 41.1 59.39 41.1 59.39 0 41.1 0 41.1 41.1 0 41.1 0 59.38 41.1 59.38 41.1 100.49 59.39 100.49 59.39 59.38 100.49 59.38 100.49 41.1" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class PlusIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

polygon {
  fill: $color-primary;
}
</style>
