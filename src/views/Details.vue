<template>
  <div class="details">
    <NavBar />
    <div class="page">
      <Process
        v-if="!this.loading && !this.isUmbrella"
        :isReporting="isReporting"
        :id="id"
        :phase="type"
        @clickedHashLink="clickedHashLink = true"
        @goBack="goBack"
      />
      <Umbrella
        v-if="!this.loading && this.isUmbrella"
        :isReporting="isReporting"
        :id="id"
        :type="type"
        @clickedHashLink="clickedHashLink = true"
        @goBack="goBack"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import NavBar from '@/components/common/NavBar.vue';
import Process from '@/components/details/process/Process.vue';
import Umbrella from '@/components/details/umbrella/Umbrella.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { commonActionTypes, Kle } from '@/store/modules/common/actions';
import { TypeKeys } from '@/models/types';
import { ProcessState } from '@/store/modules/process/state';
import ComponentClass from 'vue-class-component';

ComponentClass.registerHooks(['beforeRouteLeave', 'beforeRouteUpdate']);

@Component({
  components: {
    NavBar,
    Process,
    Umbrella
  }
})
export default class Details extends Vue {
  @Prop(Boolean) isReporting!: boolean;
  @Prop(Number) id!: number;
  @Prop(String) type!: string;
  @Action(commonActionTypes.LOAD_KLES) loadKles!: () => Promise<void>;
  @Action(commonActionTypes.LOAD_FORMS) loadForms!: (kle: Kle) => Promise<void>;

  isUmbrella = true;
  loading = true;
  clickedHashLink = false;

  constructor() {
    super();
    this.shouldLeaveWithoutSaving = this.shouldLeaveWithoutSaving.bind(this);
  }

  @Watch('id')
  idChanged() {
    this.loadContent();
  }

  goBack() {
    this.$emit('goBack');
  }

  beforeCreate() {
    this.$store.dispatch(processActionTypes.CLEAR_PROCESS);
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    next(this.shouldContinueWithoutSaving());
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    next(this.shouldContinueWithoutSaving());
  }

  shouldLeaveWithoutSaving(event: BeforeUnloadEvent) {
    if (this.$store.state.process.hasChanged && !this.clickedHashLink) {
      const message = 'Vil du fortsætte uden at gemme?';
      event.returnValue = message;
      return message;
    }
    this.clickedHashLink = false;
  }

  shouldContinueWithoutSaving(): boolean {
    if (!this.$store.state.process.hasChanged || this.clickedHashLink) {
      this.clickedHashLink = false;
      return true;
    }

    return confirm('Vil du fortsætte uden at gemme?');
  }

  mounted() {
    this.loadContent();
    window.addEventListener('beforeunload', this.shouldLeaveWithoutSaving);
  }

  destroyed() {
    window.removeEventListener('beforeunload', this.shouldLeaveWithoutSaving);
  }

  async loadContent() {
    this.$store.dispatch(processActionTypes.CLEAR_PROCESS);

    if (this.isReporting) {
      this.isUmbrella = this.type === TypeKeys.PARENT || this.type === TypeKeys.GLOBAL_PARENT;
      this.loading = false;
    } else {
      const process = (await this.$store.dispatch(processActionTypes.LOAD_PROCESS_DETAILS, this.id)) as ProcessState;
      this.$store.dispatch(processActionTypes.LOAD_ATTACHMENTS, Number(this.id));
      this.loadKles();
      if (process.kle) {
        this.loadForms(process.kle);
      }
      this.isUmbrella = process.type === TypeKeys.PARENT || process.type === TypeKeys.GLOBAL_PARENT;
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';
</style>
