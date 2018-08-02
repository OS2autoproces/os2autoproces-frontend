<template>
  <FormSection v-if="minPhase(PhaseKeys.PREANALYSIS)" heading="Bilag" id="attachments" :disabled="state.disabled.attachmentsEdit" @edit="update({ disabled: {attachmentsEdit: $event} })">
    <AttachmentUpload :disabled="state.disabled.attachmentsEdit" />
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import AttachmentUpload from '@/components/common/inputs/AttachmentUpload.vue';
import FormSection from '@/components/details/FormSection.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';
import { Phase, PhaseKeys } from '@/models/phase';

@Component({
  components: {
    FormSection,
    AttachmentUpload
  }
})
export default class AttachmentsForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

  PhaseKeys = PhaseKeys;

  get state() {
    return this.$store.state.process;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
