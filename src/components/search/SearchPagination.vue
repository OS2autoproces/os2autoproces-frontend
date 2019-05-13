<template>
  <div
    class="search-pagination"
    v-if="pageTotal > 0"
  >
    <div
      class="prev"
      v-if="page > 0"
    >
      <button @click="prev">
        <ArrowLeftIcon /> Forrige
      </button>
    </div>
    <div class="flex-grow">
      <div class="pages">
        <!-- Vuetify pagination is 1 indexed, page is 0 indexed -->
        <v-pagination
          :circle="true"
          :value="page + 1"
          :length="pageTotal"
          @input="change($event - 1)"
        >
        </v-pagination>
      </div>
    </div>
    <div class="next">
      <button
        @click="next"
        v-if="page < pageTotal - 1"
      >
        Næste
        <ArrowRightIcon />
      </button>
      <div>Side {{page + 1}} af {{pageTotal}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';

@Component({
  components: {
    ArrowLeftIcon,
    ArrowRightIcon
  }
})
export default class SearchPagination extends Vue {
  @Prop(Number) page!: number;
  @Prop(Number) pageTotal!: number;
  @Emit()
  change(page: number) {
    return page;
  }

  pageIsActive(page: number) {
    return page === this.page;
  }

  get pages(): number[] {
    if (!this.pageTotal) {
      return [];
    }
    return Array.from(new Array(this.pageTotal), (_, index) => index);
  }

  prev() {
    if (this.page > 0) {
      this.change(this.page - 1);
    }
  }

  next() {
    if (this.page < this.pageTotal) {
      this.change(this.page + 1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0 3rem;

  // Hide vuetify pagination navigation
  /deep/ .v-pagination__navigation {
    display: none;
  }
}

.search-pagination {
  display: flex;
  padding: 2rem 0;
}

.next {
  text-align: right;
}

button {
  font-size: 1.25rem;
  color: $color-primary;
  display: inline-flex;
  align-items: center;
  margin: 0;
  margin-bottom: 1rem;

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
}
</style>
