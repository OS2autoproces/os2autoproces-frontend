<template>
  <div class="search-pagination">
    <div class="prev" v-if="page > 0">
      <button @click="prev">
        <ArrowLeftIcon /> Forrige
      </button>
    </div>
    <div class="flex-grow"></div>
    <div class="next">
      <button @click="next" v-if="page < pageTotal - 1">
        Næste
        <ArrowRightIcon />
      </button>
      <div>Side {{page + 1}} af {{pageTotal}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
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

  prev() {
    if (this.page > 0) {
      this.$emit('change', this.page - 1);
    }
  }

  next() {
    if (this.page < this.pageTotal) {
      this.$emit('change', this.page + 1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.search-pagination {
  display: flex;
  padding: 2 * $size-unit 0;
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
  margin-bottom: $size-unit;

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
}
</style>
