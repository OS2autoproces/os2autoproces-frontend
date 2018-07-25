<template>
  <div class="result">
    <div class="result-column">
      <div class="name">{{process.title}}</div>
      <div class="resume">{{process.shortDescription}}</div>
    </div>
    <div class="result-column potential">
      <div>
        <div class="field">Vurderet potentiale:</div>
        <div class="value">
          <Rating class="rating" :value="process.rating" disabled/>
        </div>
      </div>
      <div>
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
        <div class="field">Lov og paragraf:</div>
        <div class="value">{{process.legalClause}}</div>
      </div>
    </div>
    <div class="result-column">
      <Phases :value="process.phase" small disabled />
      <div class="status">{{StatusLabels[process.status]}}</div>
    </div>
    <star-icon class="star-icon" :class="{ selected: process.hasBookmarked }" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import StarIcon from '../icons/StarIcon.vue';
import Rating from '../common/inputs/Rating.vue';
import Phases from '../common/inputs/Phases.vue';
import { SearchResultProcess } from '../../store/modules/search/state';
import { StatusLabels } from '../../models/status';
import { DomainLabels } from '../../models/domain';

@Component({
  components: {
    StarIcon,
    Rating,
    Phases
  }
})
export default class SearchResult extends Vue {
  @Prop(Object) process!: SearchResultProcess;
  @Prop(Boolean) bookmarked!: boolean;

  StatusLabels = StatusLabels;

  get domains() {
    return this.process.domains.map(domain => DomainLabels[domain]).join(', ');
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
  border-radius: $size-unit;
  padding: $size-unit;
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
  top: -$size-unit;
  right: -$size-unit;
  height: $size-unit * 2.5;
  width: $size-unit * 2.5;
}

.rating /deep/ svg {
  height: 16px;
  width: 16px;
}

.status {
  text-align: center;
  font-weight: bold;
}

.result-column {
  flex: 0 0 25%;

  &:not(:last-of-type) {
    padding-right: $size-unit;
  }
}

.domain,
.potential {
  > div {
    display: flex;

    &:not(:last-of-type) {
      padding-bottom: $size-unit;
    }

    .field {
      flex-shrink: 0;
      flex-grow: 0;
      padding-right: $size-unit;
    }

    .value {
      font-weight: bold;
      padding-right: $size-unit;
    }
  }
}

.domain .field {
  flex-basis: 120px;
}

.potential .field {
  flex-basis: 140px;
}

/*
      IE11 fix
      https://github.com/philipwalton/flexbugs/issues/3#issuecomment-69036362
  */
.result-column {
  max-width: 25%;
}
</style>
