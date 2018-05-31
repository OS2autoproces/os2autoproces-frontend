<template>
    <v-expansion-panel>
        <slot></slot>
    </v-expansion-panel>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ExpansionItem extends Vue {
}
</script>

<style lang="scss" scoped>
    .expansion-panel {
        color: orange;
        padding: 10px;
        margin: 10px;
        box-shadow: none;
    }
</style>
