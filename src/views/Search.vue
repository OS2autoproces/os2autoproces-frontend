<template>
  <div class="search">
    <NavBar />

    <div class="page">
      <div class="filters">
        <SearchFiltersComponent @change="updateFilters" @assign="assignFilters" />
      </div>
      <div>
        <div class="results-wrapper">
          <div class="report">
            <SearchSortingDropdown />
            <router-link to="/report"> <PlusIcon />Indberet proces </router-link>
          </div>

          <SearchSorting
            v-if="!isSearchingForUmbrellaProcess"
            :sorting="filters.sorting"
            @change="updateFilters({ sorting: $event })"
          />
          <SearchSortingUmbrella v-else :sorting="filters.sorting" @change="updateFilters({ sorting: $event })" />

          <div class="results" v-if="result">
            <router-link
              :to="'/details/' + process.id"
              class="search-result-link"
              v-for="process in result.processes"
              :key="process.id"
            >
              <SearchResult :process="process" />
            </router-link>
          </div>

          <SearchPagination
            v-if="result"
            :page="result.page.number"
            :pageTotal="result.page.totalPages"
            :size="result.page.size"
            @on-page-change="updateFiltersAndScrollToTop({ page: $event })"
            @on-size-change="updateFilters({ size: $event })"
          />
        </div>
      </div>
    </div>
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
import { SearchModule } from '@/store/modules/search';
import { SearchFilters, SearchResultProcess } from '@/store/modules/searchInterfaces';
import SearchSortingDropdown from '@/components/search/SearchSortingDropdown.vue';

@Component({
  components: {
    PlusIcon,
    NavBar,
    SearchFiltersComponent,
    SearchPagination,
    SearchResult,
    SearchSorting,
    SearchSortingUmbrella,
    SearchSortingDropdown
  }
})
export default class Search extends Vue {
  @Prop({ type: Object as () => SearchFilters }) initialFilters!: SearchFilters;

  get filters() {
    return SearchModule.filters;
  }

  get result() {
    return SearchModule.result;
  }

  async updateFiltersAndScrollToTop(filters: Partial<SearchFilters>) {
    await this.updateFilters(filters);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  updateFilters(filters: Partial<SearchFilters>) {
    return SearchModule.assignFilters({
      page: 0,
      ...filters
    });
  }

  assignFilters(filters: Partial<SearchFilters>) {
    SearchModule.assignFilters({
      page: 0,
      ...filters
    });
  }

  mounted() {
    !!this.initialFilters ? SearchModule.assignFilters(this.initialFilters) : SearchModule.search();
  }

  get isSearchingForUmbrellaProcess() {
    return SearchModule.isSearchingForUmbrellaProcess;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.search {
  display: flex;
  flex-direction: column;
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
