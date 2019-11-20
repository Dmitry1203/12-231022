<template>

    <v-row>
        <v-col cols="12" md="4" sm="6" xl="3" class="ma-2" v-for="item in photos" :key="item">
            <v-card :img="item" height="300">
                <v-btn
                        fab
                        absolute
                        right
                        bottom
                        dark
                        class="mb-10 fav-btn"
                        :color="getFavoriteBtnClass(item)"
                        @click="toggleFaforite(item)"
                >
                <v-icon>mdi-heart</v-icon>
                </v-btn>
            </v-card>
        </v-col>
    </v-row>

</template>

<script>
import {TOGGLE_FAVORITE_IMAGE} from "../store/action.types";

export default {

    props:{
       photos: {
          type: Array,
          required: true,
       }
    },

    methods:{
        // т.к. вызываем асинхронный action
        async toggleFaforite(image){
            await this.$store.dispatch(TOGGLE_FAVORITE_IMAGE, image);
        },
        getFavoriteBtnText(image){
            return this.$store.state.favorites.includes(image) ? 'Убрать из избранного' : 'В избранное';
        },
        getFavoriteBtnClass(image){
            return this.$store.state.favorites.includes(image) ? 'red accent-3' : 'blue-grey darken-4';
        },
    },


}
</script>

<style scoped>
.fav-btn{
 z-index: 2;
}
</style>