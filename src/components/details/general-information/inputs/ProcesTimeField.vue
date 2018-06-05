<template>
    <div class="inputContainer">
        <p>Årlig procestid: </p>
        <input type="text" v-model="inputValue" @input="valueChanged">
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'generalInformation';

@Component
export default class ProcesTimeField extends Vue {
  @Action('setProcesTime', { namespace })
  setProcesTime: any;

  inputValue: string = '';

  valueChanged(event: any) {
    this.setProcesTime(event.target.value);
  }
}
</script>

<style lang="scss">
@import '@/styles/text-input.scss';
</style>
