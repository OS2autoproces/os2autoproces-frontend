<template>
    <div class="inputContainer">
        <p>Lov og paragraf: </p>
        <input type="text" v-model="inputValue" @input="valueChanged">
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'generalInformation';

@Component
export default class ParagrafField extends Vue {
  @Action('setParagraf', { namespace })
  setParagraf: any;

  inputValue: string = '';

  valueChanged(event: any) {
    this.setParagraf(event.target.value);
  }
}
</script>

<style lang="scss">
@import '@/styles/text-input.scss';
</style>
