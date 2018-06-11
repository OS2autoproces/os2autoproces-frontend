<template>
    <div class="search">
        <NavBar :user="user" />

        <div class="page">
            <div>
                <SearchFilters />
            </div>
            <div>
                <div class="results-wrapper">
                    <div class="report">
                        <button>
                            <PlusIcon/> Indberet</button>
                    </div>

                    <SearchSorting v-if="result" />

                    <div class="results" v-if="result">
                        <SearchResult class="search-result" :process="process" v-for="process in result.processes" :key="process.id" />
                    </div>

                    <SearchPagination v-if="result" :page="result.page" :pageTotal="result.numberOfPages" />
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
// pagination
// Click process to go to details
// Call backend
// indberet button
// Check design details pdf to fix fonts and font-sizes
// Logout link
// font-colors in navbar
// Search when entering page

  get result() {
    return this.$store.state.search.result;
  }

  get user() {
    return (
      this.$store.state.user || {
        name: 'Julie',
        roles: ['superbruger', 'Admin']
      }
    );
  }

  mounted() {
    this.$store.dispatch(`${namespace}/search`);
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
    border-right: 1px solid $color-grey;
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
  text-align: right;

  color: $color-secondary;
  font-size: 2rem;
  font-weight: bold;
  padding-top: 3 * $size-unit;
  padding-bottom: $size-unit;

  svg {
    height: $size-unit * 1.5;
    width: $size-unit * 1.5;
  }
}

.search-result:not(:last-of-type) {
  margin-bottom: $size-unit;
}
</style>
