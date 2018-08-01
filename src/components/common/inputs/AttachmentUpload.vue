<template>
  <div class="attachment-upload">
    <div class="attachment-list">
      <AttachmentComponent v-for="attachment in attachments" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="remove(attachment.id)" @togglePublic="togglePublic(attachment.id)"/>
    </div>

    <label class="upload-button-wrapper" v-if="!disabled">
      <input type="file" multiple @change="chooseFiles($event.target.files)">
      <Button class="upload-button">
        Tilføj bilag
      </Button>
    </label>

    <span v-if="attachments.length && !disabled">Sæt kryds hvis et bilag skal være tilgængeligt tværkommunalt</span>

    <label class="upload-button-wrapper" v-if="!disabled">
      <Button class="upload-button" v-if="attachments.length" v-on:click="addFiles">
        Bekræft valg
      </Button>

    </label>

    
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Button from '@/components/common/inputs/Button.vue';
import AttachmentComponent from './Attachment.vue';
import { Attachment } from '@/store/modules/process/state';
import { AttachmentFile } from '@/store/modules/process/state';

@Component({
  components: {
    AttachmentComponent,
    Button
  }
})
export default class AttachmentUpload extends Vue {
  placeholders: Attachment[] = [];
  @Prop(Array) attachmentsFromStore!: Attachment[];
  @Prop(Boolean) disabled!: boolean;

  files: AttachmentFile[] = [];

  chooseFiles(files: FileList) {
    const fileArr = Array.from(files);
    let id = 0;
    fileArr.forEach(file => {
      this.files.push({ file: file, public: false, id: id.toString() });
      id++;
    });
    this.files.forEach(file => {
      this.placeholders.push({
        fileName: file.file.name,
        id: file.id,
        public: false,
        uploading: false
      });
    });
    // this.$emit('chooseAttachments', placeholders);
  }

  @Watch('attachmentsFromStore', {deep: true, immediate: true})
  attachmentsChanged(newAtts: Attachment[]) {
    debugger;
    if (newAtts) {
      if (JSON.stringify(newAtts) !== JSON.stringify(this.placeholders)) {
        this.placeholders = newAtts;
      }
    }
  }

  addFiles() {
    this.files = this.files.map(file => {
      const placeholder = this.placeholders.find(
        att => att.id === file.id
      ) as Attachment;
      file.public = placeholder.public ? true : false;
      return file;
    });
    this.$emit('upload', this.files);
  }

  remove(attId: string) {
    if (!confirm('Er du sikker?')) {
      return;
    }

    let attachmentIsPlaceholder;
    this.attachmentsFromStore.forEach(att => {
      if (att.id === attId) {
        attachmentIsPlaceholder = true;
      }
    });

    this.placeholders = this.placeholders.filter(a => a.id !== attId);

    if (!attachmentIsPlaceholder) {
      this.$emit('remove', attId);
    }
  }

  togglePublic(attId: string) {
    this.placeholders = this.placeholders.map(a => {
      if (a.id !== attId) {
        return a;
      }
      a.public = !a.public;
      return a;
    });
  }

  get attachments() {
    return this.placeholders;
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
