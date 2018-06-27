<template>
  <FormSection heading="Bilag" id="attachments" :disabled="state.attachmentsDisabled" @edit="update({ attachmentsDisabled: $event })">
    <FileUpload :files="state.attachments" :disabled="state.attachmentsDisabled" />
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import FileUpload from '@/components/common/inputs/FileUpload.vue';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import { detailsActionTypes } from '@/store/modules/details/actions';

@Component({
  components: {
    FormSection,
    FileUpload,
    InfoTooltip
  }
})
export default class AttachmentsForm extends Vue {
  @Action(detailsActionTypes.UPDATE) update: any;

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
