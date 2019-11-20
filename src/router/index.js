import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from "../store/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      title: "Главная",
      needAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: "О нас",
      needAuth: true,
    },
  },
  {
    // :name - обязательный параметр, :sub? - не обязательный
    path: '/breed/:name/:sub?',
    name: 'breed-page',
    component: () => import(/* webpackChunkName: "breed" */ '../views/Breed.vue'),
    meta: {
      title: "Порода",
      needAuth: true,
    },
  },
  {
    // :name - обязательный параметр, :sub? - не обязательный
    path: '/favorites',
    name: 'fav',
    component: () => import(/* webpackChunkName: "fav" */ '../views/Favorites.vue'),
    meta: {
      title: "Избранное",
      needAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    meta: {
      title: "Профиль",
      needAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: "Авторизация",
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      title: "Регистрация",
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// перед переходом //
// установки title

router.beforeEach((to, from, next) =>{
// нужна авторизация и пользователь не авторизован
if (to.meta.needAuth && store.state.user.uid === null){
  //редирект на стр входа, если не авторизован
  return next({name: "login"});
 }
 return next();
});


router.beforeEach((to, from, next) =>{
  document.title = to.meta.title;
  // покажем прелоадер опять
  document.body.classList.add ("show-preloader");
  next();
});

router.afterEach((to, from, next) =>{
  // убрать прелоадер
  document.body.classList.remove ("show-preloader");
});

export default router
