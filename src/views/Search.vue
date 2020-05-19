<template>
  <div class="search">
    <div>
      <NavBar />

      <div class="page">
        <div class="filters">
          <SearchFiltersComponent @change="updateFilters" @assign="assignFilters" />
        </div>
        <div>
          <div class="results-wrapper">
            <div class="report">
              <SearchSortingDropdown />
              <router-link to="/report">
                <PlusIcon />Indberet proces
              </router-link>
            </div>

            <SearchSorting
              v-if="!isSearchingForUmbrellaProcess"
              :sorting="filters.sorting"
              @change="updateFilters({ sorting: $event })"
            />
            <SearchSortingUmbrella
              v-else
              :sorting="filters.sorting"
              @change="updateFilters({sorting: $event})"
            />
            <div class="results" v-if="result">
              <div v-if="!isIE()">
                <router-link
                  :to="'/details/' + process.id"
                  class="search-result-link"
                  v-for="process in result.processes"
                  :key="process.id"
                >
                  <SearchResult :process="process" />
                </router-link>
              </div>
              <div v-if="isIE()">
                <a
                  class="search-result-link"
                  v-for="process in result.processes"
                  :key="process.id"
                  @click="goToIEProcess(process.id)"
                >
                  <SearchResult :process="process" />
                </a>
              </div>
            </div>

            <SearchPagination
              v-if="result"
              :page="result.page.number"
              :pageTotal="result.page.totalPages"
              :size="result.page.size"
              @on-page-change="updateFilters({ page: $event })"
              @on-size-change="updateFilters({ size: $event })"
            />
          </div>
        </div>
      </div>
    </div>
    <Details
      :isReporting="false"
      :id="id"
      v-if="this.ieProcess"
      class="detailsView"
      @goBack="goBack"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import NavBar from '../components/common/NavBar.vue';
import SearchFiltersComponent from '../components/search/SearchFilters.vue';
import SearchPagination from '../components/search/SearchPagination.vue';
import SearchResult from '../components/search/SearchResult.vue';
import SearchSorting from '../components/search/SearchSorting.vue';
import SearchSortingUmbrella from '../components/search/SearchSortingUmbrella.vue';
import PlusIcon from '../components/icons/PlusIcon.vue';
import { searchActionTypes } from '../store/modules/search/actions';
import { processActionTypes } from '../store/modules/process/actions';
import { SearchFilters, SearchResultProcess } from '../store/modules/search/state';
import SearchSortingDropdown from '@/components/search/SearchSortingDropdown.vue';
import { getInitialState } from '../store/modules/search';
import { searchGetterTypes } from '../store/modules/search/getters';
import Details from './Details.vue';

@Component({
  components: {
    PlusIcon,
    NavBar,
    SearchFiltersComponent,
    SearchPagination,
    SearchResult,
    SearchSorting,
    SearchSortingUmbrella,
    SearchSortingDropdown,
    Details
  }
})
export default class Search extends Vue {
  @Prop({ type: Object as () => SearchFilters }) initialFilters!: SearchFilters;
  @Action(searchActionTypes.SEARCH) dispatchSearch!: VoidFunction;
  @Action(searchActionTypes.ASSIGN_FILTERS) dispatchAssignFilters!: (filters: SearchFilters) => void;
  @Getter(searchGetterTypes.IS_SEARCHING_FOR_UMBRELLA_PROCESS) isSearchingForUmbrellaProcess!: () => boolean;

  id = 1000;
  ieProcess = false;

  get filters() {
    return this.$store.state.search.filters;
  }

  get result() {
    return this.$store.state.search.result;
  }

  // Test if browser is Internet Explorer, for use in linking to the details view
  isIE() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');

    return msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
  }

  // Used by the links made specifically for Internet Explorer, to display a nested details component.
  goToIEProcess(id: number) {
    this.id = id;
    this.ieProcess = true;
  }

  // Used by the nested details component to return to the search view. Only used in Internet Explorer
  goBack() {
    this.ieProcess = false;
  }

  updateFilters(filters: Partial<SearchFilters>) {
    this.$store.dispatch(searchActionTypes.ASSIGN_FILTERS, {
      page: 0,
      ...filters
    });
  }

  assignFilters(filters: Partial<SearchFilters>) {
    this.$store.dispatch(searchActionTypes.ASSIGN_FILTERS, {
      page: 0,
      ...filters
    });
  }

  mounted() {
    !!this.initialFilters ? this.dispatchAssignFilters(this.initialFilters) : this.dispatchSearch();
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.search {
  display: flex;
  flex-direction: column;
}

.detailsView {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $color-background;
}

.filters {
  padding: 4rem 1.5rem;
}

.page {
  flex-grow: 1;
  display: flex;

  // TODO clean - this is messy
  > div:first-of-type {
    flex: 0 1 $dimension-search-filters-width;
    border-right: 1px solid #e6e6e8;
  }

  > div:last-of-type {
    flex-grow: 1;
  }
}

.results-wrapper {
  max-width: 1350px;
  margin: 0 auto;
}

.report {
  padding: 2rem 0;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    @include heading;
    color: $color-secondary;
    text-decoration: none;
    font-size: 1.66rem;
    display: inline-flex;
    align-items: center;
  }

  svg {
    margin-right: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;
  }
}

.search-result-link {
  display: block;
  text-decoration: inherit;
  color: inherit;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
}
</style>
