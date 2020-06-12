<template>
  <div class="internal-notes">
    <RichTextArea
      :value="internalNotes"
      @change="update($event)"
      :disabled="disabled"
      :max-length="10000"
      placeholder="Skriv interne noter her..."
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RichTextArea from '@/components/common/inputs/RichTextArea.vue';
import { Action } from 'vuex-class';
import { ProcessState, ProcessModule } from '@/store/modules/process';

@Component({
  components: {
    RichTextArea
  }
})
export default class InternalNotesComponent extends Vue {
  @Prop(String) internalNotes!: string;
  @Prop(Boolean) disabled!: boolean;

  update(notes: string): void {
    ProcessModule.update({ internalNotes: notes });
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
</style>
