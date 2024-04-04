import { HTTP } from './http-service';
import store from '@/store';
import { mapFiltersToSearchParams } from '@/store/modules/service';
import { saveAs } from 'file-saver';

export const downloadSearchResultsExcel = async () => {
  const filters = store.state.search.filters;
  const params = mapFiltersToSearchParams(filters);

  const blob = (await HTTP.get<any>('api/excel', { params, responseType: 'blob' })).data;

  if (!blob) {
    return null;
  }

  saveAs(blob, 'OS2Autoprocess.xlsx');
};
