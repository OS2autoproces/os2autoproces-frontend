<template>
  <div class="selection-wrapper">
    <v-autocomplete class="selection-field" v-if="!disabled" :items="items" single-line @change="valueChanged" :value="value" :append-icon="iconName" :placeholder="placeholder" />
    <div class="selection-text" v-if="disabled">{{text}}</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

interface Item {
  text: string;
  value: any;
}

@Component
export default class SelectionField extends Vue {
  @Prop({ type: [Boolean, Object, String, Array] })
  value!: any;
  @Prop() items!: Item[];
  @Prop({ default: 'keyboard_arrow_down' })
  iconName!: string;
  @Prop() placeholder!: string;
  @Prop() disabled!: boolean;

  get text() {
    const item = this.items.find(i => i.value === this.value);
    return item ? item.text : '';
  }

  valueChanged(value: any) {
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.v-menu__activator,
.v-menu__activator--active {
  .v-input__append-inner {
    .v-input__icon,
    .v-input__icon--append {
      .theme--light .v-icon {
        color: $color-primary !important;
      }
    }
  }
}

.v-autocomplete /deep/ {
  padding-top: 0 !important;

  .input-group__selections__comma,
  input.input-group--select__autocomplete,
  .v-input__control {
    @include field-input-text;
    color: $color-text !important;
  }

  .input-group__slot {
    border: 1px solid $color-primary;
    border-radius: 20px;
    padding-left: 13px;
    flex: 1 1 100%;
    min-height: 2 * $size-unit;
  }

  .input-group__details {
    display: none;
  }
}

.selection-text {
  @include field-input-text;
}
</style>
