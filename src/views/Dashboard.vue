<template>
  <div class="page">
    <NavBar />
    <Button class="clearBtn action elevation-3" @click="clearFilters()">Ryd filtre</Button>

    <div class="wrapper">
      <div class="chart-container">
        <canvas ref="lineChartCanvas"></canvas>
      </div>
      <div class="chart-container">
        <canvas ref="phaseBarChartCanvas"></canvas>
        <div class="radio-buttons">
          <label>
            <input
              type="radio"
              value="all"
              v-model="selectedPhaseBarChartData"
              @change="handlePhaseBarChartRadioButtonChange"
            />
            Alle
          </label>
          <label>
            <input
              type="radio"
              value="own"
              v-model="selectedPhaseBarChartData"
              @change="handlePhaseBarChartRadioButtonChange"
            />
            Egen organisation
          </label>
        </div>
      </div>
      <div class="chart-container">
        <canvas ref="systemPieChartCanvas"></canvas>
        <div class="radio-buttons">
          <label>
            <input
              type="radio"
              value="all"
              v-model="selectedSystemPieChartData"
              @change="handleSystemPieChartRadioButtonChange"
            />
            Alle
          </label>
          <label>
            <input
              type="radio"
              value="own"
              v-model="selectedSystemPieChartData"
              @change="handleSystemPieChartRadioButtonChange"
            />
            Egen organisation
          </label>
        </div>
      </div>
      <div class="chart-container">
        <canvas ref="technologyPieChartCanvas"></canvas>
        <div class="radio-buttons">
          <label>
            <input
              type="radio"
              value="all"
              v-model="selectedTechnologyPieChartData"
              @change="handleTechnologyPieChartRadioButtonChange"
            />
            Alle
          </label>
          <label>
            <input
              type="radio"
              value="own"
              v-model="selectedTechnologyPieChartData"
              @change="handleTechnologyPieChartRadioButtonChange"
            />
            Egen organisation
          </label>
        </div>
      </div>
    </div>

    <div class="datatable-container">
      <table id="municipalityDatatable" class="display custom-datatable table">
        <thead>
          <tr>
            <th>Organisation</th>
            <th>Antal processer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in municipalityChartDTO" :key="item.municipalityName">
            <td>{{ item.municipalityName }}</td>
            <td>{{ item.processCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import NavBar from '@/components/common/NavBar.vue';
import { Chart, registerables, ChartData } from 'chart.js';
import { ChartModule } from '@/store/modules/chart';
import 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';

Chart.register(...registerables);

@Component({
  components: {
    NavBar
  }
})
export default class Dashboard extends Vue {
  lineChartInstance: any = null;
  phaseBarChartInstance: any = null;
  technologyPieChartInstance: any = null;
  systemPieChartInstance: any = null;

  selectedPhaseBarChartData = 'all';
  selectedTechnologyPieChartData = 'all';
  selectedSystemPieChartData = 'all';
  backgroundColors = [
    '#EE8A3C',
    '#3D5386',
    '#D9A577',
    '#5A7D9A',
    '#EAD2AC',
    '#729FAF',
    '#F4C95D',
    '#9BC1BC',
    '#ED6A5A',
    '#606C38'
  ];

  get phaseChartDTO() {
    return ChartModule.phaseChartDTO;
  }

  get technologyChartDTO() {
    return ChartModule.technologyChartDTO;
  }

  get systemChartDTO() {
    return ChartModule.systemChartDTO;
  }

  get municipalityChartDTO() {
    return ChartModule.municipalityChartDTO;
  }

  get historyChartDTO() {
    return ChartModule.historyChartDTO;
  }

  get phaseBarChartDataOwn() {
    const labels = this.phaseChartDTO?.ownLabels || [];
    const data = this.phaseChartDTO?.ownData || [];

    return {
      labels,
      datasets: [
        {
          label: 'Antal processer pr. fase',
          data,
          backgroundColor: '#ee8a3c',
          borderColor: '#ee8a3c',
          borderWidth: 1
        }
      ]
    } as ChartData<'bar'>;
  }

  get phaseBarChartDataAll() {
    const labels = this.phaseChartDTO?.totalLabels || [];
    const data = this.phaseChartDTO?.totalData || [];

    return {
      labels,
      datasets: [
        {
          label: 'Antal processer pr. fase',
          data,
          backgroundColor: '#3d5386',
          borderColor: '#3d5386',
          borderWidth: 1
        }
      ]
    } as ChartData<'bar'>;
  }

  get technologyPieChartDataOwn() {
    const labels = this.technologyChartDTO?.ownLabels || [];
    const data = this.technologyChartDTO?.ownData || [];

    return {
      labels,
      datasets: [
        {
          label: 'Anvendte teknologier',
          data,
          backgroundColor: this.backgroundColors,
          borderWidth: 1
        }
      ]
    };
  }

  get technologyPieChartDataAll() {
    const labels = this.technologyChartDTO?.totalLabels || [];
    const data = this.technologyChartDTO?.totalData || [];

    return {
      labels,
      datasets: [
        {
          label: 'Anvendte teknologier',
          data,
          backgroundColor: this.backgroundColors,
          borderWidth: 1
        }
      ]
    };
  }

  get systemPieChartDataOwn() {
    const labels = this.systemChartDTO?.ownLabels || [];
    const data = this.systemChartDTO?.ownData || [];

    return {
      labels,
      datasets: [
        {
          label: 'Anvendte IT-systemer',
          data,
          backgroundColor: this.backgroundColors,
          borderWidth: 1
        }
      ]
    };
  }

  get systemPieChartDataAll() {
    const labels = this.systemChartDTO?.totalLabels || [];
    const data = this.systemChartDTO?.totalData || [];

    return {
      labels,
      datasets: [
        {
          label: 'Anvendte IT-systemer',
          data,
          backgroundColor: this.backgroundColors,
          borderWidth: 1
        }
      ]
    };
  }

  get lineChartData() {
    const labels = this.historyChartDTO?.totalLabels || [];
    const dataTotal = this.historyChartDTO?.totalData || [];
    const dataOwn = this.historyChartDTO?.ownData || [];

    return {
      labels,
      datasets: [
        {
          label: 'I alt',
          data: dataTotal,
          fill: false,
          borderColor: '#3d5386',
          backgroundColor: '#3d5386'
        },
        {
          label: 'Egen organisation',
          data: dataOwn,
          fill: false,
          borderColor: '#ee8a3c',
          backgroundColor: '#ee8a3c'
        }
      ]
    };
  }

  async mounted() {
    this.loadPhaseChartDTO();
    this.loadTechnologyChartDTO();
    this.loadMunicipalityChartDTO();
    this.loadHistoryChartDTO();
    this.loadSystemChartDTO();
  }

  async loadPhaseChartDTO() {
    await ChartModule.loadPhaseChartDTO();
    this.renderPhaseBarChart();
  }

  async loadTechnologyChartDTO() {
    await ChartModule.loadTechnologyChartDTO();
    this.renderTechnologyPieChart();
  }

  async loadMunicipalityChartDTO() {
    await ChartModule.loadMunicipalityChartDTO();
    this.renderDataTable();
  }

  async loadHistoryChartDTO() {
    await ChartModule.loadHistoryChartDTO();
    this.renderLineChart();
  }

  async loadSystemChartDTO() {
    await ChartModule.loadSystemChartDTO();
    this.renderSystemPieChart();
  }

  renderDataTable() {
    const dataTable = $('#municipalityDatatable').DataTable({
      destroy: true,
      paging: false,
      order: [[1, 'desc']],
      language: {
        search: 'Søg',
        lengthMenu: '',
        info: 'Viser _START_ til _END_ af _TOTAL_ rækker',
        zeroRecords: 'Ingen data...',
        infoEmpty: '',
        infoFiltered: '(ud af _MAX_ rækker)'
      }
    });
  }

  renderLineChart() {
    // wait for canvas to be rendered
    this.$nextTick(() => {
      const canvas = this.$refs.lineChartCanvas as HTMLCanvasElement | null;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          this.lineChartInstance = new Chart(ctx, {
            type: 'line',
            data: this.lineChartData,
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Udvikling i antal processer',
                  font: {
                    size: 16
                  }
                }
              }
            }
          });
        }
      }
    });
  }

  renderPhaseBarChart() {
    // wait for canvas to be rendered
    this.$nextTick(() => {
      const canvas = this.$refs.phaseBarChartCanvas as HTMLCanvasElement | null;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          this.phaseBarChartInstance = new Chart(ctx, {
            type: 'bar',
            data: this.phaseBarChartDataAll,
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Antal processer pr. fase',
                  font: {
                    size: 16
                  }
                }
              }
            }
          });
        }
      }
    });
  }

  renderTechnologyPieChart() {
    // wait for canvas to be rendered
    this.$nextTick(() => {
      const canvas = this.$refs.technologyPieChartCanvas as HTMLCanvasElement | null;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          this.technologyPieChartInstance = new Chart(ctx, {
            type: 'pie',
            data: this.technologyPieChartDataAll,
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Top-10 anvendte teknologier',
                  font: {
                    size: 16
                  }
                }
              }
            }
          });
        }
      }
    });
  }

  renderSystemPieChart() {
    // wait for canvas to be rendered
    this.$nextTick(() => {
      const canvas = this.$refs.systemPieChartCanvas as HTMLCanvasElement | null;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          this.systemPieChartInstance = new Chart(ctx, {
            type: 'pie',
            data: this.systemPieChartDataAll,
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Top-10 anvendte systemer',
                  font: {
                    size: 16
                  }
                }
              }
            }
          });
        }
      }
    });
  }

  handlePhaseBarChartRadioButtonChange() {
    if (this.selectedPhaseBarChartData === 'all') {
      this.phaseBarChartInstance.data = this.phaseBarChartDataAll;
    } else if (this.selectedPhaseBarChartData === 'own') {
      this.phaseBarChartInstance.data = this.phaseBarChartDataOwn;
    }
    this.phaseBarChartInstance.update();
  }

  handleTechnologyPieChartRadioButtonChange() {
    if (this.selectedTechnologyPieChartData === 'all') {
      this.technologyPieChartInstance.data = this.technologyPieChartDataAll;
    } else if (this.selectedTechnologyPieChartData === 'own') {
      this.technologyPieChartInstance.data = this.technologyPieChartDataOwn;
    }
    this.technologyPieChartInstance.update();
  }

  handleSystemPieChartRadioButtonChange() {
    if (this.selectedSystemPieChartData === 'all') {
      this.systemPieChartInstance.data = this.systemPieChartDataAll;
    } else if (this.selectedSystemPieChartData === 'own') {
      this.systemPieChartInstance.data = this.systemPieChartDataOwn;
    }
    this.systemPieChartInstance.update();
  }

  async clearFilters() {
    location.reload();
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.page {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 20px;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 50%;
  margin: 0 auto;
}

.chart-container {
  width: 100%;
}

.radio-buttons {
  margin-top: 10px;
  text-align: center;
}

.radio-buttons label {
  margin-right: 10px;
}

.clearBtn {
  width: 50%;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #3d5386;
  border-radius: 0.5rem;
  min-width: 100px;
  color: #ee8a3c;
}

.datatable-container {
  margin-top: 40px !important;
  width: 60%;
  margin: 0 auto;
}

/* datatable */
.custom-datatable th {
  color: $color-secondary;
}
</style>
