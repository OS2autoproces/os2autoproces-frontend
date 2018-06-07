<template>
    <input :value="value" @input="valueChanged">
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class InputField extends Vue {
  @Prop() value!: string;

  valueChanged(event: any) {
    this.$emit("change", event.target.value);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
input {
  border: 1px solid $color-primary;
  border-radius: 30px;
  outline: none;
  padding-left: 10px !important;
  height: 32px;
  width: 100%;
}
</style>
