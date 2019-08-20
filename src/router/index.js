import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
