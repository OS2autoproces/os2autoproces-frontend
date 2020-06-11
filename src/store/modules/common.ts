import { merge, debounce } from 'lodash';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { User } from '@/store/modules/auth';
import { HTTP } from '@/services/http-service';
import {
  ITSystem,
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
  FormResponse
} from './commonInterfaces';

export interface CommonState {
  frontPage: string | null;
  itSystems: ITSystem[] | null;
  technologies: Technology[] | null;
  kles: Kle[] | null;
  forms: Form[] | null;
  orgUnits: OrgUnit[] | null;
  municipalities: Municipality[] | null;
  users: User[] | null;
}
@Module({ dynamic: true, store, name: 'common', namespaced: true })
export default class Common extends VuexModule implements CommonState {
  frontPage: string | null = null;
  itSystems: ITSystem[] | null = null;
  technologies: Technology[] | null = null;
  kles: Kle[] | null = null;
  forms: Form[] | null = null;
  orgUnits: OrgUnit[] | null = null;
  municipalities: Municipality[] | null = null;
  users: User[] | null = null;

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
    console.log('Added new tech: ' + response.name);
  }

  @Action
  async editTechnology(id: number, name: string) {
    return await HTTP.put(`api/technologies/${id}`, { name });
  }

  @Action
  async removeTechnology(id: number) {
    await HTTP.delete(`api/technologies/${id}`);
    this.UPDATE({ technologies: this.technologies?.filter(t => t.id !== id) });
  }

  @Action
  async loadITSystems() {
    const itSystems = (await HTTP.get<ItSystemsResponse>(`api/itSystems?size=100000`))?.data._embedded.itSystems;
    this.UPDATE({ itSystems });
  }

  @Action
  async loadMunicipalities() {
    const municipalities = (await HTTP.get<MunicipalitiesResponse>(`public/municipalities`))?.data.data;
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
  searchUsers(cvr: string, name: string) {
    debounce(async () => {
      const users = (await HTTP.get<UserResponse>(`api/users?name=${name}&cvr=${cvr}`))?.data._embedded.users;
      this.UPDATE({ users });
    }, 250);
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
