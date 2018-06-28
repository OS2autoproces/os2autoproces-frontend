<template>
  <div class="result">
    <div class="result-column">
      <div class="name">{{process.name}}</div>
      <div class="resume">{{process.resume}}</div>
    </div>
    <div class="result-column">
      <div>
        <div>Vurderet potentiale:</div>
        <div>Kommune:</div>
        <div>Unik ID:</div>
      </div>
      <div>
        <div class="rating">
          <Rating :value="process.potential" disabled />
        </div>
        <div>{{process.municipality}}</div>
        <div>{{process.id}}</div>
      </div>
    </div>
    <div class="result-column">
      <div>
        <div>Fagområde:</div>
        <div>KLE-nr:</div>
        <div>Lov og paragraf:</div>
      </div>
      <div>
        <div>{{process.field}}</div>
        <div>{{process.kleNumber}}</div>
        <div>{{process.law}}</div>
      </div>
    </div>
    <div class="result-column">
      <Phases :value="process.phase" small disabled />
      <div class="status">{{process.status}}</div>
    </div>
    <star-icon class="star-icon" :class="{ selected: process.bookmark }" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import StarIcon from '../icons/StarIcon.vue';
import Rating from '../common/inputs/Rating.vue';
import Phases from '../common/inputs/Phases.vue';
import { SearchResultProcess } from '../../store/modules/search/state';

@Component({
  components: {
    StarIcon,
    Rating,
    Phases
  }
})
export default class SearchResult extends Vue {
  @Prop() process!: SearchResultProcess;
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

  &:nth-child(2),
  &:nth-child(3) {
    display: flex;

    > div:last-of-type {
      padding-left: $size-unit;
      font-weight: bold;
    }

    > div > div:not(:last-of-type) {
      padding-bottom: $size-unit;
    }
  }
}

/*
    IE11 fix
    https://github.com/philipwalton/flexbugs/issues/3#issuecomment-69036362
*/
.result-column {
  max-width: 25%;
}
</style>
