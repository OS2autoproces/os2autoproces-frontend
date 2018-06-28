<template>
  <div class="attachment-upload">
    <div class="attachment-list">
      <Attachment v-for="attachment in attachments" :key="attachment.id" :attachment="attachment" :disabled="disabled" @remove="$emit('remove', attachment.id)" />
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
import Button from '@/components/common/inputs/Button.vue';
import Attachment from './Attachment.vue';
import { IAttachment } from '@/store/modules/details/state';

@Component({
  components: {
    Attachment,
    Button
  }
})
export default class AttachmentUpload extends Vue {
  @Prop() attachments!: IAttachment[];
  @Prop() disabled!: boolean;
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
