<template>
    <div >
        <ul class="inFocus">
            <li v-for="item in this.menu" :key="item.name">
                <div class="menuItem" v-bind:class="{'inView': item.isInView}">
                    {{item.name}}
                </div>
            </li>
        </ul>
        
        <BlogItem v-is-in-view="{callback: this.componentInView}" title="General Information"/>
        <BlogItem v-is-in-view="{callback: this.componentInView}" title="Problemstillinger"/>
        <BlogItem v-is-in-view="{callback: this.componentInView}" title="Tid og Proces foretagen"/>
        <BlogItem v-is-in-view="{callback: this.componentInView}" title="Faglig Vurdering"/>
        <BlogItem v-is-in-view="{callback: this.componentInView}" title="Specifikation"/>
        <BlogItem v-is-in-view="{callback: this.componentInView}" title="Udvikling og Implementering"/>
        <BlogItem v-is-in-view="{callback: this.componentInView}" title="Drift"/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BlogItem from '../components/blog/BlogItem.vue';
import {watcher} from '../utils/IsInView';

Vue.directive('is-in-view', {
    bind(element: HTMLElement, binding: any ) {
        const { value } = binding;
        watcher.addElement(element, value);
        Vue.nextTick(() => {
            watcher.update();
        });
    },
});

@Component({
    components: {
        BlogItem
    }
})
export default class List extends Vue {
    scrolled: number = 0;
    componentInViewName: string | null = '';
    menu = [
        {name: 'General Information', isInView: false},
        {name: 'Problemstillinger', isInView: false},
        {name: 'Tid og Proces foretagen', isInView: false},
        {name: 'Faglig Vurdering', isInView: false},
        {name: 'Specifikation', isInView: false},
        {name: 'Udvikling og Implementering', isInView: false},
        {name: 'Drift', isInView: false},
    ];
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    }

    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        this.scrolled = window.scrollY;
    }

    componentInView(element: HTMLElement, inView: boolean) {
        const menuItem = this.menu.find((item) => item.name === element.textContent);
        if (!menuItem) {
            return;
        }
        menuItem.isInView = inView;
    }
}
</script>

<style>
    .inFocus {
        position: fixed;
    }
    .menuItem {
        padding: 2;
        position: relative;
    }
    .inView {
        font-style: italic;
        font-weight: bold;
    }
</style>
