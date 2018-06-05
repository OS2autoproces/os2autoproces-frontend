<template>
    <div class="selectionContainer">
        <p>KLE nummer: </p>
        <v-select
          :items="kleNumbers"
          v-model="selected"
          single-line
          @change="setKleNumber"
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
export default class KleNumberField extends Vue {
    @Action('setKleNumber', { namespace }) setKleNumber: any;
    
    kleNumbers: string[] = [];
    selected: string = '';

    mounted() {
        // fetch KLE-Numbers
        this.kleNumbers = [
            '12312',
            '12453',
            '67534',
        ];
    }
}
</script>

<style lang="scss">
@import '@/styles/selection-input.scss';
</style>
