import { HTTP } from '@/services/http-service';
import { User } from '@/store/modules/auth/state';
import { commonMutationTypes } from '@/store/modules/common/mutations';
import { ITSystem } from '@/store/modules/process/state';
import { RootState } from '@/store/store';
import { debounce } from 'lodash';
import { ActionTree, Commit } from 'vuex';
import { CommonState } from './state';

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
    const jsonContent = (await HTTP.get<Cms>(`public/cms/${label}`)).data
      .content;

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
    const { _links, page, _embedded } = (await HTTP.get<ItSystemsResponse>(
      `api/itSystems?size=${500}`
    )).data;

    const itSystems = _embedded.itSystems;

    try {
      if (!_links.next) {
        commit(commonMutationTypes.ASSIGN, {
          itSystems
        });
      } else {
        if (_links.next) {
          let next = _links.next.href.replace(
            'https://dev.os2autoproces.eu/',
            ''
          );
          for (let i = 0; i < page.totalPages; i++) {
            const temp = (await HTTP.get<ItSystemsResponse>(next)).data;
            if (temp._links.next) {
              next = temp._links.next.href.replace(
                'https://dev.os2autoproces.eu/',
                ''
              );
            }
            itSystems.push.apply(itSystems, temp._embedded.itSystems);
          }
        }
      }
      commit(commonMutationTypes.ASSIGN, { itSystems });
    } catch (e) {
      throw e;
    }
  },
  async loadKles({ commit }) {
    const { _embedded, _links, page } = (await HTTP.get<KleResponse>(
      `api/kles?size=${500}`
    )).data;
    const kles = _embedded.kles;

    try {
      if (!_links.next) {
        commit(commonMutationTypes.ASSIGN, {
          kles
        });
      } else {
        if (_links.next) {
          let next = _links.next.href.replace(
            'https://dev.os2autoproces.eu/',
            ''
          );
          for (let i = 0; i < page.totalPages; i++) {
            const temp = (await HTTP.get<KleResponse>(next)).data;
            if (temp._links.next) {
              next = temp._links.next.href.replace(
                'https://dev.os2autoproces.eu/',
                ''
              );
            }
            kles.push.apply(kles, temp._embedded.kles);
          }
        }
      }
      commit(commonMutationTypes.ASSIGN, { kles });
    } catch (e) {
      throw e;
    }
  },

  searchUsers({ commit }, { cvr, name }): void {
    if (!cvr || name < 3) {
      return;
    }
    debouncedSearch({ cvr, name }, commit);
  }
};

const debouncedSearch = debounce(
  async ({ name, cvr }: UserSearchRequest, commit: Commit) => {
    const users = (await HTTP.get<UserResponse>(
      `api/users?name=${name}&cvr=${cvr}`
    )).data._embedded.users;
    commit(commonMutationTypes.ASSIGN, { users });
  },
  250
);
