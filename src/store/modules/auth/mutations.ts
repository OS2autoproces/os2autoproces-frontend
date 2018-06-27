import { merge } from 'lodash';
import { MutationTree } from 'vuex';
import { AuthState, Bookmark, User } from './state';

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
  removeBookmark(state: AuthState, bookmark: Bookmark) {
    if (state.user) {
      state.user.favorites = state.user.favorites.filter(
        f => f.id !== bookmark.id
      );
    }
  }
};
