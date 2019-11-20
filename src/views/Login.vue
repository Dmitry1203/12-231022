<template>
    <div class="login">
        <v-row>
            <v-col sm=4 class="ma-auto">
                <v-form @submit.prevent="signIn"  class="elevation-5 pa-4 cyan lighten-4">
                    <h2>Вход</h2>
                    <v-divider></v-divider>
                    <v-text-field v-model="email" label="Ваш e-mail"></v-text-field>
                    <v-text-field v-model="pass" label="Ваш пароль" type="password"></v-text-field>
                    <v-row>
                        <v-col>
                            <v-btn type="submit" color="primary">Вход</v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-btn color="default" to="/register">Регистрация</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {SIGNIN} from "../store/action.types";

    export default {

        data(){
           return{
               email: "",
               pass: ""
           };
        },

        methods: {
            async signIn(){
                await this.$store.dispatch(SIGNIN, {
                    email: this.email,
                    password: this.pass,
                });

                this.$router.push({ name: "home" });
            }
        },

        beforeCreate() {
            // авторизован
            if (this.$store.state.user.uid) {
                this.$router.push({ name: "home" });
            }
        }
    }
</script>

<style scoped>

</style>