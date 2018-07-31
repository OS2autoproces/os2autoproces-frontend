import { Phase } from '@/models/phase';
import { Domain } from '@/models/domain';
import { Status } from '@/models/status';
import { Type } from '@/models/types';

export interface SearchResult {
  page: {
    totalPages: number;
    number: number;
  };
  processes: SearchResultProcess[];
}

export interface SearchResultProcess {
  id: number;
  title: string;
  shortDescription: string;
  rating: number;
  phase: Phase;
  status: Status;
  municipalityName: string;
  domains: Domain[];
  kle: string;
  legalClause: string;
  hasBookmarked: boolean;
}

export interface SortingOption {
  property: keyof SearchResultProcess;
  descending: boolean;
}

export interface SearchFilters {
  reporterId: string | null;
  usersId: string | null;
  bookmarkedId: string | null;
  text: string;
  municipality: boolean;
  public: boolean;
  page: number;
  size: number;
  sorting: SortingOption;
  type: Type | null;
  phase: { [x in Phase]: boolean };
  domain: { [x in Domain]: boolean };
  time?: string[]; // TODO: Use in search
  system?: string[]; // TODO: Use in search
  klaProcess: boolean;
}

export interface SearchState {
  result?: SearchResult;
  filters: SearchFilters;
}
