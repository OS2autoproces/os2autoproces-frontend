<template>
  <v-snackbar auto-height top :value="value" :color="color" :timeout="timeout">
    <slot />
    <v-btn v-if="showButton" dark flat @click="clicked">
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
    max-width: 60%;
  }
}
</style>
