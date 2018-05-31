<template>
    <v-expansion-panel-content>
        <div slot="header">{{this.panelName}}</div>
        <slot></slot>
    </v-expansion-panel-content>     
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ExpansionContent extends Vue {
    @Prop() private panelName!: string;
}
</script>
