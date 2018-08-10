<template>
  <div class="result">
    <div class="result-column">
      <div class="name">{{process.title}}</div>
      <div class="resume">{{process.shortDescription}}</div>
    </div>
    <div class="result-column potential">
      <div>
        <div class="field">Kommune:</div>
        <div class="value">{{process.municipalityName}}</div>
      </div>
      <div>
        <div class="field">Fagområder:</div>
        <div class="value">{{domains}}</div>
      </div>
    </div>
    <div class="result-column domain">
      <div>
        <div class="field">Fase:</div>
        <div class="value">{{PhaseLabels[process.phase]}}</div>
      </div>
      <div>
        <div class="field">Status:</div>
        <div class="value">{{StatusLabels[process.status]}}</div>
      </div>
      <div>
        <div class="field">KLE-nr:</div>
        <div class="value">{{process.kle}}</div>
      </div>
      <div>
        <div class="field">Unik ID:</div>
        <div class="value">{{process.id}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import StarIcon from '../icons/StarIcon.vue';
import Rating from '../common/inputs/Rating.vue';
import Phases from '../common/inputs/Phases.vue';
import { SearchResultProcess } from '../../store/modules/search/state';
import { StatusLabels } from '../../models/status';
import { PhaseLabels } from '../../models/phase';
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
  @Prop(Boolean) noPhase!: boolean;

  StatusLabels = StatusLabels;
  PhaseLabels = PhaseLabels;

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

.rating /deep/ svg {
  height: 16px;
  width: 16px;
}

.status {
  text-align: center;
  font-weight: bold;
}

.result-column {
  &:nth-child(1) {
    flex: 1 1 30%;
    max-width: 30%;
  }

  &:nth-child(2) {
    flex: 1 1 45%;
    max-width: 45%;
  }

  &:nth-child(3) {
    flex: 1 1 25%;
    max-width: 25%;
  }

  &:not(:last-of-type) {
    padding-right: 1rem;
  }
}

.domain,
.potential {
  > div {
    display: flex;

    &:not(:last-of-type) {
      padding-bottom: 1rem;
    }

    .field {
      flex-shrink: 0;
      flex-grow: 0;
    }

    .value {
      font-weight: bold;
      padding-right: 1rem;
    }
  }
}

.domain .field {
  flex-basis: 70px;
}

.potential .field {
  flex-basis: 110px;
}
</style>
