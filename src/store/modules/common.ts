import { merge, debounce, inRange } from 'lodash';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { User } from '@/store/modules/auth';
import { HTTP } from '@/services/http-service';
import {
  ITSystem,
  ITSystemRequest,
  Technology,
  Kle,
  Form,
  OrgUnit,
  Municipality,
  Cms,
  TechnologiesResponse,
  ItSystemsResponse,
  MunicipalitiesResponse,
  KleResponse,
  OrgUnitsResponse,
  UserSearchRequest,
  UserResponse,
  FormResponse,
  Service
} from './commonInterfaces';

export interface CommonState {
  frontPage: string | null;
  itSystems: ITSystem[] | null;
  technologies: Technology[] | null;
  services: Service[] | null;
  kles: Kle[] | null;
  forms: Form[] | null;
  orgUnits: OrgUnit[] | null;
  municipalities: Municipality[] | null;
  users: User[] | null;
  page: number | null;
}

const debouncedSearch = debounce(async (request: UserSearchRequest) => {
  const users = (await HTTP.get<UserResponse>(`api/users?name=${request.name}&cvr=${request.cvr}`)).data._embedded
    .users;
  CommonModule.ASSIGN({ users });
}, 250);

@Module({ dynamic: true, store, name: 'common', namespaced: true })
export default class Common extends VuexModule implements CommonState {
  frontPage: string | null = null;
  itSystems: ITSystem[] | null = null;
  technologies: Technology[] | null = null;
  services: Service[] | null = null;
  kles: Kle[] | null = null;
  forms: Form[] | null = null;
  orgUnits: OrgUnit[] | null = null;
  municipalities: Municipality[] | null = null;
  users: User[] | null = null;
  page: number | null = null;

  @Mutation
  UPDATE(partial: Partial<CommonState>) {
    merge(this, partial);
  }

  @Mutation
  ASSIGN(partial: Partial<CommonState>) {
    Object.assign(this, partial);
  }

  @Action
  update(partial: Partial<CommonState>) {
    this.UPDATE(partial);
  }

  @Action
  async loadCmsContent(label: keyof CommonState) {
    const json = (await HTTP.get<Cms>(`public/cms/${label}`))?.data.content;

    const cms = !!json ? JSON.parse(json) : '';
    this.UPDATE({ [label]: cms });
  }

  @Action
  updatePage(page: number) {
    this.UPDATE({ page });
  }

  @Action
  async saveCmsContent(cms: Cms) {
    await HTTP.post(`api/cms/${cms.label}`, JSON.stringify(cms.content), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  @Action
  async loadTechnologies() {
    const technologies = (await HTTP.get<TechnologiesResponse>(`api/technologies?size=100000`))?.data._embedded
      .technologies;
    this.UPDATE({ technologies });
  }

  @Action
  async addTechnology(name: string) {
    const response = (await HTTP.post(`api/technologies`, { name })).data as Technology;
    if (!response) {
      return;
    }
    this.ASSIGN({ technologies: this.technologies ? [...this.technologies, response] : [response] });
  }

  @Action
  async editTechnology({ name, id }: Technology) {
    const response = (await HTTP.put(`api/technologies/${id}`, { name })).data as Technology;
    this.ASSIGN({
      technologies: this.technologies ? this.technologies.map(t => (t.id === id ? response : t)) : [response]
    });
    return response;
  }

  @Action
  async removeTechnology(id: number) {
    await HTTP.delete(`api/technologies/${id}`);
    this.ASSIGN({ technologies: this.technologies?.filter(t => t.id !== id) });
  }

  @Action
  async loadITSystems() {
    const itSystems = (await HTTP.get<ItSystemsResponse>(`api/itSystems?size=100000`))?.data._embedded.itSystems;
    this.UPDATE({ itSystems });
  }

  @Action
  async addITSystem(itSystemRequest: ITSystemRequest) {
    const response = (await HTTP.post(`api/managedItSystem/`, itSystemRequest)).data as ITSystem;
    if (!response) {
      return;
    }
    this.ASSIGN({ itSystems: this.itSystems ? [...this.itSystems, response] : [response] });
  }

  @Action
  async editITSystems(itsystem: ITSystem) {
    const itSystemRequest: ITSystemRequest = { name: itsystem.name, vendor: itsystem.vendor };

    const response = (await HTTP.put(`api/managedItSystem/${itsystem.id}`, itSystemRequest)).data as ITSystem;
    this.UPDATE({
      itSystems: this.itSystems ? this.itSystems.map(s => (s.id === itsystem.id ? response : s)) : [response]
    });
    return response;
  }

  @Action
  async removeITSystem(id: number) {
    await HTTP.delete(`api/managedItSystem/${id}`);
    this.ASSIGN({ itSystems: this.itSystems?.filter(s => s.id !== id) });
  }

  @Action
  async loadMunicipalities() {
    const response = await HTTP.get(`public/municipalities`);
    const municipalities = (response?.data as Municipality[])?.sort((m1: Municipality, m2: Municipality) =>
      m1.name.localeCompare(m2.name)
    );
    this.UPDATE({ municipalities });
  }

  @Action
  async loadKles() {
    const kles = (await HTTP.get<KleResponse>(`api/kles?size=100000`))?.data._embedded.kles;
    this.UPDATE({ kles });
  }

  @Action
  async loadOrgUnits(cvr?: string) {
    const params = ['size=100000'];

    if (cvr) {
      params.push(`cvr=${cvr}`);
    }

    const orgUnits = (await HTTP.get<OrgUnitsResponse>(`api/orgUnits?${params.join('&')}`))?.data._embedded.orgUnits;
    this.UPDATE({ orgUnits });
  }

  @Action
  searchUsers(request: UserSearchRequest) {
    debouncedSearch(request);
  }

  @Action
  async loadFormsByKle(kle: Kle) {
    this.UPDATE({ forms: [] });
    if (!kle) {
      return;
    }
    const forms = await (await HTTP.get<FormResponse>(`api/kles/${kle.code}/forms`))?.data._embedded.forms;
    this.UPDATE({ forms });
  }
}
export const CommonModule = getModule(Common);
