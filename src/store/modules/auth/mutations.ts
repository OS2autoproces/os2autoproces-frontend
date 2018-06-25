import { MutationTree } from 'vuex';
import { AuthState, User } from './state';

export const authMutationTypes = {
  SET_USER: 'setUser'
};

export const mutations: MutationTree<AuthState> = {
  setUser(state: AuthState, user: User | null) {
    state.user = user;
  }
};
