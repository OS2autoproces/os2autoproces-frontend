<template>
  <div>
    <div class="input-field-wrap" v-if="!disabled">
      <input :placeholder="placeholder" :value="value" @input="valueChanged" @keyup.enter="submit">
      <div class="icon">
        <slot />
      </div>
    </div>
    <div v-if="disabled">{{value}}</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class InputField extends Vue {
  @Prop() value!: string;
  @Prop() placeholder!: string;
  @Prop() disabled!: boolean;

  valueChanged(event: any) {
    this.$emit('change', event.target.value);
  }

  submit(event: any) {
    this.$emit('submit', event.target.value);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.input-field-wrap {
  display: flex;
  border: 1px solid $color-primary;
  border-radius: 30px;
  align-items: center;
  padding-right: 7px;

  .icon {
    height: 20px;
    width: 20px;
  }

  input {
    @include field-input-text;
    padding-left: 10px !important;
    padding-right: 5px;
    height: 32px;
    width: 90%;
  }
}
</style>
