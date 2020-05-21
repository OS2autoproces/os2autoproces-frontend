<template>
  <div>
    <div
      class="text-area"
      :class="{ 'out-of-bounds': (currentLength > maxLength),  hasError: hasError }"
      v-if="!disabled"
    >
      <textarea
        :value="value"
        @input="valueChanged"
        :placeholder="placeholder"
        :class="{ 'no-resize': noResize}"
        :style="{'min-height': minHeight}"
      />
      <div class="text-area-overlay">
        <div
          class="text-area-char-count"
          v-if="maxLength"
        >({{currentLength}} ud af {{maxLength}} tegn)</div>
        <slot />
      </div>
    </div>
    <div
      class="text-area-readonly"
      :class="{'double-column': twoColumns, 'full-width': fullWidth }"
      v-if="disabled"
      v-html="sanitizedHtml"
    ></div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import DOMPurify from 'dompurify';

@Component
export default class TextArea extends Vue {
  @Prop(String)
  value!: string;
  @Prop(String)
  readonlyHtml!: string;
  @Prop(Number)
  maxLength!: number;
  @Prop(Boolean)
  disabled!: boolean;
  @Prop(String)
  placeholder!: string;
  @Prop(Boolean)
  noResize!: boolean;
  @Prop(Number)
  twoColumnBreakpoint!: number;
  @Prop(Boolean)
  fullWidth!: boolean;
  @Prop({ type: String, default: '250px' })
  minHeight!: string;
  @Prop(Boolean) hasError!: boolean;

  get sanitizedHtml(): string {
    return !!this.readonlyHtml
      ? DOMPurify.sanitize(this.readonlyHtml, { ALLOWED_TAGS: ['a'], ALLOWED_ATTR: ['href', 'target'] })
      : this.value;
  }

  get currentLength() {
    return this.value.length ? this.value.length : 0;
  }

  get twoColumns() {
    return this.value ? this.value.length > this.twoColumnBreakpoint : false;
  }

  valueChanged(event: any) {
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
  background: $color-background;

  &.hasError {
    border-color: red;
  }
  &.out-of-bounds {
    border-color: red;
    box-shadow: inset 0 0 8px rgb(235, 98, 98);

    .text-area-overlay > .text-area-char-count {
      color: red;
    }
  }

  .text-area-overlay {
    display: inline-block;
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    text-align: right;
  }
}

.text-area-readonly {
  white-space: pre-wrap;
  width: 100%;
  word-break: break-all;
}

.full-width {
  width: 100%;
}

textarea {
  width: 100%;

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

