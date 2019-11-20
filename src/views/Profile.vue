<template>
    <base-layout class="profile">
    <h1>{{ $route.meta.title }}</h1>
        <v-divider></v-divider>

        <v-form @submit.prevent="sendForm">
        <v-row>
            <v-col sm="4">

                <v-alert v-if="showError" type="error" class="my-6">Заполните форму</v-alert>

                <v-text-field
                        :error-messages="nameErrors"
                        v-model="userName"
                        label="Ваше имя"
                        name="user-name"
                        @blur="$v.userName.$touch()"
                        @input="$v.userName.$touch()"
                ></v-text-field>

                <v-select :items="cities"
                          v-model="city"
                          label="Ваш город"
                ></v-select>

                <v-select
                        item-value="lang"
                        item-text="title"
                        :items="languages"
                        label="Ваш язык"
                        v-model="lang"
                ></v-select>

                <v-text-field
                        :error-messages="emailErrors"
                        label="Ваш email"
                        v-model="email"
                        @blur="$v.email.$touch()"
                        @input="$v.email.$touch()"
                ></v-text-field>

                <v-text-field v-mask="phoneMask" label="Ваш телефон"></v-text-field>

                <v-radio-group label="Пол" row>
                    <v-radio label="Мужской" value="male" />
                    <v-radio label="Женский" value="female" />
                </v-radio-group>

                <v-checkbox label="Получать уведомления о собаках"></v-checkbox>

                <br><br>
                <v-slider
                        min="10"
                        max="150"
                        v-model="height"
                >
                    <template #label>
                        Рост {{ height }} см
                    </template>
                </v-slider>

                <v-menu
                        v-model="showDatePicker"
                        :close-on-content-click="false"
                        min-width="280px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                label="Дата рождения"
                                readonly
                                v-on="on"
                                :value="formattedBirthday"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                            first-day-of-week="1"
                            v-model="birthday"
                            @input="showDatePicker = false">
                    </v-date-picker>
                </v-menu>

                <v-btn type="submit" color="primary">Сохранить</v-btn>

            </v-col>
        </v-row>

        </v-form>
        <br><br><br><br><br><br>
    </base-layout>
</template>

<script>

    import { mask } from 'vue-the-mask';
    import { validationMixin } from 'vuelidate';
    import { required, maxValue, minValue, email} from 'vuelidate/lib/validators'
    import BaseLayout from "../components/BaseLayout";
    //const russianLetters = value => /^[0-9]/.test(value);
    const russianLetters = value => /^[а-яА-Я]{2,20}/.test(value);

    export default {
        components: {BaseLayout},

        directives:{
            mask,
        },

        mixins: [validationMixin],

        data(){
            return {

                cities: ["Санкт-Петербург", "Москва", "Казань", "Екатеринбург"],
                city: "Санкт-Петербург",
                languages: [
                    {
                        lang: 'en',
                        title: 'English'
                    },
                    {
                        lang: 'ru',
                        title: 'Русский'
                    },
                ],
                lang: "en",
                userName: "",
                height: 10,
                showDatePicker: false,
                birthday: '',
                phoneMask: '+7 (###) ###-##-##',
                showError: false,
                email: "",
            };
        },

        computed:{

            formattedBirthday(){
                // преобразовали дату в норм вид
                return this.birthday.split ('-').reverse().join('.')
            },

            nameErrors(){
              const errors=[];
              // поле еще не трогали, сообщений об ошибках нет

              if (!this.$v.userName.$dirty) return errors;
              if (!this.$v.userName.required){
                  errors.push("Укажите имя");
              }

              if (!this.$v.userName.russianLetters){
                  errors.push("Только русские буквы !");
              }
              return errors;
            },

            emailErrors(){
                const errors=[];
                // поле еще не трогали, сообщений об ошибках нет

                if (!this.$v.email.$dirty) return errors;
                if (!this.$v.email.required){
                    errors.push("Заполните поле");
                }

                if (!this.$v.email.email){
                    errors.push("Укажите корректный адрес !");
                }
                return errors;
            },

        },

        validations: {
            height: {
                required,
                minValue: minValue(10),
                maxValue: maxValue(150),
            },
            userName: {
                required,
                russianLetters
            },
            email: {
                required,
                email
            },
        },

        methods:{
            sendForm (){
                //this.showError = true;
                this.$v.$touch();
                if (this.$v.$invalid){
                    this.showError = true;
                } else {
                    this.showSuccess = true;
                }

                // behavior: "auto"
                // что то не так в мозилле

                window.scrollTo({
                  top: 10,
                  behavior: "smooth"
                });

            },
        },
    };
</script>