<template>
  <SelectionField :disabled="disabled" :value="item" @change="setValues" :items="items" multiple />
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
    { value: DomainKeys.HEALTH, text: DomainLabels.HEALTH },
    { value: DomainKeys.ENVIRONMENT, text: DomainLabels.ENVIRONMENT },
    { value: DomainKeys.DEMOCRACY, text: DomainLabels.DEMOCRACY },
    { value: DomainKeys.ADMINISTRATION, text: DomainLabels.ADMINISTRATION },
    { value: DomainKeys.TECHNIQUE, text: DomainLabels.TECHNIQUE },
    { value: DomainKeys.IT, text: DomainLabels.IT },
    { value: DomainKeys.HR, text: DomainLabels.HR },
    { value: DomainKeys.ECONOMY, text: DomainLabels.ECONOMY },
    { value: DomainKeys.EDUCATION, text: DomainLabels.EDUCATION },
    { value: DomainKeys.FAMILY, text: DomainLabels.FAMILY },
    { value: DomainKeys.CULTURE, text: DomainLabels.CULTURE },
    { value: DomainKeys.PROFESSION, text: DomainLabels.PROFESSION },
    { value: DomainKeys.SOCIAL, text: DomainLabels.SOCIAL },
    { value: DomainKeys.SUSTAINABILITY, text: DomainLabels.SUSTAINABILITY },
    { value: DomainKeys.EMPLOYMENT, text: DomainLabels.EMPLOYMENT }
  ];
  @Watch('value')
  valueWatch(newValue: Domain[]) {
    // Check if value actually changed
    if (this.item.length === newValue.length && this.item.every((item, i) => newValue[i] === item.value)) {
      return;
    }

    this.mapValue();
  }

  mounted() {
    this.mapValue();
  }

  setValues(values: Item[]) {
    this.$emit('change', values.map(value => value.value));
  }

  mapValue() {
    this.item = (this.value || []).map(domain => this.items.find(item => item.value === domain)) as Item[];
  }
}
</script>

<style scoped lang="scss">
</style>
