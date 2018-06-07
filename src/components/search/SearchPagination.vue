<template>
    <div class="search-pagination">
        <div class="prev" v-if="page > 0">
            <button>
                <ArrowLeftIcon /> Forrige</button>
        </div>
        <div class="fill"></div>
        <div class="next" v-if="page < pageTotal">
            <button>Næste
                <ArrowRightIcon />
            </button>
            <div>Side {{page}} af {{pageTotal}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ArrowLeftIcon from "../icons/ArrowLeftIcon.vue";
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";

@Component({
  components: {
    ArrowLeftIcon,
    ArrowRightIcon
  }
})
export default class NavBar extends Vue {
  @Prop() page!: number;
  @Prop() pageTotal!: number;

  prev() {
    if (this.page > 0) {
      this.$emit("change", this.page - 1);
    }
  }

  next() {
    if (this.page < this.pageTotal) {
      this.$emit("change", this.page + 1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.search-pagination {
    display: flex;
    padding: 2*$size-unit 0;
}

.fill {
    flex-grow: 1;
}

button {
    color: $color-primary;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: $size-unit;

    svg {
        height: 1.5rem;
        width: 1.5rem;
    }
}
</style>
