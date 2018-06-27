<template>
  <div class="file-upload">
    <div class="file-list">
      <File v-for="file in files" :key="file.id" :file="file" :disabled="disabled" @remove="$emit('remove', file.id)" />
    </div>

    <label class="upload-button-wrapper" v-if="!disabled">
      <input type="file" multiple @change="$emit('add', $event.target.files)">
      <Button class="upload-button">
        Upload bilag
      </Button>
    </label>
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
import Button from '@/components/common/inputs/Button.vue';
import File from './File.vue';
import { Attachment } from '@/store/modules/details/state';

@Component({
  components: {
    FileWordIcon,
    FileExcelIcon,
    FilePdfIcon,
    FilePowerPointIcon,
    FilePlaceholderIcon,
    File,
    DeleteIcon,
    Button
  }
})
export default class FileUpload extends Vue {
  @Prop() files!: Attachment[];
  @Prop() disabled!: boolean;
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.file-upload {
  text-align: center;
}

.file-list {
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
