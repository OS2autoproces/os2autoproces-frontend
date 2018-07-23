<template>
  <div>
    <v-autocomplete v-if="!disabled" :label="placeholder" :items="_items" single-line no-data-text="Ingen resultater" :item-text="itemText" :append-icon="iconName" :search-input.sync="searchQuery" @change="valueChanged" :value="value" cache-items return-object />
    <div class="selection-text" v-if="disabled && value">{{ value[itemText] || value }}</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class SelectionField<T extends any> extends Vue {
  searchQuery = '';

  @Prop({ type: [Boolean, Object, String, Array] })
  value!: T;
  @Prop({ default: 'keyboard_arrow_down' })
  iconName!: string;
  @Prop() items!: T[];
  @Prop() itemText!: string;
  @Prop() placeholder!: string;
  @Prop() disabled!: boolean;

  private get _items(): T[] {
    let items: T[] = [];

    if (this.items && this.items.length > 0) {
      items = this.items.slice();
    }

    if (this.value) {
      items.push(this.value);
    }

    return items;
  }

  @Watch('searchQuery')
  search(searchQuery: string) {
    if (searchQuery) {
      this.$emit('search', searchQuery);
    }
  }

  valueChanged(value: any) {
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
