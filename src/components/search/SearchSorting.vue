<template>
  <div class="search-sorting">
    <div class="sort-option-column">
      <div @click="clickSortOption('title')" role="button">Proces
        <SortIcon v-if="sorting.property === 'title'" :descending="sorting.descending" />
      </div>
    </div>
    <div class="sort-option-column">
      <div @click="clickSortOption('rating')" role="button">Vurderet potentiale
        <SortIcon v-if="sorting.property === 'rating'" :descending="sorting.descending" />
      </div>
    </div>
    <div class="sort-option-column">
    </div>
    <div class="sort-option-column">
      <div @click="clickSortOption('status')" role="button">Status
        <SortIcon v-if="sorting.property === 'status'" :descending="sorting.descending" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SortIcon from '../icons/SortIcon.vue';
import { SortingOption } from '@/store/modules/search/state.ts';

@Component({
  components: {
    SortIcon
  }
})
export default class SearchSorting extends Vue {
  @Prop(Object) sorting!: SortingOption;

  clickSortOption(property: SortingOption['property']) {
    let descending = false;

    if (this.sorting && property === this.sorting.property) {
      descending = !this.sorting.descending;
    }

    this.$emit('change', { property, descending });
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.search-sorting {
  display: flex;
  padding: 1rem;
}

.sort-option-column {
  @include heading;
  color: $color-primary;
  flex: 0 0 25%;

  > div {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  svg {
    margin-left: 1rem;
    height: 1rem;
    width: 1rem;
  }
}
</style>
