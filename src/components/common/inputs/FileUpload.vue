<template>
    <div class="file-upload">
        <div class="file-list">
            <a v-for="file in files" :key="file.url" :href="file.url">
                <div class="icon-container">
                    <FileWordIcon class="file-icon" v-if="file.type === 'word'" />
                    <FileExcelIcon class="file-icon" v-if="file.type === 'excel'" />
                    <FilePdfIcon class="file-icon" v-if="file.type === 'pdf'" />
                    <FilePowerPointIcon class="file-icon" v-if="file.type === 'power-point'" />
                    <FilePlaceholderIcon class="file-icon" v-if="file.type === 'other'" />

                    <div v-if="!disabled" class="delete-button" role="button" @click="deleteFile(file)">
                        <DeleteIcon />
                    </div>
                </div>

                <div class="name">{{file.name}}</div>
            </a>
        </div>

        <label class="upload-button-wrapper">
            <input type="file" multiple>
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

interface File {
  url: string;
  type: 'word' | 'excel' | 'pdf' | 'power-point' | 'other';
  name: string;
}

@Component({
  components: {
    FileWordIcon,
    FileExcelIcon,
    FilePdfIcon,
    FilePowerPointIcon,
    FilePlaceholderIcon,
    DeleteIcon,
    Button
  }
})
export default class FileUpload extends Vue {
  @Prop() files!: File[];
  @Prop() disabled!: boolean;

  deleteFile(file: File) {
    this.$emit('delete', file);
  }
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

a {
  color: inherit;
  text-decoration: inherit;
  text-align: center;
  margin: $size-unit;
  margin-bottom: 0;
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
  height: 50px;
  width: 50px;
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
