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
            <button @click="getKles()"> kald </button>
            <button @click="postBookMark()">sdfsdf</button>
            <button @click="createTechn()">tech</button>
        </v-app>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { HTTP } from '@/services/http-service';
import { AxiosResponse } from 'axios';

@Component({
  components: {}
})
export default class App extends Vue {

  async getKles() {
    const response: AxiosResponse = await HTTP.get('api/comments/3');
  }

  async postBookMark() {
    const repsonse: AxiosResponse = await HTTP.put('api/comments/3', {"message": "comments Test"});
  }

  async createTechn() {
    const repsonse: AxiosResponse = await HTTP.post('api/technologies', {"name": "technologi Test"});
  }
}
</script>

<style lang="scss">
@import './styles/variables';

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
