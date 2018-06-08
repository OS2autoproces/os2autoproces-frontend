import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { generalInformation } from '@/store/modules/details/general-information';
import { search } from '@/store/modules/search';

Vue.use(Vuex);

export interface RootState {
  version: string;
}

const store: StoreOptions<RootState> = {
  modules: {
    generalInformation,
    search
  }
};

export default new Vuex.Store<RootState>(store);
