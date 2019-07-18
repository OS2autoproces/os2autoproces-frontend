<template>
  <ExpandPanel title="Skedulering">
    <SearchOption
      v-for="(runPeriodKey, index) in RunPeriodKeys"
      :key="index"
      :value="filters.runPeriod[runPeriodKey]"
      @change="update(runPeriodKey, $event)"
    >{{RunPeriodLabels[runPeriodKey]}}</SearchOption>
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
import { RunPeriodLabels, RunPeriodKeys } from '@/models/runperiod';

@Component({
  components: {
    ExpandPanel,
    SearchOption
  }
})
export default class SearchFiltersRunPeriod extends Vue {
  @State((state: RootState) => state.search.filters) filters!: SearchFilters;

  @Action(searchActionTypes.UPDATE_FILTERS) updateFilters!: (filters: Partial<SearchFilters>) => void;

  RunPeriodLabels = RunPeriodLabels;
  RunPeriodKeys = RunPeriodKeys;

  update(keyToUpdate: keyof typeof RunPeriodKeys, active: boolean) {
    console.log(active);
    this.updateFilters({
      runPeriod: { ...this.filters.runPeriod, ...{ [keyToUpdate]: active } }
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
