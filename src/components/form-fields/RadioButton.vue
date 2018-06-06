<template>
    <div class="radio-container">
        <div class="radio-input-wrapper">
            <input :value="this.radioValue" class="radio-input" type="radio" v-model="this.radioValue" checked="checked" :name="this.groupName">
        </div>
        <label class="radio-label">{{radioButtonLabel}}</label>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class RadioButton extends Vue {
  @Prop() public radioButtonLabel!: string;
  @Prop() public groupName!: string;
  @Prop() public radioValue!: string;
  isActive: boolean = false;
}
</script>

<style lang="scss" scoped>
.radio-container {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
}
.radio-input-wrapper {
  border-width: 1.3px;
  border-color: orange;
  border-style: solid;
  padding: 10px;
  height: 10px;
  width: 10px;
  margin: 10px;
  border-radius: 50%;
}
.radio-label {
  font-style: italic;
}
.radio-input {
  display: none;
}
</style>
