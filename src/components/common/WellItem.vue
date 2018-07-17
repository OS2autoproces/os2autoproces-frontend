<template>
  <div class="well-item-wrap" :class="{invalid}">
    <div class="well-item-label" :style="{flexBasis: labelWidth}">{{label}}</div>
    <div class="well-input">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class WellItem extends Vue {
  @Prop() label!: string;
  @Prop({ default: "50%" })
  labelWidth!: string;
  @Prop() invalid!: boolean;
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.well-item-wrap {
  display: flex;
  align-items: center;

   &.invalid {
    > .well-item-label {
     color: red !important;
     font-style: italic;
    }
  }

  .well-item-label {
    @include field-label;
    flex-shrink: 0;
    margin-right: $size-unit;
  }

  .well-input {
    @include field-input-text;
    flex-grow: 1;
    overflow-wrap: break-word;
    min-width: 1px;
  }
}

</style>
