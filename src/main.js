import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import {auth} from './plugins/firebase';
import {SET_USER} from "./store/mutation.types";

Vue.config.productionTip = false;

let app = null;

auth.onAuthStateChanged((user) => {
  if (user) {
    //console.log ("Авторизован");
    store.commit(SET_USER, {
      uid: user.uid,
      email: user.email,
    });

  } else {

    store.commit(SET_USER, {
      uid: null,
      email: null,
    });

  }

    // перерисовать всё приложение
    // app.$forceUpdate();
    // показываем приложение после авторизации, иначе будет выкидывать на страницу логина при перезагрузке

  if (!app){
      app = new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount('#app');
  }
});
