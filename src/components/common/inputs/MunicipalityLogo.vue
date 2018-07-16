<template>
    <img :src="src" @error="src = '/logos/placeholder.png'" alt="Kommune logo" class="image">
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MunicipalityLogoComponent extends Vue {
  @Prop()
  src!: string;
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
    .image {
        height: 85px;
        margin: $size-unit/2;
    }
</style>
