<template>
    <div class="login">
        <v-row>
            <v-col sm=4 class="ma-auto">
                <v-form @submit.prevent="signUp" class="elevation-5 pa-4 blue lighten-4">
                    <h2>Регистрация</h2>
                    <v-divider></v-divider>

                    <v-alert v-if="successMessage" type="success">{{successMessage}}</v-alert>
                    <v-alert v-if="errorMessage" type="error">{{errorMessage}}</v-alert>

                    <v-text-field v-model.trim="email" label="Ваш e-mail"></v-text-field>
                    <v-text-field v-model.trim="pass" label="Ваш пароль" type="password"></v-text-field>
                    <v-text-field v-model.trim="passConfirm"  label="Ваш пароль еще раз" type="password"></v-text-field>

                    <v-row>
                        <v-col>
                            <v-btn type="submit" color="primary">Зарегистрироваться</v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-btn color="default" to="/login">Вход</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {SIGNUP} from "../store/action.types";

    export default {

        data(){
            return {
                email: "",
                pass: "",
                passConfirm: "",
                successMessage: "",
                errorMessage: "",
            };
        },

        methods:{
            async signUp(){
                try {
                    await this.$store.dispatch(SIGNUP, {
                        email: this.email,
                        password: this.pass,
                    });

                    this.successMessage = "Регистрация завершена";
                    this.email = "";
                    this.pass = "";
                    this.passConfirm = "";
                    //редирект
                    setTimeout(() => { this.$router.push({ name: 'home'}); }, 1000);

                } catch (e) {
                    this.errorMessage = e.message;
                }

            },
        },
    }
</script>

<style scoped>

</style>