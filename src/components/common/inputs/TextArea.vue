<template>
  <div>
    <div class="text-area" v-if="!disabled">
      <textarea :value="value" @input="valueChanged" :placeholder="placeholder" :class="{ 'no-resize': noResize }" />
      <div class="text-area-overlay">
        <slot />
        <div v-if="maxLength" class="max-length-label">({{currentLength}} ud af {{maxLength}} tegn)</div>
      </div>
    </div>
    <div class="text-area-readonly" :class="{'double-column': value.length > twoColumnBreakpoint}" v-if="disabled">{{value}}</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TextArea extends Vue {
  @Prop() value!: string;
  @Prop() maxLength!: number;
  @Prop() disabled!: boolean;
  @Prop() placeholder!: string;
  @Prop() noResize!: boolean;
  @Prop() twoColumnBreakpoint!: number;

  currentLength = 0;

  valueChanged(event: any) {
    this.currentLength = event.target.value.length;
    this.$emit('change', event.target.value);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.text-area {
  position: relative;
  border: 1px solid $color-primary;
  border-radius: 10px;
  padding: 10px;
  padding-bottom: 25px;
  width: 100%;
  background: $color-background;

  .text-area-overlay {
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 5px;
    text-align: right;
  }

  .max-length-label {
    padding-right: 20px;
  }
}

.text-area-readonly {
  white-space: pre-wrap;
  width: 50%;
}

textarea {
  width: 100%;
  min-height: 250px;

  &.no-resize {
    resize: none;
  }
}

.double-column {
  width: 100%;
  column-count: 2;
  column-gap: 5rem;
}
</style>

