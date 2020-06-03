<template>
  <div>
    <div class="text-area" :class="{ 'out-of-bounds': currentLength > maxLength }" v-if="!disabled">
      <div class="editor" v-if="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div class="menubar">
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
            >
              H1
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
            >
              H2
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
            >
              H3
            </button>

            <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
              <v-icon>format_bold</v-icon>
            </button>

            <button class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
              <v-icon>format_italic</v-icon>
            </button>

            <button class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
              <v-icon>strikethrough_s</v-icon>
            </button>

            <button class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
              <v-icon>format_underline</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
            >
              <v-icon>format_list_bulleted</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
            >
              <v-icon>format_list_numbered</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
            >
              <v-icon>format_quote</v-icon>
            </button>

            <button class="menubar__button" @click="commands.undo">
              <v-icon>undo</v-icon>
            </button>

            <button class="menubar__button" @click="commands.redo">
              <v-icon>redo</v-icon>
            </button>
          </div>
        </editor-menu-bar>

        <editor-content
          class="editor__content"
          :editor="editor"
          :class="{ 'no-resize': noResize }"
          :style="{ 'min-height': minHeight }"
        />
      </div>
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
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Strike,
  Underline,
  History,
  Placeholder
  // @ts-ignore
} from 'tiptap-extensions';
import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    EditorContent,
    EditorMenuBar
  }
})
export default class RichTextArea extends Vue {
  @Prop(String)
  readonly value!: string;
  @Prop(Boolean)
  readonly disabled!: boolean;
  @Prop(String)
  readonly placeholder!: string;
  @Prop(Number)
  readonly maxLength!: number;
  @Prop({ type: String, default: '250px' })
  readonly minHeight!: string;
  @Prop(Boolean)
  readonly noResize!: boolean;
  @Prop(Number)
  readonly twoColumnBreakpoint!: number;
  @Prop(Boolean)
  readonly fullWidth!: boolean;

  emitAfterOnUpdate = false;

  editor: Editor | null = null;

  extensions = [
    new Blockquote(),
    new BulletList(),
    new HardBreak(),
    new Heading({ levels: [1, 2, 3] }),
    new ListItem(),
    new OrderedList(),
    new Bold(),
    new Italic(),
    new Strike(),
    new Underline(),
    new History(),
    new Placeholder({
      showOnlycurrent: false,
      emptyNodeText: (node: any) => {
        return this.placeholder;
      }
    })
  ];

  mounted() {
    this.editor = new Editor({
      extensions: this.extensions,
      editable: !this.disabled,
      onUpdate: this.onUpdate.bind(this),
      content: this.value
    });
  }

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

  @Watch('disabled')
  onDisabledChange(val: boolean) {
    if (this.editor) {
      this.editor.setOptions({ editable: !val });
    }
  }

  @Watch('value')
  onValueChange(val: any) {
    if (this.emitAfterOnUpdate) {
      this.emitAfterOnUpdate = false;
      return;
    }

    if (this.editor) {
      this.editor.setContent(val);
    }
  }

  onUpdate(info: any) {
    this.emitAfterOnUpdate = true;
    this.$emit('change', info.getHTML());
  }

  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.text-area {
  position: relative;
  border: 1px solid $color-primary;
  padding: 0.1em;
  border-radius: 10px;
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

.editor {
  width: 100%;

  &.no-resize {
    resize: none;
  }
}

.editor .is-empty:first-child:before,
.editor .is-empty:nth-child(2):before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

.menubar {
  padding: 0.2em;
  background-color: $color-background !important;
  border-bottom: 0.1em solid $color-primary !important;
}

.menubar__button {
  padding: 0.2em;
  color: rgba(0, 0, 0, 0.54);
  margin: 2px 6px;

  &.is-active {
    border: 0.1em solid $color-primary !important;
    border-radius: 10px !important;
  }

  .v-icon {
    width: 24px;
    height: 24px;
  }
}

.editor__content {
  min-height: 250px;
  padding: 0 0 0 0;
  transition: all 2s;
  overflow: auto !important;
  padding: 5px;

  h1,
  h2,
  h3,
  h4 {
    margin: 10px 0 20px !important;
  }

  blockquote {
    border-left: 0.25em solid #dfe2e5;
    color: #6a737d;
    padding-left: 1em;
    margin: 20px 0 !important;
  }

  p {
    margin-top: 16px !important;
    margin-bottom: 16px !important;
    min-height: 1rem;
  }
}

.ProseMirror {
  min-height: 250px;
  margin: 0px !important;
  padding: 0.5em;
  outline: none !important;
}
</style>
