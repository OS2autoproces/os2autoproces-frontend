<template>
  <div class="attachment-upload">
    <h2>Synlige for alle</h2>
    <div class="attachment-list">
      <AttachmentComponent v-for="attachment in visibleForAll" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="remove(attachment.id)" />
    </div>

    <h2>Synlige i kommunen</h2>
    <div class="attachment-list">
      <AttachmentComponent v-for="attachment in visibleForMunicipality" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="remove(attachment.id)" />
    </div>

    <Well v-if="!disabled">
      <div>
        <h2>Tilføj bilag</h2>
        <div class="attachment-list">
          <AttachmentComponent v-for="attachment in placeholders" :isUploading="isUploading" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="remove(attachment.id)" @toggleVisibility="toggleVisibility(attachment.id)" canChangeVisibility />
        </div>

        <label class="upload-button-wrapper">
          <input type="file" multiple @change="chooseFiles($event.target.files)" ref="fileInput">
          <Button class="upload-button">
            Vælg filer
          </Button>
        </label>

        <Button class="upload-button" v-if="placeholders.length" v-on:click="addFiles">Upload</Button>
      </div>
    </Well>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Button from '@/components/common/inputs/Button.vue';
import Well from '@/components/common/Well.vue';
import AttachmentComponent from './Attachment.vue';
import { Attachment } from '@/store/modules/process/state';
import { AttachmentFile } from '@/store/modules/process/state';

@Component({
  components: {
    AttachmentComponent,
    Button,
    Well
  }
})
export default class AttachmentUpload extends Vue {
  idCounter = 0;
  placeholders: Attachment[] = [];
  files: AttachmentFile[] = [];
  @Prop(Array) attachments!: Attachment[];
  @Prop(Boolean) isUploading!: boolean;
  @Prop(Boolean) disabled!: boolean;

  get visibleForAll() {
    return this.attachments.filter(att => att.visibleToOtherMunicipalities);
  }

  get visibleForMunicipality() {
    return this.attachments.filter(att => !att.visibleToOtherMunicipalities);
  }

  @Watch('isUploading')
  isUploadingChanged(val: boolean, oldVal: boolean) {
    if (!val && oldVal) {
      this.placeholders = [];
    }
  }

  chooseFiles(files: FileList) {
    const fileArr = Array.from(files);

    fileArr.forEach(file => {
      this.files.push({
        file: file,
        visibleToOtherMunicipalities: false,
        id: this.idCounter.toString()
      });
      this.idCounter++;
    });
    let newPlaceholders: Attachment[] = [];
    this.files.forEach((file: AttachmentFile) => {
      newPlaceholders.push({
        fileName: file.file.name,
        id: file.id,
        visibleToOtherMunicipalities: false
      });
    });

    this.placeholders = newPlaceholders;

    // clears the content of the file input
    const input = this.$refs.fileInput as any;
    input.type = 'text';
    input.type = 'file';
  }

  addFiles() {
    this.files = this.files.map(file => {
      const placeholder = this.placeholders.find(att => att.id === file.id) as Attachment;
      file.visibleToOtherMunicipalities = placeholder.visibleToOtherMunicipalities ? true : false;
      return file;
    });

    this.$emit('upload', this.files);
    this.files = [];
  }

  remove(attId: string) {
    if (!confirm('Er du sikker?')) {
      return;
    }
    let attachmentIsPlaceholder = true;
    this.attachments.forEach(att => {
      if (att.id === attId) {
        attachmentIsPlaceholder = false;
      }
    });

    if (attachmentIsPlaceholder) {
      this.placeholders = this.placeholders.filter(a => {
        return a.id !== attId;
      });
      this.files = this.files.filter(a => {
        return a.id !== attId;
      });
    } else {
      this.$emit('remove', attId);
    }
  }

  toggleVisibility(attId: string) {
    this.placeholders = this.placeholders.map(a => {
      if (a.id !== attId) {
        return a;
      }
      a.visibleToOtherMunicipalities = !a.visibleToOtherMunicipalities;
      return a;
    });
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.attachment-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: $size-unit;
}

.upload-button-wrapper {
  margin-top: $size-unit;
  margin-right: $size-unit;
  margin-left: $size-unit;
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
