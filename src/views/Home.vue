<template>
  <div class="page">
    <div class="header">
      <a class="login-button" href="/discovery">Log ind</a>

      <h1>OS2autoproces</h1>
      <h2>Procesdeling med alle i OS2autoproces</h2>
    </div>

    <div class="details" :class="{ editing }">
      <div class="edit-button-container" v-if="isEditor && !editing" @click="editing = true">
        <EditIcon></EditIcon>
      </div>
      <div class="save-button-container" v-if="editing" @click="save">
        <Button class="save-button">Gem</Button>
      </div>
      <MarkdownEditor :editing="editing" :value="state.frontPage" @change="update({ frontPage: $event })" />
    </div>

    <div class="idea-sharing-icon">
      <idea-sharing-icon />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import IdeaSharingIcon from '../components/icons/IdeaSharingIcon.vue';
import EditIcon from '../components/icons/EditIcon.vue';
import Button from '../components/common/inputs/Button.vue';
import MarkdownEditor from '../components/common/inputs/MarkdownEditor.vue';
import { Cms } from '@/store/modules/commonInterfaces';
import { AuthModule } from '@/store/modules/auth';
import { CommonModule } from '@/store/modules/common';

@Component({
  components: {
    IdeaSharingIcon,
    EditIcon,
    MarkdownEditor,
    Button
  }
})
export default class Home extends Vue {
  get state() {
    return CommonModule;
  }

  get isEditor() {
    return AuthModule.isFrontpageEditor;
  }

  editing = false;

  mounted() {
    CommonModule.loadCmsContent('frontPage');
  }

  save() {
    CommonModule.saveCmsContent({
      label: 'frontPage',
      content: !!CommonModule.frontPage ? CommonModule.frontPage : ''
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
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    color: white;
    background-color: $color-primary;
    @include heading;
    font-size: 1.5rem;
    display: block;
    text-decoration: none;
    position: absolute;
    top: 1rem;
    right: 1rem;

    &:hover {
      background-color: darken($color-primary, 10%);
    }
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
  padding: 0 1rem;

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

  ::v-deep path {
    fill: $color-primary;
  }
}

.save-button {
  border-color: $color-primary;
}
</style>
