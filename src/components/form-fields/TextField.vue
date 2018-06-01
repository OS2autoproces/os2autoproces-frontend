<template>
    <input v-model="inputVal" type="number" @input="validate()">
</template>

<script lang="ts">
interface Validatable {
  // data:
  errorBucket: Array<false | string>;
  shouldValidate: boolean;
  valid: boolean;

  // methods:
  validate: (force?: boolean, value?: any) => boolean;
  reset: () => void;
}

import { Vue, Component } from 'vue-property-decorator';


@Component
export default class TextFieldComponent extends Vue {
    errorBucket = [];
    inputVal = 0;
    valid = false;

    validate(force: boolean = false, value?: any): boolean {
      this.valid = this.inputVal < 100;
      return this.valid;
    }


}

</script>

<style>

</style>
