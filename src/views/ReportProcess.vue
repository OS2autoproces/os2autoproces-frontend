<template>
  <div class="page">
    <NavBar />

    <div class="wrapper">
      <router-link to="/search" class="search-page-link">
        <ArrowLeftIcon />Tilbage til søgning
      </router-link>

      <div class="process-selector">
        <h1>Hvad ønsker du at indberette?</h1>

        <div class="report-options">
          <div class="process">
            <h2>Proces</h2>

            <div class="options">
              <router-link
                v-for="phase in phasesLevels"
                :key="phase.route"
                :to="`/details/new/${phase.route}`"
              >{{phase.label}}</router-link>
            </div>
          </div>

          <div class="umbrella">
            <h2>
              Paraplyproces
              <InfoTooltip>
                En paraplyproces er en overordnet proces, hvor det er muligt at samle lignede processer under.
                <!--no format-->
                Et eksempel er: Paraplyen Lægeerklæringer. Hvortil processerne Lægeerklæring Randers, Lægeerklæring Skanderborg og Lægeerklæringer Syddjurs er tilknyttet.Forskellen på en ’egen paraply’ og ’fælles paraply’ er synligheden. Fælles paraplyer kan ses på tværs af organisationer, mens ’egen paraply’ kun kan ses i egen organisation.
              </InfoTooltip>
            </h2>

            <div class="options">
              <router-link
                v-for="type in typeLevels"
                :key="type.route"
                :to="`/details/new/${type.route}`"
              >{{type.label}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ArrowDownIcon from '../components/icons/ArrowDownIcon.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon.vue';
import NavBar from '../components/common/NavBar.vue';
import { PhaseKeys, PhaseLabels } from '@/models/phase';
import { TypeKeys, TypeLabels } from '@/models/types';

@Component({
  components: {
    ArrowDownIcon,
    ArrowLeftIcon,
    InfoTooltip,
    NavBar
  }
})
export default class Home extends Vue {
  phasesLevels = [
    { route: PhaseKeys.IDEA, label: PhaseLabels.IDEA },
    { route: PhaseKeys.PREANALYSIS, label: PhaseLabels.PREANALYSIS },
    { route: PhaseKeys.SPECIFICATION, label: PhaseLabels.SPECIFICATION },
    { route: PhaseKeys.DEVELOPMENT, label: PhaseLabels.DEVELOPMENT },
    { route: PhaseKeys.IMPLEMENTATION, label: PhaseLabels.IMPLEMENTATION },
    { route: PhaseKeys.OPERATION, label: PhaseLabels.OPERATION }
  ];

  typeLevels = [
    { route: TypeKeys.PARENT, label: TypeLabels.PARENT },
    { route: TypeKeys.GLOBAL_PARENT, label: TypeLabels.GLOBAL_PARENT }
  ];
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.search-page-link {
  @include heading;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  margin: 1rem 0;

  svg {
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
  }
}

.report-options {
  display: flex;
  margin-top: 2rem;
  justify-content: center;

  h2 {
    margin-bottom: 1rem;
  }

  > * {
    width: 300px;
  }
}

.process-selector {
  text-align: center;

  h1,
  h2 {
    color: $color-secondary;
  }

  svg {
    height: 2rem;
    width: 2rem;
    margin: 1rem 0;
  }

  .options {
    border: 1px solid $color-primary;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    margin: 0 auto;
    width: 150px;
    text-align: left;

    > * {
      display: block;
      padding: 0.5rem 0;
      text-decoration: inherit;
      color: inherit;

      &:not(:last-of-type) {
        border-bottom: 1px solid $color-grey;
      }
    }
  }
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
