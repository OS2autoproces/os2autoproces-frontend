import { Domain } from '@/models/domain';
import { Phase } from '@/models/phase';
import { RunPeriod } from '@/models/runperiod';
import { Status } from '@/models/status';
import { Type } from '@/models/types';
import { ITSystem, Municipality, Technology } from '@/store/modules/common';
import { StatusSelect } from './../../../models/status';

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
  runPeriod: RunPeriod;
  municipalityName: string;
  domains: Domain[];
  kle: string;
  sepMep: boolean;
  legalClause: string;
  hasBookmarked: boolean;
  lastChanged: number;
  type: Type;
  childrenCount: number;
}

export interface SortingOptionParams extends SearchResultProcess {
  created: string;
}

export interface SortingOption {
  property: keyof SortingOptionParams;
  descending?: boolean;
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
    MUNICIPALITY: boolean;
    PUBLIC: boolean;
  };
  page: number;
  size: number;
  sorting: SortingOption;
  phase: { [x in Phase]: boolean | null };
  domain: { [x in Domain]: boolean | null };
  runPeriod: { [x in RunPeriod]: boolean | null };
  klaProcess: boolean;
  sepMep: boolean;
  umbrella: boolean;
  itSystems: ITSystem[];
  technologies: Technology[];
  status: { [x in Status]: boolean | null };
}

export interface SearchState {
  result?: SearchResult;
  filters: SearchFilters;
  filtersTouched: boolean;
  savedFilters: SavedSearchFilters[];
  selectedSavedFiltersText: string;
}
