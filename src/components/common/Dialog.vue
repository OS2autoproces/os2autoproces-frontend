<template>
  <v-dialog eager v-model="_open" width="500">
    <slot />
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({})
export default class AppDialog extends Vue {
  @Prop(Boolean) open!: boolean;
  @Emit()
  close() {
    return;
  }

  get _open() {
    return this.open;
  }

  set _open(_: boolean) {
    // When _open changes, it means that the user has clicked outside the dialog, and thereby closed is.
    this.close();
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
