<template>
  <div class="page">
    <NavBar />

    <div class="wrapper">
      <router-link to="/search" class="search-page-link"> <ArrowLeftIcon />Tilbage til søgning </router-link>

      <div class="process-selector">
        <h1>Hvordan vil du starte din proces?</h1>
        <p>Vælg om du vil lave en hurtig deling med få oplysninger eller oprette en fuld proces, som kan styres gennem alle faser.
Du kan også knytte eksisterende processer til en paraply for at samle dem under et fælles tema.</p>

        <div class="report-options">
          <div class="process">
            <h2>Hurtig deling
              <InfoTooltip>
                Her deler du basisoplysninger om en proces med kolleger og andre offentlige organisationer. Du kan altid udbygge delingen eller styre processen gennem faserne ved at ændre fra ”Deling (ingen fase)” til en anden fase.
              </InfoTooltip>
            </h2>
            <p>Del de vigtigste oplysninger hurtigt. Du kan altid bygge videre senere.</p>

            <div class="options">
              <router-link  :to="`/details/new/RAPID`">Hurtig deling</router-link>
            </div>

          </div>
          <div class="process">
            <h2>Processtyring
              <InfoTooltip>Her kan du oprette og styre en fuld proces gennem alle faser – fra idé til drift. Når du skifter fase, får du vist spørgsmål, der er målrettet netop den fase, så processen bliver dokumenteret trin for trin.</InfoTooltip>
            </h2>
            <p>Opret en fuld proces og styr den gennem alle faser fra idé til drift.</p>

            <div class="options">
              <router-link v-for="phase in phasesLevels" :key="phase.route" :to="`/details/new/${phase.route}`">{{
                phase.label
              }}</router-link>
            </div>
          </div>

          <div class="umbrella">
            <h2>
              Paraplyproces
              <InfoTooltip>
                Find eksisterende processer og knyt dem til et tema. Så kan du samle relaterede processer under én paraply uden at ændre i dem.
En paraply kan være intern for egen organisation eller fælles på tværs, så andre kan se og bruge den.
              </InfoTooltip>
            </h2>
            <p>Saml eksisterende processer under et fælles tema. Vælg egen eller fælles paraply.</p>

            <div class="options">
              <router-link v-for="type in typeLevels" :key="type.route" :to="`/details/new/${type.route}`">{{
                type.label
              }}</router-link>
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
    { route: PhaseKeys.OPERATION, label: PhaseLabels.OPERATION },
    { route: PhaseKeys.DECOMMISSIONED, label: PhaseLabels.DECOMMISSIONED }
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
  color: $color-primary;
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
    color: $color-primary;
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
