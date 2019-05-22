import { HTTP } from '@/services/http-service';
import { SearchFilters, SearchResult, SavedSearchFilters } from '@/store/modules/search/state';
import { Phase, PhaseLabels } from '@/models/phase';
import { Status, StatusLabels } from '@/models/status';
import { Domain, DomainLabels } from '@/models/domain';
import { Visibility, VisibilityKeys } from '@/models/visibility';
import { User } from '@/store/modules/auth/state';
import { Type, TypeKeys } from '@/models/types';
import { umbrellaLabels } from '@/store/modules/error/actions';
import { setUrlSearchQuery, mapSearchQueryToObject, mapQueryObjToFilters } from '@/services/url-service';
import qs from 'qs';

interface ProcessSearchResponse {
  id: number;
  title: string;
  shortDescription: string;
  municipalityName: string;
  rating: number;
  phase: Phase;
  status: Status;
  domains: Domain[];
  kle: string;
  legalClause: string;
  hasBookmarked: boolean;
  lastChanged: number;
}

interface SearchResponse {
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
  _embedded: {
    processes: ProcessSearchResponse[];
  };
}

interface SearchParams {
  projection: 'grid' | 'extended';
  phase: Phase[];
  domains: Domain[];
  visibility: Visibility[];
  itSystems: number[];
  technologies: number[];
  cvr: string | null;
  page: number;
  size: number;
  freetext: string;
  lastChanged: string;
  created: string;
  sort: string;
  type: Type[];
  'reporter.uuid': string | null;
  'users.uuid': string | null;
  'bookmarkUsers.uuid': string | null;
  klaProcess: boolean;
}

function mapSearchResponse(response: SearchResponse): SearchResult {
  return {
    page: response.page,
    processes: response._embedded.processes
  };
}

function dateFromISODateTime(datetime: string): string {
  return datetime.split('T')[0];
}

export async function search(filters: SearchFilters): Promise<SearchResult> {
  setUrlSearchQuery(filters);
  const params: SearchParams = {
    projection: 'grid',
    phase: Object.entries(filters.phase)
      .filter(([phase, isSelected]) => isSelected)
      .map(([phase]) => phase) as Phase[],
    domains: Object.entries(filters.domain)
      .filter(([phase, isSelected]) => isSelected)
      .map(([domain]) => domain) as Domain[],
    sort: `${filters.sorting.property},${filters.sorting.descending ? 'desc' : 'asc'}`,
    itSystems: filters.itSystems.map(system => system.id),
    technologies: filters.technologies.map(technology => technology.id),
    // TODO should visibility be used?
    visibility: [],
    page: filters.page,
    size: filters.size,
    created: dateFromISODateTime(filters.created),
    lastChanged: dateFromISODateTime(filters.lastChanged),
    'reporter.uuid': filters.reporterId,
    'users.uuid': filters.usersId,
    'bookmarkUsers.uuid': filters.bookmarkedId,
    freetext: filters.text,
    klaProcess: filters.klaProcess,
    cvr: filters.municipality ? filters.municipality.cvr : null,
    type: filters.umbrella ? [TypeKeys.GLOBAL_PARENT, TypeKeys.PARENT] : [TypeKeys.CHILD]
  };

  if (filters.visibility.municipality) {
    params.visibility.push(VisibilityKeys.MUNICIPALITY);
  }

  if (filters.visibility.public) {
    params.visibility.push(VisibilityKeys.PUBLIC);
  }

  const response = await HTTP.get<SearchResponse>('api/processes', { params });

  return mapSearchResponse(response.data);
}

// TODO Should we obfuscate?
const STORAGE_KEY = 'OS2AUTOPROCES_FILTERS';
const DELIMITER = '__';

const mapQsStringToSavedFilters = (filterStr: string): SavedSearchFilters | null => {
  try {
    const obj = mapSearchQueryToObject(filterStr);
    const filters = mapQueryObjToFilters(obj.filters);
    const text = obj.text;
    return { text, filters };
  } catch (e) {
    console.error(`Error when trying to deserialize saved filters: ${e}`);
    return null;
  }
};

export const saveFiltersToStorage = (filters: SavedSearchFilters) => {
  if (!window || !window.localStorage) {
    return;
  }

  // load possible existing saved filters
  const savedFiltersString = localStorage.getItem(STORAGE_KEY);
  const filtersArray = loadFiltersFromStorage();

  filtersArray.push(filters);
  localStorage.setItem(STORAGE_KEY, filtersArray.map(f => qs.stringify(f)).join(DELIMITER));
};

export const loadFiltersFromStorage = (): SavedSearchFilters[] => {
  const savedFiltersString = localStorage.getItem(STORAGE_KEY);
  return !!savedFiltersString
    ? savedFiltersString.split(DELIMITER).reduce((filters: SavedSearchFilters[], str) => {
      const filter = mapQsStringToSavedFilters(str);

      return !!filter ? [...filters, filter] : filters;
    }, [])
    : [];
};
