<template>
  <div>
    <div class="text-area" :class="{ 'out-of-bounds': currentLength > maxLength }" v-if="!disabled">
      <tiptap-vuetify
        :value="value"
        :extensions="extensions"
        :class="{ 'no-resize': noResize }"
        :style="{ 'min-height': minHeight }"
        :placeholder="placeholder"
        @input="valueChanged($event)"
      >
      </tiptap-vuetify>
      <div class="text-area-overlay">
        <div class="text-area-char-count" v-if="maxLength">({{ currentLength }} ud af {{ maxLength }} tegn)</div>
        <slot />
      </div>
    </div>
    <div
      class="text-area-readonly"
      :class="{ 'double-column': twoColumns, 'full-width': fullWidth }"
      v-if="disabled"
      v-html="sanitizedHtml"
    ></div>
  </div>
</template>

<script lang="ts">
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  BulletList,
  OrderedList,
  ListItem,
  Blockquote,
  HardBreak,
  History
  // @ts-ignore
} from 'tiptap-vuetify';
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component({
  components: { TiptapVuetify }
})
export default class RichTextArea extends Vue {
  @Prop(String)
  value!: string;
  @Prop(Boolean)
  disabled!: boolean;
  @Prop(String)
  placeholder!: string;
  @Prop(Number)
  maxLength!: number;
  @Prop({ type: String, default: '250px' })
  minHeight!: string;
  @Prop(Boolean)
  noResize!: boolean;
  @Prop(Number)
  twoColumnBreakpoint!: number;
  @Prop(Boolean)
  fullWidth!: boolean;

  extensions = [
    [
      Heading,
      {
        options: {
          levels: [1, 2, 3]
        }
      }
    ],
    Bold,
    Italic,
    Underline,
    Strike,
    ListItem,
    BulletList,
    OrderedList,
    History,
    Blockquote,
    HardBreak
  ];

  get sanitizedHtml(): string {
    return this.value;
  }

  get currentLength() {
    const htmlTagRegex = /(<([^>]+)>)/gi;
    return this.value.length ? this.value.replace(htmlTagRegex, '').length : 0;
  }

  get twoColumns() {
    return this.value ? this.value.length > this.twoColumnBreakpoint : false;
  }

  valueChanged(htmlString: string) {
    this.$emit('change', htmlString);
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.text-area {
  position: relative;
  border: 1px solid $color-primary;
  border-radius: 10px;
  padding: 10px;
  padding-bottom: 25px;
  background: $color-background;

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

.double-column {
  width: 100%;
  column-count: 2;
  column-gap: 5rem;
}

tiptap-vuetify {
  width: 100%;

  &.no-resize {
    resize: none;
  }
}

.v-application .grey.lighten-4 {
  background-color: $color-background !important;
  border: 1px solid $color-primary !important;
  border-radius: 10px !important;
}

.v-card {
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.tiptap-vuetify-editor__content {
  min-height: 250px;
  padding: 0 0 0 0;
}
.tiptap-vuetify-editor__content .ProseMirror {
  min-height: 250px;
  margin: 0px !important;
}
</style>
