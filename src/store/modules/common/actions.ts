import { HTTP } from '@/services/http-service';
import { commonMutationTypes } from '@/store/modules/common/mutations';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { CommonState } from './state';

const namespace = 'common';

export interface Cms {
  label: string;
  content: string;
}

export const commonActionTypes = {
  UPDATE: `${namespace}/update`,
  GET_CMS_CONTENT: `${namespace}/getCmsContent`,
  POST_CMS_CONTENT: `${namespace}/postCmsContent`
};

const cmsUrl = 'public/cms';

export const actions: ActionTree<CommonState, RootState> = {
  update({ commit }, payload: Partial<CommonState>): void {
    commit(commonMutationTypes.UPDATE, payload);
  },
  async getCmsContent({ commit }, label: string) {
    const content = (await HTTP.get<Cms>(`${cmsUrl}/${label}`)).data.content;

    const frontPageMarkdown = JSON.parse(content);

    commit(commonMutationTypes.UPDATE, { frontPageMarkdown });
  },
  async postCmsContent({ commit }, cms: Cms): Promise<void> {
    await HTTP.post(`${cmsUrl}/${cms.label}`, JSON.stringify(cms.content), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }
};
