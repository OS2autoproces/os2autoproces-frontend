import { HTTP } from '@/services/http-service';
import { User } from '@/store/modules/auth/state';
import { commonMutationTypes } from '@/store/modules/common/mutations';
import { ITSystem, Technology } from '@/store/modules/process/state';
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
}

export interface Form {
  code: string;
}

interface TechnologiesResponse {
  _embedded: {
    technologies: Technology[];
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

interface FormResponse {
  _embedded: {
    forms: Form[];
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
  LOAD_TECHNOLOGIES: `${namespace}/loadTechnologies`,
  ADD_TECHNOLOGY: `${namespace}/addTechnology`,
  REMOVE_TECHNOLOGY: `${namespace}/removeTechnology`,
  EDIT_TECHNOLOGY: `${namespace}/editTechnology`,
  LOAD_FORMS: `${namespace}/loadFormsByKle`,
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
  async saveCmsContent({}, cms: Cms): Promise<void> {
    await HTTP.post(`api/cms/${cms.label}`, JSON.stringify(cms.content), {
      headers: {
        'content-type': 'application/json'
      }
    });
  },
  async loadTechnologies() {
    const response = await HTTP.get<TechnologiesResponse>(`api/technologies?size=100000`);
    return response.data._embedded.technologies;
  },
  async addTechnology({}, name: string) {
    return HTTP.post(`api/technologies`, { name });
  },
  async editTechnology({}, { id, name }) {
    return HTTP.put(`api/technologies/${id}`, { name });
  },
  async removeTechnology({}, id: number) {
    return HTTP.delete(`api/technologies/${id}`);
  },
  async loadItSystems({ commit }) {
    const response = await HTTP.get<ItSystemsResponse>(`api/itSystems?size=100000`);
    const itSystems = response.data._embedded.itSystems;

    commit(commonMutationTypes.ASSIGN, { itSystems });
  },
  async loadKles({ commit }) {
    const response = await HTTP.get<KleResponse>(`api/kles?size=100000`);
    const kles = response.data._embedded.kles.map(kle => ({
      code: kle.code
    }));

    commit(commonMutationTypes.ASSIGN, { kles });
  },
  searchUsers({ commit }, { cvr, name }): void {
    if (!cvr) {
      return;
    }
    debouncedSearch({ cvr, name }, commit);
  },
  async loadFormsByKle({ commit }, kle: Kle) {
    const response = await HTTP.get<FormResponse>(`api/kles/${kle.code}/forms`);
    const forms = response.data._embedded.forms.map((form: Form) => ({
      code: form.code
    }));

    commit(commonMutationTypes.ASSIGN, { forms });
  }
};

const debouncedSearch = debounce(async ({ name, cvr }: UserSearchRequest, commit: Commit) => {
  const users = (await HTTP.get<UserResponse>(`api/users?name=${name}&cvr=${cvr}`)).data._embedded.users;
  commit(commonMutationTypes.ASSIGN, { users });
}, 250);
