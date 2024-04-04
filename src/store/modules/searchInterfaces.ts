import { Domain } from '@/models/domain';
import { Phase } from '@/models/phase';
import { RunPeriod } from '@/models/runperiod';
import { Status } from '@/models/status';
import { Type } from '@/models/types';
import { ITSystem, Municipality, Technology } from '@/store/modules/commonInterfaces';
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
  technologies: Technology[];
  kle: string;
  sepMep: boolean;
  legalClause: string;
  hasBookmarked: boolean;
  hasAttachments: boolean;
  lastChanged: number;
  type: Type;
  childrenCount: number;
  timeSpendOccurancesPerEmployee: number;
  timeSpendPerOccurance: number;
  timeSpendPercentageDigital: number;
  searchMatch: string;
  searchWord: string;
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
  municipalities: Municipality[];
  visibility: {
    MUNICIPALITY: boolean;
    PUBLIC: boolean;
  };
  page: number;
  size: number;
  sorting: SortingOption;
  phase: {
    [x in Phase]: boolean | null;
  };
  domain: {
    [x in Domain]: boolean | null;
  };
  runPeriod: {
    [x in RunPeriod]: boolean | null;
  };
  klaProcess: boolean;
  sepMep: boolean;
  umbrella: boolean;
  itSystems: ITSystem[];
  technologies: Technology[];
  status: {
    [x in Status]: boolean | null;
  };
}
export interface SearchTableColumn {
  id: number;
  name: string;
}
export const AllSearchTableColumns: SearchTableColumn[] = [
  { id: 1, name: 'ID' },
  { id: 2, name: 'Titel' },
  { id: 3, name: 'Organisation' },
  { id: 4, name: 'Opdateret' },
  { id: 5, name: 'Fase' },
  { id: 6, name: 'Resumé' },
  { id: 7, name: 'Status' },
  { id: 8, name: 'Fagområder' },
  { id: 9, name: 'FÅE' },
  { id: 10, name: 'Anvendt teknologi' },
  { id: 11, name: 'Skedulering' },
  { id: 12, name: 'Bilag' },
  { id: 13, name: 'Favorit' }
];
export const PreSelectedSearchTableColumns: SearchTableColumn[] = [
  { id: 1, name: 'ID' },
  { id: 2, name: 'Titel' },
  { id: 3, name: 'Organisation' },
  { id: 4, name: 'Opdateret' },
  { id: 5, name: 'Fase' },
  { id: 13, name: 'Favorit' }
];
export const PreSelectedSearchTableColumnIds: number[] = [1, 2, 3, 4, 5, 13];
