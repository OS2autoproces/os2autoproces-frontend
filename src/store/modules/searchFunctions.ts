import { SearchState } from './search';
import { SearchFilters } from './searchInterfaces';
import { isEqual } from 'lodash';

export function getInitialState(): SearchState {
  return {
    result: null,
    filtersTouched: false,
    savedFilters: [],
    selectedSavedFiltersText: '',
    filters: {
      page: 0,
      size: 5,
      reporterId: null,
      usersId: null,
      bookmarkedId: null,
      text: '',
      created: '',
      lastChanged: '',
      municipality: null,
      visibility: {
        MUNICIPALITY: false,
        PUBLIC: false
      },
      klaProcess: false,
      umbrella: false,
      sepMep: false,
      itSystems: [],
      technologies: [],
      sorting: {
        property: 'created',
        descending: true
      },
      phase: {
        IDEA: false,
        PREANALYSIS: false,
        SPECIFICATION: false,
        DEVELOPMENT: false,
        IMPLEMENTATION: false,
        OPERATION: false,
        DECOMMISSIONED: false
      },
      domain: {
        ADMINISTRATION: false,
        EMPLOYMENT: false,
        PROFESSION: false,
        FAMILY: false,
        EDUCATION: false,
        DEMOCRACY: false,
        ENVIRONMENT: false,
        TECHNIQUE: false,
        SOCIAL: false,
        HEALTH: false,
        SUSTAINABILITY: false,
        HR: false,
        IT: false,
        CULTURE: false,
        ECONOMY: false
      },
      runPeriod: {
        ONDEMAND: false,
        ONCE: false,
        DAILY: false,
        WEEKLY: false,
        MONTHLY: false,
        QUATERLY: false,
        YEARLY: false
      },
      status: {
        FAILED: false,
        INPROGRESS: false,
        NOT_RATED: false,
        PENDING: false,
        REJECTED: false,
        NOT_RELEVANT: false
      }
    }
  };
}

export function getFiltersTouched(
  previousFilters: SearchFilters | undefined,
  filterChanges: Partial<SearchFilters>
): boolean {
  const initialFilters = getInitialState().filters;
  const currentFilters = Object.assign({}, previousFilters, filterChanges);
  const touched = !isEqual(initialFilters, currentFilters);
  return touched;
}
