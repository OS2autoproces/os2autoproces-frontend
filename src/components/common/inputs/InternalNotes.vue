<template>
  <div class="internal-notes">
    <RichTextArea
      :value="internalNotes"
      @change="update({ internalNotes: $event })"
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
import { processActionTypes } from '@/store/modules/process/actions';
import { ProcessState } from '@/store/modules/process/state';

@Component({
  components: {
    RichTextArea
  }
})
export default class InternalNotesComponent extends Vue {
  @Prop(String) internalNotes!: string;
  @Prop(Boolean) disabled!: boolean;
  @Action(processActionTypes.UPDATE) update!: (notes: Partial<ProcessState>) => void;
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
</style>
