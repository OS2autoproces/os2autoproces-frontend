<template>
    <div class="inputContainer">
        <p>Kontanktperson:</p>
        <input type="text" v-model="inputValue" @input="valueChanged"> 
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'generalInformation';

@Component
export default class ContactPersonField extends Vue {
  @Action('setContactPerson', { namespace })
  setContactPerson: any;

  inputValue: string = '';

  valueChanged(event: any) {
    this.setContactPerson(event.target.value);
  }
}
</script>

<style lang="scss">
@import '@/styles/text-input.scss'; 
</style>
