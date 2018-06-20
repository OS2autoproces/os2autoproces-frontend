<template>
    <div class="well-item-wrap">
        <div class="well-item-label">{{label}}</div>
        <slot class="well-input" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class WellItem extends Vue {
@Prop() label!: string;
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.well-item-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: $size-unit;

    .well-item-label {
        width: 70%;
    }

    .well-input {
        width: 30%;
    }
}
</style>
