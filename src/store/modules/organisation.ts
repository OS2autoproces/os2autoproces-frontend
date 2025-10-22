import { merge } from 'lodash';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { HTTP } from '@/services/http-service';
import { Inhabitants } from '@/models/inhabitants';
import { Employees } from '@/models/employees';
import { MunicipalityInfoResponse, responseToState, stateToRequest } from '@/services/municipality-info-converter';
import { ITSystem, Logo, Technology } from './commonInterfaces';
import { User } from './auth';

export interface LogoFile {
  fileName: string;
  file: File;
}

export interface OrganisationState {
  inhabitants: Inhabitants | null;
  employees: Employees | null;
  autoOtherContactEmail: string | null;
  localAdmin: User | null;
  technologies: Technology[];
  itSystems: ITSystem[];
  municipalityId: number | null;
  municipalityCvr: string | null;
  municipalityName: string | null;
  municipalityLogo: Logo | null;
  showUploadError: boolean;
  showUploadSuccess: boolean;
  showRemoveLogoError: boolean;
  showRemoveLogoSuccess: boolean;
  rapidEdit: boolean;
  generalInformationEdit: boolean;
  technologiesEdit: boolean;
  logoUrl: string | null;
}

@Module({ dynamic: true, store, name: 'organisation', namespaced: true })
export default class Organisation extends VuexModule implements OrganisationState {
  rapidEdit: boolean = true;
  generalInformationEdit: boolean = true;
  technologiesEdit: boolean = true;
  showUploadError: boolean = false;
  showUploadSuccess: boolean = false;
  showRemoveLogoError: boolean = false;
  showRemoveLogoSuccess: boolean = false;
  logoUrl: string | null = null;

  inhabitants: Inhabitants | null = null;
  employees: Employees | null = null;
  autoOtherContactEmail: string | null = null;
  localAdmin: User | null = null;
  technologies: Technology[] = [];
  itSystems: ITSystem[] = [];

  municipalityId: number | null = null;
  municipalityCvr: string | null = null;
  municipalityName: string | null = null;
  municipalityLogo: Logo | null = null;
  

  @Mutation
  UPDATE(partial: Partial<OrganisationState>) {
    merge(this, partial);
  }

  @Mutation
  ASSIGN(state: Partial<OrganisationState>) {
    Object.assign(this, state);
  }

  @Action
  update(payload: Partial<OrganisationState>) {
    this.UPDATE(payload);
  }

  @Action
  assign(payload: Partial<OrganisationState>) {
    this.ASSIGN(payload);
  }

  @Mutation
  ASSIGN_WITH_NO_CHANGE(state: Partial<OrganisationState>) {
    Object.assign(this, state);
  }

  /* only when page is loaded */
  @Action
  async loadMunicipalityDetails(cvr: string | null) {
    if (!cvr) {
      return;
    }
    
    const response = await HTTP.get<MunicipalityInfoResponse>(`api/municipalities/search/byCvr?cvr=${cvr}&projection=full`);
    const municipality = responseToState(response.data);

    this.ASSIGN_WITH_NO_CHANGE(municipality);
  
    return process;
  }

  @Action
  async save(validationKeys?: Array<keyof OrganisationState>): Promise<boolean> {
      const converted = stateToRequest(this);
      const response = await HTTP.patch<MunicipalityInfoResponse>(`api/municipalities/${this.municipalityId}`, converted);

      if (response.status !== 200) {
        throw new Error();
      }

      return true;
  }

  @Action
  async uploadLogo(file: LogoFile) {
    const form = new FormData();
    form.append("file", file.file);

    const response = await HTTP.post<Logo>(`/api/logo/${this.municipalityCvr}`, form);
    if (response.status !== 200) {
      this.ASSIGN({ showUploadError: true });
      throw new Error();
    }

    const municipalityLogo = response.data;

    this.ASSIGN({ municipalityLogo });
    this.ASSIGN({ showUploadSuccess: true });
  }

  @Action
  async removeLogo() {

    const response = await HTTP.delete<Logo>(`/api/logo/${this.municipalityCvr}`);
    if (response.status !== 200) {
      this.ASSIGN({ showRemoveLogoError: true });
      throw new Error();
    }

    this.ASSIGN({ municipalityLogo: null });
    this.ASSIGN({ showRemoveLogoSuccess: true });
  }

  @Action
  addTechnology(technology: Technology) {
    if (this.technologies) {
      if (!this.technologies?.some(t => t.name === technology.name)) {
        this.ASSIGN({ technologies: [...this.technologies, technology] });
      }
    } else {
      this.ASSIGN({ technologies: [technology] });
    }
  }

  @Action
  removeTechnology(index: number) {
    if (this.technologies) {
      this.ASSIGN({ technologies: this.technologies.filter((_, i) => i !== index) });
    }
  }

  @Action
  addITSystems(itSystem: ITSystem) {
    if (this.itSystems) {
      if (!this.itSystems?.some(i => i.name === itSystem.name)) {
        this.ASSIGN({ itSystems: [...this.itSystems, itSystem] });
      }
    } else {
      this.ASSIGN({ itSystems: [itSystem] });
    }
  }

  @Action
  removeITSystems(index: number) {
    if (this.itSystems) {
      this.ASSIGN({ itSystems: this.itSystems.filter((_, i) => i !== index) });
    }
  }
}
export const OrganisationModule = getModule(Organisation);
