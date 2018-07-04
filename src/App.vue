<template>
  <div id="app">
    <v-app light>
      <div class="router-view">
        <router-view/>
      </div>
      <div class="app-footer">
        <div>Her skal der stå noget <br> Her skal der være et link <br> Her kan der stå noget mere</div>
        <div>Her skal der stå noget <br> Her skal der være et link <br> Her kan der stå noget mere</div>
        <div>Her skal der stå noget <br> Her skal der være et link <br> Her kan der stå noget mere</div>
        <div>Her skal der stå noget <br> Her skal der være et link <br> Her kan der stå noget mere</div>
      </div>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { HTTP } from '@/services/http-service';
import { AxiosResponse } from 'axios';
import { Action } from 'vuex-class';
import { authActionTypes } from '@/store/modules/auth/actions';
import { commonActionTypes, Cms } from '@/store/modules/common/actions';
import { processActionTypes } from '@/store/modules/process/actions';

@Component
export default class App extends Vue {
  @Action(authActionTypes.LOAD_USER) loadUser: any;

  mounted() {
    // this.$store.dispatch(processActionTypes.LOAD_PROCESS_DETAILS, 770);
    this.loadUser();
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
  .application.theme--light {
    background: $color-background;
    color: inherit;
  }

  .application--wrap {
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

  .app-footer {
    background-color: $color-background-grey;
    border-top: 10px solid $color-secondary;
    display: flex;
    padding: 40px;
    justify-content: space-between;
  }
}
</style>
