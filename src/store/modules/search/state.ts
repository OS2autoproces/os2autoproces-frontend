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
  bookmark: boolean;
}

export interface SearchResult {
  page: number;
  numberOfPages: number;
  processes: SearchResultProcess[];
}

export interface SortingOption {
  property: string;
  descending: boolean;
}

export interface SearchFilters {
  reported: boolean;
  related: boolean;
  bookmarks: boolean;
  text: string;
  municipal: boolean;
  intermunicipal: boolean;
  page: number;
  sorting: SortingOption;

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
