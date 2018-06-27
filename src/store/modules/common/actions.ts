import { HTTP } from '@/services/http-service';
import { commonMutationTypes } from '@/store/modules/common/mutations';
import { RootState } from '@/store/store';
import { ActionTree } from 'vuex';
import { AxiosResponse } from '../../../../node_modules/axios';
import { CommonState } from './state';

const namespace = 'common';

export interface Cms {
  label: string;
  content: string;
}

export const commonActionTypes = {
  UPDATE_FRONTPAGE_MARKDOWN: `${namespace}/updateFrontpageMarkdown`,
  GET_CMS_LABEL_CONTENT: `${namespace}/getCmsLabelContent`,
  POST_CMS_LABEL_CONTENT: `${namespace}/postCmsContent`
};

export const actions: ActionTree<CommonState, RootState> = {
  updateFrontpageMarkdown({ commit }, payload: Partial<CommonState>): void {
    commit(commonMutationTypes.UPDATE_COMMON, payload);
  },
  async getCmsLabelContent({ commit }, label: string) {
    const response: AxiosResponse = await HTTP.get(`api/cms/${label}`);

    const data: Cms = response.data;

    commit(commonMutationTypes.UPDATE_COMMON, {
      frontPageMarkdown: data.content
    });
  },
  async postCmsContent({ commit }, cms: Cms): Promise<void> {
    await HTTP.post(`api/cms/${cms.label}`, cms.content);
  }
};
