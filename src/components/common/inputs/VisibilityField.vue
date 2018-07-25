<template>
  <SelectionField :disabled="disabled" :value="item" @change="valueChanged" :items="items" />
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import SelectionField from './SelectionField.vue';
import { VisibilityLabels, VisibilityKeys, Visibility } from '@/models/visibility';

@Component({
  components: {
    SelectionField
  }
})
export default class VisibilityField extends Vue {
  @Prop(String) value!: Visibility;
  @Prop(Boolean) disabled!: boolean;

  get item() {
    return {
      value: this.value,
      text: VisibilityLabels[this.value]
    };
  }

  items = [
    { value: VisibilityKeys.PERSONAL, text: VisibilityLabels.PERSONAL },
    { value: VisibilityKeys.MUNICIPALITY, text: VisibilityLabels.MUNICIPALITY },
    { value: VisibilityKeys.PUBLIC, text: VisibilityLabels.PUBLIC }
  ];

  valueChanged({ value }: { value: Visibility }) {
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
</style>
