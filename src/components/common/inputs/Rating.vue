<template>
  <div class="rating" :class="{ disabled, hasError: hasError }">
    <div @click="setValue(1)">
      <StarIcon class="star" :class="{ selected: value > 0 }" />
    </div>
    <div @click="setValue(2)">
      <StarIcon class="star" :class="{ selected: value > 1 }" />
    </div>
    <div @click="setValue(3)">
      <StarIcon class="star" :class="{ selected: value > 2 }" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import StarIcon from '../../icons/StarIcon.vue';

@Component({
  components: {
    StarIcon
  }
})
export default class Rating extends Vue {
  @Prop(Boolean) disabled!: boolean;
  @Prop(Number) value!: number;
  @Prop(Boolean) hasError!: boolean;

  setValue(value: number) {
    if (!this.disabled) {
      this.$emit('change', value);
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.rating {
  display: inline-flex;
  justify-content: space-between;

  &.hasError {
    border: 0.2em solid $color-error;
    border-width: 0.2em;
    min-height: 50px;
    border-radius: 20px;
  }
}

.rating:not(.disabled) .star {
  cursor: pointer;
}
</style>
