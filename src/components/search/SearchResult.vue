<template>
  <div class="result">
    <div class="result-column">
      <div class="name">{{process.title}}</div>
      <div class="resume">{{process.shortDescription}}</div>
    </div>
    <div class="result-column potential">
      <div v-if="isChildProcess">
        <div class="field">Vurderet potentiale:</div>
        <div class="value">
          <Rating class="rating" :value="process.rating" disabled/>
        </div>
      </div>
      <div v-if="isChildProcess">
        <div class="field">Kommune:</div>
        <div class="value">{{process.municipalityName}}</div>
      </div>
      <div>
        <div class="field">Unik ID:</div>
        <div class="value">{{process.id}}</div>
      </div>
    </div>
    <div class="result-column domain">
      <div>
        <div class="field">Fagområder:</div>
        <div class="value">{{domains}}</div>
      </div>
      <div>
        <div class="field">KLE-nr:</div>
        <div class="value">{{process.kle}}</div>
      </div>
      <div>
        <div class="field">Lovparagraf:</div>
        <div class="value">{{process.legalClause}}</div>
      </div>
    </div>
    <div class="result-column phase" v-if="!noPhase && isChildProcess">
      <div class="field">Fase:</div>
      <div class="value">
        <Phases :value="process.phase" disabled/>
      </div>
      <div>
        <div class="field">Status:</div>
        <div class="value">{{StatusLabels[process.status]}}</div>
      </div>
    </div>
    <div class="result-column umbrella" v-if="!isChildProcess">
      <div>
        <div class="field">Antal tilknyttede processer:</div>
        <div class="value">{{process.childrenCount}}</div>
      </div>
    </div>
    <div v-on:click.stop.prevent="setProcessBookmark()">
      <star-icon class="star-icon" :class="{ selected: processBookmarked }"/>
    </div>
    <umbrella-icon v-if="isParentProcess" class="umbrella-icon"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import StarIcon from '../icons/StarIcon.vue';
import UmbrellaIcon from '../icons/UmbrellaIcon.vue';
import Rating from '../common/inputs/Rating.vue';
import Phases from '../common/inputs/Phases.vue';
import { SearchResultProcess } from '../../store/modules/search/state';
import { StatusLabels } from '../../models/status';
import { DomainLabels } from '../../models/domain';
import { processActionTypes } from '@/store/modules/process/actions';
import { TypeKeys } from '@/models/types';

@Component({
  components: {
    StarIcon,
    UmbrellaIcon,
    Rating,
    Phases
  }
})
export default class SearchResult extends Vue {
  @Prop(Object)
  process!: SearchResultProcess;
  @Prop(Boolean)
  bookmarked!: boolean;
  @Prop(Boolean)
  noPhase!: boolean;

  processBookmarked = this.process.hasBookmarked;

  @Action(processActionTypes.SET_BOOKMARK_FROM_SEARCH)
  setBookmark!: (bookmarkSearch: { id: number; hasBookmarked: boolean }) => Promise<boolean>;

  StatusLabels = StatusLabels;

  get isChildProcess() {
    return this.process.type === TypeKeys.CHILD;
  }

  get domains() {
    return this.process.domains.map(domain => DomainLabels[domain]).join(', ');
  }

  async setProcessBookmark() {
    // TODO not the way to do flow - action results should not be use for mutations directly in view. Actions should affect changes in state
    const res = await this.setBookmark({ id: this.process.id, hasBookmarked: !this.processBookmarked });
    this.processBookmarked = res ? !this.processBookmarked : this.processBookmarked;
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

$resume-line-height: 1em * 1.5;

.resume {
  overflow: hidden;
  line-height: $resume-line-height;
  max-height: $resume-line-height * 4;
}

.result {
  border: 2px solid $color-secondary;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  position: relative;
}

.name {
  @include heading;
  font-size: 1.5rem;
  color: $color-secondary;
}

.star-icon {
  position: absolute;
  top: -1rem;
  right: -1rem;
  height: 2.5rem;
  width: 2.5rem;
}

.umbrella-icon {
  position: absolute;
  top: -1rem;
  left: -1.15rem;
  height: 2.5rem;
  width: 2.5rem;
}

.rating /deep/ svg {
  height: 16px;
  width: 16px;
}

.result-column {
  flex: 0 0 25%;

  /*
      IE11 fix
      https://github.com/philipwalton/flexbugs/issues/3#issuecomment-69036362
  */
  max-width: 25%;

  &:not(:last-of-type) {
    padding-right: 1rem;
  }
}

.domain,
.phase,
.potential,
.umbrella {
  > div {
    display: flex;

    &:not(:last-of-type) {
      padding-bottom: 1rem;
    }

    .field {
      flex-shrink: 0;
      flex-grow: 0;
      padding-right: 1rem;
    }

    .value {
      font-weight: bold;
      padding-right: 1rem;
    }
  }
}

.domain .field {
  flex-basis: 120px;
}

.potential .field {
  flex-basis: 140px;
}

.phase .field {
  flex-basis: 100px;
}
</style>
