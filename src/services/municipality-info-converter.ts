import { ITSystem, Logo, Technology } from '@/store/modules/commonInterfaces';
import { Inhabitants } from '@/models/inhabitants';
import { Employees } from '@/models/employees';
import { OrganisationState } from '@/store/modules/organisation';
import { User } from '@/store/modules/auth';

export interface MunicipalityInfoRequest {
  id: number
  inhabitants: Inhabitants | null;
  employees: Employees | null;
  autoOtherContactEmail: string | null;
  localAdmin: string | null;
  technologies: string[] | null;
  itSystems: string[] | null;
}

export interface MunicipalityInfoResponse {
  id: number;
  cvr: string;
  name: string;
  inhabitants: Inhabitants | null;
  employees: Employees | null;
  logo: Logo | null;
  autoOtherContactEmail: string | null;
  localAdmin: User | null;
  technologies: Technology[];
  itSystems: ITSystem[];
}

function defaultNull(prop: any): any {
  return prop || null;
}

function relation(name: string, entity: { id: number | string } | null | undefined): string {
  return !!entity ? `${window.autoProcessConfiguration.apiUrl}/api/${name}/${entity.id}` : '';
}

function relationArray<T extends { id: number | string } | null | undefined>(
  name: string,
  array: T[] | null | undefined
): string[] {
  return array?.map(entity => relation(name, entity)) ?? [];
}

function stateToRequestFields(state: OrganisationState): MunicipalityInfoRequest {
  return {
    id: state.municipalityId? state.municipalityId : 0,
    inhabitants: defaultNull(state.inhabitants),
    employees: defaultNull(state.employees),
    autoOtherContactEmail: defaultNull(state.autoOtherContactEmail),
    localAdmin: relation('users', state.localAdmin),
    technologies: relationArray('technologies', state.technologies),
    itSystems: relationArray('itSystems', state.itSystems)
  };
}

export function stateToRequest(state: OrganisationState): Partial<MunicipalityInfoRequest> {
  const request = stateToRequestFields(state);
  return request;
}

export function responseToState(municipality: MunicipalityInfoResponse): OrganisationState {
  return {
    municipalityId: municipality.id,
    municipalityCvr: municipality.cvr,
    municipalityName: municipality.name,
    inhabitants: municipality.inhabitants,
    employees: municipality.employees,
    autoOtherContactEmail: municipality.autoOtherContactEmail,
    localAdmin: municipality.localAdmin,
    technologies: municipality.technologies,
    itSystems: municipality.itSystems,
    municipalityLogo: municipality.logo,
    generalInformationEdit: true,
    technologiesEdit: true,
    showUploadError: false,
    showUploadSuccess: false,
    logoUrl: null
  };
}
