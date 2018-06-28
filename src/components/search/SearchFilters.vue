<template>
    <div>
        <div class="wrapper">
            <div class="types">
                <PillCheckbox :value="filters.reported" @change="updateFilters({ reported: $event })">Indberettede</PillCheckbox>
                <PillCheckbox :value="filters.related" @change="updateFilters({ related: $event })">Tilknyttede</PillCheckbox>
                <PillCheckbox :value="filters.bookmarks" @change="updateFilters({ bookmarks: $event })">Favoritter</PillCheckbox>
            </div>

            <SearchField class="search-text" :value="filters.text" @change="updateFilters({ text: $event })" />

            <h1>AVANCERET SØGNING</h1>

            <div class="municipality-level">
                <SearchOption :value="filters.municipal" @change="updateFilters({ municipal: $event })">Kommunalt</SearchOption>
                <SearchOption :value="filters.intermunicipal" @change="updateFilters({ intermunicipal: $event })">Tværkommunalt</SearchOption>
            </div>

            <ExpandPanel title="Fase">
                <SearchOption :value="filters.phases.idea" @change="updateFilters({ phases: { idea: $event } })">Idé</SearchOption>
                <SearchOption :value="filters.phases.preliminaryAnalysis" @change="updateFilters({ phases: { preliminaryAnalysis: $event } })">Foranalyse</SearchOption>
                <SearchOption :value="filters.phases.specification" @change="updateFilters({ phases: { specification: $event } })">Specifikation</SearchOption>
                <SearchOption :value="filters.phases.development" @change="updateFilters({ phases: { development: $event } })">Udvikling</SearchOption>
                <SearchOption :value="filters.phases.implementation" @change="updateFilters({ phases: { implementation: $event } })">Implementering</SearchOption>
                <SearchOption :value="filters.phases.operating" @change="updateFilters({ phases: { operating: $event } })">Drift</SearchOption>
            </ExpandPanel>

            <ExpandPanel title="Fagområde">
            </ExpandPanel>

            <ExpandPanel title="Timeforbrug">
            </ExpandPanel>

            <ExpandPanel title="System">
            </ExpandPanel>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Checkbox from '../common/inputs/Checkbox.vue';
import SearchField from '../common/inputs/SearchField.vue';
import SearchOption from './SearchOption.vue';
import PillCheckbox from '../common/inputs/PillCheckbox.vue';
import ExpandPanel from '../common/ExpandPanel.vue';
import { Action } from 'vuex-class';
import { searchActionTypes } from '@/store/modules/search/actions';

@Component({
  components: {
    SearchField,
    SearchOption,
    ExpandPanel,
    Checkbox,
    PillCheckbox
  }
})
export default class SearchFilters extends Vue {
  @Action(searchActionTypes.UPDATE_FILTERS) updateFilters: any;

  get filters() {
    return this.$store.state.search.filters;
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.wrapper {
  padding: 4 * $size-unit 3 * $size-unit;
}

.types {
  margin-bottom: 4 * $size-unit;

  > div {
    margin-bottom: $size-unit;
  }
}

h1 {
  @include heading;
  color: $color-secondary;
  line-height: 1.2em;
  font-size: 1.25rem;
  margin: 3 * $size-unit 0;
}

.search-option {
  margin-top: $size-unit;
}

.expand-panel {
  margin-top: 3 * $size-unit;
}
</style>
