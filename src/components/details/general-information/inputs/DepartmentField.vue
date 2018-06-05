<template>
    <div class="inputContainer">
        <p>Afdeling:</p>
        <input type="text" v-model="inputValue" @input="valueChanged">
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'generalInformation';

@Component
export default class ParagrafField extends Vue {
  @Action('setDepartment', { namespace })
  setDepartment: any;

  inputValue: string = '';

  valueChanged(event: any) {
    this.setDepartment(event.target.value);
  }
}
</script>

<style lang="scss">
@import '@/styles/text-input.scss';
</style>
