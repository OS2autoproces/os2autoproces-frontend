<template>
  <SelectionField
    class="size-select"
    :items="savedFilters"
    :type="'number'"
    :clearable="true"
    :dropdown="true"
    placeholder="Vælg fra gemte søgninger"
    @change="onFiltersSelected($event)"
    @action="dispatchDeleteSavedFilter($event)"
    :hasAction="true"
    :value="selectedSavedFilters"
    actionIcon="delete"
  ></SelectionField>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { searchActionTypes } from '../../store/modules/search/actions';
import { SavedSearchFilters, SearchFilters } from '../../store/modules/search/state';
import { RootState } from '../../store/store';
import SelectionField from '../common/inputs/SelectionField.vue';

@Component({ components: { SelectionField } })
export default class SearchSelectSavedFilters extends Vue {
  @Action(searchActionTypes.LOAD_SAVED_FILTERS) dispatchLoadSavedFlters!: VoidFunction;
  @Action(searchActionTypes.SELECT_SAVED_FILTERS) dispatchSelectSavedFilters!: (
    filters: SavedSearchFilters | null
  ) => void;
  @Action(searchActionTypes.DELETE_SAVED_FILTER) dispatchDeleteSavedFilter!: (filters: SavedSearchFilters) => void;
  @State((state: RootState) => state.search.savedFilters) savedFilters!: SavedSearchFilters[];
  @State(({ search: { savedFilters, selectedSavedFiltersText } }: RootState) => {
    if (!savedFilters) {
      return null;
    }
    return savedFilters.find(f => f.text === selectedSavedFiltersText) || null;
  })
  selectedSavedFilters?: SavedSearchFilters | null;

  mounted() {
    this.dispatchLoadSavedFlters();
  }

  onFiltersSelected(filters: SavedSearchFilters) {
    this.dispatchSelectSavedFilters(filters);
  }
}
</script>
