import { auth } from '@/store/modules/auth';
import { common } from '@/store/modules/common';
import { process } from '@/store/modules/process';
import { search } from '@/store/modules/search';
import Vue from 'vue';
import Vuex from 'vuex';
import { AuthState } from '@/store/modules/auth/state';
import { ProcessState } from '@/store/modules/process/state';
import { SearchState } from '@/store/modules/search/state';
import { CommonState } from '@/store/modules/common/state';

Vue.use(Vuex);

export interface RootState {
  version: string;
  auth: AuthState;
  process: ProcessState;
  search: SearchState;
  common: CommonState;
}

export default new Vuex.Store<RootState>({
  modules: {
    auth,
    process,
    search,
    common
  }
});
