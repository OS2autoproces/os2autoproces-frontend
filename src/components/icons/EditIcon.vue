<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.87 67.07">
        <path d="M19.7,92.6L22,70.8,54.9,37.9l4.2,4.2L27.7,73.4,26.4,85.8l12.4-1.3L70.1,53.2l4.2,4.2L41.4,90.1ZM37.2,79.3L66.8,49.7l-4.2-4.2L33,75l4.2,4.3h0Zm40-24.7L57.7,35l7-7a8.15,8.15,0,0,1,11.7,0l7.7,7.7a8.15,8.15,0,0,1,0,11.7l-6.9,7.2h0ZM80,43.3a2.48,2.48,0,0,0,0-3.4l-7.6-7.6a2.48,2.48,0,0,0-3.4,0l-2.8,2.8,11,11Z" transform="translate(-19.7 -25.52)" />
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
