<template>
  <div>
    <div class="input-field-wrap" :class="{ 'has-icon': this.$slots.default, hasError: hasError }" v-if="!disabled">
      <input :type="type" :placeholder="placeholder" :value="value" @input="valueChanged" @keyup.enter="submit" />
      <div class="icon" v-if="this.$slots.default">
        <slot />
      </div>
    </div>
    <div class="disabled-flex" v-if="disabled">
      {{ value }}
      <span>
        <slot />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class InputField extends Vue {
  @Prop(String) value!: string;
  @Prop(String) placeholder!: string;
  @Prop(String) type!: string;
  @Prop(Boolean) disabled!: boolean;
  @Prop(Boolean) hasError!: boolean;

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
  border-radius: 30px;
  align-items: center;
  border: 1px solid $color-primary;

  &.hasError {
    border-color: $color-error;
  }
  &.has-icon {
    padding-right: 2px;
  }

  .icon {
    margin: 5px;
    height: 20px;
    width: 20px;
    flex: 0 0 auto;

    ::v-deep svg {
      height: 20px;
      width: 20px;
    }
  }

  input {
    @include field-input-text;
    padding-left: 10px !important;
    height: 32px;
    width: 100%;
  }
}

.disabled-flex {
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
}
</style>
