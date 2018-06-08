<template>
    <div class="checkbox" role="checkbox" :aria-checked="value.toString()" @click="click" :class="{ disabled }">
        <CheckIcon v-if="value" />
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import CheckIcon from "../../icons/CheckIcon.vue";

@Component({
  components: {
    CheckIcon
  }
})
export default class Checkbox extends Vue {
  @Prop() value!: boolean;
  @Prop() disabled!: boolean;

  click(event: any) {
    if (!this.disabled) {
      this.$emit("change", event);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.checkbox {
  width: 19px;
  height: 19px;
  border: 1px solid $color-primary;
  border-radius: 50%;
  position: relative;

  &:not(.disabled) {
    cursor: pointer;
  }

  svg {
    position: absolute;
    bottom: 1px;
    left: -1px;

    height: 20px;
    width: 20px;
  }
}
</style>

