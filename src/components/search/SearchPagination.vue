<template>
  <div class="wrap">
    <div class="search-pagination" v-if="pageTotal > 0">
      <div class="prev">
        <button @click="prev" v-if="page > 0"><ArrowLeftIcon />Forrige</button>
      </div>
      <div class="flex-grow">
        <div class="pages">
          <!-- Vuetify pagination is 1 indexed, page is 0 indexed -->
          <v-pagination
            :circle="true"
            :value="page + 1"
            :length="pageTotal"
            @input="onPageChange($event - 1)"
          ></v-pagination>
        </div>
      </div>
      <div class="next">
        <button @click="next" v-if="page < pageTotal - 1">
          Næste
          <ArrowRightIcon />
        </button>
      </div>
    </div>
    <div class="page-info">
      <span>Antal viste</span>
      <SelectionField
        class="size-select"
        :value="chosenSize"
        :items="sizes"
        :type="'number'"
        :clearable="false"
        :dropdown="true"
        @change="onSizeChange($event.value)"
      ></SelectionField>
      <span>Side {{ page + 1 }} af {{ pageTotal }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';
import SelectionField from '../common/inputs/SelectionField.vue';

@Component({
  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
    SelectionField
  }
})
export default class SearchPagination extends Vue {
  @Prop(Number) page!: number;
  @Prop(Number) pageTotal!: number;
  @Prop(Number) size!: number;
  sizes: Array<{ text: string; value: number }> = Array.from([5, 10, 25], (value, index) => ({
    value,
    text: value.toString()
  }));
  chosenSize = 5;

  @Emit()
  onPageChange(page: number) {
    return page;
  }

  @Emit()
  onSizeChange(size: number) {
    this.chosenSize = size;
    return size;
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
      this.onPageChange(this.page - 1);
    }
  }

  next() {
    if (this.page < this.pageTotal) {
      this.onPageChange(this.page + 1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.wrap {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2rem 0;
}

.page-info {
  padding-right: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .size-select {
    width: 4.5rem;
    margin: 0 1.5rem 0 0.5rem;
  }
}
.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0 3rem;

  // Hide vuetify pagination navigation
  ::v-deep .v-pagination__navigation {
    display: none;
  }
}

.search-pagination {
  display: flex;
}

.next {
  text-align: right;
  flex: 1;
}

.prev {
  flex: 1;
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
