const routing = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/index/Index'),
    children: [
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('@/pages/room/Chat'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/auth/Login'),
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
    ],
  },
  {
    path: '*',
    name: 'AllCatch',
    redirect: '/404',
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/pages/exception/Forbidden'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/exception/NotFound'),
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/pages/exception/ServerError'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/Login'),
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
  },
];

export default routing;
