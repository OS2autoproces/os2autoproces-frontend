import { HTTP } from '@/services/http-service'
import {SearchFilters, SearchResult} from '@/store/modules/search/state';
import {Phase, PhaseLabels} from "@/models/phase";
import {Status, StatusLabels} from "@/models/status";
import {Domain, DomainLabels} from "@/models/domain";

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
  sort: string
}

function mapSearchResponse(response: SearchResponse): SearchResult {
  return {
    page: response.page,
    processes: response._embedded.processes
  }
}

// TODO: Add municipality name and bookmarked to result
export async function search(filters: SearchFilters): Promise<SearchResult> {
  const params: SearchParams = {
    sort: `${filters.sorting.property},${filters.sorting.descending ? 'desc' : 'asc'}`
  };

  const response = await HTTP.get<SearchResponse>('api/processes', { params });

  return mapSearchResponse(response.data);
}
