import React from 'react';

/**
 * routes 第一级路由负责最外层的路由渲染，比如 userLayout 和 Layout 的区分
 * 所有系统内部存在的页面路由都要在此地申明引入，而菜单栏的控制是支持异步请求控制的
 */

const routes = [
  {
    path: '/system',
    component: React.lazy(() => import('@l/SystemLayout')),
    meta: {
      title: '系统路由',
    },
    redirect: '/system/login',
    children: [
      {
        path: '/system/login',
        component: React.lazy(() => import('@v/system/Login')),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/system/register',
        component: React.lazy(() => import('@v/system/register')),
        meta: {
          title: '注册',
        },
      },
      // {
      //   path: '/system/register-result/:id',
      //   auth: false,
      //   component: React.lazy(() => import('../views/system/registerResult')),
      //   meta: {
      //     title: '注册结果',
      //   },
      // },
      // {
      //   path: '/system/recovery-pwd',
      //   auth: false,
      //   component: React.lazy(() => import('../views/system/recoveryPwd')),
      //   meta: {
      //     title: '重置密码',
      //   },
      // },
    ],
  },
  {
    path: '/',
    component: React.lazy(() => import('@l/BusinessLayout')),
    meta: {
      title: '系统',
    },
    redirect: '/homepage/dashboard',
    children: [
      {
        path: '/homepage',
        meta: {
          title: '首页',
          icon: 'dashboard',
        },
        redirect: '/homepage/dashboard',
        children: [
          {
            path: '/homepage/dashboard',
            component: React.lazy(() => import('@v/homepage/Dashboard')),
            meta: {
              title: '系统介绍',
              icon: 'read',
            },
          },
        ],
      },
    ],
  },
];

export default routes;
