<template>
  <div class="comments-form">
    <div class="comment-input-wrapper" v-if="!disabled">
      <text-area
        :value="newComment"
        @change="newComment = $event"
        class="comment-input"
        placeholder="Skriv en kommentar her"
        :max-length="maxLength"
        noResize
      >
        <Button class="submit-comment" @click="submit">Send</Button>
      </text-area>
    </div>
    <div class="comment-list-wrapper">
      <div class="comment-list" ref="comments-list">
        <div class="comment" v-for="(comment, index) in comments" :key="index">
          <span class="author">{{ comment.name }}: </span>
          <span class="time">{{ comment.created }}</span>
          <div>{{ comment.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TextArea from '../common/inputs/TextArea.vue';
import Button from '../common/inputs/Button.vue';
import { Comment } from '@/store/modules/processInterfaces';

@Component({
  components: {
    TextArea,
    Button
  }
})
export default class Comments extends Vue {
  maxLength = 140;
  newComment = '';

  @Prop(Boolean) disabled!: boolean;
  @Prop(Array) comments!: Comment[];
  @Watch('comments')
  onCommentsChanged() {
    const commentList = this.$refs['comments-list'] as HTMLElement;
    this.$nextTick(() => {
      commentList.scrollTop = commentList.scrollHeight;
    });
  }

  submit() {
    if (!this.newComment || this.newComment.length > this.maxLength) {
      return;
    }

    this.$emit('submit', this.newComment);
    this.newComment = '';
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.comments-form {
  display: flex;
  border-radius: 1rem;
  background-color: rgba($color-primary, 0.3);
  padding: 2rem;
}

.comment-input-wrapper {
  flex: 1 1 45%;
  margin-right: 2rem;
}

.comment-input {
  height: 100%;

  ::v-deep {
    .text-area {
      border: 1px solid $color-primary;
    }

    .text-area-overlay {
      margin: 0.5rem;
    }

    > div,
    textarea {
      height: 100%;
    }
  }
}

.submit-comment {
  margin-top: 1rem;
}

.comment-list-wrapper {
  flex: 1 1 70%;
  border: 1px solid $color-primary;
  border-radius: 10px;
  padding-right: 1rem;
  background: $color-background;
}

.comment-list {
  padding: 1rem;
  overflow: auto;
  height: 300px;
}

.comment {
  white-space: pre-wrap;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.author {
  font-weight: bold;
  font-style: italic;
}

.time {
  font-style: italic;
  color: $color-grey;
}
</style>
