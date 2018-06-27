import { ActionTree } from 'vuex';
import { AuthState, UserRole } from './state';
import { RootState } from '@/store/store';
import { authMutationTypes } from './mutations';
import { HTTP } from '@/services/http-service';

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
    const user = (await HTTP.get<WhoAmIResponse>('/public/whoami')).data;

    commit(authMutationTypes.SET_USER, user.uuid !== null ? user : null);
  },
  async logout({ commit }) {
    await HTTP.get<void>('/saml/logout');

    commit(authMutationTypes.SET_USER, null);
  }
};
