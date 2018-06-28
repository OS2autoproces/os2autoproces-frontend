import { HTTP } from '@/services/http-service';
import { authMutationTypes } from '@/store/modules/auth/mutations';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { AuthState, Bookmark, UserRole } from './state';

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

const namespace = 'auth';

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
    const favorites = (await HTTP.get<BookmarkResponse[]>(
      'api/bookmarks'
    )).data.map(f => f.id);

    commit(authMutationTypes.UPDATE_USER, { user: { favorites } });
  },

  async bookmark({ commit, state }, bookmark: Bookmark): Promise<void> {
    await HTTP.put(`api/bookmarks/${bookmark.id}`);
    if (state.user) {
      commit(authMutationTypes.UPDATE_USER, {
        user: { favorites: [...state.user.favorites, bookmark] }
      });
    }
  },

  async removeBookmark({ commit }, bookmark: Bookmark): Promise<void> {
    await HTTP.delete(`api/bookmarks/${bookmark.id}`);
    commit(authMutationTypes.REMOVE_BOOKMARK, bookmark);
  }
};
