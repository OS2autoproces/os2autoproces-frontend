<template>
    <div>
        <input type="text" v-model="inputValue" @input="valueChanged">
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'generalInformation';

@Component
export default class ProjectManagerField extends Vue {
  @Action('setProjectManager', { namespace })
  setProjectManager: any;

  inputValue: string = '';

  valueChanged(event: any) {
    this.setProjectManager(event.target.value);
  }
}
</script>

<style>
</style>
