import { User } from '@/store/modules/auth';
import { CommonState } from './common';
export interface Cms {
  label: keyof CommonState;
  content: string;
}
export interface Kle {
  code: string;
  name: string;
}
export interface Form {
  code: string;
  description: string;
}
export interface ITSystem {
  id: number;
  name: string;
  vendor: string | null;
}
export interface OrgUnit {
  id: number;
  uuid: string;
  name: string;
  active: boolean;
  cvr: string;
}
export interface Municipality {
  name: string;
  cvr: string;
}
export interface Technology {
  id: number;
  name: string;
}
export interface TechnologiesResponse {
  _embedded: {
    technologies: Technology[];
  };
  _links: {
    next: {
      href: string;
    };
  };
  page: {
    size: number;
    totalPages: number;
  };
}
export interface ItSystemsResponse {
  _embedded: {
    itSystems: ITSystem[];
  };
  _links: {
    next: {
      href: string;
    };
  };
  page: {
    size: number;
    totalPages: number;
  };
}
export interface MunicipalitiesResponse {
  data: Municipality[];
}
export interface FormResponse {
  _embedded: {
    forms: Form[];
  };
}
export interface KleResponse {
  _embedded: {
    kles: Kle[];
  };
  _links: {
    next: {
      href: string;
    };
  };
  page: {
    size: number;
    totalPages: number;
  };
}
export interface OrgUnitsResponse {
  _embedded: {
    orgUnits: OrgUnit[];
  };
}
export interface UserResponse {
  _embedded: {
    users: User[];
  };
}
export interface UserSearchRequest {
  cvr: string;
  name: string;
}
