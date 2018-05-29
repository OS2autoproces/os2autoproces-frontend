import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { common } from './ducks/common';

Vue.use(Vuex);

export interface RootState {
  version: string;
}

const store: StoreOptions<RootState> = {
  modules: {
    common,
  },
};

export default new Vuex.Store<RootState>(store);
