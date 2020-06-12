<template>
  <v-btn class="button" icon ripple @click.stop.prevent="action()">
    <v-icon color="grey lighten-1">{{ actionIcon }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class SelectionFieldAction extends Vue {
  @Prop({ type: String, default: 'info' }) actionIcon!: string;
  @Emit()
  action() {
    return;
  }
}
</script>

<style lang="scss" scoped>
.button {
  margin-right: -0.3rem;
}
</style>
