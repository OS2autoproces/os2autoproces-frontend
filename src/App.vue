<template>
  <div id="app">
    <v-app>
      <div class="router-view">
        <router-view />
      </div>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { HTTP } from '@/services/http-service';
import { AxiosResponse } from 'axios';
import { Action } from 'vuex-class';
import { AuthModule } from './store/modules/auth';

@Component({})
export default class App extends Vue {
  mounted() {
    AuthModule.loadUser();
  }
}
</script>

<style lang="scss">
@import './styles/variables';

@keyframes blink {
  0% {
    color: $color-primary;
  }
  80% {
    color: rgba($color-primary, 0.3);
  }
  100% {
    color: $color-primary;
  }
}

html {
  font-size: 16px;
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
  color: $color-text;

  @media (max-width: 1400px) {
    font-size: 12px;
  }
}

body {
  min-height: 100vh;
}

.flex-grow {
  flex-grow: 1;
}

.menu__content--autocomplete.menuable__content__active {
  transform: translateY(24px);
}

#app {
  .v-application.theme--light {
    background: $color-background;
    color: inherit;
  }

  .v-application--wrap {
    .router-view {
      flex-grow: 1;
      display: flex;

      > * {
        flex-grow: 1;
      }
    }
  }

  button {
    @include heading;
  }

  input,
  textarea,
  button {
    outline: none;
  }
}
</style>
