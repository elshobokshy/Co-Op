import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Users from '@/components/Users'
import Channel from '@/components/Channel'
import store from '@/store'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/channel/:id',
      name: 'channel',
      component: Channel
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.name != 'signin' && ! store.getters['auth/isConnected']) {
    console.log(1)
    if (to.name != 'register') {
      console.log(2)
      next({name: 'signin', query: {redirect: to.fullPath}})
    } else {
      next()
    } 
  } else if (to.name == 'signin' && store.getters['auth/isConnected']) {
    console.log(3)
    next({name: 'home'})
  } else {
    console.log(4)
    next()
  }
})