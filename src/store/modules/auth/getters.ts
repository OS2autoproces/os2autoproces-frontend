import { AuthState, UserRole } from '@/store/modules/auth/state';
import { RootState } from '@/store/store';
import { GetterTree } from 'vuex';
import { namespace } from '@/store/modules/auth/actions';

export const authGetterTypes = {
  IS_BOOKMARKED: `${namespace}/isBookmarked`,
  IS_FRONTPAGE_EDITOR: `${namespace}/isFrontpageEditor`
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

  isFrontpageEditor(state: AuthState): boolean {
    return state.user ? state.user.roles.some(role => role === UserRole.frontpageEditor) : false;
  }
};
