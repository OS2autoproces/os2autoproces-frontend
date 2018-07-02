import {HTTP} from '@/services/http-service'
import {SearchFilters, SearchResult} from '@/store/modules/search/state';
import {Phase, PhaseLabels} from "@/models/phase";
import {Status, StatusLabels} from "@/models/status";
import {Domain, DomainLabels} from "@/models/domain";
import {Visibility, VisibilityKeys} from "@/models/visibility";

interface ProcessSearchResponse {
  id: number;
  title: string;
  shortDescription: string;
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
  phase: Phase[];
  domain: Domain[];
  visibility: Visibility[];
  page: number;
  size: number;
  sort: string;
}

function mapSearchResponse(response: SearchResponse): SearchResult {
  return {
    page: response.page,
    processes: response._embedded.processes
  }
}

// TODO: Add municipality name and bookmarked to result
export async function search(filters: SearchFilters): Promise<SearchResult> {
  let visibility: Visibility[] = [];

  if (filters.municipality) {
    visibility.push(VisibilityKeys.MUNICIPALITY);
  }

  if (filters.public) {
    visibility.push(VisibilityKeys.PUBLIC);
  }

  const params: SearchParams = {
    phase: Object.entries(filters.phase).filter(([phase, isSelected]) => isSelected).map(([phase]) => phase) as Phase[],
    domain: Object.entries(filters.domain).filter(([phase, isSelected]) => isSelected).map(([domain]) => domain) as Domain[],
    sort: `${filters.sorting.property},${filters.sorting.descending ? 'desc' : 'asc'}`,
    visibility,
    page: filters.page,
    size: filters.size,
  };

  const response = await HTTP.get<SearchResponse>('api/processes', {params});

  return mapSearchResponse(response.data);
}
