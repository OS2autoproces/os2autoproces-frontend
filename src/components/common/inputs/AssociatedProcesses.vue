<template>
  <div class="associated">
    <div class="filters">
      <SearchFilters :filters="filters" @change="updateFilters" @assign="assignFilters" umbrellaProcessSearch />
    </div>

    <div class="results">
      <div v-if="result">
        <div v-for="process in result.processes" :key="process.id" @click="add(process)" role="button">
          <SmallSearchResult class="result" :process="process" />
        </div>
      </div>

      <SearchPagination
        v-if="result"
        :page="result.page.number"
        :pageTotal="result.page.totalPages"
        @change="updateFilters({ page: $event })"
      />
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
import { UserSearchRequest } from '@/store/modules/commonInterfaces';
import { CommonModule } from '@/store/modules/common';
import { User } from '@/store/modules/auth';
import { SearchModule } from '@/store/modules/search';

@Component({
  components: {
    SearchFilters,
    SearchSorting,
    SmallSearchResult,
    SearchPagination
  }
})
export default class AssociatedProcesses extends Vue {
  get filters() {
    return SearchModule.filters;
  }

  get result() {
    return SearchModule.result;
  }

  updateFilters(filters: SearchFilters) {
    SearchModule.updateFilters({
      page: 0,
      ...filters
    });
  }

  assignFilters(filters: SearchFilters) {
    SearchModule.assignFilters({
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
    flex: 0 0 300px;
    margin-right: 2rem;
  }
}

.result {
  margin-bottom: 1rem;
}
</style>
