export interface SearchResultProcess {
  id: string;
  name: string;
  resume: string;
  potential: number;
  municipality: string;
  field: string;
  kleNumber: string;
  law: string;
  phase: number;
  status: string;
}

export interface SearchResult {
  page: number;
  numberOfPages: number;
  processes: SearchResultProcess[];
}

export interface SearchFilters {
  reported: boolean;
  related: boolean;
  favorites: boolean;
  text: string;
  municipal: boolean;
  intermunicipal: boolean;

  phases: {
    idea: boolean;
    preliminaryAnalysis: boolean;
    specification: boolean;
    development: boolean;
    implementation: boolean;
    operating: boolean;
  };

  fields?: string[];
  time?: string[];
  system?: string[];
}

export interface SearchState {
  result?: SearchResult;
  filters: SearchFilters;
}
