import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { process } from '@/store/modules/process';
import { search } from '@/store/modules/search';
import { auth } from '@/store/modules/auth';
import { common } from '@/store/modules/common';

Vue.use(Vuex);

export interface RootState {
  version: string;
}

const store: StoreOptions<RootState> = {
  modules: {
    auth,
    process,
    search,
    common
  }
};

export default new Vuex.Store<RootState>(store);
