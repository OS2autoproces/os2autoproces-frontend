import { Domain } from '@/models/domain';
import { Phase } from '@/models/phase';
import { Status } from '@/models/status';
import { ITSystem, Municipality, Technology } from '@/store/modules/process/state';

export interface SearchResult {
  page: {
    totalPages: number;
    number: number;
  };
  processes: SearchResultProcess[];
}

export interface SavedSearchFilters {
  text: string;
  filters: SearchFilters;
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
  sepMep: boolean;
  legalClause: string;
  hasBookmarked: boolean;
  lastChanged: number;
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
  created: string;
  lastChanged: string;
  municipality: Municipality | null;
  visibility: {
    municipality: boolean;
    public: boolean;
  };
  page: number;
  size: number;
  sorting: SortingOption;
  phase: { [x in Phase]: boolean };
  domain: { [x in Domain]: boolean };
  klaProcess: boolean;
  noSepMep: boolean;
  umbrella: boolean;
  itSystems: ITSystem[];
  technologies: Technology[];
}

export interface SearchState {
  result?: SearchResult;
  filters: SearchFilters;
  filtersTouched: boolean;
  savedFilters: SavedSearchFilters[];
}
