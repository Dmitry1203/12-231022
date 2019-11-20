<template>
    <base-layout class="container">

        <h1>Фото {{ breedName }}</h1>
        <p>Список</p>

        <dogs-list :photos="$store.state.photos"></dogs-list>

    </base-layout>
</template>

<script>
    import {LOAD_RANDOM_BREED_PHOTOS} from "../store/action.types";
    import DogsList from "../components/DogsList";
    import BaseLayout from "../components/BaseLayout";
    export default {
        components: {DogsList,BaseLayout},
        computed:{
             breedName() {

                 // взять переменную из объекте
                 // то же самое let name = this.$route.params.name;
                 // можно { name, и т.д. }

                 let { name, sub } = this.$route.params;
                 let str = name[0].toUpperCase() + name.slice(1);
                 if (sub) {
                     str = str + " " + sub[0].toUpperCase() + sub.slice(1);
                 }
                 return str;
             },
        },
        async created(){
           await this.$store.dispatch(LOAD_RANDOM_BREED_PHOTOS, this.$route.params);
        },
    };
</script>

<style scoped>

</style>