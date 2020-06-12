import { SearchFilters } from '@/store/modules/searchInterfaces';
import qs from 'qs';
import DOMPurify from 'dompurify';
import { getInitialState } from '@/store/modules/searchFunctions';

// Test if browser is Internet Explorer
export function isIE() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');

  return msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
}

export const stringify = (obj: any) => qs.stringify(obj, { strictNullHandling: true });

export const stringifySearchFilters = (filters: SearchFilters) => stringify({ filters });

// This is kind of hacky, but it is needed for deeplinking specific searches.
// It has no impect on rerendering, it only pushes a new history state
export const setUrlSearchQuery = (filters: SearchFilters) => {
  try {
    if (window && history.pushState) {
      const query = stringifySearchFilters(filters);
      const newurl = `
      ${window.location.protocol}//${window.location.host}${window.location.pathname}?${query}
      `;
      window.history.pushState({ path: newurl }, '', newurl);
    }
  } catch (e) {
    console.warn(`Updating search url failed with error: ${e}`);
  }
};

export const mapSearchQueryToObject = (query: string): any => {
  const sanitized = DOMPurify.sanitize(query);
  const parsed = qs.parse(sanitized, {
    strictNullHandling: true,
    decoder(str) {
      const strWithoutPlus = str.replace(/\+/g, ' ');

      if (/^(\d+|\d*\.\d+)$/.test(str)) {
        return parseFloat(str);
      }

      const keywords = {
        true: true,
        false: false,
        null: null,
        undefined
      };
      if (str in keywords) {
        return keywords[str as keyof typeof keywords];
      }

      // utf-8
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    }
  });
  return parsed;
};

export const mapQueryObjToFilters = (
  query: any = {},
  initial: SearchFilters = getInitialState().filters
): SearchFilters => {
  return {
    reporterId: query.reporterId || initial.reporterId,
    usersId: query.usersId || initial.usersId,
    bookmarkedId: query.bookmarkedId || initial.bookmarkedId,
    text: query.text || initial.text,
    created: query.created || initial.created,
    lastChanged: query.lastChanged || initial.lastChanged,
    municipality: query.municipality || initial.municipality,
    visibility: query.visibility || initial.visibility,
    page: query.page || initial.page,
    size: query.size || initial.size,
    sorting: query.sorting || initial.sorting,
    phase: query.phase || initial.phase,
    runPeriod: query.runPeriod || initial.runPeriod,
    domain: query.domain || initial.domain,
    klaProcess: query.klaProcess !== undefined ? query.klaProcess : initial.klaProcess,
    sepMep: query.sepMep !== undefined ? query.sepMep : initial.sepMep,
    umbrella: query.umbrella || initial.umbrella,
    itSystems: query.itSystems || initial.itSystems,
    technologies: query.technologies || initial.technologies,
    status: query.status || initial.status
  };
};
