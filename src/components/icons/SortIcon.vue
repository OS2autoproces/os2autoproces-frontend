<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.81 25.99" :class="{ descending }">
        <polygon class="ascending" points="11.4 25.73 8.71 25.73 8.71 6.5 1.9 13.3 0 11.4 11.4 0 11.4 25.73" />
        <polygon class="descending" points="18.41 25.99 18.41 0.26 21.11 0.26 21.11 19.5 27.91 12.69 29.81 14.6 18.41 25.99" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SortIcon extends Vue {
  @Prop() descending!: boolean;
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

polygon {
  fill: $color-primary;
}

svg.descending polygon.ascending,
svg:not(.descending) polygon.descending {
  fill: none;
}
</style>
