<template>
    <div class="star-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.15 34.38">
            <polygon points="18.07 1.13 23.33 11.77 35.07 13.48 26.57 21.77 28.58 33.46 18.07 27.94 7.57 33.46 9.57 21.77 1.07 13.48 12.82 11.77 18.07 1.13" />
        </svg>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class StarIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

polygon {
  fill: #fff;
  stroke: $color-secondary;
  stroke-miterlimit: 10;
}

.selected polygon {
  fill: $color-star;
  stroke: $color-star;
}
</style>
