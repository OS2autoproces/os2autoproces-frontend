<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.92 30.82">
        <path d="M72.6,55.18L63.53,46.1a2.51,2.51,0,0,0-.91-0.6,11.52,11.52,0,0,0,1.79-5.91,11,11,0,1,0-9,10.82,10.61,10.61,0,0,0,4.05-1.64,2.54,2.54,0,0,0,.57.84l9.07,9.07C71.35,60.95,74.86,57.44,72.6,55.18ZM53.4,48.94a9.35,9.35,0,1,1,9.35-9.35A9.43,9.43,0,0,1,53.4,48.94Z" transform="translate(-42.41 -28.6)" />
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
