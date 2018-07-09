<template>
  <div>
    <div class="input-field-wrap" :class="{'has-icon': this.$slots.default }" v-if="!disabled">
      <input :placeholder="placeholder" :value="value" @input="valueChanged" @keyup.enter="submit">
      <div class="icon" v-if="this.$slots.default">
        <slot />
      </div>
    </div>
    <div v-if="disabled">{{value}}</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
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

  &.has-icon {
    padding-right: 2px;
  }

  .icon {
    margin-right: 3px;
    /deep/ svg {
      height: 17px;
      width: 17px;
    }
  }

  input {
    @include field-input-text;
    padding-left: 10px !important;
    height: 32px;
    width: 100%;
  }
}
</style>
