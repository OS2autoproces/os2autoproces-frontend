<template>
    <div class="contactContainer">
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

<style>
  .contactContainer {
    display: flex;
    flex-direction: row;
    background-color: aquamarine;
    align-items: center;

  }
  input {
    border: 1.4px solid orange;
    border-radius: 50px;
    padding: 3px;
    outline: none;
    padding-left: 10px;
  }
</style>
