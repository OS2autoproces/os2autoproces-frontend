<template>
  <div>
    <v-select
      class="select-wrap"
      :class="{ hasError: hasError }"
      v-if="!disabled && dropdown"
      :items="_items"
      :value="value"
      return-object
      single-line
      :clearable="clearable"
      :placeholder="placeholder"
      @change="valueChanged"
      autocomplete="on"
    >
      <template slot="item" slot-scope="data">
        <SelectionFieldText :itemText="data.item[itemText]" :subText="data.item[itemSubText]" />
        <SelectionFieldAction v-if="hasAction" :actionIcon="actionIcon" @action="action(data.item)" />
      </template>
    </v-select>
    <v-autocomplete
      class="select-wrap"
      :class="{ hasError: hasError }"
      ref="autocomplete"
      v-if="!disabled && !dropdown"
      :clearable="clearable"
      :label="placeholder"
      :items="_items"
      single-line
      no-data-text="Ingen resultater"
      :item-text="itemText"
      :item-value="itemValue"
      :append-icon="iconName"
      :search-input.sync="searchQuery"
      @change="valueChanged"
      :value="value"
      return-object
      :multiple="multiple"
      :filter="filter"
    >
      <template slot="item" slot-scope="data">
        <SelectionFieldText :itemText="data.item[itemText]" :subText="data.item[itemSubText]" />
        <SelectionFieldAction v-if="hasAction" :actionIcon="actionIcon" @action="action(data.item)" />
      </template>
    </v-autocomplete>
    <div class="selection-text" :class="{ hasError: hasError }" v-if="disabled && value">{{ label }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import SelectionFieldText from './SelectionFieldText.vue';
import SelectionFieldAction from './SelectionFieldAction.vue';

type FilterFunctionType = (item: object, queryText: string, itemText: string) => boolean;

@Component({ components: { SelectionFieldText, SelectionFieldAction } })
export default class SelectionField<T extends any> extends Vue {
  searchQuery = '';

  @Prop([Boolean, Object, String, Array, Number])
  value!: T;
  @Prop({ default: 'keyboard_arrow_down', type: String })
  iconName!: string;
  @Prop(Array)
  items!: T[];
  @Prop(Boolean)
  isItemsPartial!: boolean;
  @Prop(String)
  placeholder!: string;
  @Prop(Boolean)
  disabled!: boolean;
  @Prop(Boolean)
  clearable!: boolean;
  @Prop(Boolean)
  multiple!: boolean;
  @Prop({ type: String, default: 'text' })
  itemText!: string;
  @Prop({ type: String })
  itemSubText!: string;
  @Prop({ type: String, default: 'id' })
  itemValue!: string;
  @Prop({ type: Boolean, default: false })
  dropdown!: boolean;
  @Prop({ type: Boolean, default: false }) hasAction!: boolean;
  @Prop({ type: String, default: 'info' }) actionIcon!: string;
  @Prop(Boolean) hasError!: boolean;
  @Prop(Function) filter!: FilterFunctionType;

  @Emit()
  action(item: T) {
    return item;
  }

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
    // @ts-ignore
    return this.value[this.itemText] + (this.value[this.itemSubText] ? ' (' + this.value[this.itemSubText] + ')' : '');
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

  clear() {
    (this.$refs.autocomplete as any).clearableCallback();
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.select-wrap ::v-deep {
  padding-top: 0 !important;
  margin: 0;

  .v-icon {
    color: $color-primary !important;
  }

  .v-input__slot {
    border: 1px solid $color-primary;
    background: $color-background;
    border-radius: 20px;
    padding-left: 13px;
    flex: 1 1 auto;
    min-height: 2rem;
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
.hasError::v-deep {
  .v-input__slot {
    border-color: $color-error;
    border-width: 0.1em;
  }
}

.selection-text {
  @include field-input-text;

  &.has-error {
    border: 0.2em solid $color-error;
    border-width: 0.2em;
    min-height: 50px;
    border-radius: 20px;
  }
}
</style>
