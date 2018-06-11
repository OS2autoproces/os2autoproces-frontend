<template>
    <div class="checkbox" role="checkbox" :aria-checked="value.toString()" @click="click" :class="{ disabled, selected: value }">
        <div>
            <slot />
        </div>
        <CheckIcon v-if="value" />
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import CheckIcon from '../../icons/CheckIcon.vue';

@Component({
  components: {
    CheckIcon
  }
})
export default class Checkbox extends Vue {
  @Prop({ default: false })
  value!: boolean;
  @Prop() disabled!: boolean;

  click() {
    if (!this.disabled) {
      this.$emit('change', !this.value);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.checkbox {
  display: flex;
  background: $color-secondary;
  padding: $size-unit/2 $size-unit;
  color: white;
  border-radius: 20px;

  > div:first-of-type {
    flex-grow: 1;
  }

  &.selected {
    font-weight: bold;
  }

  &:not(.disabled) {
    cursor: pointer;
  }

  svg {
    height: 20px;
    width: 20px;

    /deep/ path {
      fill: $color-background;
    }
  }
}
</style>

