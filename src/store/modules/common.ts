import { merge, debounce } from 'lodash';
import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { User } from '@/store/modules/auth';
import { HTTP } from '@/services/http-service';

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

export interface CommonState {
  frontPage?: string;
  itSystems?: ITSystem[];
  technologies?: Technology[];
  kles?: Kle[];
  forms?: Form[];
  orgUnits?: OrgUnit[];
  municipalities?: Municipality[];
  users?: User[];
}

//TODO: Move requests/responses to a service?
interface TechnologiesResponse {
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

interface ItSystemsResponse {
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
  
interface MunicipalitiesResponse {
    data: Municipality[];
  }

  interface FormResponse {
    _embedded: {
      forms: Form[];
    };
  }
  
  interface KleResponse {
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
  
  interface OrgUnitsResponse {
    _embedded: {
      orgUnits: OrgUnit[];
    };
  }
  
  interface UserResponse {
    _embedded: {
      users: User[];
    };
  }
  
  export interface UserSearchRequest {
    cvr: string;
    name: string;
  }
  
@Module({ dynamic: true, store, name: 'common' })
export default class Common implements CommonState {
  frontPage?: string;
  itSystems?: ITSystem[];
  technologies?: Technology[];
  kles?: Kle[];
  forms?: Form[];
  orgUnits?: OrgUnit[];
  municipalities?: Municipality[];
  users?: User[];

  @Mutation
  UPDATE(partial: Partial<CommonState>) {
    merge(this, partial);
  }

  @Action
  update(partial: Partial<CommonState>) {
    this.UPDATE(partial);
  }

  @Action
  async loadCmsContent(label: keyof CommonState) {
    const json = (await HTTP.get<Cms>(`public/cms/${label}`)).data.content;

    const cms = !!json ? JSON.parse(json) : '';
    this.UPDATE({ [label]: cms });
  }

  @Action
  async saveCmsContent({}, cms: Cms) {
    await HTTP.post(`api/cms/${cms.label}`, JSON.stringify(cms.content), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  @Action
  async loadTechnologies() {
    const technologies = (await HTTP.get<TechnologiesResponse>(`api/technologies?size=100000`)).data._embedded
      .technologies;
    this.UPDATE({ technologies });
  }

  @Action
  async addTechnology(name: string) {
    const response = await HTTP.post(`api/technologies`, { name });
    this.UPDATE({ technologies: this.technologies ? [...this.technologies, response.data] : [response.data] });
  }

  @Action
  async editTechnology(id: number, name: string) {
    return await HTTP.put(`api/technologies/${id}`, { name });
  }

  @Action
  async removeTechnology(id: number) {
      await HTTP.delete(`api/technologies/${id}`);
      this.UPDATE({technologies: this.technologies?.filter(t => t.id !== id)});
  }

  @Action
  async loadITSystems()
  {
      const itSystems = (await HTTP.get<ItSystemsResponse>(`api/itSystems?size=100000`)).data._embedded.itSystems;
      this.UPDATE({itSystems});
  }

  @Action
  async loadMunicipalities() {
    const municipalities = (await HTTP.get<MunicipalitiesResponse>(`public/municipalities`)).data.data
    this.UPDATE({municipalities});
  }

  @Action
  async loadKles() {
    const kles = (await HTTP.get<KleResponse>(`api/kles?size=100000`)).data._embedded.kles
    this.UPDATE({kles});
  }

  @Action
  async loadOrgUnits(cvr?: string) {
    const params = ['size=100000'];

    if (cvr) {
      params.push(`cvr=${cvr}`);
    }

    const orgUnits = (await HTTP.get<OrgUnitsResponse>(`api/orgUnits?${params.join('&')}`)).data._embedded.orgUnits;
    this.UPDATE({orgUnits})
  }

  @Action
  searchUsers(cvr: string, name: string ) {
      debounce(async ({ name, cvr }: UserSearchRequest) => {
        const users = (await HTTP.get<UserResponse>(`api/users?name=${name}&cvr=${cvr}`)).data._embedded.users;
        this.UPDATE({users})
        }, 250);
  }

  @Action
  async loadFormsByKle(kle: Kle) {
      this.UPDATE({forms:[]})
    if (!kle) {
      return;
    }
    const forms = await (await HTTP.get<FormResponse>(`api/kles/${kle.code}/forms`)).data._embedded.forms;
    this.UPDATE({forms});
  }
}