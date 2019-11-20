<template>
   <base-layout class="favorites">
       <h1>Избранное</h1>
       <!-- <b-alert show v-if="favorites.length === 0">Список пуст (стиль bootstrap-vue)</b-alert> -->
       <dogs-list :photos="favorites"></dogs-list>
   </base-layout>
</template>

<script>
  import {TOGGLE_FAVORITE_IMAGE} from "../store/action.types";
  import DogsList from "../components/DogsList";
  import BaseLayout from "../components/BaseLayout";
  export default {
      components: {DogsList,BaseLayout},
      computed: {
          favorites(){
              return this.$store.state.favorites;
          }
      },
  }
</script>