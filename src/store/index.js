import Vue from 'vue';
import Vuex from 'vuex';
import Dogs from '../services/Dogs';
import {
  SET_BREEDS,
  SET_PHOTOS,
  SET_FAVORITES,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_USER} from './mutation.types';
import {
  LOAD_BREEDS, LOAD_FAVORITE,
  LOAD_RANDOM_BREED_PHOTOS,
  TOGGLE_FAVORITE_IMAGE,
  SIGNIN, SIGNUP, SIGNOUT
} from './action.types';

import Users from '../services/Users';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breeds: [],
    photos: [], // фото одной породы
    favorites: [], // избранное
    user: {
      uid: null,
      email: "",
    }
  },
  mutations: {
    [SET_BREEDS](state, breeds){
      state.breeds = breeds;
    },
    [SET_PHOTOS](state, photos){
      state.photos = photos;
    },
    [SET_FAVORITES](state, favorites){
      state.favorites = favorites;
    },
    [ADD_TO_FAVORITES](state, image){
      state.favorites.unshift(image)
    },
    [REMOVE_FROM_FAVORITES](state, image){
      const index = state.favorites.indexOf(image);
      // если нашли, то удаляем
      if (index > -1){
        state.favorites.splice(index, 1);
      }
    },
    [SET_USER](state, user){
      state.user = user;
    },
  },

  actions: {

    async [LOAD_BREEDS]({commit}){
      // commit вызывает мутацию
      commit(SET_BREEDS, await Dogs.getAllBreeds());
    },
    async [LOAD_RANDOM_BREED_PHOTOS]({commit}, options){
      commit(SET_PHOTOS, await Dogs.getDogByBreed(options));
    },

    async [TOGGLE_FAVORITE_IMAGE]({commit, state}, image){
      if (state.favorites.includes(image)){
        commit (REMOVE_FROM_FAVORITES, image)
      } else {
        commit (ADD_TO_FAVORITES, image)
      }

      await Dogs.saveDogsToStorage(state.favorites);

    },

    async [LOAD_FAVORITE] ({commit}) {
      commit(SET_FAVORITES, await Dogs.getDogsFromStorage());
    },

    async [SIGNIN] ({commit}, {email, password}) {
      const user = await Users.getUserByCredentials(email, password);
      commit(SET_USER, user);
    },

    async [SIGNOUT] ({commit}) {
      const user = await Users.logout();
      commit(SET_USER, {
        uid: null,
        email: "",
      });
    },

    async [SIGNUP] ({commit}, {email, password}) {
      const user = await Users.createUser(email, password);
      commit(SET_USER, user);
    },
  },
});

