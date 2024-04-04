<template>
  <tbody>
    <tr>
      <td
        v-if="state.selectedColumnIds.includes(1)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ process.id }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(2)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ process.title }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(3)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        <span v-if="isChildProcess">{{ process.municipalityName }}</span>
      </td>
      <td
        v-if="state.selectedColumnIds.includes(4)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ lastChanged }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(5)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        <span v-if="isChildProcess">{{ PhaseLabels[process.phase] }}</span>
      </td>
      <td
        v-if="state.selectedColumnIds.includes(6)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ process.shortDescription }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(7)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ StatusLabels[process.status] }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(8)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ domains }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(9)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ timeSpendHours }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(10)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ technologies }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(11)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ RunPeriodLabels[process.runPeriod] }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(12)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        {{ hasAttachments }}
      </td>
      <td
        v-if="state.selectedColumnIds.includes(13)"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
      >
        <div v-on:click.stop.prevent="setProcessBookmark()">
          <star-icon class="star-icon" style="height: 20px;" :class="{ selected: processBookmarked }" />
        </div>
      </td>
    </tr>
    <tr v-if="process.searchMatch != null">
      <td
        colspan="13"
        v-on:click.stop.prevent="toDetails(process.id, process.searchWord)"
        class="clickable"
        v-html="process.searchMatch"
      ></td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import StarIcon from '../icons/StarIcon.vue';
import UmbrellaIcon from '../icons/UmbrellaIcon.vue';
import { SearchResultProcess } from '@/store/modules/searchInterfaces';
import { StatusLabels } from '@/models/status';
import { RunPeriodLabels } from '@/models/runperiod';
import { DomainLabels } from '@/models/domain';
import { TypeKeys } from '@/models/types';
import { ProcessModule } from '@/store/modules/process';
import { PhaseLabels } from '@/models/phase';
import moment from 'moment';
import { SearchModule } from '@/store/modules/search';

@Component({
  components: {
    StarIcon,
    UmbrellaIcon
  }
})
export default class SearchResultRow extends Vue {
  @Prop(Object)
  process!: SearchResultProcess;
  @Prop(Boolean)
  bookmarked!: boolean;

  get state() {
    return SearchModule;
  }

  processBookmarked = this.process.hasBookmarked;
  StatusLabels = StatusLabels;
  RunPeriodLabels = RunPeriodLabels;
  PhaseLabels = PhaseLabels;

  get isChildProcess() {
    return this.process.type === TypeKeys.CHILD;
  }

  get domains() {
    return this.process.domains.map(domain => DomainLabels[domain]).join(', ');
  }

  get technologies() {
    return this.process.technologies.map(technology => technology.name).join(', ');
  }

  get timeSpendHours() {
    const total = this.process.timeSpendOccurancesPerEmployee * this.process.timeSpendPerOccurance;
    const hours = (total / 60) * (this.process.timeSpendPercentageDigital / 100);
    const result = hours.toLocaleString('da-DK', { minimumFractionDigits: 2 }) || '0';
    return result;
  }

  get hasAttachments() {
    return this.process.hasAttachments ? 'Ja' : 'Nej';
  }

  get lastChanged() {
    return moment(this.process.lastChanged).format('DD-MM-YYYY');
  }

  async setProcessBookmark() {
    const res = await ProcessModule.setBookmarkFromSearch({
      id: this.process.id,
      hasBookmarked: !this.processBookmarked
    });
    this.processBookmarked = res ? !this.processBookmarked : this.processBookmarked;
  }

  toDetails(id: number, searchWord: string | null) {
    if (searchWord == null) {
      this.$router.push('/details/' + id);
    } else {
      this.$router.push('/details/' + id + '?search=' + searchWord);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

/* table styling */
td {
  padding: 0.5rem;
}

/* bookmark column */
td:nth-child(13) {
  width: 50px;
  text-align: center;
}

/* id column */
td:nth-child(1) {
  width: 50px;
}

.clickable {
  cursor: pointer;
}
</style>
