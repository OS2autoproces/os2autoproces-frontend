<template>
  <FormSection v-if="minPhase(PhaseKeys.PREANALYSIS)" heading="Bilag" id="attachments" :disabled="state.disabled.attachmentsEdit" @edit="update({ disabled: {attachmentsEdit: $event} })">
    <AttachmentUpload :attachments="state.attachments" :disabled="state.disabled.attachmentsEdit" @add="add" @remove="remove" />
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import AttachmentUpload from '@/components/common/inputs/AttachmentUpload.vue';
import FormSection from '@/components/details/FormSection.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';
import { Phase } from '@/models/phase';

@Component({
  components: {
    FormSection,
    AttachmentUpload
  }
})
export default class AttachmentsForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;
  @Action(processActionTypes.ADD_ATTACHMENTS) add: any;
  @Action(processActionTypes.REMOVE_ATTACHMENTS) remove: any;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

  get state() {
    return this.$store.state.process;
  }

  mounted() {
    this.$store.dispatch(processActionTypes.LOAD_ATTACHMENTS);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
