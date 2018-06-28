import { HTTP } from '@/services/http-service';
import { authMutationTypes } from '@/store/modules/auth/mutations';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { AuthState, UserRole } from './state';

interface WhoAmIResponse {
  uuid: string | null;
  email: string | null;
  name: string | null;
  cvr: string | null;
  roles: UserRole[] | null;
}

interface BookmarkResponse {
  id: number;
}

export const namespace = 'auth';

export const authActionTypes = {
  LOAD_USER: `${namespace}/loadUser`,
  LOAD_BOOKMARKS: `${namespace}/loadBookmarks`,
  BOOKMARK: `${namespace}/bookmark`,
  REMOVE_BOOKMARK: `${namespace}/removeBookmark`
};

export const actions: ActionTree<AuthState, RootState> = {
  async loadUser({ commit, dispatch }): Promise<void> {
    const user = (await HTTP.get<WhoAmIResponse>('public/whoami')).data;

    commit(authMutationTypes.SET_USER, user.uuid !== null ? user : null);

    dispatch(authActionTypes.LOAD_BOOKMARKS, {}, {root: true});
  },

  async loadBookmarks({ commit }): Promise<void> {
    const bookmarks = (await HTTP.get<BookmarkResponse[]>(
      'api/bookmarks'
    )).data.map(b => b.id);

    commit(authMutationTypes.UPDATE_USER, { user: { bookmarks } });
  },

  async bookmark({ commit, state }, id: number): Promise<void> {
    await HTTP.put(`api/bookmarks/${id}`);
    if (state.user) {
      commit(authMutationTypes.UPDATE_USER, {
        user: { bookmarks: [...state.user.bookmarks, id] }
      });
    }
  },

  async removeBookmark({ commit }, id: number): Promise<void> {
    await HTTP.delete(`api/bookmarks/${id}`);
    commit(authMutationTypes.REMOVE_BOOKMARK, id);
  }
};
