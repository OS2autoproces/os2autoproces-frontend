<template>
    <div class="text-area">
        <textarea v-model="value" @input="valueChanged" />
        <span v-if="maxLength">({{currentLength}} ud af {{maxLength}} tegn)</span>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class TextArea extends Vue {
  @Prop() value!: string;
  @Prop() maxLength!: number;
  currentLength = 0;

  valueChanged(event: any) {
    this.currentLength = event.target.value.length;
    this.$emit("change", event.target.value);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.text-area {
  position: relative;

  span {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
}

textarea {
  border: 1px solid $color-primary;
  border-radius: 10px;
  outline: none;
  padding: 10px;
  width: 100%;
}
</style>

