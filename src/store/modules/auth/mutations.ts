import { MutationTree } from 'vuex';
import { AuthState, User } from './state';

export const authMutationTypes = {
  SET_USER: 'user/setUser'
};

export const mutations: MutationTree<AuthState> = {
  setUser(state: AuthState, user: User | null) {}
};
