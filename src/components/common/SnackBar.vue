<template>
  <v-snackbar :top="!bottom" :bottom="bottom" :value="value" :color="color" :timeout="timeout" :max-width="'70%'">
    <slot />
    <v-btn v-if="showButton" dark text @click="clicked">
      OK
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class SnackBarComponent extends Vue {
  @Prop(Number)
  timeout!: number;
  @Prop(String)
  color!: string;
  @Prop(Boolean)
  value!: boolean;
  @Prop(Boolean)
  showButton!: boolean;
  @Prop(Boolean)
  bottom!: boolean;

  closeTimeout: any;

  @Watch('value')
  changed() {
    if (this.value) {
      clearTimeout(this.closeTimeout);

      this.closeTimeout = setTimeout(() => {
        this.$emit('onSnackClose');
      }, this.timeout);
    }
  }

  clicked(value: any) {
    this.$emit('clicked', value);
  }
}
</script>

<style scoped lang="scss">
.v-snack ::v-deep {
  .v-snack__wrapper {
    max-width: 70%;
  }
}
</style>
