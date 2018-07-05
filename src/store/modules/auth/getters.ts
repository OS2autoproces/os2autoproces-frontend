import { AuthState, UserRole } from './state';
import { RootState } from '@/store/store';
import { GetterTree } from 'vuex';
import { namespace } from './actions';

export const authGetterTypes = {
  IS_BOOKMARKED: `${namespace}/isBookmarked`
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
};
