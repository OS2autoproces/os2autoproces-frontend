<template>
  <div class="wrapper">
    <div class="types" v-if="!umbrellaProcessSearch">
      <PillCheckbox :value="!!filters.reporterId" @change="setReporterId">Mine indberetninger</PillCheckbox>
      <PillCheckbox :value="!!filters.usersId" @change="setUsersId">Mine tilknytninger</PillCheckbox>
      <PillCheckbox :value="!!filters.bookmarkedId" @change="setBookmarkedId">Mine favoritter</PillCheckbox>
      <SearchSelectSavedFilters />
    </div>

    <SearchField
      class="search-text"
      :value="filters.text"
      @change="updateFilters({ text: $event })"
    />

    <h1 v-if="!umbrellaProcessSearch">AVANCERET SØGNING</h1>

    <div class="municipality-level" v-if="!umbrellaProcessSearch">
      <SearchOption
        :value="filters.visibility.municipality"
        @change="updateFilters({ visibility: { municipality: $event } })"
      >{{VisibilityLabels.MUNICIPALITY}}</SearchOption>
      <SearchOption
        :value="filters.visibility.public"
        @change="updateFilters({ visibility: { public: $event } })"
      >{{VisibilityLabels.PUBLIC}}</SearchOption>
    </div>

    <SearchOption
      :value="filters.klaProcess"
      @change="updateFilters({ klaProcess: $event })"
    >Søg i KL’s Arbejdsgangsbank</SearchOption>

    <SearchOption
      v-if="!umbrellaProcessSearch"
      :value="filters.umbrella"
      @change="updateFilters({ umbrella: $event })"
    >Søg i paraplyprocesser</SearchOption>

    <SearchOption
      :value="filters.noSepMep"
      @change="updateFilters({ noSepMep: $event })"
    >Frasorter SEP/MEP-processer</SearchOption>

    <div class="datepicker">
      Oprettet:
      <DatePicker :value="filters.created" @change="updateFilters({created: $event})" />
    </div>

    <div class="datepicker">
      Senest ændret:
      <DatePicker :value="filters.lastChanged" @change="updateFilters({lastChanged: $event})" />
    </div>

    <ExpandPanel title="Organisation">
      <SelectionField
        :items="municipalities"
        :value="filters.municipality"
        itemText="name"
        @change="assignFilters({municipality: $event})"
        clearable
      />
    </ExpandPanel>

    <ExpandPanel title="Teknologier">
      <SelectionField
        :items="technologies"
        :value="filters.technologies"
        itemText="name"
        @change="assignFilters({technologies: $event})"
        multiple
      />
    </ExpandPanel>

    <ExpandPanel title="Status">
      <SelectionField
        :items="status"
        :value="filters.status"
        itemText="label"
        @change="assignFilters({status: $event})"
        multiple
      />
    </ExpandPanel>

    <ExpandPanel title="Fase">
      <SearchOption
        :value="filters.phase.IDEA"
        @change="updateFilters({ phase: { IDEA: $event } })"
      >{{PhaseLabels.IDEA}}</SearchOption>
      <SearchOption
        :value="filters.phase.PREANALYSIS"
        @change="updateFilters({ phase: { PREANALYSIS: $event } })"
      >{{PhaseLabels.PREANALYSIS}}</SearchOption>
      <SearchOption
        :value="filters.phase.SPECIFICATION"
        @change="updateFilters({ phase: { SPECIFICATION: $event } })"
      >{{PhaseLabels.SPECIFICATION}}</SearchOption>
      <SearchOption
        :value="filters.phase.DEVELOPMENT"
        @change="updateFilters({ phase: { DEVELOPMENT: $event } })"
      >{{PhaseLabels.DEVELOPMENT}}</SearchOption>
      <SearchOption
        :value="filters.phase.IMPLEMENTATION"
        @change="updateFilters({ phase: { IMPLEMENTATION: $event } })"
      >{{PhaseLabels.IMPLEMENTATION}}</SearchOption>
      <SearchOption
        :value="filters.phase.OPERATION"
        @change="updateFilters({ phase: { OPERATION: $event } })"
      >{{PhaseLabels.OPERATION}}</SearchOption>
    </ExpandPanel>

    <ExpandPanel title="Fagområde">
      <SearchOption
        :value="filters.domain.HEALTH"
        @change="updateFilters({ domain: { HEALTH: $event } })"
      >{{DomainLabels.HEALTH}}</SearchOption>
      <SearchOption
        :value="filters.domain.ENVIRONMENT"
        @change="updateFilters({ domain: { ENVIRONMENT: $event } })"
      >{{DomainLabels.ENVIRONMENT}}</SearchOption>
      <SearchOption
        :value="filters.domain.DEMOCRACY"
        @change="updateFilters({ domain: { DEMOCRACY: $event } })"
      >{{DomainLabels.DEMOCRACY}}</SearchOption>
      <SearchOption
        :value="filters.domain.CHILDREN"
        @change="updateFilters({ domain: { CHILDREN: $event } })"
      >{{DomainLabels.CHILDREN}}</SearchOption>
      <SearchOption
        :value="filters.domain.ADMINISTRATION"
        @change="updateFilters({ domain: { ADMINISTRATION: $event } })"
      >{{DomainLabels.ADMINISTRATION}}</SearchOption>
      <SearchOption
        :value="filters.domain.WORK"
        @change="updateFilters({ domain: { WORK: $event } })"
      >{{DomainLabels.WORK}}</SearchOption>
    </ExpandPanel>

    <ExpandPanel title="System">
      <SelectionField
        :items="itSystems"
        :value="filters.itSystems"
        itemText="name"
        @change="assignFilters({itSystems: $event})"
        multiple
      />
    </ExpandPanel>

    <SearchFiltersRunPeriod />

    <SearchFiltersActions />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Checkbox from '../common/inputs/Checkbox.vue';
import SearchField from '../common/inputs/SearchField.vue';
import InputField from '../common/inputs/InputField.vue';
import DatePicker from '../common/inputs/DatePicker.vue';
import SearchOption from './SearchOption.vue';
import PillCheckbox from '../common/inputs/PillCheckbox.vue';
import SelectionField from '../common/inputs/SelectionField.vue';
import ExpandPanel from '../common/ExpandPanel.vue';
import { Action, State } from 'vuex-class';
import { searchActionTypes } from '@/store/modules/search/actions';
import { PhaseLabels } from '@/models/phase';
import { DomainLabels } from '@/models/domain';
import { VisibilityLabels } from '@/models/visibility';
import { SearchFilters } from '../../store/modules/search/state';
import { commonActionTypes } from '@/store/modules/common/actions';
import Button from '../common/inputs/Button.vue';
import { RootState } from '../../store/store';
import SearchFiltersActions from './SearchFiltersActions.vue';
import SearchSelectSavedFilters from './SearchSelectSavedFilters.vue';
import SearchFiltersRunPeriod from './SearchFiltersRunPeriod.vue';
import { StatusSelect, StatusLabels, StatusKeys, defaultStatusSelects } from '../../models/status';

@Component({
  components: {
    SearchField,
    InputField,
    SearchOption,
    ExpandPanel,
    DatePicker,
    Checkbox,
    SelectionField,
    PillCheckbox,
    Button,
    SearchFiltersActions,
    SearchFiltersRunPeriod,
    SearchSelectSavedFilters
  }
})
export default class SearchFiltersComponent extends Vue {
  PhaseLabels = PhaseLabels;
  DomainLabels = DomainLabels;
  VisibilityLabels = VisibilityLabels;

  @State((state: RootState) => state.search.filters) filters!: SearchFilters;

  @Prop(Boolean)
  umbrellaProcessSearch!: boolean;

  get user() {
    return this.$store.state.auth.user;
  }

  get itSystems() {
    return this.$store.state.common.itSystems;
  }

  get municipalities() {
    return this.$store.state.common.municipalities;
  }

  get technologies() {
    return this.$store.state.common.technologies;
  }

  status = defaultStatusSelects;

  mounted() {
    this.$store.dispatch(commonActionTypes.LOAD_IT_SYSTEMS);
    this.$store.dispatch(commonActionTypes.LOAD_MUNICIPALITIES);
    this.$store.dispatch(commonActionTypes.LOAD_TECHNOLOGIES);
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

  assignFilters(filters: Partial<SearchFilters>) {
    this.$emit('assign', filters);
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.wrapper {
  padding-bottom: 2.5rem;
}

.types {
  margin-bottom: 4rem;

  > div {
    margin-bottom: 1rem;
  }
}

h1 {
  @include heading;
  color: $color-secondary;
  line-height: 1.2em;
  font-size: 1.25rem;
  margin: 3rem 0;
}

.search-option {
  margin-top: 1rem;
}

.expand-panel {
  margin-top: 3rem;
}

.datepicker {
  margin-top: 1rem;
}
</style>
