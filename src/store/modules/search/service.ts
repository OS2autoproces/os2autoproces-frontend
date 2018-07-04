import {HTTP} from '@/services/http-service'
import {SearchFilters, SearchResult} from '@/store/modules/search/state';
import {Phase, PhaseLabels} from "@/models/phase";
import {Status, StatusLabels} from "@/models/status";
import {Domain, DomainLabels} from "@/models/domain";
import {Visibility, VisibilityKeys} from "@/models/visibility";
import {User} from "@/store/modules/auth/state";

interface ProcessSearchResponse {
  id: number;
  title: string;
  shortDescription: string;
  municipalityName: string;
  rating: string;
  phase: Phase;
  status: Status;
  domain: Domain;
  kle: string;
  legalClause: string;
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
  page: number;
  size: number;
  freetext: string;
  sort: string;
  'reporter.uuid': string | null;
  'users.uuid': string | null;
  'bookmarkUsers.uuid': string | null;
}

function mapSearchResponse(response: SearchResponse): SearchResult {
  return {
    page: response.page,
    processes: response._embedded.processes
  }
}

export async function search(filters: SearchFilters): Promise<SearchResult> {
  const params: SearchParams = {
    projection: 'grid',
    phase: Object.entries(filters.phase).filter(([phase, isSelected]) => isSelected).map(([phase]) => phase) as Phase[],
    domain: Object.entries(filters.domain).filter(([phase, isSelected]) => isSelected).map(([domain]) => domain) as Domain[],
    sort: `${filters.sorting.property},${filters.sorting.descending ? 'desc' : 'asc'}`,
    visibility: [],
    page: filters.page,
    size: filters.size,
    'reporter.uuid': filters.reporterId,
    'users.uuid': filters.usersId,
    'bookmarkUsers.uuid': filters.bookmarkedId,
    freetext: filters.text
  };

  if (filters.municipality) {
    params.visibility.push(VisibilityKeys.MUNICIPALITY);
  }

  if (filters.public) {
    params.visibility.push(VisibilityKeys.PUBLIC);
  }

  const response = await HTTP.get<SearchResponse>('api/processes', {params});

  return mapSearchResponse(response.data);
}
