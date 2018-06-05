import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { generalInformation } from '@/store/modules/details/general-information';

Vue.use(Vuex);

export interface RootState {
  version: string;
}

const store: StoreOptions<RootState> = {
  modules: {
    generalInformation
  }
};

export default new Vuex.Store<RootState>(store);
