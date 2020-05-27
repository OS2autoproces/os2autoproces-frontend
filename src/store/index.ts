import AuthState from '@/store/modules/auth';
import CommonState from '@/store/modules/common';
import { error } from '@/store/modules/error';
import { ErrorState } from '@/store/modules/error/state';
import { process } from '@/store/modules/process';
import { ProcessState } from '@/store/modules/process/state';
import { search } from '@/store/modules/search';
import { SearchState } from '@/store/modules/search/state';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootState {
  auth: AuthState;
  process: ProcessState;
  search: SearchState;
  common: CommonState;
  error: ErrorState;
}

export default new Vuex.Store<RootState>({});
