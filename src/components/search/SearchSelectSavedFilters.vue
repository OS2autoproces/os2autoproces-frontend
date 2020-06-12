<template>
  <SelectionField
    class="size-select"
    :items="savedFilters"
    :type="'number'"
    :clearable="true"
    :dropdown="true"
    placeholder="Vælg fra gemte søgninger"
    @change="onFiltersSelected($event)"
    :hasAction="true"
    @action="deleteFilters($event)"
    :value="selectedSavedFilters"
    actionIcon="delete"
  ></SelectionField>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { SavedSearchFilters, SearchFilters } from '@/store/modules/searchInterfaces';
import SelectionField from '../common/inputs/SelectionField.vue';
import { SearchModule } from '@/store/modules/search';

@Component({ components: { SelectionField } })
export default class SearchSelectSavedFilters extends Vue {
  mounted() {
    SearchModule.loadSavedFilters();
  }

  onFiltersSelected(filters: SavedSearchFilters) {
    SearchModule.selectSavedFilters(filters);
  }

  deleteFilters(filters: SavedSearchFilters) {
    SearchModule.deleteSavedFilter(filters);
  }

  get selectedSavedFilters() {
    return SearchModule.selectedSavedFiltersText;
  }

  get savedFilters() {
    return SearchModule.savedFilters;
  }
}
</script>
