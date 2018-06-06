<template>
    <Textfield />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Textfield from '../controls/Textfield.vue';

@Component({
  components: {
      Textfield
  }
})
export default class Comments extends Vue {
  @Prop() private disabled!: boolean;

  @Prop({ default: 140 })
  private maxLength!: number;

  private comment: string = "";

  private rules = [
    (value?: string) =>
      (value && value.length <= this.maxLength) ||
      `Max ${this.maxLength} characters`
  ];
}
</script>

<style scoped lang="scss">
</style>