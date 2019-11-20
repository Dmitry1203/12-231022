import * as firebase from "firebase";

// модуль авторизации
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration //установить npm install firebase / npm i firebase
const firebaseConfig = {
    apiKey: "AIzaSyD-sSEf1ktybOaDRWHMD9xPF8q0NwS8fdE",
    authDomain: "my-project-it-552f6.firebaseapp.com",
    databaseURL: "https://my-project-it-552f6.firebaseio.com",
    projectId: "my-project-it-552f6",
    storageBucket: "my-project-it-552f6.appspot.com",
    messagingSenderId: "234471015685",
    appId: "1:234471015685:web:16ae193da48fdc319f636c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.storage();
export const auth = firebase.auth();