<template>
<div class="stars" :class="{ disabled }">
    <div class="star" :class="{selected: value > 0}" @change="select($event)">
        <input type="radio" value="1" v-validate="rules" :disabled="disabled" :name="name" :rules="rules">
    </div>
    <div class="star" :class="{selected: value > 1}" @change="select($event)">
        <input type="radio" value="2" :disabled="disabled" :name="name" :rules="rules">
    </div>
    <div class="star" :class="{selected: value > 2}" @change="select($event)">
        <input type="radio" value="3" :disabled="disabled" :name="name" :rules="rules">
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
  inject: ["$validator"]
})
export default class Rating extends Vue {
  @Prop() disabled!: boolean;
  @Prop() name?: string;
  @Prop() value?: number;
  @Prop() private rules!: string;

  select(event: any) {
    this.$emit("input", Number(event.srcElement.value));
  }
}
</script>

<style scoped lang="scss">
.stars {
  display: flex;

  &:not(.disabled) input {
      cursor: pointer;
  }
}

.star {
  height: 30px;
  width: 30px;
  position: relative;

  input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: 30px;
    width: 30px;
  }
}

// TODO: Use correct icons
.star {
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  color: gold;

  &:after {
    content: "☆";
  }

  &.selected:after {
    content: "★";
  }
}
</style>
