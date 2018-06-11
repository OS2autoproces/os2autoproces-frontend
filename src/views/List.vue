<template>
    <div>
        <ul class="in-focus">
            <li v-for="item in this.menu" :key="item.name">
                <div class="menu-item" v-bind:class="{'in-view': item.isInView}">
                    {{item.name}}
                </div>
            </li>
        </ul>

        <BlogItem v-is-in-view="this.componentInView" title="General Information" />
        <BlogItem v-is-in-view="this.componentInView" title="Problemstillinger" />
        <BlogItem v-is-in-view="this.componentInView" title="Tid og Proces foretagen" />
        <BlogItem v-is-in-view="this.componentInView" title="Faglig Vurdering" />
        <BlogItem v-is-in-view="this.componentInView" title="Specifikation" />
        <BlogItem v-is-in-view="this.componentInView" title="Udvikling og Implementering" />
        <BlogItem v-is-in-view="this.componentInView" title="Drift" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import BlogItem from "../components/blog/BlogItem.vue";
import { Watcher } from "../utils/IsInView";

const watcher = new Watcher();

Vue.directive("is-in-view", {
  bind(element: HTMLElement, binding: any) {
    watcher.addElement(element, binding.value);
    Vue.nextTick(() => watcher.update());
  }
});

@Component({
  components: {
    BlogItem
  }
})
export default class List extends Vue {
  menu = [
    { name: "General Information", isInView: false },
    { name: "Problemstillinger", isInView: false },
    { name: "Tid og Proces foretagen", isInView: false },
    { name: "Faglig Vurdering", isInView: false },
    { name: "Specifikation", isInView: false },
    { name: "Udvikling og Implementering", isInView: false },
    { name: "Drift", isInView: false }
  ];

  componentInView(element: HTMLElement, inView: boolean) {
    const menuItem = this.menu.find(item => item.name === element.textContent);

    if (menuItem) {
      menuItem.isInView = inView;
    }
  }
}
</script>

<style lang="scss" scoped>
.in-focus {
  position: fixed;
}
.menu-item {
  padding: 2;
  position: relative;
}
.in-view {
}
</style>
