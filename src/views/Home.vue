<template>

  <base-layout class="home">
    <ul>
      <li v-for="(subbreed, breed) in $store.state.breeds" :key="breed">
        <router-link :to="getBreedLink(breed)">{{ breed }}</router-link>
      <ul v-if="subbreed.length > 0">
        <li v-for="item in subbreed" :key="item">
          <router-link :to="getBreedLink(breed, item)">{{ item }}</router-link>
        </li>
      </ul>
      </li>
    </ul>
  </base-layout>

</template>

<script>
import BaseLayout from "../components/BaseLayout";
export default{
    components: { BaseLayout },
    methods:{
      getBreedLink(name, sub = null){
      return {
        name: 'breed-page',
        params: {
          name,
          sub,
        },
      };
    },
  },

};
</script>

<style scoped>
.home{

}
</style>