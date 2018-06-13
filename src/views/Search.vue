<template>
    <div class="search">
        <NavBar />

        <div class="page">
            <div>
                <SearchFilters />
            </div>
            <div>
                <div class="results-wrapper">
                    <div class="report">
                        <router-link to="/report">
                            <PlusIcon/> Indberet
                        </router-link>
                    </div>

                    <SearchSorting v-if="result" />

                    <div class="results" v-if="result">
                        <router-link :to="'/details/' + process.id" class="search-result-link" v-for="process in result.processes" :key="process.id">
                            <SearchResult :process="process" />
                        </router-link>
                    </div>

                    <SearchPagination v-if="result" :page="result.page" :pageTotal="result.numberOfPages" @change="updateFilters({ page: $event })" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import NavBar from '../components/common/NavBar.vue';
import SearchFilters from '../components/search/SearchFilters.vue';
import SearchPagination from '../components/search/SearchPagination.vue';
import SearchResult from '../components/search/SearchResult.vue';
import SearchSorting from '../components/search/SearchSorting.vue';
import PlusIcon from '../components/icons/PlusIcon.vue';
import { Action } from 'vuex-class';
import { searchActionTypes } from '../store/modules/search/actions';

@Component({
  components: {
    PlusIcon,
    NavBar,
    SearchFilters,
    SearchPagination,
    SearchResult,
    SearchSorting
  }
})
export default class Search extends Vue {
  // TODO: Search page
  // Sorting
  // Field, time and system filters
  // Call backend
  // Logout link

  @Action(searchActionTypes.UPDATE_FILTERS) updateFilters: any;

  get result() {
    return this.$store.state.search.result;
  }

  mounted() {
    this.$store.dispatch(searchActionTypes.SEARCH);
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.search {
  display: flex;
  flex-direction: column;
}

.page {
  flex-grow: 1;
  display: flex;

  > div:first-of-type {
    flex: 0 0 300px;
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
  padding-top: 3 * $size-unit;
  padding-bottom: $size-unit;
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
    margin-right: $size-unit/2;
    height: $size-unit * 1.5;
    width: $size-unit * 1.5;
  }
}

.search-result-link {
  display: block;
  text-decoration: inherit;
  color: inherit;

  &:not(:last-of-type) {
    margin-bottom: $size-unit;
  }
}
</style>
