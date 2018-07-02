export interface SearchResult {
  page: {
    totalPages: number;
    number: number;
  };
  processes: SearchResultProcess[]
}

export interface SearchResultProcess {
  id: number;
  title: string;
  shortDescription: string;
  rating: string;
  phase: string;
  status: string;
  domain: string;
  kle: string;
  legalClause: string;
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
  size: number;
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
