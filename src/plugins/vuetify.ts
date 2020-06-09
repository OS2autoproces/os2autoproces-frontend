import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

const vuetify = new Vuetify({
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

Vue.use(Vuetify, {
  icons: {
    iconfont: 'md'
  }
});
export default vuetify;
