<template>
  <ExpandPanel title="Skedulering">
    <SearchOption
      v-for="(runPeriodKey, index) in RunPeriodKeys"
      :key="index"
      :value="filters.runPeriod[runPeriodKey]"
      @change="update(runPeriodKey, $event)"
      >{{ RunPeriodLabels[runPeriodKey] }}</SearchOption
    >
  </ExpandPanel>
</template>

<script lang="ts">
import { SearchFilters } from '@/store/modules/searchInterfaces';
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import SearchOption from './SearchOption.vue';
import ExpandPanel from '../common/ExpandPanel.vue';
import { RunPeriodLabels, RunPeriodKeys } from '@/models/runperiod';
import { SearchModule } from '@/store/modules/search';

@Component({
  components: {
    ExpandPanel,
    SearchOption
  }
})
export default class SearchFiltersRunPeriod extends Vue {
  RunPeriodLabels = RunPeriodLabels;
  RunPeriodKeys = RunPeriodKeys;

  update(keyToUpdate: keyof typeof RunPeriodKeys, active: boolean) {
    SearchModule.updateFilters({
      runPeriod: { ...SearchModule.filters.runPeriod, ...{ [keyToUpdate]: active } }
    });
  }

  get filters() {
    return SearchModule.filters;
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
