<template>
    <div class="grey-area-container">
        <div class="section-wrap">
            <div class="item-label-container">
                <slot name="item-labels"></slot>
            </div>
            <div class="item-input-container">
                <slot name="item-input"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class GeneralInformationForm extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.grey-area-container {
  display: flex;
  background-color: $color-grey;
  padding: $size-unit * 2;
  margin: $size-unit;
  border-radius: $size-unit;

  .section-wrap {
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 25%;

    &:not(:last-of-type) {
      border-right: 1px solid $color-background;
    }

    &:last-of-type {
      padding-right: 0;
    }

    &:first-of-type {
      padding-left: 0;
    }

    .item-label-container {
      display: flex;
      flex-direction: column;
      width: 50%;
      > * {
        padding: $size-unit/2;
        text-align: left;
      }
    }

    .item-input-container {
      display: flex;
      flex-direction: column;
      width: 50%;
      > * {
        padding: $size-unit/2;
        margin-left: auto;
      }
    }
  }
}
</style>
