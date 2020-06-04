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
            <router-link to="/report"> <PlusIcon />Indberet proces </router-link>
          </div>

          <SearchSorting
            v-if="!state.isSearchingForUmbrellaProcess"
            :sorting="state.filters.sorting"
            @change="updateFilters({ sorting: $event })"
          />
          <SearchSortingUmbrella v-else :sorting="state.filters.sorting" @change="updateFilters({ sorting: $event })" />

          <div class="results" v-if="state.result">
            <router-link
              :to="'/details/' + process.id"
              class="search-result-link"
                  @click="setID(process.id)"
              v-for="process in state.result.processes"
              :key="process.id"
            >
              <SearchResult :process="process" />
            </router-link>
          </div>

          <SearchPagination
            v-if="state.result"
            :page="state.result.page.number"
            :pageTotal="state.result.page.totalPages"
            :size="state.result.page.size"
            @on-page-change="updateFiltersAndScrollToTop({ page: $event })"
            @on-size-change="updateFilters({ size: $event })"
          />
        </div>
      </div>
    </div>
    <Details :isReporting="false" :id="id" v-if="id" class="detailsView" @goBack="ieGoBack" />
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
import { SearchFilters, SearchResultProcess } from '@/store/modules/searchInterfaces';
import SearchSortingDropdown from '@/components/search/SearchSortingDropdown.vue';
import { SearchModule } from '../store/modules/search';
import store from '../store';
import Details from "./Details.vue";

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

  lastFilterUpdate: Partial<SearchFilters> = {};

  get state() {
    return SearchModule;
  }

  async ieGoBack() {
    await this.updateFilters(this.lastFilterUpdate);
  }

  async updateFiltersAndScrollToTop(filters: Partial<SearchFilters>) {
    await this.updateFilters(filters);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  updateFilters(filters: Partial<SearchFilters>) {
    this.lastFilterUpdate = filters;
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
