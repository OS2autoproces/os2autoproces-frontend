<template>
  <FormSection v-if="!showPlaceholder" heading="Bilag" id="attachments" :disabled="state.disabled.attachmentsEdit" @edit="update({ disabled: {attachmentsEdit: $event} })">
    <AttachmentUpload :disabled="state.disabled.attachmentsEdit" />
  </FormSection>
  <FormSection v-else heading="Bilag" id="attachments" disabled placeholder="Det er først muligt at tilføje et bilag, efter du har klikket på Gem første gang." />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import AttachmentUpload from '@/components/common/inputs/AttachmentUpload.vue';
import FormSection from '@/components/details/FormSection.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { Phase } from '@/models/phase';

@Component({
  components: {
    FormSection,
    AttachmentUpload
  }
})
export default class AttachmentsForm extends Vue {
  @Prop({ type: Boolean, default: false })
  showPlaceholder!: boolean;

  @Action(processActionTypes.UPDATE)
  update: any;

  get state() {
    return this.$store.state.process;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
