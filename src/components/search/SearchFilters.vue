<template>
  <div>
    <div class="wrapper">
      <div class="types" v-if="!hideRelations">
        <PillCheckbox :value="!!filters.reporterId" @change="setReporterId">Indberettede
        </PillCheckbox>
        <PillCheckbox :value="!!filters.usersId" @change="setUsersId">Tilknyttede</PillCheckbox>
        <PillCheckbox :value="!!filters.bookmarkedId" @change="setBookmarkedId">Favoritter
        </PillCheckbox>
      </div>

      <SearchField class="search-text" :value="filters.text" @change="updateFilters({ text: $event })" />

      <h1 v-if="!hideVisibility">AVANCERET SØGNING</h1>

      <div class="municipality-level" v-if="!hideVisibility">
        <SearchOption :value="filters.municipality" @change="updateFilters({ municipality: $event })">
          {{VisibilityLabels.MUNICIPALITY}}
        </SearchOption>
        <SearchOption :value="filters.public" @change="updateFilters({ public: $event })">
          {{VisibilityLabels.PUBLIC}}
        </SearchOption>
        <SearchOption :value="filters.klaProcess" @change="updateFilters({ klaProcess: $event })">
          Søg i KLA-processer
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import Checkbox from '../common/inputs/Checkbox.vue';
import SearchField from '../common/inputs/SearchField.vue';
import SearchOption from './SearchOption.vue';
import PillCheckbox from '../common/inputs/PillCheckbox.vue';
import ExpandPanel from '../common/ExpandPanel.vue';
import { Action } from 'vuex-class';
import { searchActionTypes } from '@/store/modules/search/actions';
import { PhaseLabels } from '@/models/phase';
import { DomainLabels } from '@/models/domain';
import { VisibilityLabels } from '@/models/visibility';
import { SearchFilters } from '../../store/modules/search/state';

@Component({
  components: {
    SearchField,
    SearchOption,
    ExpandPanel,
    Checkbox,
    PillCheckbox
  }
})
export default class SearchFiltersComponent extends Vue {
  PhaseLabels = PhaseLabels;
  DomainLabels = DomainLabels;
  VisibilityLabels = VisibilityLabels;

  @Prop(Object) filters!: SearchFilters;
  @Prop(Boolean) hideVisibility!: boolean;
  @Prop(Boolean) hideRelations!: boolean;

  get user() {
    return this.$store.state.auth.user;
  }

  setReporterId(value: boolean) {
    const reporterId = value && this.user ? this.user.uuid : null;
    this.updateFilters({ reporterId });
  }

  setUsersId(value: boolean) {
    const usersId = value && this.user ? this.user.uuid : null;
    this.updateFilters({ usersId });
  }

  setBookmarkedId(value: boolean) {
    const bookmarkedId = value && this.user ? this.user.uuid : null;
    this.updateFilters({ bookmarkedId });
  }

  updateFilters(filters: Partial<SearchFilters>) {
    this.$emit('change', filters);
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

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
