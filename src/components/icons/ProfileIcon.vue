<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.43 34.43">
        <path d="M95.22,51.34A17.23,17.23,0,1,0,81.1,68.28a16.65,16.65,0,0,0,8.1-3.91,0.92,0.92,0,0,0,.22-0.2A17.77,17.77,0,0,0,95.22,51.34ZM64.79,43.27a15.46,15.46,0,0,1,28.66,8.07,15.91,15.91,0,0,1-4.71,11.09C85.07,57.91,79.91,54.5,74,57a17.51,17.51,0,0,0-6.79,5.4,15.27,15.27,0,0,1-1.08-1.15A15.6,15.6,0,0,1,64.79,43.27Zm3.75,20.29a16.55,16.55,0,0,1,5.16-4.46c5.4-2.93,10.29.18,13.72,4.47a15.08,15.08,0,0,1-4.28,2.34A15.62,15.62,0,0,1,68.54,63.56Z" transform="translate(-60.78 -34.12)" />
        <path d="M77.93,55A7.26,7.26,0,0,0,85.08,48a1.33,1.33,0,0,0,0-.45A7.17,7.17,0,1,0,77.93,55Zm0-12.58a5.41,5.41,0,1,1-5.41,5.41A5.48,5.48,0,0,1,77.93,42.37Z" transform="translate(-60.78 -34.12)" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class ProfileIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

path {
  fill: $color-background;
}
</style>
