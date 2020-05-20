<template>
  <div class="markdown-editor">
    <textarea :value="value" @input="valueChanged" v-if="editing"> </textarea>
    <div class="rendered" v-if="!editing" v-html="renderedMarkdown"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from './TextArea.vue';
import marked from 'marked';

@Component({
  components: {
    TextArea
  }
})
export default class InputField extends Vue {
  @Prop(String) value!: string;
  @Prop(Boolean) editing!: boolean;
  @Prop(String) placeholder!: string;

  valueChanged(event: any) {
    this.$emit('change', event.target.value);
  }

  get renderedMarkdown() {
    return marked(this.value, {
      headerIds: false
    } as any);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

textarea {
  width: 100%;
  border: 1px solid $color-primary;
  border-radius: 10px;
  padding: 10px;
  min-height: 500px;
}

.rendered >>> {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @include heading;
    color: $color-primary;
  }
}
</style>
