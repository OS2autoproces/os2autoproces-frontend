<template>
    <div class="search-sorting">
        <div class="sort-option-column">
            <div @click="clickSortOption('name')" role="button">Proces
                <SortIcon />
            </div>
        </div>
        <div class="sort-option-column">
            <div @click="clickSortOption('potential')" role="button">Vurderet potentiale
                <SortIcon />
            </div>
        </div>
        <div class="sort-option-column">
            <div @click="clickSortOption('field')" role="button">Fagområde
                <SortIcon />
            </div>
        </div>
        <div class="sort-option-column">
            <div @click="clickSortOption('status')" role="button">Status
                <SortIcon />
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
  @Prop() sorting!: SortingOption;

  clickSortOption(property: string) {
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
  padding: $size-unit;
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
    margin-left: $size-unit;
    height: $size-unit;
    width: $size-unit;
  }
}
</style>
