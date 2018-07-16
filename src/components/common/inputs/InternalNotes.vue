<template>
    <div class="internal-notes">
        <TextArea :value="internalNotes" @change="update({ internalNotes: $event })" placeholder="Skriv interne noter her..." :max-length="2400" />
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
  @Prop() internalNotes!: string;
  @Action(processActionTypes.UPDATE)
  update!: (notes: Partial<ProcessState>) => void;
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.internal-notes {
  width: 100%;
  border-radius: $size-unit;
  background-color: rgba($color-secondary, 0.3);
  padding: 2 * $size-unit;

  /deep/ {
    .text-area {
      border: 1px solid $color-secondary;
    }
  }
}
</style>
