<template>
  <v-list-tile-content v-if="!!subText">
    <v-list-tile-title>{{itemText}}</v-list-tile-title>
    <v-list-tile-sub-title>{{subText}}</v-list-tile-sub-title>
  </v-list-tile-content>
  <span
    v-else
    class="text"
  >
    {{itemText}}
  </span>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class SelectionFieldText extends Vue {
  @Prop({ type: String, default: '' }) itemText!: string;
  @Prop({ type: String, default: '' }) subText!: string;
}
</script>

<style lang="scss" scoped>
.text {
  flex: 1;
}
</style>
