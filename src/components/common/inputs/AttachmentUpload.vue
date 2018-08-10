<template>
  <div class="attachment-upload">
    <h2 v-if="visibleForAll.length">Synlige for alle</h2>
    <div class="attachment-list">
      <AttachmentComponent v-for="attachment in visibleForAll" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="removeAttachment(attachment.id)" />
    </div>

    <h2 v-if="visibleForMunicipality.length">Synlige i kommunen</h2>
    <div class="attachment-list">
      <AttachmentComponent v-for="attachment in visibleForMunicipality" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="removeAttachment(attachment.id)" />
    </div>

    <Well v-if="!disabled">
      <div>
        <h2>Tilføj bilag</h2>
        <div class="attachment-list">
          <AttachmentComponent v-for="placeholder in placeholders" :isUploading="isUploading" :key="placeholder.id" :attachment="placeholder" :disabled="disabled" @remove="removePlaceholder(placeholder.id)" @toggleVisibility="placeholder.visibleToOtherMunicipalities = !placeholder.visibleToOtherMunicipalities" canChangeVisibility />
        </div>

        <label class="upload-button-wrapper">
          <input type="file" multiple @change="chooseFiles($event.target.files)" ref="fileInput">
          <Button class="upload-button">
            Vælg filer
          </Button>
        </label>

        <Button class="upload-button" v-if="placeholders.length" v-on:click="uploadFiles">Upload</Button>
      </div>
    </Well>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Button from '@/components/common/inputs/Button.vue';
import Well from '@/components/common/Well.vue';
import AttachmentComponent from './Attachment.vue';
import { Attachment, AttachmentFile } from '@/store/modules/process/state';
import { processActionTypes } from '@/store/modules/process/actions';

@Component({
  components: {
    AttachmentComponent,
    Button,
    Well
  }
})
export default class AttachmentUpload extends Vue {
  idCounter = 0;
  placeholders: AttachmentFile[] = [];
  isUploading = false;

  @Prop(Boolean) disabled!: boolean;

  get visibleForAll() {
    return this.$store.state.process.attachments.filter((att: Attachment) => att.visibleToOtherMunicipalities);
  }

  get visibleForMunicipality() {
    return this.$store.state.process.attachments.filter((att: Attachment) => !att.visibleToOtherMunicipalities);
  }

  chooseFiles(files: FileList) {
    Array.from(files).forEach(file => {
      this.placeholders.push({
        fileName: file.name,
        file,
        visibleToOtherMunicipalities: false,
        id: this.idCounter++
      });
    });

    this.clearFileInput();
  }

  clearFileInput() {
    const input = this.$refs.fileInput as HTMLInputElement;
    input.type = 'text';
    input.type = 'file';
  }

  async uploadFiles() {
    this.isUploading = true;

    await this.$store.dispatch(processActionTypes.UPLOAD_ATTACHMENTS, this.placeholders);

    this.isUploading = false;
    this.placeholders = [];
  }

  removeAttachment(id: number) {
    if (!confirm('Er du sikker?')) {
      return;
    }

    this.$store.dispatch(processActionTypes.REMOVE_ATTACHMENTS, id);
  }

  removePlaceholder(id: number) {
    if (!confirm('Er du sikker?')) {
      return;
    }

    this.placeholders = this.placeholders.filter(placeholder => placeholder.id !== id);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.attachment-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
}

.upload-button-wrapper {
  margin-top: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  display: inline-block;
  cursor: pointer;

  .upload-button {
    pointer-events: none;
  }

  input {
    display: none;
  }
}

h2 {
  @include heading;
  color: $color-secondary;
}
</style>
