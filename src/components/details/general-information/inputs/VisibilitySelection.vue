<template>
    <div class="selectionContainer">
        <p>Synlighed:</p>
        <v-select
          :items="visibilityItems"
          single-line
          @change="setVisibility"
          autocomplete
        >
        </v-select>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'generalInformation';

@Component
export default class FieldSelection extends Vue {
    @Action('setVisibility', {namespace}) setVisibility: any;

    visibilityItems = [
        'Privat',
        'Tværkommunalt',
        'Kommunalt'
    ];
}
</script>

<style lang="scss">
</style>
