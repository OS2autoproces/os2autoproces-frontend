<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class RadioGroup extends Vue {
    @Prop() public value = null;
    @Prop() public name = '';

}
</script>

<style scoped lang='scss'>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
