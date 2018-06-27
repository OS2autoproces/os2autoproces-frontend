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
  INCREMENT_NETWORK_CALLS: `${namespace}/IncrementNetworkCalls`,
  UPDATE_FRONTPAGE_MARKDOWN: `${namespace}/updateFrontpageMarkdown`,
  GET_CMS_LABEL_CONTENT: `${namespace}/getCmsLabelContent`,
  POST_CMS_LABEL_CONTENT: `${namespace}/postCmsContent`
};

export const actions: ActionTree<CommonState, RootState> = {
  incrementNetworkCalls({ commit }): void {
    commit(commonMutationTypes.INCREMENT_NETWORK_CALLS);
  },
  updateFrontpageMarkdown({ commit }, payload: Partial<CommonState>): void {
    commit(commonMutationTypes.UPDATE_COMMON, payload);
  },
  async someAsyncAction({ commit }, payload: any) {
    const serverCall = await new Promise((reject, resolve) => resolve(2));

    commit(commonMutationTypes.INCREMENT_NETWORK_CALLS);
  },
  async getCmsLabelContent({ commit }, label: string) {
    const response: AxiosResponse = await HTTP.get(`api/cms/${label}`);

    const data: Cms = response.data;

    commit(commonMutationTypes.UPDATE_COMMON, {
      frontPageMarkdown: data.content
    });
  },
  async postCmsContent({commit}, cms: Cms) {
    const response = await HTTP.post(`api/cms/${cms.label}`, cms.content);
  }
};
