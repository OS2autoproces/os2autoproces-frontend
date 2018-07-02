import {Phase} from "@/models/phase";
import {Domain} from "@/models/domain";

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
  property: keyof SearchResultProcess;
  descending: boolean;
}

export interface SearchFilters {
  reported: boolean;
  related: boolean;
  bookmarks: boolean;
  text: string;
  municipality: boolean;
  public: boolean;
  page: number;
  size: number;
  sorting: SortingOption;
  phase: {[x in Phase]: boolean};
  domain: {[x in Domain]: boolean};
  time?: string[];
  system?: string[];
}

export interface SearchState {
  result?: SearchResult;
  filters: SearchFilters;
}
