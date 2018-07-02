<template>
  <div class="result">
    <div class="result-column">
      <div class="name">{{process.title}}</div>
      <div class="resume">{{process.shortDescription}}</div>
    </div>
    <div class="result-column">
      <div>
        <div>Vurderet potentiale:</div>
        <div><Rating class="rating" :value="process.rating" disabled/></div>
      </div>
      <div>
        <div>Kommune:</div>
        <div>{{process.municipality}}</div>
      </div>
      <div>
        <div>Unik ID:</div>
        <div>{{process.id}}</div>
      </div>
    </div>
    <div class="result-column">
      <div>
        <div>Fagområde:</div>
        <div>{{DomainLabels[process.domain]}}</div>
      </div>
      <div>
        <div>KLE-nr:</div>
        <div>{{process.kle}}</div>
      </div>
      <div>
        <div>Lov og paragraf:</div>
        <div>{{process.legalClause}}</div>
      </div>
    </div>
    <div class="result-column">
      <Phases :value="process.phase" small disabled/>
      <div class="status">{{StatusLabels[process.status]}}</div>
    </div>
    <star-icon class="star-icon" :class="{ selected: process.bookmark }"/>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import StarIcon from '../icons/StarIcon.vue';
  import Rating from '../common/inputs/Rating.vue';
  import Phases from '../common/inputs/Phases.vue';
  import {SearchResultProcess} from '../../store/modules/search/state';
  import {StatusLabels} from "../../models/status";
  import {DomainLabels} from "../../models/domain";

  @Component({
    components: {
      StarIcon,
      Rating,
      Phases
    }
  })
  export default class SearchResult extends Vue {
    @Prop() process!: SearchResultProcess;

    StatusLabels = StatusLabels;
    DomainLabels = DomainLabels;
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

  .field {
    min-height: 1em;
  }

  .star-icon {
    position: absolute;
    top: -$size-unit;
    right: -$size-unit;
    height: $size-unit * 2.5;
    width: $size-unit * 2.5;
  }

  .rating {
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
      > div {
        display: flex;

        &:not(:last-of-type) {
          padding-bottom: $size-unit;
        }

        > div:first-of-type {
          flex: 0 0 140px;
          padding-right: $size-unit;
        }

        > div:last-of-type {
          font-weight: bold;
          padding-right: $size-unit;
        }
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
