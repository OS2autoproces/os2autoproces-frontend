<template>
  <div>
    <div class="wrapper">
      <div class="types">
        <PillCheckbox :value="filters.reporter" @change="updateFilters({ reporter: $event })">Indberettede
        </PillCheckbox>
        <PillCheckbox :value="filters.users" @change="updateFilters({ users: $event })">Tilknyttede</PillCheckbox>
        <PillCheckbox :value="filters.bookmarked" @change="updateFilters({ bookmarked: $event })">Favoritter
        </PillCheckbox>
      </div>

      <SearchField class="search-text" :value="filters.text" @change="updateFilters({ text: $event })"/>

      <h1>AVANCERET SØGNING</h1>

      <div class="municipality-level">
        <SearchOption :value="filters.municipality" @change="updateFilters({ municipality: $event })">
          {{VisibilityLabels.MUNICIPALITY}}
        </SearchOption>
        <SearchOption :value="filters.public" @change="updateFilters({ public: $event })">
          {{VisibilityLabels.PUBLIC}}
        </SearchOption>
      </div>

      <ExpandPanel title="Fase">
        <SearchOption :value="filters.phase.IDEA" @change="updateFilters({ phase: { IDEA: $event } })">
          {{PhaseLabels.IDEA}}
        </SearchOption>
        <SearchOption :value="filters.phase.PREANALYSIS" @change="updateFilters({ phase: { PREANALYSIS: $event } })">
          {{PhaseLabels.PREANALYSIS}}
        </SearchOption>
        <SearchOption :value="filters.phase.SPECIFICATION" @change="updateFilters({ phase: { SPECIFICATION: $event } })">
          {{PhaseLabels.SPECIFICATION}}
        </SearchOption>
        <SearchOption :value="filters.phase.DEVELOPMENT" @change="updateFilters({ phase: { DEVELOPMENT: $event } })">
          {{PhaseLabels.DEVELOPMENT}}
        </SearchOption>
        <SearchOption :value="filters.phase.IMPLEMENTATION" @change="updateFilters({ phase: { IMPLEMENTATION: $event } })">
          {{PhaseLabels.IMPLEMENTATION}}
        </SearchOption>
        <SearchOption :value="filters.phase.OPERATION" @change="updateFilters({ phase: { OPERATION: $event } })">
          {{PhaseLabels.OPERATION}}
        </SearchOption>
      </ExpandPanel>

      <ExpandPanel title="Fagområde">
        <SearchOption :value="filters.domain.HEALTH" @change="updateFilters({ domain: { HEALTH: $event } })">
          {{DomainLabels.HEALTH}}
        </SearchOption>
        <SearchOption :value="filters.domain.ENVIRONMENT" @change="updateFilters({ domain: { ENVIRONMENT: $event } })">
          {{DomainLabels.ENVIRONMENT}}
        </SearchOption>
        <SearchOption :value="filters.domain.DEMOCRACY" @change="updateFilters({ domain: { DEMOCRACY: $event } })">
          {{DomainLabels.DEMOCRACY}}
        </SearchOption>
        <SearchOption :value="filters.domain.CHILDREN" @change="updateFilters({ domain: { CHILDREN: $event } })">
          {{DomainLabels.CHILDREN}}
        </SearchOption>
        <SearchOption :value="filters.domain.ADMINISTRATION" @change="updateFilters({ domain: { ADMINISTRATION: $event } })">
          {{DomainLabels.ADMINISTRATION}}
        </SearchOption>
        <SearchOption :value="filters.domain.WORK" @change="updateFilters({ domain: { WORK: $event } })">
          {{DomainLabels.WORK}}
        </SearchOption>
      </ExpandPanel>

      <ExpandPanel title="Timeforbrug">
      </ExpandPanel>

      <ExpandPanel title="System">
      </ExpandPanel>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import Checkbox from '../common/inputs/Checkbox.vue';
  import SearchField from '../common/inputs/SearchField.vue';
  import SearchOption from './SearchOption.vue';
  import PillCheckbox from '../common/inputs/PillCheckbox.vue';
  import ExpandPanel from '../common/ExpandPanel.vue';
  import {Action} from 'vuex-class';
  import {searchActionTypes} from '@/store/modules/search/actions';
  import {PhaseLabels} from '@/models/phase';
  import {DomainLabels} from '@/models/domain';
  import {VisibilityLabels} from '@/models/visibility';

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

    PhaseLabels = PhaseLabels;
    DomainLabels = DomainLabels;
    VisibilityLabels = VisibilityLabels;

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
