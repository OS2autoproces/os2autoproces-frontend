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
import { SortingOption, SearchFilters, SearchResultProcess } from '@/store/modules/search/state.ts';
import SelectionField from '../common/inputs/SelectionField.vue';
import { State, Action } from 'vuex-class';
import { RootState } from '../../store/store';
import { searchActionTypes } from '@/store/modules/search/actions';
import { isEqual } from 'lodash';
import excelBtn from '@/components/search/ExcelBtn.vue';

interface DropdownSortingOption {
  text: string;
  value: SortingOption;
}

@Component({
  components: {
    SelectionField,
    excelBtn
  }
})
export default class SearchSortingDropdown extends Vue {
  @State((state: RootState) => state.search.filters.sorting) selectedOption!: SortingOption;
  @Action(searchActionTypes.UPDATE_FILTERS) updateFilters!: (filters: Partial<SearchFilters>) => Promise<void>;

  ascLabel = ', stigende';
  descLabel = ', faldende';

  keys: Array<{ property: keyof SearchResultProcess; text: string }> = [
    { property: 'lastChanged', text: 'Sidst ændret' },
    { property: 'title', text: 'Proces' },
    { property: 'rating', text: 'Vurderet potentiale' },
    { property: 'status', text: 'Status' }
  ];

  options: DropdownSortingOption[] = this.keys.reduce(
    (options: DropdownSortingOption[], { property, text }) => [
      ...options,
      { text: `${text}${this.ascLabel}`, value: { property, descending: false } },
      { text: `${text}${this.descLabel}`, value: { property, descending: true } }
    ],
    []
  );

  get formattedOption(): DropdownSortingOption {
    return (
      this.options.find(option => isEqual(option, this.selectedOption)) || {
        text: `Ukendt søgeparameter: ${this.selectedOption.property}`,
        value: this.selectedOption
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
  }
}
</style>

