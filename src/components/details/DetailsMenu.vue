<template>
  <div>
    <div class="menu-item" v-for="item in this.items" :key="item.id" :class="{ 'in-view': itemInView === item }" @click="scrollTo(item)">
      {{item.heading}}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

export interface MenuItem {
  heading: string;
  id: string;
}

@Component
export default class DetailsMenu extends Vue {
  items: MenuItem[] = [
    { heading: 'Grundlæggende oplysninger', id: 'general-information' },
    { heading: 'Problemstillinger', id: 'challenges' },
    { heading: 'Tid og proces', id: 'time-and-process' },
    { heading: 'Faglig vurdering', id: 'assessment' },
    { heading: 'Specifikation', id: 'specification' },
    { heading: 'Udvikling og implementering', id: 'implementation' },
    { heading: 'Drift', id: 'operation' },
    { heading: 'Bilag', id: 'attachments' },
  ];

  private itemInView: MenuItem | null = null;
  private listener!: () => void;

  mounted() {
    this.listener = this.update.bind(this);
    window.addEventListener('scroll', this.listener);
    window.addEventListener('resize', this.listener);
    this.update();
  }

  destroyed(): void {
    window.removeEventListener('resize', this.listener);
    window.removeEventListener('scroll', this.listener);
  }

  private scrollTo(item: MenuItem) {
    const element = document.getElementById(item.id);

    if (element) {
      element.scrollIntoView(true);
    }
  }

  private update() {
    if (!this.items) {
      return;
    }

    this.itemInView = this.getElementInView(this.items);
  }

  private getElementInView(items: MenuItem[]): MenuItem {
    const distanceFromTop = 90;

    const breakpoint = window.pageYOffset + distanceFromTop;

    for (let i = items.length - 1; i >= 0; i--) {
      const element = document.getElementById(items[i].id);

      if (element && element.offsetTop < breakpoint) {
        return items[i];
      }
    }

    return items[0];
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.menu-item {
  @include light-heading;
  margin-top: $size-unit;
  cursor: pointer;
}

.in-view {
  @include heading;
  text-decoration: underline;
}
</style>
