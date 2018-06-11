import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { details } from '@/store/modules/details'
import { search } from '@/store/modules/search';

Vue.use(Vuex);

export interface RootState {
  version: string;
}

const store: StoreOptions<RootState> = {
  modules: {
    details,
    search
  }
};

export default new Vuex.Store<RootState>(store);
