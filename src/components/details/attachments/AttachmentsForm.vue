<template>
  <FormSection heading="Bilag" id="attachments" :disabled="state.disabled" @edit="update({disabled: $event})">
    <FileUpload />
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import FileUpload from '@/components/common/inputs/FileUpload.vue';
import FormSection from '@/components/details/FormSection.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';

@Component({
  components: {
    FormSection,
    FileUpload,
    InfoTooltip
  }
})
export default class AttachmentsForm extends Vue {
  get state() {
    return this.$store.state.details.operation;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
