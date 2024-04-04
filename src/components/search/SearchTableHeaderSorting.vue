<template>
  <tr>
    <th v-if="state.selectedColumnIds.includes(1)">
      <div class="search-sorting">
        <div class="sort-option-column">
          <div @click="clickSortOption('id')" role="button">
            ID
            <SortIcon v-if="sorting.property === 'id'" :descending="sorting.descending" />
          </div>
        </div>
      </div>
    </th>
    <th v-if="state.selectedColumnIds.includes(2)">
      <div class="search-sorting">
        <div class="sort-option-column">
          <div @click="clickSortOption('title')" role="button">
            Titel
            <SortIcon v-if="sorting.property === 'title'" :descending="sorting.descending" />
          </div>
        </div>
      </div>
    </th>
    <th v-if="state.selectedColumnIds.includes(3)">
      <div class="search-sorting">
        <div class="sort-option-column">
          <div @click="clickSortOption('municipalityName')" role="button">
            Organisation
            <SortIcon v-if="sorting.property === 'municipalityName'" :descending="sorting.descending" />
          </div>
        </div>
      </div>
    </th>
    <th v-if="state.selectedColumnIds.includes(4)">
      <div class="search-sorting">
        <div class="sort-option-column">
          <div @click="clickSortOption('lastChanged')" role="button">
            Opdateret
            <SortIcon v-if="sorting.property === 'lastChanged'" :descending="sorting.descending" />
          </div>
        </div>
      </div>
    </th>
    <th v-if="state.selectedColumnIds.includes(5)">
      <div class="search-sorting">
        <div class="sort-option-column">
          <div @click="clickSortOption('phase')" role="button">
            Fase
            <SortIcon v-if="sorting.property === 'phase'" :descending="sorting.descending" />
          </div>
        </div>
      </div>
    </th>
    <th v-if="state.selectedColumnIds.includes(6)">
      <div class="search-sorting">
        <div class="sort-option-column">
          <div @click="clickSortOption('shortDescription')" role="button">
            Resumé
            <SortIcon v-if="sorting.property === 'shortDescription'" :descending="sorting.descending" />
          </div>
        </div>
      </div>
    </th>
    <th v-if="state.selectedColumnIds.includes(7)">
      <div class="search-sorting">
        <div class="sort-option-column">
          <div @click="clickSortOption('status')" role="button">
            Status
            <SortIcon v-if="sorting.property === 'status'" :descending="sorting.descending" />
          </div>
        </div>
      </div>
    </th>
    <th v-if="state.selectedColumnIds.includes(8)">Fagområder</th>
    <th v-if="state.selectedColumnIds.includes(9)">
      FÅE<InfoTooltip>Forventet årligt effektiviseringspotentiale</InfoTooltip>
    </th>
    <th v-if="state.selectedColumnIds.includes(10)">Anvendt teknologi</th>
    <th v-if="state.selectedColumnIds.includes(11)">
      <div class="search-sorting">
        <div class="sort-option-column">
          <div @click="clickSortOption('runPeriod')" role="button">
            Skedulering
            <SortIcon v-if="sorting.property === 'runPeriod'" :descending="sorting.descending" />
          </div>
        </div>
      </div>
    </th>
    <th v-if="state.selectedColumnIds.includes(12)">Bilag</th>
    <th v-if="state.selectedColumnIds.includes(13)">Favorit</th>
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SortIcon from '../icons/SortIcon.vue';
import { SortingOption } from '@/store/modules/searchInterfaces';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import { SearchModule } from '@/store/modules/search';

@Component({
  components: {
    SortIcon,
    InfoTooltip
  }
})
export default class SearchTableHeaderSorting extends Vue {
  @Prop(Object) sorting!: SortingOption;

  get state() {
    return SearchModule;
  }

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

/* table styling */
th {
  color: $color-secondary;
  font-weight: bold;
  padding: 0.5rem;
  text-align: left;
  border-bottom: 2px solid #f2f2f2;
}

/* bookmark column */
th:nth-child(13) {
  width: 50px;
}

/* id column */
th:nth-child(1) {
  width: 50px;
}

.search-sorting {
  display: flex;
}

.sort-option-column {
  @include heading;
  flex: 0 0 75%;

  > div {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  svg {
    margin-left: 0.5rem;
    height: 1rem;
    width: 1rem;
  }
}
</style>
