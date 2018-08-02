import { HTTP } from '@/services/http-service';
import { SearchFilters, SearchResult } from '@/store/modules/search/state';
import { Phase, PhaseLabels } from '@/models/phase';
import { Status, StatusLabels } from '@/models/status';
import { Domain, DomainLabels } from '@/models/domain';
import { Visibility, VisibilityKeys } from '@/models/visibility';
import { User } from '@/store/modules/auth/state';
import { Type } from '@/models/types';

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
  domain: Domain[];
  visibility: Visibility[];
  itSystems: number[];
  page: number;
  size: number;
  freetext: string;
  lastChanged: string;
  created: string;
  timeSpendComputedTotal: string;
  sort: string;
  type: Type | null;
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
  const params: SearchParams = {
    projection: 'grid',
    phase: Object.entries(filters.phase)
      .filter(([phase, isSelected]) => isSelected)
      .map(([phase]) => phase) as Phase[],
    domain: Object.entries(filters.domain)
      .filter(([phase, isSelected]) => isSelected)
      .map(([domain]) => domain) as Domain[],
    sort: `${filters.sorting.property},${filters.sorting.descending ? 'desc' : 'asc'}`,
    itSystems: filters.itSystems.map(system => system.id),
    visibility: [],
    page: filters.page,
    size: filters.size,
    type: filters.type,
    timeSpendComputedTotal: filters.timeSpendComputedTotal,
    created: dateFromISODateTime(filters.created),
    lastChanged: dateFromISODateTime(filters.lastChanged),
    'reporter.uuid': filters.reporterId,
    'users.uuid': filters.usersId,
    'bookmarkUsers.uuid': filters.bookmarkedId,
    freetext: filters.text,
    klaProcess: filters.klaProcess
  };

  if (filters.municipality) {
    params.visibility.push(VisibilityKeys.MUNICIPALITY);
  }

  if (filters.public) {
    params.visibility.push(VisibilityKeys.PUBLIC);
  }

  const response = await HTTP.get<SearchResponse>('api/processes', { params });

  return mapSearchResponse(response.data);
}
