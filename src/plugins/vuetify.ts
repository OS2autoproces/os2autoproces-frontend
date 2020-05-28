import Vue from 'vue';
import Vuetify from 'vuetify';
// @ts-ignore
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import 'tiptap-vuetify/dist/main.css';
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

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'md'
});

export default vuetify;
