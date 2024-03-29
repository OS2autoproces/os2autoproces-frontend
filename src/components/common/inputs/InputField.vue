<template>
  <div>
    <div
      class="input-field-wrap"
      :class="{
        'has-icon': this.$slots.default,
        'has-error': this.hasError || this.hasViolatedRules,
        'out-of-bounds': currentLength > maxLength
      }"
      v-if="!disabled"
    >
      <v-text-field
        solo
        flat
        :type="type"
        :placeholder="placeholder"
        :value="valueSynced"
        @input="valueChanged"
        @keyup.enter="submit"
        :rules="rules"
      />

      <div class="icon" v-if="this.$slots.default">
        <slot />
      </div>

      <div class="input-field-overlay">
        <div class="input-field-char-count" v-if="maxLength">({{ currentLength }} ud af {{ maxLength }} tegn)</div>
      </div>
    </div>
    <div class="disabled-flex" :class="{ 'has-error': hasError }" v-if="disabled">
      {{ value }}
      <span>
        <slot />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator';

type Rule = (value: string) => boolean | string;

@Component({})
export default class InputField extends Vue {
  @PropSync('value', { required: false, type: String, default: '' })
  valueSynced!: string;
  @Prop(String)
  placeholder!: string;
  @Prop(String)
  type!: string;
  @Prop(Boolean)
  disabled!: boolean;
  @Prop({ default: () => [], required: false, type: Array as () => Rule[] })
  rules!: Rule[];
  @Prop(Boolean)
  hasError!: boolean;
  @Prop(Number)
  maxLength!: number;

  currentInput = '';

  mounted() {
    this.currentInput = this.valueSynced;
  }

  checkRules(value: any): boolean {
    return this.rules?.some(rule => {
      return !(rule(value) === true);
    });
  }

  get hasViolatedRules(): boolean {
    return this.checkRules(this.currentInput);
  }

  get currentLength() {
    return this.valueSynced?.length ?? 0;
  }

  valueChanged(value: any) {
    this.currentInput = value;
    if (this.checkRules(value)) {
      return;
    }
    this.$emit('change', value);
  }

  submit(event: any) {
    this.currentInput = event.target.value;
    if (this.checkRules(event.target.value)) {
      return;
    }
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
  background: $color-background;
  border-radius: 20px;

  &.has-error {
    border-color: $color-error;
    border-width: 0.1em;
  }

  &.out-of-bounds {
    border-color: $color-error;
    box-shadow: inset 0 0 8px rgb(235, 98, 98);

    .input-field-overlay > .input-field-char-count {
      color: $color-error;
    }
  }

  .input-field-overlay {
    display: inline-block;
    position: relative;
    right: 0.5rem;
    text-align: right;

    font-family: 'Lato', Arial, 'Helvetica Neue', Helvetica, sans-serif;
    font-weight: 500;
    letter-spacing: 0.04em;
    font-size: 1rem;
  }

  &.has-icon {
    padding-right: 2px;
  }

  .icon {
    margin: 5px;
    height: 20px;
    width: 30px;
    flex: 0 0 auto;

    ::v-deep svg {
      height: 20px;
      width: 20px;
    }
  }

  .v-text-field ::v-deep {
    display: flex;
    margin: 0;

    .v-input__control {
      min-height: 32px;
      .v-input__slot {
        margin: 0;
        padding-left: 10px;
        border-radius: 0;
        background: none;

        &::before,
        &::after {
          display: none !important;
        }
      }

      .v-text-field__details {
        display: none;
      }

      input {
        @include field-input-text;
        color: $color-text !important;
      }
    }
  }
}

.disabled-flex {
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;

  &.has-error {
    border: 0.2em solid $color-error;
    border-width: 0.2em;
    min-height: 50px;
    border-radius: 20px;
  }
}
</style>
