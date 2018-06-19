import { ActionTree } from 'vuex';
import { DetailsState } from '@/store/modules/details/state';
import { RootState } from '@/store/store';

export const namespace = 'details';

export const detailsActionTypes = {
  SAVE: `${namespace}/save`
};

export const actions: ActionTree<DetailsState, RootState> = {
  save() {
    // TODO: Save to backend
  }
};
