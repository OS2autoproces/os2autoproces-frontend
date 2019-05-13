<template>
  <div class="search">
    <NavBar />

    <div class="page">
      <div class="filters">
        <SearchFiltersComponent
          :filters="filters"
          @change="updateFilters"
          @assign="assignFilters"
        />
      </div>
      <div>
        <div class="results-wrapper">
          <div class="report">
            <router-link to="/report">
              <PlusIcon /> Indberet proces
            </router-link>
          </div>

          <SearchSorting
            :sorting="filters.sorting"
            @change="updateFilters({ sorting: $event })"
          />

          <div
            class="results"
            v-if="result"
          >
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
            @on-page-change="updateFilters({ page: $event })"
            @on-size-change="updateFilters({ size: $event })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import NavBar from '../components/common/NavBar.vue';
import SearchFiltersComponent from '../components/search/SearchFilters.vue';
import SearchPagination from '../components/search/SearchPagination.vue';
import SearchResult from '../components/search/SearchResult.vue';
import SearchSorting from '../components/search/SearchSorting.vue';
import PlusIcon from '../components/icons/PlusIcon.vue';
import { searchActionTypes } from '../store/modules/search/actions';
import { processActionTypes } from '../store/modules/process/actions';
import { SearchFilters, SearchResultProcess } from '../store/modules/search/state';

@Component({
  components: {
    PlusIcon,
    NavBar,
    SearchFiltersComponent,
    SearchPagination,
    SearchResult,
    SearchSorting
  }
})
export default class Search extends Vue {
  @Prop(Number) page!: number;
  @Prop(Number) size!: number;

  get filters() {
    return this.$store.state.search.filters;
  }

  get result() {
    return this.$store.state.search.result;
  }

  updateFilters(filters: Partial<SearchFilters>) {
    this.$store.dispatch(searchActionTypes.UPDATE_FILTERS, {
      page: 0,
      ...filters
    });
    this.setUrl(filters);
  }

  setUrl(filters: Partial<SearchFilters>) {
    // This is kind of hacky, nut it is needed for deeplinking specific searches.
    // It has no impect on rerendering, it only pushes a new history state
    // TODO consider placing in seperate helper / service
    try {
      if (history.pushState) {
        const newurl =
          window.location.protocol +
          '//' +
          window.location.host +
          window.location.pathname +
          `?size=${filters.size || this.size}&page=${filters.page || this.page}`;
        window.history.pushState({ path: newurl }, '', newurl);
      }
    } catch (e) {
      console.warn(`Updating search url failed with error: ${e}`);
    }
  }

  assignFilters(filters: Partial<SearchFilters>) {
    this.$store.dispatch(searchActionTypes.ASSIGN_FILTERS, {
      page: 0,
      ...filters
    });
  }

  mounted() {
    this.$store.dispatch(searchActionTypes.UPDATE_FILTERS, { page: this.page, size: this.size });
  }
}
</script>

<style lang="scss" scoped>
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

  > div:first-of-type {
    flex: 0 1 300px;
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
  padding-top: 3rem;
  padding-bottom: 1rem;
  text-align: right;

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
