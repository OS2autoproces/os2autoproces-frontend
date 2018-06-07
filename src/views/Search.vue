<template>
    <div class="search">
        <NavBar :user="user" />

        <div class="page">
            <div class="filters">
                <SearchFilters />
            </div>
            <div class="results-wrapper">
                <div class="report">
                    <button>
                        <PlusIcon/> Indberet</button>
                </div>

                <SearchSorting />

                <div class="results">
                    <SearchResult class="search-result" :result="result" v-for="result in results" :key="result.id" />
                </div>
                
                <SearchPagination :page="0" :pageTotal="23" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import NavBar from "../components/common/NavBar.vue";
import SearchFilters from "../components/search/SearchFilters.vue";
import SearchPagination from "../components/search/SearchPagination.vue";
import SearchResult from "../components/search/SearchResult.vue";
import SearchSorting from "../components/search/SearchSorting.vue";
import PlusIcon from "../components/icons/PlusIcon.vue";

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
  get user() {
    return (
      this.$store.state.user || {
        name: "Julie",
        roles: ["superbruger", "Admin"]
      }
    );
  }

  get results() {
    return [
      {
        name: "Rekruttering",
        resume:
          "Resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume",
        assessedPotential: 2,
        municipality: "Syddjurs Kommune",
        id: "56472927382",
        field: "Teknik",
        kleNumber: "4348",
        law: "Lov om aktiv social politik §128",
        phase: 1,
        favorite: false
      },
      {
        name: "Rekruttering",
        resume:
          "Resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume, resume",
        assessedPotential: 3,
        municipality: "Syddjurs Kommune",
        id: "56472927383",
        field: "Teknik",
        kleNumber: "4348",
        law: "Lov om aktiv social politik §128",
        phase: 2,
        favorite: true
      }
    ];
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.page {
  display: flex;
}

.filters {
  flex: 0 0 300px;
  border-right: 1px solid $color-grey;
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
  padding: 2 * $size-unit 0;

  svg {
    height: $size-unit * 1.5;
    width: $size-unit * 1.5;
  }
}

.results {
  flex-grow: 1;

  .search-result:not(:last-of-type) {
    margin-bottom: $size-unit;
  }
}
</style>
