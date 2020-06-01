<template>
  <div class="attachment-upload">
    <h2 v-if="visibleForAll.length">Synlige for alle brugere i OS2Autoprocess</h2>
    <div class="attachment-list" v-if="visibleForAll.length > 0">
      <AttachmentComponent
        v-for="attachment in visibleForAll"
        :key="attachment.id"
        :attachment="attachment"
        :disabled="disabled"
        @remove="removeAttachment(attachment.id)"
      />
    </div>

    <h2 v-if="visibleForMunicipality.length">Synlige for brugere i egen organisation</h2>
    <div class="attachment-list" v-if="visibleForMunicipality.length > 0">
      <AttachmentComponent
        v-for="attachment in visibleForMunicipality"
        :key="attachment.id"
        :attachment="attachment"
        :disabled="disabled"
        @remove="removeAttachment(attachment.id)"
      />
    </div>

    <Well v-if="!disabled">
      <div>
        <h2>Tilføj bilag</h2>
        <div class="attachment-list">
          <AttachmentComponent
            v-for="placeholder in placeholders"
            :isUploading="isUploading"
            :key="placeholder.id"
            :attachment="placeholder"
            :disabled="disabled"
            @remove="removePlaceholder(placeholder.id)"
            @toggleVisibility="placeholder.visibleToOtherMunicipalities = !placeholder.visibleToOtherMunicipalities"
            canChangeVisibility
          />
        </div>

        <div>
          <label class="upload-button-wrapper">
            <input type="file" multiple @change="chooseFiles($event.target.files)" ref="fileInput" />
            <Button class="upload-button">
              Vælg filer
            </Button>
          </label>

          <Button class="upload-button" v-if="placeholders.length" v-on:click="uploadFiles">Upload</Button>

          <span class="personal-info-warning"
            >De dokumenter der uploades må ikke indeholde personfølsomme oplysninger.</span
          >
        </div>
      </div>
    </Well>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Button from '@/components/common/inputs/Button.vue';
import Well from '@/components/common/Well.vue';
import AttachmentComponent from './Attachment.vue';
import { Attachment, AttachmentFile } from '@/store/modules/processInterfaces';
import { ProcessModule } from '../../../store/modules/process';

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
  maxFileSize = 10000000;

  @Prop(Boolean)
  disabled!: boolean;

  get visibleForAll() {
    return ProcessModule.attachments?.filter(att => att.visibleToOtherMunicipalities);
  }

  get visibleForMunicipality() {
    return ProcessModule.attachments?.filter(att => !att.visibleToOtherMunicipalities);
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

    const { valid, invalid } = this.placeholders.reduce(
      (files: { valid: AttachmentFile[]; invalid: AttachmentFile[] }, file) => {
        file.file.size < this.maxFileSize ? files.valid.push(file) : files.invalid.push(file);
        return files;
      },
      { valid: [], invalid: [] }
    );

    await ProcessModule.uploadAttachments(valid);

    this.isUploading = false;
    this.placeholders = invalid;
  }

  removeAttachment(id: number) {
    if (!confirm('Er du sikker?')) {
      return;
    }

    ProcessModule.removeAttachment(id);
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

.personal-info-warning {
  color: $color-secondary;
}

.upload-button {
  margin-right: 1rem;
}

.upload-button-wrapper {
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
