import { SearchState } from '@/store/modules/search/state';
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { namespace } from '@/store/modules/search/actions';

export const searchGetterTypes = {
  IS_SEARCHING_FOR_UMBRELLA_PROCESS: `${namespace}/isSearchingForUmbrellaProcess`
};

export const getters: GetterTree<SearchState, RootState> = {
  isSearchingForUmbrellaProcess(state) {
    return state.filters.umbrella;
  }
};
