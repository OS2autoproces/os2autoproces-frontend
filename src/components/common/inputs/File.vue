<template>
  <div class="file">
    <div class="icon-container">
      <a :href="url" target="_blank">
        <FileWordIcon class="file-icon" v-if="type === 'word'" />
        <FileExcelIcon class="file-icon" v-if="type === 'excel'" />
        <FilePdfIcon class="file-icon" v-if="type === 'pdf'" />
        <FilePowerPointIcon class="file-icon" v-if="type === 'powerPoint'" />
        <FilePlaceholderIcon class="file-icon" v-if="type === 'other'" />
      </a>
      <div v-if="!disabled" class="delete-button" role="button" @click="$emit('remove')">
        <DeleteIcon />
      </div>
    </div>

    <a class="name" :href="url" target="_blank">{{name}}</a>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import FileWordIcon from '@/components/icons/FileWordIcon.vue';
import FileExcelIcon from '@/components/icons/FileExcelIcon.vue';
import FilePdfIcon from '@/components/icons/FilePdfIcon.vue';
import FilePowerPointIcon from '@/components/icons/FilePowerPointIcon.vue';
import FilePlaceholderIcon from '@/components/icons/FilePlaceholderIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';

@Component({
  components: {
    FileWordIcon,
    FileExcelIcon,
    FilePdfIcon,
    FilePowerPointIcon,
    FilePlaceholderIcon,
    DeleteIcon
  }
})
export default class FileUpload extends Vue {
  @Prop() url!: string;
  @Prop() name!: string;
  @Prop() disabled!: boolean;

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

    if (this.name.endsWith('.pdf')) {
      return 'pdf';
    }

    if (word.some(extension => this.name.endsWith(extension))) {
      return 'word';
    }

    if (excel.some(extension => this.name.endsWith(extension))) {
      return 'excel';
    }

    if (powerPoint.some(extension => this.name.endsWith(extension))) {
      return 'powerPoint';
    }

    return 'other';
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.file {
  margin: $size-unit;
  margin-bottom: 0;
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

.delete-button {
  position: absolute;
  height: $size-unit;
  width: $size-unit;
  top: 0;
  right: 0;
}

.file-icon {
  height: 75px;
  width: 75px;
}
</style>
