import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3d5386',
        secondary: '#ee8a3c',
        error: '#b71c1c',
        background: '#fff'
      }
    }
  },
  icons: {
    iconfont: 'md'
  }
});

Vue.use(Vuetify);

export default vuetify;
