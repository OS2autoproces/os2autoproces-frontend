<template>
  <div class="associated">
    <div class="filters">
      <SearchFilters :filters="filters" @change="updateFilters" />
    </div>

    <div class="results">
      <div v-if="result">
        <div v-for="process in result.processes" :key="process.id" @click="add(process)" role="button">
          <SmallSearchResult class="result" :process="process" />
        </div>
      </div>

      <SearchPagination v-if="result" :page="result.page.number" :pageTotal="result.page.totalPages" @change="updateFilters({ page: $event })" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import SearchFilters from '@/components/search/SearchFilters.vue';
import SearchSorting from '@/components/search/SearchSorting.vue';
import SmallSearchResult from '@/components/search/SmallSearchResult.vue';
import SearchPagination from '@/components/search/SearchPagination.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { commonActionTypes, UserSearchRequest } from '@/store/modules/common/actions';
import { User } from '@/store/modules/auth/state';
import { searchActionTypes } from '@/store/modules/search/actions';

@Component({
  components: {
    SearchFilters,
    SearchSorting,
    SmallSearchResult,
    SearchPagination
  }
})
export default class AssociatedProcesses extends Vue {
  get state() {
    return this.$store.state;
  }

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
  }

  add(process: any) {
    this.$emit('add', process);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.associated {
  display: flex;

  .results {
    flex-grow: 1;
  }

  .filters {
    flex: 0 0 auto;
    margin-right: 2 * $size-unit;
  }
}

.result {
  margin-bottom: $size-unit;
}
</style>
