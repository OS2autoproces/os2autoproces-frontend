<template>
    <div class="grey-area-container">
        <div class="section-wrap">
            <slot></slot>
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
  background-color: $color-background-grey;
  padding: $size-unit * 2;
  margin: $size-unit;
  border-radius: $size-unit;

  .section-wrap {
    display: flex;
    flex: 1 1 1px;

    > * {
        &:not(:last-of-type) {
          border-right: 1px solid $color-background;
        }
    
        &:last-of-type {
          padding-right: 0;
        }
    
        &:first-of-type {
          padding-left: 0;
        }
    }
  }
}
</style>
