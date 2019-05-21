<template>
  <SelectionField
    class="size-select"
    :items="savedFilters"
    :type="'number'"
    :clearable="false"
    :dropdown="true"
    placeholder="Vælg fra gemte søgninger"
    @change="onFiltersSelected($event)"
    @action="dispatchDeleteSavedFilter($event)"
    :hasAction="true"
    actionIcon="delete"
  ></SelectionField>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { searchActionTypes } from '../../store/modules/search/actions';
import { SavedSearchFilters, SearchFilters } from '../../store/modules/search/state';
import { RootState } from '../../store/store';
import SelectionField from '../common/inputs/SelectionField.vue';

@Component({ components: { SelectionField } })
export default class SearchSelectSavedFilters extends Vue {
  @Action(searchActionTypes.LOAD_SAVED_FILTERS) dispatchLoadSavedFlters!: VoidFunction;
  @Action(searchActionTypes.ASSIGN_FILTERS) dispatchAssignFilters!: (filters: SearchFilters) => void;
  @Action(searchActionTypes.DELETE_SAVED_FILTER) dispatchDeleteSavedFilter!: (filters: SavedSearchFilters) => void;
  @State((state: RootState) => state.search.savedFilters) savedFilters!: SavedSearchFilters[];

  mounted() {
    this.dispatchLoadSavedFlters();
  }

  onFiltersSelected({ filters }: SavedSearchFilters) {
    this.dispatchAssignFilters(filters);
  }
}
</script>
