<template>
  <div class="search">
    <NavBar />

    <div class="page" v-bind:style="[id ? { display: 'none' } : {}]">
      <div class="filters">
        <SearchFiltersComponent @change="updateFilters" @assign="assignFilters" />
      </div>
      <div>
        <div class="results-wrapper">

          <div class="header-content">
            <div class="text-section">
              <h1>Bliv inspireret til automatisering</h1>
              <p>Dyk ned i andres automatiseringsprocesser og få nye idéer til dit eget arbejde.</p>
              <p>Del dine erfaringer og vær med til at inspirere andre.</p>
              <p>Sammen driver vi automatiseringen frem i det offentlige.</p>
            </div>
            <div class="button-section">
              <div class="button-wrapper">
                <router-link class="addProcessBtn" to="/report"> <PlusIcon />Tilføj proces</router-link>
                <a class="apiBtn" href="https://www.os2autoproces.eu/swagger-ui/index.html">Brug API til at tilføje og opdatere processer automatisk</a>
              </div>
            </div>
          </div>

          <div class="searchSection">
            <div class="search-field-wrapper">
              <SearchField
                class="search-text"
                :value="state.filters.text"
                @change="updateFilters({ text: $event })"
                :placeholder="'Søg efter en automatiseret proces'"
              />
              <excelBtn></excelBtn>
            </div>
          </div>

          <div class="overTableBtnSection">
            <ColumnSelectionField
              class="column-select"
              :items="columns"
              itemText="name"
              :value="state.selectedColumns"
              placeholder="Vælg kolonner"
              @change="state.SET_SELECTED_COLUMNS($event)"
              multiple
            />
          </div>

          <div>
            <table id="processTable" v-if="state.result">
              <thead>
                <SearchTableHeaderSorting
                  :sorting="state.filters.sorting"
                  @change="updateFilters({ sorting: $event })"
                />
              </thead>
              <SearchResultRow v-for="process in state.result.processes" :process="process" v-bind:key="process.id" />
            </table>
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
    <Details
      :isReporting="false"
      :id="id"
      v-if="id"
      class="detailsView"
      @goBack="ieGoBack"
      @clickedHashLink="clickedHashLink = true"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import NavBar from '../components/common/NavBar.vue';
import SearchFiltersComponent from '../components/search/SearchFilters.vue';
import SearchPagination from '../components/search/SearchPagination.vue';
import SearchResult from '../components/search/SearchResult.vue';
import SearchResultRow from '../components/search/SearchResultRow.vue';
import SearchTableHeaderSorting from '../components/search/SearchTableHeaderSorting.vue';
import PlusIcon from '../components/icons/PlusIcon.vue';
import { SearchFilters, AllSearchTableColumns } from '@/store/modules/searchInterfaces';
import SearchSortingDropdown from '@/components/search/SearchSortingDropdown.vue';
import { SearchModule } from '@/store/modules/search';
import Details from './Details.vue';
import { ProcessModule } from '@/store/modules/process';
import SelectionField from '../components/common/inputs/SelectionField.vue';
import ColumnSelectionField from '../components/common/inputs/ColumnSelectionField.vue';
import excelBtn from '@/components/search/ExcelBtn.vue';
import { CommonModule } from '@/store/modules/common';
import SearchField from '../components/common/inputs/SearchField.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';

@Component({
  components: {
    PlusIcon,
    NavBar,
    SearchFiltersComponent,
    SearchPagination,
    SearchResult,
    SearchResultRow,
    SearchSortingDropdown,
    Details,
    SearchTableHeaderSorting,
    SelectionField,
    ColumnSelectionField,
    excelBtn,
    SearchField,
    InfoTooltip
  }
})
export default class Search extends Vue {
  @Prop({ type: Object as () => SearchFilters }) initialFilters!: SearchFilters;
  @Prop(Number) id?: number;
  clickedHashLink = false;

  lastFilterUpdate: Partial<SearchFilters> = {};

  get state() {
    return SearchModule;
  }

  columns = AllSearchTableColumns;

  async ieGoBack() {
    await this.updateFilters(this.lastFilterUpdate);
  }

  async updateFiltersAndScrollToTop(filters: Partial<SearchFilters>) {
    const search = this.lastFilterUpdate.text;
    await this.updateFilters(filters);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    next(this.shouldContinueWithoutSaving());
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    next(this.shouldContinueWithoutSaving());
  }

  shouldLeaveWithoutSaving(event: BeforeUnloadEvent) {
    if (this.id && ProcessModule.hasChanged && !this.clickedHashLink) {
      const message = 'Vil du fortsætte uden at gemme?';
      event.returnValue = message;
      return message;
    }
    this.clickedHashLink = false;
  }

  shouldContinueWithoutSaving(): boolean {
    if (!this.id || !ProcessModule.hasChanged || this.clickedHashLink) {
      this.clickedHashLink = false;
      return true;
    }

    return confirm('Vil du fortsætte uden at gemme?');
  }

  updateFilters(filters: Partial<SearchFilters>) {
    this.lastFilterUpdate = filters;

    return SearchModule.assignFilters({
      page: 0,
      ...filters
    });
  }

  assignFilters(filters: Partial<SearchFilters>) {
    this.lastFilterUpdate = filters;

    SearchModule.assignFilters({
      page: 0,
      ...filters
    });
  }

  // we can't set an id directly on the input field (would be nice). Instead we set an id on a div above. Therefore we need to find the first (and only) input field in the div.
  findFirstInputElementValue(element: HTMLElement | null): string | null {
    if (!element) {
      return null;
    }

    if (element.tagName.toLowerCase() === 'input') {
      return (element as HTMLInputElement).value;
    } else {
      for (const child of element.children) {
        const result = this.findFirstInputElementValue(child as HTMLElement);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  async mounted() {
    (await !!this.initialFilters) ? SearchModule.assignFilters(this.initialFilters) : SearchModule.search();

    // listen for process changes (eg. on search)
    this.$watch(
      () => SearchModule.result?.processes,
      (newValue, oldValue) => {
        if (newValue != null) {
          const searchDiv = document.getElementById('searchFieldDiv');
          const search = this.findFirstInputElementValue(searchDiv);
          if (search != null && search !== '') {
            CommonModule.highlightWord(search);
          } else {
            CommonModule.removeHighlight();
          }
        }
      }
    );
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
  padding-top: 40px;
}

/* row above table styling */
.excelBtnRowWrapper {
  display: flex;
  align-items: center;
  .column-select {
    margin-left: 1rem;
    min-width: 13rem;
    max-width: 37rem;
  }
}

/* table styling */
#processTable {
  width: 100%;
  border-collapse: collapse;
}

#processTable tbody:nth-child(even) {
  background-color: #f2f2f2;
}

// add process btn
.addProcessBtn {
  color: $color-black;
  border-radius: 20px;
  padding: 0.5rem 2rem;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;
  font-weight: 600;
  color: #ffffff;
  background-color: $color-primary;
  
  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }
}

// header section
.header-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.text-section {
  flex: 0 0 80%;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.apiBtn {
  color: $color-primary;
  font-size: 0.9rem;
  text-align: right;
  
  &:hover {
    text-decoration: underline;
  }
}

.overTableBtnSection {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.searchSection {
  margin-bottom: 2rem;
}

.search-field-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  
  .search-text {
    flex: 0 0 50%;
  }
  
  h2 {
    @include heading;
    color: $color-primary;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
}

.overTableBtnSection {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
}

.excelBtnRowWrapper {
  display: flex;
  align-items: center;

  button {
    margin: 0px;
  }
}
</style>
