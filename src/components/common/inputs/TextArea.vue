<template>
    <div>
        <div class="text-area" v-if="!disabled">
            <textarea v-model="value" @input="valueChanged" :placeholder="placeholder" :class="{ 'no-resize': noResize }" />
            <div class="text-area-overlay">
                <div v-if="maxLength" class="max-length-label">({{currentLength}} ud af {{maxLength}} tegn)</div>
                <slot />
            </div>
        </div>
        <div :class="{'double-column': twoColumns}" v-if="disabled">{{value}}</div>
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
  @Prop() twoColumns!: boolean;

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

  .text-area-overlay {
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 10px;

    text-align: right;
  }

  .max-length-label {
    padding-bottom: $size-unit/2;
  }
}

textarea {
  border: 1px solid $color-primary;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  background: $color-background;

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

