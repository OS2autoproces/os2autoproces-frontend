import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { details } from '@/store/modules/details';
import { search } from '@/store/modules/search';
import { auth } from '@/store/modules/auth';

Vue.use(Vuex);

export interface RootState {
  version: string;
}

const store: StoreOptions<RootState> = {
  modules: {
    auth,
    details,
    search
  }
};

export default new Vuex.Store<RootState>(store);
