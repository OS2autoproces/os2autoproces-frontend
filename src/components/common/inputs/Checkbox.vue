<template>
  <div class="checkbox" role="checkbox" :aria-checked="valueString" @click="click" :class="{ disabled }">
    <div class="checkbox-icon">
      <CheckIcon v-if="value" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import CheckIcon from '../../icons/CheckIcon.vue';

@Component({
  components: {
    CheckIcon
  }
})
export default class Checkbox extends Vue {
  @Prop(Boolean) value!: boolean;
  @Prop(Boolean) disabled!: boolean;

  get valueString() {
    return this.value ? this.value.toString() : 'false';
  }

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
  display: inline-flex;
  white-space: nowrap;
  align-items: center;

  .checkbox-icon {
    background-color: $color-background;
    margin-right: 0.25rem;
    position: relative;
    border-radius: 50%;
    border: 1px solid $color-primary;
    display: inline-block;
    width: 20px;
    height: 20px;

    ::v-deep svg {
      position: absolute;
      bottom: 1px;
      left: -1px;

      height: 110%;
      width: 110%;
    }
  }

  &:not(.disabled) {
    cursor: pointer;
  }
}
</style>
