import { HTTP } from '@/services/http-service';
import {SearchFilters, SearchResult} from '@/store/modules/search/state';

const phaseLabels: {[x in Phase]: string} = {
  IDEA: 'Idé',
  PREANALYSIS: 'Foranalyse',
  SPECIFICATION: 'Specifikation',
  DEVELOPMENT: 'Udvikling',
  IMPLEMENTATION: 'Implementering',
  OPERATION: 'Drift'
};

const statusLabels: {[x in Status]: string} = {
  REJECTED: 'Afvist',
  FAILED: 'Mislykket',
  PENDING: 'Afventer',
  INPROGRESS: 'Igang'
};

const domainLabels: {[x in Domain]: string} = {
  WORK: 'Arbejdsmarked & Erhverv',
  HEALTH: 'Social & Sundhed',
  CHILDREN: 'Børn & Læring',
  ENVIRONMENT: 'Miljø, Teknik & Forsyning',
  DEMOCRACY: 'Demokrati & Involvering',
  ADMINISTRATION: 'Administation & Organisation',
};

type Phase = 'IDEA' | 'PREANALYSIS' | 'SPECIFICATION' | 'DEVELOPMENT' | 'IMPLEMENTATION' | 'OPERATION';
type Status = 'REJECTED' | 'FAILED' | 'PENDING' | 'INPROGRESS';
type Domain = 'WORK' | 'HEALTH' | 'CHILDREN' | 'ENVIRONMENT' | 'DEMOCRACY' | 'ADMINISTRATION';

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



function mapSearchResponse(response: SearchResponse): SearchResult {
  return {
    page: response.page,
    processes: response._embedded.processes.map(process => Object.assign(process, {
      domain: domainLabels[process.domain],
      phase: phaseLabels[process.phase],
      status: statusLabels[process.status],
    }))
  }
}

// TODO: Add municipality name and bookmarked to result
export async function search(params: SearchFilters): Promise<SearchResult> {
  const response = await HTTP.get<SearchResponse>('api/processes', { params });

  return mapSearchResponse(response.data);
}
