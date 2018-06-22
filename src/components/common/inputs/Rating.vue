<template>
    <div class="rating" :class="{disabled}">
        <div @click="setValue(1)">
            <StarIcon class="star" :class="{selected: value > 0}" />
        </div>
        <div @click="setValue(2)">
            <StarIcon class="star" :class="{selected: value > 1}" />
        </div>
        <div @click="setValue(3)">
            <StarIcon class="star" :class="{selected: value > 2}" />
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
  @Prop() disabled!: boolean;
  @Prop() value!: number;

  setValue(value: number) {
    if (!this.disabled) {
      this.$emit('change', value);
    }
  }
}
</script>

<style scoped lang="scss">
.rating {
  display: flex;
  justify-content: space-between;
}

.rating:not(.disabled) .star {
  cursor: pointer;
}
</style>