<template>
  <div class="attachment-upload">
    <div class="attachment-list">
      <p v-if="!disabled">Gemte bilag</p> 
      <AttachmentComponent v-for="attachment in attachmentsFromStore.filter(att => !att.visibleToOtherMunicipalities)" :key="attachment.id" :attachment="attachment" :canChangeVisibility="false" :disabled="disabled" @remove="remove(attachment.id)" @toggleVisibility="toggleVisibility(attachment.id)"/>     

    </div>

    <div class="attachment-list">
      <p v-if="!disabled">Gemte bilag synlige for andre kommuner</p>
      <AttachmentComponent v-for="attachment in attachmentsFromStore.filter(att => att.visibleToOtherMunicipalities)" :key="attachment.id" :attachment="attachment" :canChangeVisibility="false" :disabled="disabled" @remove="remove(attachment.id)" @toggleVisibility="toggleVisibility(attachment.id)"/>     

    </div>


    <div class="attachment-list">
      <p v-if="!disabled">Ikke-gemte bilag</p>     
      <AttachmentComponent v-if="!disabled" v-for="attachment in placeholders" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="remove(attachment.id)" @toggleVisibility="toggleVisibility(attachment.id)"/>
    </div>

    <p v-if="placeholders.length && !disabled">Sæt kryds hvis et bilag skal være tilgængeligt tværkommunalt</p>

    <label class="upload-button-wrapper" v-if="!disabled">
      <input type="file" multiple @change="chooseFiles($event.target.files)">
      <Button class="upload-button">
        Tilføj bilag
      </Button>
    </label>    

    <label class="upload-button-wrapper" v-if="!disabled">
      <Button class="upload-button" v-if="placeholders.length" v-on:click="addFiles">
        Gem bilag
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
      this.files.push({
        file: file,
        visibleToOtherMunicipalities: false,
        id: id.toString()
      });
      id++;
    });
    this.files.forEach((file: AttachmentFile) => {
      this.placeholders.push({
        fileName: file.file.name,
        id: file.id,
        visibleToOtherMunicipalities: false
      });
    });
  }

  addFiles() {
    this.files = this.files.map(file => {
      const placeholder = this.placeholders.find(att => att.id === file.id) as Attachment;
      file.visibleToOtherMunicipalities = placeholder.visibleToOtherMunicipalities ? true : false;
      return file;
    });
    this.$emit('upload', this.files);
    this.placeholders = [];
  }

  remove(attId: string) {
    if (!confirm('Er du sikker?')) {
      return;
    }
    let attachmentIsPlaceholder = true;
    this.attachmentsFromStore.forEach(att => {
      if (att.id === attId) {
        attachmentIsPlaceholder = false;
      }
    });

    if (attachmentIsPlaceholder) {
      this.placeholders = this.placeholders.filter(a => a.id !== attId);
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

  // get attachments() {
  //   return this.placeholders;
  // }
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
