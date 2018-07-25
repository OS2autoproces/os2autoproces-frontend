<template>
  <div>
    <img v-if="!showDefault" :src="src" @error="showDefault = true" alt="Kommune logo" class="image">
    <MunicipalityLogo class="logo" v-if="showDefault" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import MunicipalityLogo from '@/components/icons/MunicipalityLogo.vue';

@Component({
  components: {
    MunicipalityLogo
  }
})
export default class MunicipalityLogoComponent extends Vue {
  showDefault = false;

  @Prop(String) src!: string;

  @Watch('src')
  changed() {
    this.showDefault = false;
  }

  mounted() {
    this.showDefault = false;
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.image {
  height: 85px;
  margin: $size-unit/2;
}

.logo {
  width: 200px;
  height: 85px;
}
</style>
