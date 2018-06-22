<template>
  <div class="selection-wrapper">
    <v-select class="selection-field" v-if="!disabled" :items="items" single-line @change="valueChanged" autocomplete :value="value" :append-icon="iconName" :placeholder="placeholder" />
    <div class="selection-text" v-if="disabled">{{value}}</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class SelectionField extends Vue {
  @Prop() value!: string;
  @Prop() items!: string[];
  @Prop({ default: 'keyboard_arrow_down' })
  iconName!: string;
  @Prop() placeholder!: string;
  @Prop() disabled!: boolean;

  valueChanged(value: any) {
    if (typeof value === 'string') {
      this.$emit('change', value);
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.input-group--autocomplete /deep/ {
  padding-top: 0 !important;

  .input-group__selections__comma,
  input.input-group--select__autocomplete {
    @include field-input-text;
    color: $color-text !important;
  }

  .input-group__input {
    border: 1px solid $color-primary;
    border-radius: 20px;
    padding-left: 13px;
    flex: 1 1 100%;
    min-height: 2 * $size-unit;

    .icon {
      color: $color-primary !important;
    }
  }

  .input-group__details {
    display: none;
  }
}

.selection-text {
  @include field-input-text;
}
</style>
