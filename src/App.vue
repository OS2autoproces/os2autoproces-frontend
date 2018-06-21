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

@Component({
  components: {}
})
export default class App extends Vue {}
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
