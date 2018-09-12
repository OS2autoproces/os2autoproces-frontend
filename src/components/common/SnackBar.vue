<template>
  <v-snackbar auto-height top :value="value" :color="color" :timeout="timeout">
    <slot />
    <v-btn dark flat @click="clicked">
      OK
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SnackBarComponent extends Vue {
  @Prop(String) text!: string;
  @Prop(Number) timeout!: number;
  @Prop(String) color!: string;
  @Prop(Boolean) value!: boolean;

  clicked(value: any) {
    this.$emit('clicked', value);
  }
}
</script>

<style scoped lang="scss">
</style>
