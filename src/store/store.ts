import { auth } from '@/store/modules/auth';
import { common } from '@/store/modules/common';
import { process } from '@/store/modules/process';
import { search } from '@/store/modules/search';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootState {
  version: string;
}

export default new Vuex.Store({
  modules: {
    auth,
    process,
    search,
    common
  }
});
