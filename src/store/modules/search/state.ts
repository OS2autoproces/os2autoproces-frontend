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
  reporterId: string | null;
  usersId: string | null;
  bookmarkedId: string | null; // TODO: Use in search
  text: string; // TODO: Use in search
  municipality: boolean;
  public: boolean;
  page: number;
  size: number;
  sorting: SortingOption;
  phase: {[x in Phase]: boolean};
  domain: {[x in Domain]: boolean};
  time?: string[]; // TODO: Use in search
  system?: string[]; // TODO: Use in search
}

export interface SearchState {
  result?: SearchResult;
  filters: SearchFilters;
}
