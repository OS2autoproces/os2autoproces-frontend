<template>
    <div class="page">
        <NavBar />

        <div class="wrapper">
            <router-link to="/search" class="search-page-link">
                <ArrowLeftIcon /> Tilbage til søgning
            </router-link>

            <div class="phase-selector">
                <h1>Hvad ønsker du at indberette?</h1>
                <ArrowDownIcon />

                <div class="phases">
                    <router-link to="/details/new/1">Idé</router-link>
                    <router-link to="/details/new/2">Foranalyse</router-link>
                    <router-link to="/details/new/3">Specifikation</router-link>
                    <router-link to="/details/new/4">Udvikling</router-link>
                    <router-link to="/details/new/5">Implementering</router-link>
                    <router-link to="/details/new/6">Drift</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ArrowDownIcon from '../components/icons/ArrowDownIcon.vue';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon.vue';
import NavBar from '../components/common/NavBar.vue';

@Component({
  components: {
    ArrowDownIcon,
    ArrowLeftIcon,
    NavBar
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.search-page-link {
  @include heading;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  margin: $size-unit 0;

  svg {
    height: $size-unit;
    width: $size-unit;
    margin-right: $size-unit / 2;
  }
}

.phase-selector {
  text-align: center;

  h1 {
    color: $color-secondary;
  }

  svg {
    height: 2 * $size-unit;
    width: 2 * $size-unit;
    margin: $size-unit 0;
  }

  .phases {
    border: 1px solid $color-primary;
    border-radius: $size-unit;
    padding: $size-unit / 2 $size-unit;
    margin: 0 auto;
    width: 150px;
    text-align: left;

    > * {
      display: block;
      padding: $size-unit / 2 0;
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
