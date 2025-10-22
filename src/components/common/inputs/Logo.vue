<template>
  <div class="logo" v-if="shouldShowPlaceholder">
    <div class="icon-container">
      <FileIcon class="logo-icon"/>
      <div v-if="!disabled && !isUploading" class="delete-button" role="button" @click="$emit('remove')">
        <DeleteIcon />
      </div>
    </div>

    <p class="name">{{ logoName }}</p>
    <div v-if="isLogoToLarge" class="logo-error">Filen overskrider 10MB</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import FileIcon from '@/components/icons/FileIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import { LogoFile } from '@/store/modules/organisation';

@Component({
  components: {
    FileIcon,
    DeleteIcon
  }
})

export default class LogoComponent extends Vue {
  @Prop(Object)
  logo!: LogoFile;
  @Prop(Boolean)
  disabled!: boolean;
  @Prop(String)
  logoName!: string;

  maxLogoSize = 10000000;

  get isLogoToLarge() {
    if (this.logo == null) {
      return false;
    }
    return this.logo.file ? this.logo.file.size > this.maxLogoSize : false;
  }

  get shouldShowPlaceholder() {
    if (this.logoName != null && this.logoName !== "") {
      return true;
    }
  }

  get isUploading() {
    if (this.logo !== null) {
      return true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.logo {
  margin: 1rem;
  margin-bottom: 0;
  text-align: center;
}

a {
  color: inherit;
  text-decoration: inherit;
  text-align: center;
}

.name {
  display: block;
}

.icon-container {
  position: relative;
  display: inline-block;
}

.upload-icon,
.delete-button {
  position: absolute;
  height: 1rem;
  width: 1rem;
  top: 0;
  right: 0;
}

.upload-icon {
  animation: blink 1s linear infinite;
}

.logo-icon {
  height: 75px;
  width: 75px;
}

.logo-error {
  color: $color-error;
}
</style>
