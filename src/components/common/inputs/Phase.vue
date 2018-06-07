<template>
    <div class="phase" @click="clicked()" :class="{ reverse, selected, disabled, small }">
        <div class="text">{{ text }}</div>
        <div class="angled-line-container">
            <div class="angled-line"></div>
        </div>
        <div class="horizontal-line"></div>
        <div class="circle"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Phase extends Vue {
  @Prop() private text!: string;
  @Prop() private reverse!: boolean;
  @Prop() private selected!: boolean;
  @Prop() private disabled!: boolean;
  @Prop() private small!: boolean;

  private clicked() {
    if (!this.disabled) {
      this.$emit("select");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.phase {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 1px;
  color: $color-disabled;

  &:not(.disabled) {
    cursor: pointer;
  }

  &.small {
    .circle {
        height: 23px;
        width: 23px;
    }
  }
}

.text {
  border-bottom: 1px solid $color-disabled;
  line-height: 19px;
}

.angled-line-container {
  width: 9px;
}

.angled-line {
  width: 7px;
  margin-top: 10px;
  height: 10px;
  border-right: 1px solid $color-disabled;
  transform: skew(-45deg) translateX(-2px);
}

.circle {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 2px solid $color-primary;
  background: $color-background;
}

.horizontal-line {
  height: 0;
  border-bottom: 1px solid $color-disabled;
  flex-grow: 1;
}

.phase.reverse {
  flex-direction: row-reverse;

  .angled-line {
    transform: skew(45deg) translateX(-2px);
  }
}

.phase.selected {
  color: $color-primary;

  * {
    border-color: $color-primary;
  }

  .circle {
    background: $color-primary;
  }
}

.phase.disabled {
  .circle {
    border-color: $color-secondary;
  }

  &.selected {
    color: $color-secondary;

    * {
      border-color: $color-secondary;
    }

    .circle {
      background: $color-secondary;
    }
  }
}
</style>