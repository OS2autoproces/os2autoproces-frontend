<template>
  <div class="page">
    <div class="header">
      <a class="login-button" :href="discoveryUrl">Log ind</a>

      <h1>AutoProces</h1>
      <h2>Tværkommunal procesdeling</h2>
    </div>

    <div class="details" :class="{ editing }">
      <div class="edit-button-container" v-if="!editing" @click="editing = true">
        <EditIcon></EditIcon>
      </div>
      <div class="save-button-container" v-if="editing" @click="save">
        <Button class="save-button">Gem</Button>
      </div>
      <MarkdownEditor :editing="editing" :value="state.frontPageMarkdown" @change="updateMarkdown({frontPageMarkdown: $event})" />
    </div>

    <div class="idea-sharing-icon">
      <idea-sharing-icon />
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import IdeaSharingIcon from '../components/icons/IdeaSharingIcon.vue';
import EditIcon from '../components/icons/EditIcon.vue';
import Button from '../components/common/inputs/Button.vue';
import MarkdownEditor from '../components/common/inputs/MarkdownEditor.vue';
import { commonActionTypes, Cms } from '@/store/modules/common/actions';

@Component({
  components: {
    IdeaSharingIcon,
    EditIcon,
    MarkdownEditor,
    Button
  }
})
export default class Home extends Vue {
  @Action(commonActionTypes.UPDATE_FRONTPAGE_MARKDOWN) updateMarkdown: any;
  @Action(commonActionTypes.POST_CMS_LABEL_CONTENT)
  postCmsLabel!: (cms: Cms) => void;

  get state() {
    return this.$store.state.common;
  }

  editing = false;

  discoveryUrl = window.autoProcessConfiguration.discoveryUrl;

  save() {
    this.$store.dispatch(commonActionTypes.POST_CMS_LABEL_CONTENT, {
      label: 'frontPageText',
      content: this.state.frontPageMarkdown
    });
    this.editing = false;
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.page {
  background-color: $color-secondary;
}

.header {
  background-size: cover;
  background-image: url('../assets/Stack_of_Copy_Paper.jpg');
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-button {
    border: 1px solid $color-primary;
    border-radius: $size-unit/2;
    padding: $size-unit/2 $size-unit;
    min-width: 40px;
    color: $color-primary;
    @include heading;
    font-size: 1.5rem;
    display: block;
    text-decoration: none;
    position: absolute;
    top: $size-unit;
    right: $size-unit;
  }

  h1 {
    @include heading;
    color: $color-background;
    font-size: 5rem;
  }

  h2 {
    @include heading;
    color: $color-background;
    font-size: 3rem;
  }
}

.details {
  font-size: 1.3rem;
  position: relative;

  color: $color-background;
  width: 650px;
  margin: 100px auto;
  padding: 0 $size-unit;

  &:not(.editing) {
    column-count: 2;
    column-gap: 5rem;
  }
}

.idea-sharing-icon {
  margin: 0 auto;
  margin-bottom: 100px;
  width: 320px;
}

.edit-button-container,
.save-button-container {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
}

.edit-button-container {
  cursor: pointer;
  height: 20px;
  width: 20px;

  /deep/ path {
    fill: $color-primary;
  }
}

.save-button {
  border-color: $color-primary;
}
</style>
