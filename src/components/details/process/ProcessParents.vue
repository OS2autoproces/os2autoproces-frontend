<template>
  <div class="parents">
    <router-link v-for="parent in parents" :key="parent.id" :to="'/details/' + parent.id" class="parent">
      <div class="title">{{ parent.title }}</div>
      <div class="resume">{{ parent.shortDescription }}</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Process } from '@/store/modules/process/state';

@Component({})
export default class ProcessParents extends Vue {
  @Prop() parents!: Array<Partial<Process>>;
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.parents {
  margin-top: 2rem;
}

.parent {
  display: block;
  border: 2px solid $color-secondary;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
}

.title {
  @include heading;
  color: #3d5386;
}
</style>
