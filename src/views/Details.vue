<template>
  <div class="details">
    <NavBar />

    <div class="page">
      <div class="details-menu">
        <DetailsMenu :items="menuItems" />
      </div>
      <DetailsFormWrapper />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import NavBar from '../components/common/NavBar.vue';
import DetailsFormWrapper from '@/components/details/DetailsFormWrapper.vue';
import DetailsMenu from '@/components/details/DetailsMenu.vue';
import GreyInputBox from '@/components/common/GreyInputBox.vue';

@Component({
  components: {
    NavBar,
    DetailsFormWrapper,
    DetailsMenu,
    GreyInputBox
  }
})
export default class Details extends Vue {
  menuItems = [
    { title: 'Grundlæggende oplysninger', id: 'general-information' },
    { title: 'Problemstillinger', id: 'challenges' },
    { title: 'Tids og proces foretagen', id: 'process' },
    { title: 'Faglig vurdering', id: 'field' },
    { title: 'Specifikation', id: 'spec' },
    { title: 'Udvikling og implementering', id: 'impl' },
    { title: 'Drift', id: 'drift' }
  ];
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  display: flex;
}

.details-menu {
  flex: 0 0 200px;
  margin-left: $size-unit;

  > * {
    position: fixed;
    top: 80px + 2 * $size-unit;
  }
}
</style>
