import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
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
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/newuser',
      name: 'newuser',
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
    next({name: 'signin', query: {redirect: to.fullPath}})
  } else if (to.name == 'signin' && store.getters['auth/isConnected']) {
    next({name: 'home'})
  } else {
    next()
  }
})