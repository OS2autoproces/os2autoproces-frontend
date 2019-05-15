import { Dictionary } from 'vue-router/types/router';
import { SearchFilters } from '@/store/modules/search/state';
import qs from 'qs';
import DOMPurify from 'dompurify';
import { getInitialState } from '@/store/modules/search';

// This is kind of hacky, nut it is needed for deeplinking specific searches.
// It has no impect on rerendering, it only pushes a new history state
// TODO consider placing in seperate helper / service
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

  const {
    visibility,
    page,
    size,
    sorting,
    phase,
    domain,
    itSystems,
    technologies,
    klaProcess,
    umbrella
  } = getInitialState().filters;
  return {
    reporterId: query.reporterId,
    usersId: query.usersId,
    bookmarkedId: query.bookmarkedId,
    text: query.text || '',
    created: query.created || '',
    lastChanged: query.lastChanged || '',
    municipality: query.municipality || null,
    visibility: query.visibility || visibility,
    page: query.page || page,
    size: query.size || size,
    sorting: query.sorting || sorting,
    phase: query.phase || phase,
    domain: query.domain || domain,
    klaProcess: query.klaProcess || klaProcess,
    umbrella: query.umbrella || umbrella,
    itSystems: query.itSystems || itSystems,
    technologies: query.technologies || technologies
  };
};
