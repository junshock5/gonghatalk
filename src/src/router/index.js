import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/Index'], resolve)
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['@/pages/login/Login'], resolve)
    },
    {
      path: '/room',
      name: 'room',
      component: resolve => require(['@/components/Room'], resolve)
    }
  ]
})
