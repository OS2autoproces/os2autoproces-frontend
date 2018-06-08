import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { details } from '@/store/modules/details'

Vue.use(Vuex);

export interface RootState {
  version: string;
}

const store: StoreOptions<RootState> = {
  modules: {
    details
  }
};

export default new Vuex.Store<RootState>(store);
