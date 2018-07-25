<template>
  <SelectionField :disabled="disabled" :value="item" @change="valueChanged" :items="items" />
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import SelectionField from './SelectionField.vue';

interface Item<T> {
  value: T;
  text: string;
}

@Component({
  components: {
    SelectionField
  }
})
export default class MappedSelectionField<T> extends Vue {
  @Prop([Boolean, String, Number, Array, Object])
  value!: T;
  @Prop(Boolean) disabled!: boolean;
  @Prop(Array) items!: Array<Item<T>>;

  get item() {
    const item = this.items.find(i => i.value === this.value);

    return {
      value: this.value,
      text: item ? item.text : ''
    };
  }

  valueChanged({ value }: Item<T>) {
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
</style>
