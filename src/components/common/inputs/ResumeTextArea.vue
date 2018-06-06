<template>
    <textarea :value="value" @blur="valueChanged" />
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'generalInformation';

@Component
export default class ResumeTextArea extends Vue {
  @Action('setResume', { namespace })
  setResume: any;

  value: string = '';

  valueChanged(event: any) {
    this.setResume(event.target.value);
  }
}
</script>

<style>
</style>
