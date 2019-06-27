<template>
  <ExpandPanel title="Skedulering">
    <SearchOption
      :value="filters.runPeriod.ONCE"
      @change="updateFiltersOnceRunPeriod($event)"
    >Engangskørsel</SearchOption>
    <SearchOption
      :value="filters.runPeriod.ONDEMAND"
      @change="updateFiltersRecurringRunPeriod($event)"
    >Løbende kørsel</SearchOption>
  </ExpandPanel>
</template>


<script lang="ts">
import { SearchFilters } from '@/store/modules/search/state';
import { Vue, Prop, Component } from 'vue-property-decorator';
import { searchActionTypes } from '@/store/modules/search/actions';
import { Action, State } from 'vuex-class';
import SearchOption from './SearchOption.vue';
import ExpandPanel from '../common/ExpandPanel.vue';
import { RootState } from '@/store/store';

@Component({
  components: {
    ExpandPanel,
    SearchOption
  }
})
export default class SearchFiltersRunPeriod extends Vue {
  @State((state: RootState) => state.search.filters) filters!: SearchFilters;

  @Action(searchActionTypes.UPDATE_FILTERS) updateFilters!: (filters: Partial<SearchFilters>) => void;

  updateFiltersOnceRunPeriod(value: boolean) {
    this.updateFilters({
      runPeriod: {
        ONCE: value,
        ONDEMAND: null,
        DAILY: null,
        WEEKLY: null,
        MONTHLY: null,
        QUATERLY: null,
        YEARLY: null
      }
    });
  }

  updateFiltersRecurringRunPeriod(value: boolean) {
    this.updateFilters({
      runPeriod: {
        ONCE: null,
        ONDEMAND: value,
        DAILY: value,
        WEEKLY: value,
        MONTHLY: value,
        QUATERLY: value,
        YEARLY: value
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.search-option {
  margin-top: 1rem;
}

.expand-panel {
  margin-top: 3rem;
}
</style>
