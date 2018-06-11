<template>
    <div class="page">
        <div class="header">
            <Button>Log ind</Button>

            <h1>AutoProces</h1>
            <h2>Tværkommunal procesdeling</h2>
        </div>

        <div class="details" :class="{ editing }">
            <div class="edit-button" v-if="!editing" @click="editing = true">
                <EditIcon></EditIcon>
            </div>
            <div class="save-button" v-if="editing" @click="save">
                <Button>Gem</Button>
            </div>
            <MarkdownEditor :editing="editing" :value="details" @change="changeDetails" />
        </div>

        <div class="idea-sharing-icon">
            <idea-sharing-icon />
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import IdeaSharingIcon from '../components/icons/IdeaSharingIcon.vue';
import EditIcon from '../components/icons/EditIcon.vue';
import Button from '../components/common/inputs/Button.vue';
import MarkdownEditor from '../components/common/inputs/MarkdownEditor.vue';

@Component({
  components: {
    IdeaSharingIcon,
    EditIcon,
    MarkdownEditor,
    Button
  }
})
export default class Home extends Vue {
  editing = false;
  details = '# Overskrift\n\n## Overskrift 2\n\n1. item\n2. item\n3. item\n\n[google](http://google.dk/)';

  changeDetails(value: string) {
      this.details = value;
  }

  save() {
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
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Stack_of_Copy_Paper.jpg/1280px-Stack_of_Copy_Paper.jpg');
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    position: absolute;
    top: $size-unit;
    right: $size-unit;
  }

  h1 {
    color: $color-background;
    font-size: 3rem;
  }

  h2 {
    color: $color-background;
    font-size: 2rem;
  }
}

.details {
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

.edit-button,
.save-button {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
}

.edit-button {
  cursor: pointer;
  height: 20px;
  width: 20px;

  /deep/ path {
    fill: $color-primary;
  }
}
</style>
