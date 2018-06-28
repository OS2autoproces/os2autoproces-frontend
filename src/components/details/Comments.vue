<template>
  <div class="comments-form">
    <div class="comment-input-wrapper" v-if="!disabled">
      <text-area :value="newComment" @change="newComment = $event" class="comment-input" placeholder="Skriv en kommentar her" :max-length="maxLength" noResize>
        <Button @click="submit">Send</Button>
      </text-area>
    </div>
    <div class="comment-list-wrapper">
      <div class="comment-list">
        <div class="comment" v-for="comment in comments" :key="comment.id">
          <span class="author">{{comment.author}}, {{comment.municipality}}: </span>
          <span class="time">{{comment.time}}</span>
          <div>{{comment.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TextArea from '../common/inputs/TextArea.vue';
import Button from '../common/inputs/Button.vue';

interface Comment {
  author: string;
  municipality: string;
  time: string;
  text: string;
}

@Component({
  components: {
    TextArea,
    Button
  }
})
export default class Comments extends Vue {
  @Prop() disabled!: boolean;
  @Prop() comments!: Comment[];

  maxLength = 140;
  newComment = '';

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
  border-radius: $size-unit;
  background-color: rgba($color-secondary, 0.3);
  padding: $size-unit;
}

.comment-input-wrapper {
  flex: 1 1 30%;
  margin-right: $size-unit;
}

.comment-input {
  height: 100%;

  /deep/ {
    textarea {
      border-color: $color-secondary;
    }

    > div,
    textarea {
      height: 100%;
    }
  }
}

.comment-list-wrapper {
  flex: 1 1 70%;
  border: 1px solid $color-secondary;
  border-radius: 10px;
  padding-right: $size-unit;
  background: $color-background;
}

.comment-list {
  padding: $size-unit;
  overflow: auto;
  height: 300px;
}

.comment:not(:last-of-type) {
  margin-bottom: $size-unit;
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
