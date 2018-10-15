<template>
  <div>
    <div class="menu-item" v-for="item in items.filter(item => item.show)" :key="item.id" :class="{ 'in-view': itemInView === item }" @click="scrollTo(item)">
      {{item.heading}}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Phase, PhaseKeys } from '@/models/phase';
import { processGetterTypes } from '@/store/modules/process/getters';

export interface MenuItem {
  heading: string;
  id: string;
  show: boolean;
}

@Component
export default class ProcessMenu extends Vue {
  @Prop(String) phase!: Phase;
  @Prop(Boolean) canEdit!: boolean;
  @Prop(Boolean) isReporting!: boolean;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

  private itemInView: MenuItem | null = null;
  private listener!: () => void;

  mounted() {
    this.listener = this.update.bind(this);
    window.addEventListener('scroll', this.listener);
    window.addEventListener('resize', this.listener);
    setTimeout(() => this.update());
  }

  destroyed(): void {
    window.removeEventListener('resize', this.listener);
    window.removeEventListener('scroll', this.listener);
  }

  get items() {
    return [
      { heading: 'Grundlæggende oplysninger', id: 'general-information', show: true },
      { heading: 'Problemstillinger', id: 'challenges', show: true },
      { heading: 'Tid og proces', id: 'time-and-process', show: true },
      { heading: 'Faglig vurdering', id: 'assessment', show: this.minPhase(PhaseKeys.PREANALYSIS) },
      { heading: 'Specifikation', id: 'specification', show: this.minPhase(PhaseKeys.SPECIFICATION) },
      { heading: 'Udvikling og implementering', id: 'implementation', show: this.minPhase(PhaseKeys.DEVELOPMENT) },
      { heading: 'Drift', id: 'operation', show: this.minPhase(PhaseKeys.OPERATION) },
      { heading: 'Bilag', id: 'attachments', show: this.minPhase(PhaseKeys.PREANALYSIS) },
      { heading: 'Interne noter', id: 'internal-notes', show: this.canEdit }
    ];
  }

  private scrollTo(item: MenuItem) {
    const element = document.getElementById(item.id);

    if (element) {
      element.scrollIntoView(true);

      // Delay setting itemInView to after the scroll event fired
      requestAnimationFrame(() => (this.itemInView = item));
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
  margin-top: 1rem;
  cursor: pointer;
}

.in-view {
  @include heading;
  text-decoration: underline;
}
</style>
