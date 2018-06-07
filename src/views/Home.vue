<template>
    <div class="page">
        <div class="header">
            <a-button>Log ind</a-button>

            <h1>AutoProces</h1>
            <h2>Tværkommunal procesdeling</h2>
        </div>

        <div class="details">
            <h1>Overskrift</h1>

            Lorem ipsum dolor sit amet, consectetur ad- ipiscing elit. Fusce quis lectus quis sem lac- inia nonummy. Proin mollis lorem non dolor. In hac habitasse platea dictumst. Nulla ultrices odio. Donec augue. Phasellus dui. Maecenas facilisis nisl vitae nibh. Proin vel seo est vitae eros pretium dignissim. Ali- quam aliquam sodales orci. Suspendisse potenti. Nunc adipiscing euismod arcu. Quisque facilisis mattis lacus. Fusce biben- dum, velit in venenatis viverra, tellus ligula dignissim felis, quis euismod mauris tellus ut urna. Proin scelerisque. Nulla in mi. Integer ac leo. Nunc urna ligula, gravida a, pretium vitae, bibendum nec, ante. Aliquam ullam- corper iaculis lectus. Sed vel dui. Etiam lac- inia risus vitae lacus. Aliquam elementum imperdiet turpis. In id metus. Mauris eu nisl. Nam pharetra nisi nec enim. Nulla aliquam, tellus sed laoreet blandit, eros urna vehicula lectus, et vulputate mauris arcu ut arcu. Praesent eros metus lirum larum, accumsan a, malesuada et, commodo vel, nulla. Ali- quam sagittis auctor sapien. Morbi a nibh. Lorem ipsum dolor sit amet, consectetur ad- ipiscing elit. Fusce quis lectus quis sem lac- inia nonummy. Proin mollis lorem non dolor. In hac habitasse platea dictumst. Nulla ultrices odio. Donec augue. Phasellus dui. Maecenas facilisis nisl vitae nibh. Proin vel seo est vitae eros pretium dignissim. Ali- quam aliquam sodales orci. Suspendisse potenti. Nunc adipiscing euismod arcu. Quisque facilisis mattis lacus. Fusce biben- dum, velit in venenatis viverra, tellus ligula dignissim felis, quis euismod mauris tellus ut urna. Proin scelerisque. Nulla in mi. Integer ac leo. Nunc urna ligula, gravida a, pretium vitae, bibendum nec, ante. Aliquam ullam- coaliquam, tellus sed laoreet blandit, eros urna vehiculauris arcu ut arcu. Praesent eros metus lirum larum, accumsan a, malesuada et, commodo vel, nulla. Aliquam sagittis auctor sapien. Morbi a nibh.
        </div>

        <div class="idea-sharing-icon">
            <idea-sharing-icon />
        </div>
        
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IdeaSharingIcon from "../components/icons/IdeaSharingIcon.vue";
import AButton from "../components/common/inputs/AButton.vue";

@Component({
  components: {
    IdeaSharingIcon,
    AButton
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.page {
  background-color: $color-secondary;
}

.header {
  background-size: cover;
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/e/e5/Stack_of_Copy_Paper.jpg");
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
  column-count: 2;
  column-gap: 5rem;
  color: $color-background;
  padding: 100px 0;
  width: 650px;
  margin: 0 auto;

  h1 {
    color: $color-primary;
  }
}

.idea-sharing-icon {
    margin: 0 auto;
    margin-bottom: 100px;
    width: 320px;
}
</style>
