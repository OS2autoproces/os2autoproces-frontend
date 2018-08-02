<template>
  <div>
    <v-autocomplete v-if="!disabled" :clearable="clearable" :label="placeholder" :items="_items" single-line no-data-text="Ingen resultater" :item-text="itemText" :append-icon="iconName" :search-input.sync="searchQuery" @change="valueChanged" :value="value" return-object :multiple="multiple" />
    <div class="selection-text" v-if="disabled && value">{{ label }}</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class SelectionField<T extends any> extends Vue {
  searchQuery = '';

  @Prop([Boolean, Object, String, Array])
  value!: T;
  @Prop({ default: 'keyboard_arrow_down', type: String })
  iconName!: string;
  @Prop(Array) items!: T[];
  @Prop(Boolean) isItemsPartial!: boolean;
  @Prop(String) placeholder!: string;
  @Prop(Boolean) disabled!: boolean;
  @Prop(Boolean) clearable!: boolean;
  @Prop(Boolean) multiple!: boolean;
  @Prop({ type: String, default: 'text' })
  itemText!: string;

  get _items(): T[] {
    let items: T[] = [];

    if (this.items && this.items.length > 0) {
      items = this.items.slice();
    }

    if (this.isItemsPartial && this.value) {
      items.push(this.value);
    }

    return items;
  }

  get label() {
    if (Array.isArray(this.value)) {
      return this.value.map((item: any) => item[this.itemText]).join(', ');
    }

    return this.value[this.itemText];
  }

  @Watch('searchQuery')
  search(searchQuery: string) {
    if (searchQuery) {
      this.$emit('search', searchQuery);
    }
  }

  valueChanged(value: any) {
    value = value ? value : null;
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.v-autocomplete /deep/ {
  padding-top: 0 !important;
  margin: 0;

  .v-icon {
    color: $color-primary !important;
  }

  .v-input__slot {
    border: 1px solid $color-primary;
    border-radius: 20px;
    padding-left: 13px;
    flex: 1 1 100%;
    min-height: 2 * $size-unit;
    margin: 0;

    &::before,
    &::after {
      display: none !important;
    }

    input {
      @include field-input-text;
      color: $color-text !important;
    }
  }

  .v-text-field__details {
    display: none !important;
  }
}

.selection-text {
  @include field-input-text;
}
</style>
