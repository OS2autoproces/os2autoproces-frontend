import { HTTP } from '@/services/http-service';
import { User } from '@/store/modules/auth/state';
import { commonMutationTypes } from '@/store/modules/common/mutations';
import { ITSystem } from '@/store/modules/process/state';
import { RootState } from '@/store/store';
import { debounce } from 'lodash';
import { ActionTree, Commit } from 'vuex';
import { CommonState } from '@/store/modules/common/state';

export const namespace = 'common';

export interface Cms {
  label: keyof CommonState;
  content: string;
}

export interface Kle {
  code: string;
  name: string;
}

interface ItSystemsResponse {
  _embedded: {
    itSystems: ITSystem[];
  };
  _links: {
    next: {
      href: string;
    };
  };
  page: {
    size: number;
    totalPages: number;
  };
}

interface KleResponse {
  _embedded: {
    kles: Kle[];
  };
  _links: {
    next: {
      href: string;
    };
  };
  page: {
    size: number;
    totalPages: number;
  };
}

interface UserResponse {
  _embedded: {
    users: User[];
  };
}

export interface UserSearchRequest {
  cvr: string;
  name: string;
}

export const commonActionTypes = {
  UPDATE: `${namespace}/update`,
  LOAD_CMS_CONTENT: `${namespace}/loadCmsContent`,
  SAVE_CMS_CONTENT: `${namespace}/saveCmsContent`,
  LOAD_IT_SYSTEMS: `${namespace}/loadItSystems`,
  LOAD_KLES: `${namespace}/loadKles`,

  SEARCH_USERS: `${namespace}/searchUsers`
};

export const actions: ActionTree<CommonState, RootState> = {
  update({ commit }, payload: Partial<CommonState>): void {
    commit(commonMutationTypes.UPDATE, payload);
  },
  async loadCmsContent({ commit }, label: keyof CommonState) {
    const jsonContent = (await HTTP.get<Cms>(`public/cms/${label}`)).data.content;

    const content = jsonContent ? JSON.parse(jsonContent) : '';

    commit(commonMutationTypes.UPDATE, { [label]: content });
  },
  async saveCmsContent({ commit }, cms: Cms): Promise<void> {
    await HTTP.post(`api/cms/${cms.label}`, JSON.stringify(cms.content), {
      headers: {
        'content-type': 'application/json'
      }
    });
  },
  async loadItSystems({ commit }) {
    const response = await HTTP.get<ItSystemsResponse>(`api/itSystems?size=100000`);
    const itSystems = response.data._embedded.itSystems;

    commit(commonMutationTypes.ASSIGN, { itSystems });
  },
  async loadKles({ commit }) {
    const response = await HTTP.get<KleResponse>(`api/kles?size=100000`);
    const kles = response.data._embedded.kles.map(kle => kle.code);

    commit(commonMutationTypes.ASSIGN, { kles });
  },
  searchUsers({ commit }, { cvr, name }): void {
    if (!cvr) {
      return;
    }
    debouncedSearch({ cvr, name }, commit);
  }
};

const debouncedSearch = debounce(async ({ name, cvr }: UserSearchRequest, commit: Commit) => {
  const users = (await HTTP.get<UserResponse>(`api/users?name=${name}&cvr=${cvr}`)).data._embedded.users;
  commit(commonMutationTypes.ASSIGN, { users });
}, 250);
