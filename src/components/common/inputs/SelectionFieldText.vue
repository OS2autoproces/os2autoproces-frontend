<template>
  <v-list-item-content v-if="!!subText">
    <v-list-item-title>{{ itemText }}</v-list-item-title>
    <v-list-item-subtitle>{{ subText }}</v-list-item-subtitle>
  </v-list-item-content>
  <span v-else class="text">
    {{ itemText }}
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({})
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
