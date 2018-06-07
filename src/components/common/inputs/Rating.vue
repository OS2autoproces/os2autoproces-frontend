<template>
    <div class="rating">
        <StarIcon class="star" :class="{selected: value > 0}" @click="setValue(1)" />
        <StarIcon class="star" :class="{selected: value > 1}" @click="setValue(2)" />
        <StarIcon class="star" :class="{selected: value > 2}" @click="setValue(3)" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import StarIcon from "../../icons/StarIcon.vue";

@Component({
  components: {
    StarIcon
  }
})
export default class Rating extends Vue {
  @Prop() disabled!: boolean;
  @Prop() value?: number;

  get comp() {
    return this.value;
  }

  setValue(value: number) {
    this.$emit("input", value);
  }
}
</script>

<style scoped lang="scss">
.star {
    height: 100%;
}
</style>