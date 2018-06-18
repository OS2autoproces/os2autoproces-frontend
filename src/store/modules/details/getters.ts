import { RootState } from '@/store/store';
import { DetailsState } from '@/store/modules/details/state';
import { GetterTree } from 'vuex';
import { namespace } from '@/store/modules/details/actions';

export const detailsGetterTypes = {
  IS_EDITING: `${namespace}/isEditing`
};

export const getters: GetterTree<DetailsState, RootState> = {
  isEditing(state: DetailsState): boolean {
    return !state.challenges.disabled || !state.generalInformation.disabled;
  }
};
