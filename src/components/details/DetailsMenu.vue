<template>
    <div>
        <a class="search-page">
            <ArrowLeftIcon /> Tilbage til søgning
        </a>

        <div class="menu-item" v-for="item in this.items" :key="item.id" :class="{ 'in-view': itemInView === item }">
            {{item.title}} {{item.percentageVisible}}
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue';

interface MenuItem {
  title: string;
  id: string;
}

@Component({
  components: {
    ArrowLeftIcon
  }
})
export default class DetailsMenu extends Vue {
  @Prop() items!: MenuItem[];

  private itemInView: MenuItem | null = null;
  private listener!: () => void;

  mounted() {
    this.listener = this.update.bind(this);
    window.addEventListener('scroll', this.listener);
    window.addEventListener('resize', this.listener);
    this.update();
  }

  update() {
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

  destroyed(): void {
    window.removeEventListener('resize', this.listener);
    window.removeEventListener('scroll', this.listener);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

a.search-page {
  svg {
    height: 16px;
    width: 16px;
  }
}

.menu-item {
  margin-top: $size-unit;
}

.in-view {
  font-weight: bold;
  text-decoration: underline;
}
</style>
