import { AuthState, User } from './state';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { authMutationTypes } from '@/store/modules/auth/mutations';

const namespace = 'auth';

export const authActionTypes = {
  SET_USER: `${namespace}/setUser`
};

export const actions: ActionTree<AuthState, RootState> = {
  setUser({ commit }, user: User | null): void {
    commit(authMutationTypes.SET_USER, user);
  }
};
