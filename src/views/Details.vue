<template>
  <div class="details">
    <NavBar />
    <div class="page">
      <Process v-if="!isUmbrella" :isReporting="isReporting" :id="id" :phase="phase" />
      <Umbrella v-if="isUmbrella" :isReporting="isReporting" :id="id" :type="type" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import NavBar from '@/components/common/NavBar.vue';
import Process from '@/components/details/process/Process.vue';
import Umbrella from '@/components/details/umbrella/Umbrella.vue';
import { processActionTypes } from '@/store/modules/process/actions';

@Component({
  components: {
    NavBar,
    Process,
    Umbrella
  }
})
export default class Details extends Vue {
  @Prop(Boolean) isReporting!: boolean;
  @Prop(Boolean) isUmbrella!: boolean;
  @Prop(Number) id!: number;
  @Prop(String) type!: string;
  @Prop(String) phase!: string;

  beforeCreate() {
    this.$store.dispatch(processActionTypes.CLEAR_PROCESS);
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';
</style>
