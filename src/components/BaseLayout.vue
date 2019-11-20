<template>
    <div>
        <v-navigation-drawer v-model="menu.showMenu" clipped app>
            <v-list dense>

                <v-list-item v-for="item in menuItems" :to="item.link" :key="item.link" link>
                    <v-list-item-action>
                        <v-icon>{{ item.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="indigo"
                dark
                clipped-left
        >
            <v-app-bar-nav-icon @click.stop="toggleDrawer" />
            <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn to="/profile" text>
                <v-icon>mdi-account</v-icon>
                Личный кабинет</v-btn>
            <v-btn @click="logout" text>
                <v-icon>mdi-logout</v-icon>
                Выход
            </v-btn>
        </v-app-bar>

        <v-content>
            <v-container class="fill-height" fluid>
                <v-card class="pa-4 fill-height" style="width:100%">

                    <slot />

                </v-card>
            </v-container>
        </v-content>

        <v-footer
                color="indigo"
                app
        >
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </div>
</template>

<script>
    import {LOAD_BREEDS, LOAD_FAVORITE, SIGNOUT} from "../store/action.types";
    import { saveDrawerState, getDrawerState } from "../services/Utils";

    export default {

        async created(){
            // dispatch запускает LOAD_BREEDS

            await Promise.all([
                this.$store.dispatch(LOAD_BREEDS),
                this.$store.dispatch(LOAD_FAVORITE),
            ]);

            // добавили объекту меню свойство showMenu
            this.$set(this.menu, "showMenu", await getDrawerState());
            // this.$set(this.menu, "showMenu", true);

            // this.showMenu = await getDrawerState();
            // НАЧАЛЬНОЕ ПОЛОЖЕНИЕ МЕНЮ
            // Vue.set - ОБЪЯВЛЕНИЕ РЕАКТИВНОГО СВОЙСТВА
            // Vue.set(this, "showMenu", await getDrawerState() );
        },

        data() {
            return {
                menu:{

                }
                //showMenu: false,
            }
        },

        computed:{

            favoriteCounter(){
                return this.$store.state.favorites.length;
            },

            //иконки с сайта materialdesignicons.com
            //много разных !!!

            menuItems() {
                return [
                    {link: "/", text: "Главная", icon: 'mdi-home'},
                    {link: "/favorites", text: `Избранное (${this.favoriteCounter})`, icon: 'mdi-star-outline'},
                    {link: "/about", text: "О нас", icon: 'mdi-help'},
                ];
            },
        },

        methods:{
            async toggleDrawer(){
                this.menu.showMenu = !this.menu.showMenu;
                await saveDrawerState (this.menu.showMenu);
            },

            async logout(){
               await this.$store.dispatch(SIGNOUT);
               // редирект на страницу логин после выхода
               await this.$router.push({name: "login"});
            },
        },

        mounted() {

            document.body.classList.remove("show-preloader")

        }
    };
</script>

<style>
    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }
    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>