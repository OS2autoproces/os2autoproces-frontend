<template>
  <div>
    <v-text-field
      v-if="!disabled"
      :value="value"
      v-mask="mask"
      @input="valueChanged($event)"
      :class="{ 'has-error': hasError }"
    />
    <div v-if="disabled" :class="{ 'has-error': hasError }">{{ value }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class MaskableInputComponent extends Vue {
  @Prop(String) mask!: string;
  @Prop(String) value!: string;
  @Prop(Boolean) disabled!: boolean;
  @Prop(Boolean) hasError!: boolean;

  valueChanged(value: any) {
    this.$emit('change', value);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.v-text-field ::v-deep {
  display: flex;
  border: 1px solid $color-primary;
  border-radius: 30px;
  align-items: center;
  margin: 0;

  .v-input__control {
    .v-input__slot {
      margin: 0;
      padding-left: 10px;

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
.has-error::v-deep {
  .v-input__slot {
    border-color: $color-error;
    border-width: 0.1em;
  }
}
</style>
