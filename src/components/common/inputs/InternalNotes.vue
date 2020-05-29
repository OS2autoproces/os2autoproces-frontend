<template>
  <div class="internal-notes">
    <TextArea
      :value="internalNotes"
      @change="update($event)"
      placeholder="Skriv interne noter her..."
      :max-length="10000"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action } from 'vuex-class';
import { ProcessState, ProcessModule } from '@/store/modules/process';

@Component({
  components: {
    TextArea
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
