<template>
  <div class="details">
    <NavBar />
    <div class="page">
      <Process
        v-if="!this.loading && !this.isUmbrella"
        :isReporting="isReporting"
        :id="id"
        :phase="type"
        @clickedHashLink="clickHashLink()"
        @goBack="goBack"
      />
      <Umbrella
        v-if="!this.loading && this.isUmbrella"
        :isReporting="isReporting"
        :id="id"
        :type="type"
        @clickedHashLink="clickHashLink()"
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
import { TypeKeys } from '@/models/types';
import { ProcessModule } from '@/store/modules/process';
import ComponentClass from 'vue-class-component';
import { CommonModule } from '@/store/modules/common';

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

  isUmbrella = true;
  loading = true;
  preventSaveGuard = false;

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

  clickHashLink() {
    this.preventSaveGuard = true;
    this.$emit('clickedHashLink');
  }

  report() {
    this.preventSaveGuard = true;
  }

  beforeCreate() {
    ProcessModule.clear();
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    next(this.shouldContinueWithoutSaving());
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    next(this.shouldContinueWithoutSaving());
  }

  shouldLeaveWithoutSaving(event: BeforeUnloadEvent) {
    if (ProcessModule.hasChanged && !this.preventSaveGuard) {
      const message = 'Vil du fortsætte uden at gemme?';
      event.returnValue = message;
      return message;
    }
    this.preventSaveGuard = false;
  }

  shouldContinueWithoutSaving(): boolean {
    if (!ProcessModule.hasChanged || this.preventSaveGuard) {
      this.preventSaveGuard = false;
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
    ProcessModule.clear();

    if (this.isReporting) {
      this.isUmbrella = this.type === TypeKeys.PARENT || this.type === TypeKeys.GLOBAL_PARENT;
      this.loading = false;
    } else {
      const process = await ProcessModule.loadProcessDetails(this.id);
      ProcessModule.loadAttachments(this.id.toString());
      await CommonModule.loadKles();
      if (process?.kle) {
        await CommonModule.loadFormsByKle(process.kle);
      }
      this.isUmbrella = process?.type === TypeKeys.PARENT || process?.type === TypeKeys.GLOBAL_PARENT;
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';
</style>
