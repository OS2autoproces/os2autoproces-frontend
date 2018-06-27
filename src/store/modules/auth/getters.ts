import { AuthState, UserRole, Bookmark } from './state';
import { RootState } from '@/store/store';
import { GetterTree } from 'vuex';

const namespace = 'auth';

export const authGetterTypes = {
  IS_FAVORITE: `${namespace}/isFavorite`
};

export const getters: GetterTree<AuthState, RootState> = {
  hasRole(state: AuthState) {
    return (roles: UserRole[] | UserRole) => {
      if (!state.user) {
        return false;
      }

      const validRoles = Array.isArray(roles) ? roles : [roles];

      return state.user.roles.some(role => validRoles.includes(role));
    };
  },
  isFavorite(state: AuthState) {
    return (bookmark: Bookmark) => {
      if (state.user) {
        return state.user.favorites
          ? state.user.favorites.some(b => b.id === bookmark.id)
          : false;
      }
    };
  }
};
