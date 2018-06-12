<template>
<div>
  <v-select v-if="!disabled" :items="items" single-line @change="valueChanged" autocomplete :value="value" :append-icon="iconName" />
  <div v-if="disabled">{{value}}</div>
</div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class SelectionField extends Vue {
  @Prop() value!: string;
  @Prop() items!: string[];
  @Prop({default: 'keyboard_arrow_down'}) iconName!: string;
  @Prop() disabled!: boolean;

  valueChanged(value: any) {
    if(typeof value === 'string') {
      this.$emit("change", value);
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.input-group--autocomplete {
  .input-group__input {
    border: 1px solid $color-primary;
    border-radius: 20px;
    padding-left: 13px;

    .icon {
      color: $color-primary !important;
    }
  }

  .input-group__details {
    display: none;
  }
}

.menu__content--autocomplete.menuable__content__active {
      transform: translateY(24px);
}

</style>
