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
      path: '/Login',
      name: 'Login',
      component: resolve => require(['@/pages/login/Login'], resolve)
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
