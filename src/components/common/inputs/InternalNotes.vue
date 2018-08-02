<template>
  <div class="internal-notes">
    <TextArea :value="internalNotes" @change="update({ internalNotes: $event })" placeholder="Skriv interne noter her..." :max-length="2400" :disabled="disabled" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action } from 'vuex-class';
import { processActionTypes } from '@/store/modules/process/actions';
import { ProcessState } from '@/store/modules/process/state';

@Component({
  components: {
    TextArea
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
