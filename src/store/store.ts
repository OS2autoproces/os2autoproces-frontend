import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { process } from '@/store/modules/process';
import { search } from '@/store/modules/search';
import { auth } from '@/store/modules/auth';
import { common } from '@/store/modules/common';
import { error } from '@/store/modules/error';
import { AuthState } from '@/store/modules/auth/state';
import { ProcessState } from '@/store/modules/process/state';
import { SearchState } from '@/store/modules/search/state';
import { CommonState } from '@/store/modules/common/state';
import { ErrorState } from '@/store/modules/error/state';

Vue.use(Vuex);

export interface RootState {
  version?: string;
  auth: AuthState;
  process: ProcessState;
  search: SearchState;
  common: CommonState;
  error: ErrorState;
}

const store: StoreOptions<RootState> = {
  modules: {
    auth,
    process,
    search,
    common,
    error
  }
};

export default new Vuex.Store<RootState>(store);
