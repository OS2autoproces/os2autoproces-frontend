<template>
  <div id="app">
    <v-app light>
      <div id="nav">
        <NavigationBar></NavigationBar>
      </div>
      <router-view/>
    </v-app>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import NavigationBar from './components/NavigationBar.vue';

@Component({
  components: {
    NavigationBar,
  },
})
export default class App extends Vue {

}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.expansion-panel .icon {
  color: orange !important;
}
</style>
