<template>
    <div class="toggle" role="button" @click="click">
        <div class="toggle-label">Fra</div>
        <div class="flex-grow"></div>
        <div class="toggle-label">Til</div>
        <div class="toggle-slider" role="button" :class="{ on: value }">
            <slot /> {{value ? 'til' : 'fra'}}
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Toggle extends Vue {
  @Prop(Boolean) value!: boolean;

  click() {
    this.$emit('change', !this.value);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.toggle {
  border: 1px solid $color-primary;
  border-radius: .5rem;
  padding: 0 1rem;
  width: 250px;
  height: 40px;
  align-items: center;
  display: inline-flex;
  position: relative;
}

.toggle-label {
  @include light-heading;
  color: $color-grey;
}

.toggle-slider {
  @include heading;
  position: absolute;
  height: 40px;
  line-height: 40px;
  padding: 0 1rem;
  color: $color-background;
  background-color: $color-secondary;
  border-radius: .5rem;
  top: -1px;

  &.on {
    right: -1px;
  }

  &:not(.on) {
    left: -1px;
  }
}
</style>

