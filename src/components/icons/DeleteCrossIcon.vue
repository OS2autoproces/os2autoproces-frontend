<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.56 18.56">
        <circle class="cls-1" cx="9.28" cy="9.28" r="9.28"/>
        <line class="cls-2" x1="5.6" y1="13.43" x2="12.99" y2="5.42"/>
        <line class="cls-2" x1="13.36" y1="12.91" x2="5.09" y2="5.82"/>
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class DeleteCrossIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.cls-1 {
    fill: $color-primary;
}
.cls-2 {
    fill: none;
    stroke: $color-background;
    stroke-miterlimit: 10;
}
</style>

