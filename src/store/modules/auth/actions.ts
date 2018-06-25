import { AuthState, User, UserRole } from './state';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { authMutationTypes } from '@/store/modules/auth/mutations';

interface WhoAmIResponse {
  uuid: string | null;
  email: string | null;
  name: string | null;
  cvr: string | null;
  roles: UserRole[];
}

const namespace = 'auth';

export const authActionTypes = {
  LOAD_USER: `${namespace}/loadUser`
};

export const actions: ActionTree<AuthState, RootState> = {
  async loadUser({ commit }): Promise<void> {
    // TODO: Use HTTP service
    const response = await fetch('https://dev.os2autoproces.eu/public/whoami', { credentials: 'include' });
    const user: WhoAmIResponse = await response.json();

    commit(authMutationTypes.SET_USER, user.uuid !== null ? user : null);
  }
};
