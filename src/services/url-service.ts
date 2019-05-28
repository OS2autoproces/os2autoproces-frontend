import { Dictionary } from 'vue-router/types/router';
import { SearchFilters } from '@/store/modules/search/state';
import qs from 'qs';
import DOMPurify from 'dompurify';
import { getInitialState } from '@/store/modules/search';
import { strictEqual } from 'assert';

// This is kind of hacky, nut it is needed for deeplinking specific searches.
// It has no impect on rerendering, it only pushes a new history state
export const setUrlSearchQuery = (filters: SearchFilters) => {
  try {
    if (history.pushState) {
      const query = qs.stringify({ filters });
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

export const mapQueryObjToFilters = (query: any): SearchFilters => {
  if (!query) {
    return getInitialState().filters;
  }

  const state = getInitialState().filters;
  return {
    reporterId: query.reporterId || state.reporterId,
    usersId: query.usersId || state.usersId,
    bookmarkedId: query.bookmarkedId || state.bookmarkedId,
    text: query.text || state.text,
    created: query.created || state.created,
    lastChanged: query.lastChanged || state.lastChanged,
    municipality: query.municipality || state.municipality,
    visibility: query.visibility || state.visibility,
    page: query.page || state.page,
    size: query.size || state.size,
    sorting: query.sorting || state.sorting,
    phase: query.phase || state.phase,
    runPeriod: query.runPeriod || state.runPeriod,
    domain: query.domain || state.domain,
    klaProcess: query.klaProcess || state.klaProcess,
    noSepMep: query.noSepMep || state.noSepMep,
    umbrella: query.umbrella || state.umbrella,
    itSystems: query.itSystems || state.itSystems,
    technologies: query.technologies || state.technologies
  };
};
