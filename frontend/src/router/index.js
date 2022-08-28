import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Login/Register.vue'
import Info from '../views/User/Info.vue'
import changePwd from '../views/User/changePwd.vue'
import prediction from '../views/Stocks/Prediction.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Home' }
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/changePwd',
    name: 'ChangePwd',
    component: changePwd
  },
  {
    path: '/prediction',
    name: 'Prediction',
    component: prediction
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
