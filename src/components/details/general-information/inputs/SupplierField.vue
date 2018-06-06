
<template>
    <div class="inputContainer">
        <p>Leverandør:</p>
        <input type="text" v-model="inputValue" @input="valueChanged">
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'generalInformation';

@Component
export default class SupplierField extends Vue {
  @Action('setSupplier', { namespace })
  setSupplier: any;

  inputValue: string = '';

  valueChanged(event: any) {
    this.setSupplier(event.target.value);
  }
}
</script>

<style lang="scss">
</style>
