<template>
    <div class="page">
        <div class="header">
            <Button>Log ind</Button>

            <h1>AutoProces</h1>
            <h2>Tværkommunal procesdeling</h2>
        </div>

        <div class="details" :class="{ editing }">
            <div class="edit-button" v-if="!editing" @click="editing = true">
                <EditIcon class="edit-icon"></EditIcon>
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
  details = '# Overskrift\n\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium.';

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
    @include heading;
    font-size: 1.5rem;
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
