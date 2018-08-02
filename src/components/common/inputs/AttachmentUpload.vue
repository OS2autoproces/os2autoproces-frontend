<template>
  <div class="attachment-upload">
    <div class="attachment-list-container">
      <div class="attachments-container">

        <p class="attachment-category">Gemte bilag</p> 
        <div class="attachment-list">
          
          <AttachmentComponent v-for="attachment in attachmentsFromStore.filter(att => !att.visibleToOtherMunicipalities)" :key="attachment.id" :attachment="attachment" :canChangeVisibility="false" :disabled="disabled" @remove="remove(attachment.id)" @toggleVisibility="toggleVisibility(attachment.id)"/>     
        </div>   
      
        <p class="attachment-category">Gemte bilag synlige for andre kommuner</p>
        <div class="attachment-list">
          
          <AttachmentComponent v-for="attachment in attachmentsFromStore.filter(att => att.visibleToOtherMunicipalities)" :key="attachment.id" :attachment="attachment" :canChangeVisibility="false" :disabled="disabled" @remove="remove(attachment.id)" @toggleVisibility="toggleVisibility(attachment.id)"/>
        </div>
      </div>

      <div class="attachments-container">
        <p v-if="!disabled" class="attachment-category">Ikke-gemte bilag</p>
        <p v-if="placeholders.length && !disabled">Sæt flueben hvis et bilag skal være tilgængeligt tværkommunalt</p>

        <div class="attachment-list">       
          <AttachmentComponent v-if="!disabled" v-for="attachment in placeholders" :uploading="attachmentsUploading" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="remove(attachment.id)" @toggleVisibility="toggleVisibility(attachment.id)"/>
        </div>
      </div>
          

    </div>


    <label class="upload-button-wrapper" v-if="!disabled">
      <input type="file" multiple @change="chooseFiles($event.target.files)" ref="fileInput">
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
  idCounter = 0;
  placeholders: Attachment[] = [];
  files: AttachmentFile[] = [];
  @Prop(Array) attachmentsFromStore!: Attachment[];
  @Prop(Boolean) attachmentsUploading!: boolean;
  @Prop(Boolean) disabled!: boolean;

  @Watch('attachmentsUploading')
  uploadingChanged(val: boolean, oldVal: boolean) {
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
    this.attachmentsFromStore.forEach(att => {
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

  // get placeholderAtts(): Attachment[] {
  //   if (!this.placeholders) {
  //     return [];
  //   }
  //   return this.placeholders.map(att => {
  //     att.uploading = this.attachmentsUploading;
  //     if (att.uploading) {
  //       debugger;
  //     }
  //     return att;
  //   });
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
  margin-bottom: $size-unit;
}

.attachments-container {
  display: flex;
  flex-direction: column;
}

.attachment-list-container {
  display: flex;
  justify-content: space-between;
}

.attachment-category {
  font-weight: bold;
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
</style>
