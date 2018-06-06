<template>
    <div class="selectionContainer">
        <p>Fagområde: </p>
        <v-select
          :items="fields"
          single-line
          @change="setField"
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
    @Action('setField', {namespace}) setField: any;

    fields = [
        'Teknik',
        'Diverse',
        'ETC'
    ];
}
</script>

<style lang="scss">
</style>
