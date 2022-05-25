import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store';
import routingList from './routingList';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: routingList,
});

router.beforeEach((to, from, next) => {
  const toRoute = to.name;
  if (toRoute === 'chat' || (from.name === null && toRoute !== 'Login')) return next();
  if (to.matched.some((route) => route.meta.requireAdminAuth)) {
    next();
    // if (!store.getters.isAdmin) {
    //   next(false);
    // } else {
    //   next();
    // }
  } else {
    next();
  }
});

export default router;
