<template>
    <div>
        <router-link to="/search" class="search-page-link">
            <ArrowLeftIcon /> Tilbage til søgning
        </router-link>

        <div class="menu-item" v-for="item in this.items" :key="item.id" :class="{ 'in-view': itemInView === item }" @click="scrollTo(item)">
            {{item.heading}}
        </div>

        <Button v-if="isEditing" class="save-button" @click="$emit('save')">Gem</Button>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue';
import Button from '@/components/common/inputs/Button.vue';

export interface MenuItem {
  heading: string;
  id: string;
}

@Component({
  components: {
    ArrowLeftIcon,
    Button
  }
})
export default class DetailsMenu extends Vue {
  @Prop() isEditing!: boolean;

  items: MenuItem[] = [
    { heading: 'Grundlæggende oplysninger', id: 'general-information' },
    { heading: 'Problemstillinger', id: 'challenges' },
    { heading: 'Tids og proces foretagen', id: 'process' },
    { heading: 'Faglig vurdering', id: 'assessment' },
    { heading: 'Specifikation', id: 'specification' },
    { heading: 'Udvikling og implementering', id: 'implementation' },
    { heading: 'Drift', id: 'operation' }
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
    const viewportCenter = window.pageYOffset + window.innerHeight / 2;

    for (let i = items.length - 1; i >= 0; i--) {
      const element = document.getElementById(items[i].id);

      if (element && element.offsetTop < viewportCenter) {
        return items[i];
      }
    }

    return items[0];
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.search-page-link {
  @include heading;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  svg {
    height: $size-unit;
    width: $size-unit;
    margin-right: $size-unit / 2;
  }
}

.menu-item {
  @include light-heading;
  margin-top: $size-unit;
  cursor: pointer;
}

.in-view {
  @include heading;
  text-decoration: underline;
}

.save-button {
  margin: 2 * $size-unit;
}
</style>
