<template>
  <div>
    <div
      class="input-field-wrap"
      :class="{ 'has-icon': this.$slots.default }"
      v-if="!disabled"
      v-bind:style="this.violatedRules ? 'border: 4px solid red;' : ''"
    >
      <v-text-field
        solo
        flat
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="valueChanged"
        @keyup.enter="submit"
        :maxlength="maxLength"
        :rules="rules"
      />
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
  @Prop({ default: Number.MAX_VALUE, type: Number }) maxLength!: number;
  @Prop() rules!: Array<(value: string) => boolean | string>;

  violatedRules = false;

  hasViolatedRules(value: any) {
    if (this.rules === undefined) {
      return false;
    }
    return this.rules.some(rule => {
      const result = rule(value);
      if (typeof result === 'boolean') {
        // True results mean a passed rule.
        return !result;
      }
      if (typeof result === 'string') {
        // If we have an error message, a rule has been violated.
        return true;
      }
    });
  }

  valueChanged(value: any) {
    this.violatedRules = this.hasViolatedRules(value);
    if (this.violatedRules) {
      return;
    }

    this.$emit('change', value);
  }

  submit(event: any) {
    this.violatedRules = this.hasViolatedRules(event.target.value);
    if (this.violatedRules) {
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
  border: 1px solid $color-primary;
  border-radius: 30px;
  align-items: center;

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

  .v-text-field ::v-deep {
    display: flex;
    margin: 0;

    .v-input__control {
      min-height: 32px;
      .v-input__slot {
        margin: 0;
        padding-left: 10px;
        border-radius: unset;
        background: unset;

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
}
</style>
