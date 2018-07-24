<template>
  <div class="attachment-upload">
    <div class="attachment-list">
      <AttachmentComponent v-for="attachment in attachments" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="$emit('remove', attachment.id)" />
    </div>

    <label class="upload-button-wrapper" v-if="!disabled">
      <input type="file" multiple @change="addFiles($event.target.files)">
      <Button class="upload-button">
        Upload bilag
      </Button>
    </label>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import Button from '@/components/common/inputs/Button.vue';
import AttachmentComponent from './Attachment.vue';
import { Attachment } from '@/store/modules/process/state';

@Component({
  components: {
    AttachmentComponent,
    Button
  }
})
export default class AttachmentUpload extends Vue {
  @Prop(Array) attachments!: Attachment[];
  @Prop(Boolean) disabled!: boolean;

  addFiles(files: FileList) {
    this.$emit('add', Array.from(files));
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.attachment-upload {
  text-align: center;
}

.attachment-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.upload-button-wrapper {
  margin-top: $size-unit;
  display: inline-block;
  cursor: pointer;

  .upload-button {
    pointer-events: none;
  }

  input {
    display: none;
  }
}
</style>
