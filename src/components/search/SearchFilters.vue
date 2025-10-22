<template>
  <div class="wrapper">
    <h1 v-if="!umbrellaProcessSearch" class="search-header">AVANCERET SØGNING</h1>
    <div class="types" v-if="!umbrellaProcessSearch">
      <div class="filterCheck">
        <div>
          Min organisation
        </div>
        <Checkbox :value="filters.filterOnCvr" @change="setFilterOnCvr"></Checkbox>
      </div>
      <div class="filterCheck">
        <div>
          Mine indberetninger
        </div>
        <Checkbox :value="!!filters.reporterId" @change="setReporterId"></Checkbox>
      </div>
      <div class="filterCheck">
        <div>
          Mine tilknytninger
        </div>
        <Checkbox :value="!!filters.usersId" @change="setUsersId"></Checkbox>
      </div>
      <div class="filterCheck">
        <div>
          Mine favoritter
        </div>
        <Checkbox :value="!!filters.bookmarkedId" @change="setBookmarkedId"></Checkbox>
      </div>
      <div class="filterCheck">
        <div>
          Anbefalet til min organisation
        </div>
        <Checkbox :value="filters.filterMyOrganisation" @change="setMyOrganisation"></Checkbox>
      </div>
    </div>

    <!-- if !umbrellaProcessSearch the search field will be directly in Search.vue -->
    <SearchField v-if="umbrellaProcessSearch" class="search-text" :placeholder="'Søg'" :value="filters.text" @change="updateFilters({ text: $event })" />
    <SearchSelectSavedFilters style="margin-top: 1rem;" />

    <div class="municipality-level" v-if="!umbrellaProcessSearch">
      <SearchOption
        v-for="(visibilityKey, index) in VisibilityKeys"
        :key="index"
        :value="filters.visibility[visibilityKey]"
        @change="updateFilters({ visibility: { ...filters.visibility, ...{ [visibilityKey]: $event } } })"
        >{{ VisibilityLabels[visibilityKey] }}</SearchOption
      >
    </div>

    <SearchOption :value="filters.klaProcess" @change="updateFilters({ klaProcess: $event })"
      >Søg i KL’s Arbejdsgangsbank</SearchOption
    >

    <SearchOption v-if="!umbrellaProcessSearch" :value="filters.umbrella" @change="updateFilters({ umbrella: $event })"
      >Søg i paraplyprocesser</SearchOption
    >

    <SearchOption :value="filters.sepMep" @change="updateFilters({ sepMep: $event })"
      >Søg i KL's automatiseringsprojekter</SearchOption
    >

    <div class="datepicker">
      Oprettet siden:
      <DatePicker :value="filters.created" @change="updateFilters({ created: $event })" />
    </div>

    <div class="datepicker">
      Ændret siden:
      <DatePicker :value="filters.lastChanged" @change="updateFilters({ lastChanged: $event })" />
    </div>

    <ExpandPanel title="Organisation">
      <SelectionField
        :items="municipalities"
        :value="filters.municipalities"
        itemText="name"
        @change="assignFilters({ municipalities: $event })"
        clearable
        multiple
      />
    </ExpandPanel>

    <ExpandPanel title="Teknologier">
      <SelectionField
        :items="technologies"
        :value="filters.technologies"
        itemText="name"
        @change="assignFilters({ technologies: $event })"
        multiple
      />
    </ExpandPanel>

    <ExpandPanel title="Status">
      <SearchOption
        v-for="(statusKey, index) in StatusKeys"
        :value="filters.status[statusKey]"
        :key="index"
        @change="updateFilters({ status: { ...filters.status, ...{ [statusKey]: $event } } })"
        >{{ StatusLabels[statusKey] }}</SearchOption
      >
    </ExpandPanel>

    <ExpandPanel title="Fase">
      <SearchOption
        v-for="(phaseKey, index) in PhaseKeys"
        :value="filters.phase[phaseKey]"
        :key="index"
        @change="updateFilters({ phase: { ...filters.phase, ...{ [phaseKey]: $event } } })"
        >{{ PhaseLabels[phaseKey] }}</SearchOption
      >
    </ExpandPanel>

    <ExpandPanel title="Fagområde">
      <SearchOption
        v-for="(domainKey, index) in DomainKeys"
        :key="index"
        :value="filters.domain[domainKey]"
        @change="updateFilters({ domain: { ...filters.domain, ...{ [domainKey]: $event } } })"
        >{{ DomainLabels[domainKey] }}</SearchOption
      >
    </ExpandPanel>

    <ExpandPanel title="System">
      <SelectionField
        :items="itSystems"
        :value="filters.itSystems"
        itemText="name"
        @change="assignFilters({ itSystems: $event })"
        multiple
      />
    </ExpandPanel>

    <SearchFiltersRunPeriod />

    <SearchFiltersActions @reset="onReset()" />
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
import { PhaseLabels, PhaseKeys } from '@/models/phase';
import { DomainLabels, DomainKeys } from '@/models/domain';
import { VisibilityLabels, VisibilityKeys } from '@/models/visibility';
import { SearchFilters } from '@/store/modules/searchInterfaces';
import Button from '../common/inputs/Button.vue';
import SearchFiltersActions from './SearchFiltersActions.vue';
import SearchSelectSavedFilters from './SearchSelectSavedFilters.vue';
import SearchFiltersRunPeriod from './SearchFiltersRunPeriod.vue';
import { StatusSelect, StatusLabels, StatusKeys, defaultStatusSelects } from '../../models/status';
import { Municipality } from '@/store/modules/commonInterfaces';
import { AuthModule } from '@/store/modules/auth';
import { CommonModule } from '@/store/modules/common';
import { SearchModule } from '@/store/modules/search';
import { OrganisationModule } from '@/store/modules/organisation';

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
  PhaseKeys = PhaseKeys;
  DomainLabels = DomainLabels;
  DomainKeys = DomainKeys;
  StatusKeys = StatusKeys;
  StatusLabels = StatusLabels;
  VisibilityLabels = VisibilityLabels;
  VisibilityKeys = [VisibilityKeys.MUNICIPALITY, VisibilityKeys.PUBLIC];

  @Prop(Boolean)
  umbrellaProcessSearch!: boolean;

  mounted() {
    CommonModule.loadITSystemsSorted();
    CommonModule.loadMunicipalities();
    CommonModule.loadTechnologies();

    const cvr = AuthModule.user ? AuthModule.user.cvr : null;
    OrganisationModule.loadMunicipalityDetails(cvr);
  }

  setReporterId(value: boolean) {
    const reporterId = value && AuthModule.user ? AuthModule.user.uuid : null;
    this.updateFilters({ reporterId });
  }

  setUsersId(value: boolean) {
    const usersId = value && AuthModule.user ? AuthModule.user.uuid : null;
    this.updateFilters({ usersId });
  }

  setBookmarkedId(value: boolean) {
    const bookmarkedId = value && AuthModule.user ? AuthModule.user.uuid : null;
    this.updateFilters({ bookmarkedId });
  }

  setMyOrganisation(value: boolean) {
    this.updateFilters({ filterMyOrganisation: value });
  }

  setFilterOnCvr(value: boolean) {
    this.updateFilters({ filterOnCvr: value });
  }

  updateFilters(filters: Partial<SearchFilters>) {
    this.$emit('change', filters);
  }

  assignFilters(filters: Partial<SearchFilters>) {
    this.$emit('assign', filters);
  }

  onReset() {
    this.$emit('change', this.filters);
  }

  get filters() {
    return SearchModule.filters;
  }

  get municipalities() {
    return CommonModule.municipalities;
  }

  get technologies() {
    return CommonModule.technologies;
  }

  get itSystems() {
    return CommonModule.itSystems;
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.wrapper {
  padding-bottom: 2.5rem;
}

.types {
  margin-bottom: 3rem;

  > div {
    margin-bottom: 1rem;
  }
}

h1 {
  @include heading;
  color: $color-primary;
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

.pillCheckbox {
  font-size: 15px;
}

.filterCheck {
  display: flex;

  > div:first-of-type {
    flex-grow: 1;
  }
}

.search-header {
  margin: 0px 0px 20px 0px;
}
</style>
