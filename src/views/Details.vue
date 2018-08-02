<template>
  <div class="details">
    <NavBar />
    <div class="page">
      <Process v-if="!this.loading && !this.isUmbrella" :isReporting="isReporting" :id="id" :phase="type" />
      <Umbrella v-if="!this.loading && this.isUmbrella" :isReporting="isReporting" :id="id" :type="type" />
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

  @Watch('id')
  idChanged() {
    this.loadContent();
  }

  beforeCreate() {
    this.$store.dispatch(processActionTypes.CLEAR_PROCESS);
  }

  mounted() {
    this.loadContent();
  }

  async loadContent() {
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
