<template>
  <SelectionField :disabled="disabled" :value="item" @change="valueChanged" :items="items" />
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import SelectionField from './SelectionField.vue';

@Component({
  components: {
    SelectionField
  }
})
export default class MappedSelectionField<T> extends Vue {
  @Prop(String) value!: T;
  @Prop(Boolean) disabled!: boolean;
  @Prop(Array) items!: { value: T; text: string }[];

  get item() {
    const item = this.items.find(item => item.value === this.value);

    return {
      value: this.value,
      text: item ? item.text : ''
    };
  }

  valueChanged({ value }: { value: T; text: string }) {
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
</style>
