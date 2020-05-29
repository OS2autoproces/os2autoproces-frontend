import AuthState from '@/store/modules/auth';
import CommonState from '@/store/modules/common';
import ErrorState from '@/store/modules/error';
import ProcessState from '@/store/modules/process';
import SearchState from '@/store/modules/search';
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
