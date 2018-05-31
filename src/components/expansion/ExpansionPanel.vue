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
