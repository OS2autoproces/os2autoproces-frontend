import { ActionTree } from 'vuex';
import { AuthState, UserRole } from './state';
import { RootState } from '@/store/store';
import { authMutationTypes } from './mutations';

interface WhoAmIResponse {
  uuid: string | null;
  email: string | null;
  name: string | null;
  cvr: string | null;
  roles: UserRole[] | null;
}

const namespace = 'auth';

export const authActionTypes = {
  LOAD_USER: `${namespace}/loadUser`,
  LOGOUT: `${namespace}/logout`
};

export const actions: ActionTree<AuthState, RootState> = {
  async loadUser({ commit }): Promise<void> {
    // TODO: Use HTTP service
    const response = await fetch('https://dev.os2autoproces.eu/public/whoami', { credentials: 'include' });
    const user: WhoAmIResponse = await response.json();

    commit(authMutationTypes.SET_USER, user.uuid !== null ? user : null);
  },
  async logout({ commit }) {
    // TODO: Use HTTP service
    await fetch('https://dev.os2autoproces.eu/saml/logout', { credentials: 'include', mode: 'no-cors' });

    commit(authMutationTypes.SET_USER, null);
  }
};
