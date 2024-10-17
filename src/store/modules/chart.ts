import { merge } from 'lodash';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { HTTP } from '@/services/http-service';

export interface OrganisationChartDTO {
  totalLabels: string[];
  totalData: number[];
  ownLabels: string[];
  ownData: number[];
}

export interface MunicipalityProcessCountChartDTO {
  cvr: string
  municipalityName: string;
  processCount: number;
}

export interface ProcessSeenByChartDTO {
  processId: number;
  title: string
  count: number;
  sortOrder: number
}

export interface ChartState {
  phaseChartDTO: OrganisationChartDTO | null;
  technologyChartDTO: OrganisationChartDTO | null;
  municipalityChartDTO: MunicipalityProcessCountChartDTO[] | null;
  historyChartDTO: OrganisationChartDTO | null;
  systemChartDTO: OrganisationChartDTO | null;
  seenByChartDTO: ProcessSeenByChartDTO[] | null
}

@Module({ dynamic: true, store, name: 'chart', namespaced: true })
export default class Chart extends VuexModule implements ChartState {
  phaseChartDTO: OrganisationChartDTO | null = null;
  technologyChartDTO: OrganisationChartDTO | null = null;
  municipalityChartDTO: MunicipalityProcessCountChartDTO[] | null = null;
  historyChartDTO: OrganisationChartDTO | null = null;
  systemChartDTO: OrganisationChartDTO | null = null;
  seenByChartDTO: ProcessSeenByChartDTO[] | null = null;

  @Mutation
  UPDATE(partial: Partial<ChartState>) {
    merge(this, partial);
  }

  @Action
  async loadPhaseChartDTO() {
    const phaseChartDTO = (await HTTP.get<OrganisationChartDTO>('api/charts/phase'))?.data;
    this.UPDATE({ phaseChartDTO });
  }

  @Action
  async loadTechnologyChartDTO() {
    const technologyChartDTO = (await HTTP.get<OrganisationChartDTO>('api/charts/technology'))?.data;
    this.UPDATE({ technologyChartDTO });
  }

  @Action
  async loadSystemChartDTO() {
    const systemChartDTO = (await HTTP.get<OrganisationChartDTO>('api/charts/system'))?.data;
    this.UPDATE({ systemChartDTO });
  }

  @Action
  async loadMunicipalityChartDTO() {
    const municipalityChartDTO = (await HTTP.get<MunicipalityProcessCountChartDTO[]>('api/charts/organisation'))?.data;
    this.UPDATE({ municipalityChartDTO });
  }

  @Action
  async loadHistoryChartDTO() {
    const historyChartDTO = (await HTTP.get<OrganisationChartDTO>('api/charts/history'))?.data;
    this.UPDATE({ historyChartDTO });
  }

  @Action
  async loadSeenByChartDTO() {
    const seenByChartDTO = (await HTTP.get<ProcessSeenByChartDTO[]>('api/charts/seenby'))?.data;
    this.UPDATE({ seenByChartDTO });
  }
}
export const ChartModule = getModule(Chart);
