<template>
    <div>
        <p>Resumé: </p>
        <textarea type="text" v-model="inputValue" @blur="valueChanged" />
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'generalInformation';

@Component
export default class ResumeTextArea extends Vue {
  @Action('setResume', { namespace })
  setResume: any;

  inputValue: string = '';

  valueChanged(event: any) {
    this.setResume(event.target.value);
  }
}
</script>

<style>
</style>
