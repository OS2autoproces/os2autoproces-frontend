import { HTTP } from '@/services/http-service';
import { commonMutationTypes } from '@/store/modules/common/mutations';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { CommonState } from './state';

const namespace = 'common';

export interface Cms {
  label: keyof CommonState;
  content: string;
}

export const commonActionTypes = {
  UPDATE: `${namespace}/update`,
  LOAD_CMS_CONTENT: `${namespace}/loadCmsContent`,
  SAVE_CMS_CONTENT: `${namespace}/saveCmsContent`
};

const cmsUrl = 'public/cms';

export const actions: ActionTree<CommonState, RootState> = {
  update({ commit }, payload: Partial<CommonState>): void {
    commit(commonMutationTypes.UPDATE, payload);
  },
  async loadCmsContent({ commit }, label: keyof CommonState) {
    const jsonContent = (await HTTP.get<Cms>(`${cmsUrl}/${label}`)).data.content;

    const content = JSON.parse(jsonContent);

    commit(commonMutationTypes.UPDATE, { [label]: content });
  },
  async saveCmsContent({ commit }, cms: Cms): Promise<void> {
    await HTTP.post(`${cmsUrl}/${cms.label}`, JSON.stringify(cms.content), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }
};
