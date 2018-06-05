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
export default class EmailField extends Vue {
  @Action('setEmail', { namespace })
  setEmail: any;

  inputValue: string = '';

  valueChanged(event: any) {
    this.setEmail(event.target.value);
  }
}
</script>

<style>
</style>
