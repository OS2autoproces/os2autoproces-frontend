import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  icons: {
    iconfont: 'md'
  }
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ee8a3c',
        secondary: '#3d5386',
        error: '#b71c1c',
        background: '#fff'
      }
    }
  }
});
