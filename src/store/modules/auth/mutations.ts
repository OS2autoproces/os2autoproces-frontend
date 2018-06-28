import { merge } from 'lodash';
import { MutationTree } from 'vuex';
import { AuthState, User } from './state';

export const authMutationTypes = {
  SET_USER: 'setUser',
  UPDATE_USER: 'updateUser',
  REMOVE_BOOKMARK: 'removeBookmark'
};

export const mutations: MutationTree<AuthState> = {
  setUser(state: AuthState, user: User | null) {
    state.user = user;
  },
  updateUser(state: AuthState, user: Partial<User>) {
    merge(state, user);
  },
  removeBookmark(state: AuthState, id: number) {
    if (state.user) {
      state.user.bookmarks = state.user.bookmarks.filter(
        f => f !== id
      );
    }
  }
};
