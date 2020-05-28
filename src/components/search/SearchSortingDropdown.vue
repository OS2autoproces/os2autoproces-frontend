<template>
  <div class="wrap">
    <span>Sortér efter</span>
    <SelectionField
      class="sort-select"
      :value="formattedOption"
      :items="options"
      :clearable="false"
      :dropdown="true"
      @change="updateFilters({ sorting: $event.value })"
    ></SelectionField>
    <excelBtn></excelBtn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  SortingOption,
  SearchFilters,
  SearchResultProcess,
  SortingOptionParams,
  SearchModule
} from '@/store/modules/search';
import SelectionField from '../common/inputs/SelectionField.vue';
import { State, Action } from 'vuex-class';
import { isEqual } from 'lodash';
import excelBtn from '@/components/search/ExcelBtn.vue';

interface DropdownSortingOption {
  text: string;
  ascLabel?: string;
  descLabel?: string;
  value: SortingOption;
}

@Component({
  components: {
    SelectionField,
    excelBtn
  }
})
export default class SearchSortingDropdown extends Vue {
  ascLabel = ', lavest';
  descLabel = ', højest';

  keys: Array<{ property: keyof SortingOptionParams; text: string; ascLabel?: string; descLabel?: string }> = [
    { property: 'created', text: 'Seneste tilføjede' },
    { property: 'rating', text: 'Vurderet potentiale', ascLabel: this.ascLabel, descLabel: this.descLabel },
    { property: 'title', text: 'Proces', ascLabel: ', A-Z', descLabel: ', Z-A' }
  ];

  options: DropdownSortingOption[] = this.keys.reduce(
    (options: DropdownSortingOption[], { property, text, ascLabel, descLabel }) => {
      return ascLabel && descLabel
        ? [
            ...options,
            { text: `${text}${ascLabel}`, value: { property, descending: false } },
            { text: `${text}${descLabel}`, value: { property, descending: true } }
          ]
        : [...options, { text: `${text}`, value: { property, descending: true } }];
    },
    []
  );

  get formattedOption(): DropdownSortingOption {
    return (
      this.options.find(({ value: { property } }) => property === SearchModule.filters.sorting.property) || {
        text: `Ukendt søgeparameter: ${SearchModule.filters.sorting.property}`,
        value: SearchModule.filters.sorting
      }
    );
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  align-items: center;
  .sort-select {
    margin-left: 1rem;
    min-width: 13rem;
  }
}
</style>
