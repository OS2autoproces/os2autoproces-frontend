import { merge } from 'lodash';
import { MutationTree } from 'vuex';
import { AuthState, User } from './state';

export const authMutationTypes = {
  SET_USER: 'setUser',
  UPDATE: 'update',
  REMOVE_BOOKMARK: 'removeBookmark'
};

export const mutations: MutationTree<AuthState> = {
  setUser(state: AuthState, user?: User) {
    state.user = user;
  },
  update(state: AuthState, auth: Partial<AuthState>) {
    merge(state, auth);
  },
  removeBookmark(state: AuthState, id: number) {
    if (state.user) {
      state.user.bookmarks = state.user.bookmarks.filter(
        bookmark => bookmark !== id
      );
    }
  }
};
