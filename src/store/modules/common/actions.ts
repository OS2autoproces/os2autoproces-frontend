import { HTTP } from '@/services/http-service';
import { commonMutationTypes } from '@/store/modules/common/mutations';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { CommonState } from './state';
import { ITSystem } from '@/store/modules/process/state';
import { merge } from 'lodash';

export const namespace = 'common';

export interface Cms {
  label: keyof CommonState;
  content: string;
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

export const commonActionTypes = {
  UPDATE: `${namespace}/update`,
  LOAD_CMS_CONTENT: `${namespace}/loadCmsContent`,
  SAVE_CMS_CONTENT: `${namespace}/saveCmsContent`,
  LOAD_IT_SYSTEMS: `${namespace}/loadItSystems`
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
    const response = (await HTTP.get<ItSystemsResponse>(
      `api/itSystems?size=${500}`
    )).data;
    const itSystems = response._embedded.itSystems;
    const { _links, page } = response;

    try {
      if (!_links.next) {
        commit(commonMutationTypes.ASSIGN, {
          itSystems
        });
      } else {
        if (_links.next) {
          let next = response._links.next.href.replace(
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
  }
};
