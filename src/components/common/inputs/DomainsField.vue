<template>
  <SelectionField :disabled="disabled" :value="item" @change="valueChanged" :items="items" multiple />
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import SelectionField from './SelectionField.vue';
import { DomainLabels, DomainKeys, Domain } from '@/models/domain';

interface Item {
  value: Domain;
  text: string;
}

@Component({
  components: {
    SelectionField
  }
})
export default class DomainsField extends Vue {
  @Prop(Array) value!: Domain[];
  @Prop(Boolean) disabled!: boolean;

  item: Item[] = [];

  items = [
    { value: DomainKeys.WORK, text: DomainLabels.WORK },
    { value: DomainKeys.HEALTH, text: DomainLabels.HEALTH },
    { value: DomainKeys.CHILDREN, text: DomainLabels.CHILDREN },
    { value: DomainKeys.ENVIRONMENT, text: DomainLabels.ENVIRONMENT },
    { value: DomainKeys.DEMOCRACY, text: DomainLabels.DEMOCRACY },
    { value: DomainKeys.ADMINISTRATION, text: DomainLabels.ADMINISTRATION }
  ];

  @Watch('value')
  valueWatch(newValue: Domain[]) {
    // Check if value actually changed
    if (this.item.length === newValue.length && this.item.every((item, i) => newValue[i] === item.value)) {
      return;
    }

    this.item = (this.value || []).map(domain => this.items.find(item => item.value === domain)) as Item[];
  }

  valueChanged(values: Item[]) {
    this.$emit('change', values.map(value => value.value));
  }
}
</script>

<style scoped lang="scss">
</style>
