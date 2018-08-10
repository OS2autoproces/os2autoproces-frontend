<template>
  <div class="attachment">
    <div class="icon-container">
      <a :href="attachment.url" target="_blank">
        <WordIcon class="attachment-icon" v-if="type === 'word'" />
        <ExcelIcon class="attachment-icon" v-if="type === 'excel'" />
        <PdfIcon class="attachment-icon" v-if="type === 'pdf'" />
        <PowerPointIcon class="attachment-icon" v-if="type === 'powerPoint'" />
        <FileIcon class="attachment-icon" v-if="type === 'other'" />
      </a>
      <div v-if="!disabled && !isUploading" class="delete-button" role="button" @click="$emit('remove')">
        <DeleteIcon />
      </div>
      <v-icon v-if="isUploading" class="upload-icon">cloud_upload</v-icon>
    </div>

    <a class="name" :href="attachment.url" target="_blank">{{attachment.fileName}}</a>
    <Checkbox v-if="!disabled && canChangeVisibility" :value="attachment.visibleToOtherMunicipalities" @change="$emit('toggleVisibility', attachment.id)">
      Synlig for alle
    </Checkbox>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import WordIcon from '@/components/icons/WordIcon.vue';
import ExcelIcon from '@/components/icons/ExcelIcon.vue';
import PdfIcon from '@/components/icons/PdfIcon.vue';
import PowerPointIcon from '@/components/icons/PowerPointIcon.vue';
import FileIcon from '@/components/icons/FileIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import Checkbox from '@/components/common/inputs/Checkbox.vue';
import { Attachment } from '@/store/modules/process/state';

@Component({
  components: {
    WordIcon,
    ExcelIcon,
    PdfIcon,
    PowerPointIcon,
    FileIcon,
    DeleteIcon,
    Checkbox
  }
})
export default class AttachmentComponent extends Vue {
  @Prop(Object) attachment!: Attachment;
  @Prop(Boolean) disabled!: boolean;
  @Prop(Boolean) isUploading!: boolean;
  @Prop(Boolean) canChangeVisibility!: boolean;

  get type() {
    const word = ['.doc', '.dot', '.wbk', '.docx', '.docm', '.dotx', '.dotm', '.docb'];
    const excel = ['.xls', '.xlt', '.xlm', '.xlsx', '.xlsm', '.xltx', '.xltm'];
    const powerPoint = [
      '.ppt',
      '.pot',
      '.pps',
      '.pptx',
      '.pptm',
      '.potx',
      '.potm',
      '.ppam',
      '.ppsx',
      '.ppsm',
      '.sldx',
      '.sldm'
    ];

    if (this.attachment.fileName.endsWith('.pdf')) {
      return 'pdf';
    }

    if (word.some(extension => this.attachment.fileName.endsWith(extension))) {
      return 'word';
    }

    if (excel.some(extension => this.attachment.fileName.endsWith(extension))) {
      return 'excel';
    }

    if (powerPoint.some(extension => this.attachment.fileName.endsWith(extension))) {
      return 'powerPoint';
    }

    return 'other';
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.attachment {
  margin: 1rem;
  margin-bottom: 0;
  text-align: center;
}

a {
  color: inherit;
  text-decoration: inherit;
  text-align: center;
}

.name {
  display: block;
}

.icon-container {
  position: relative;
  display: inline-block;
}

.upload-icon,
.delete-button {
  position: absolute;
  height: 1rem;
  width: 1rem;
  top: 0;
  right: 0;
}

.upload-icon {
  animation: blink 1s linear infinite;
}

.attachment-icon {
  height: 75px;
  width: 75px;
}
</style>
