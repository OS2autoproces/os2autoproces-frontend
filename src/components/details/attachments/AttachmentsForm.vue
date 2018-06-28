<template>
  <FormSection heading="Bilag" id="attachments" :disabled="state.attachmentsDisabled" @edit="update({ attachmentsDisabled: $event })">
    <AttachmentUpload :attachments="state.attachments" :disabled="state.attachmentsDisabled" @add="add" @remove="remove" />
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import AttachmentUpload from '@/components/common/inputs/AttachmentUpload.vue';
import FormSection from '@/components/details/FormSection.vue';
import { detailsActionTypes } from '@/store/modules/details/actions';

@Component({
  components: {
    FormSection,
    AttachmentUpload
  }
})
export default class AttachmentsForm extends Vue {
  @Action(detailsActionTypes.UPDATE) update: any;
  @Action(detailsActionTypes.ADD_ATTACHMENTS) add: any;
  @Action(detailsActionTypes.REMOVE_ATTACHMENT) remove: any;

  get state() {
    return this.$store.state.details;
  }

  mounted() {
    this.$store.dispatch(detailsActionTypes.LOAD_ATTACHMENTS);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
