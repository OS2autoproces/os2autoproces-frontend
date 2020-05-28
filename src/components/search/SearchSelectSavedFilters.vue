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
import { SavedSearchFilters, SearchFilters, SearchModule } from '@/store/modules/search';
import SelectionField from '../common/inputs/SelectionField.vue';

@Component({ components: { SelectionField } })
export default class SearchSelectSavedFilters extends Vue {
  mounted() {
    SearchModule.loadSavedFilters();
  }

  onFiltersSelected(filters: SavedSearchFilters) {
    SearchModule.selectSavedFilters(filters);
  }
}
</script>
