<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32">
    <path d="M4,5A1,1,0,0,1,5,4H21l7,7V35a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5ZM6,34H26V12H21a1,1,0,0,1-1-1V6H6V34ZM9,16h5v6H9V16Zm7,0h7v2H16V16Zm0,4h7v2H16V20ZM9,24H23v2H9V24Zm0,4H19v2H9V28Z" transform="translate(-4 -4)" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class FileIcon extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

path {
  fill: $color-secondary;
}
</style>
