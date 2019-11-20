<template>
        <v-app :key="$store.state.user.uid"  id="app">
            <router-view></router-view>
        </v-app>
</template>


