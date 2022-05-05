import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index/Index'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/pages/auth/Login'], resolve)
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/pages/auth/Register'], resolve)
    },
    {
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: resolve => require(['@/pages/auth/ForgotPassword'], resolve)
    },
    {
      path: '/room',
      name: 'Room',
      component: resolve => require(['@/pages/room/Room'], resolve)
    },
    {
      path: '/roomList',
      name: 'RoomList',
      component: resolve => require(['@/pages/room/RoomList'], resolve)
    }
  ]
})
