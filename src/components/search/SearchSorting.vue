<template>
    <div class="search-sorting">
        <div class="sort-option-column">
            <div @click="toggleProcessSort">Proces
                <SortIcon />
            </div>
        </div>
        <div class="sort-option-column">
            <div @click="togglePotentialSort">Vurderet potentiale
                <SortIcon />
            </div>
        </div>
        <div class="sort-option-column">
            <div @click="toggleFieldSort">Fagområde
                <SortIcon />
            </div>
        </div>
        <div class="sort-option-column">
            <div @click="toggleStatusSort">Status
                <SortIcon />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SortIcon from "../icons/SortIcon.vue";

@Component({
  components: {
    SortIcon
  }
})
export default class NavBar extends Vue {
  toggleProcessSort() {
    this.$emit("process");
  }

  togglePotentialSort() {
    this.$emit("potential");
  }

  toggleFieldSort() {
    this.$emit("field");
  }

  toggleStatusSort() {
    this.$emit("status");
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.search-sorting {
  display: flex;
  padding: $size-unit;
}

.sort-option-column {
  color: $color-primary;
  font-weight: bold;
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
