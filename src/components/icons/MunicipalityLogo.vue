<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155 171">
        <path class="st0" d="M14.3,9.7h121.3c0,0,0,69.7,0,78s-6.3,56.3-60.7,69.7c0,0-59.7-17-60.7-72V9.7H14.3z" />
        <path class="st1" d="M19.8,16.4h110.3c0,0,0,63.4,0,70.9s-5.8,51.2-55.2,63.4c0,0-54.3-15.5-55.2-65.5V16.4H19.8z" />
        <polygon class="st2" points="32.8,104.7 32.8,90 57.5,48 85.7,83.2 93.1,83.2 117.1,62.8 117.1,104.7 " />
        <circle class="st2" cx="104.6" cy="44.9" r="12.5" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class StarIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

svg {
  enable-background: new 0 0 155 171;
}

.st0 {
  fill: $color-background-grey;
}

.st1 {
  fill: none;
  stroke: $color-background;
  stroke-width: 3;
  stroke-miterlimit: 10;
}

.st2 {
  fill: $color-background;
}
</style>
