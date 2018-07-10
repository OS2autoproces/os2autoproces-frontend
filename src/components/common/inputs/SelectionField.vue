<template>
  <div>
    <v-autocomplete v-if="!disabled" :items="items" single-line @change="valueChanged" :value="value" :append-icon="iconName" :placeholder="placeholder" :search-input.sync="search" />
    <div class="selection-text" v-if="disabled">{{text}}</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

interface Item {
  text: string;
  value: any;
}

@Component
export default class SelectionField extends Vue {
  search = '';
  @Prop({ type: [Boolean, Object, String, Array] })
  value!: any;
  @Prop() items!: Item[];
  @Prop({ default: 'keyboard_arrow_down' })
  iconName!: string;
  @Prop() placeholder!: string;
  @Prop() disabled!: boolean;
  @Watch('search')
  function(search: string) {
    if (search) {
      this.$emit('search', search);
    }
  }

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
      height: 0;
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
