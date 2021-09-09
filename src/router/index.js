import React from 'react';

/**
 * routes 第一级路由负责最外层的路由渲染，比如 userLayout 和 Layout 的区分
 * 所有系统内部存在的页面路由都要在此地申明引入，而菜单栏的控制是支持异步请求控制的
 */

const routes = [
  {
    path: '/system',
    component: React.lazy(() =>
      import(/* webpackChunkName: "systemLayout" */ '@l/SystemLayout')
    ),
    meta: {
      title: '系统路由',
    },
    redirect: '/system/login',
    children: [
      {
        path: '/system/login',
        component: React.lazy(() =>
          import(/* webpackChunkName: "login" */ '@v/system/Login')
        ),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/system/register',
        component: React.lazy(() =>
          import(/* webpackChunkName: "register" */ '@v/system/Register')
        ),
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
    // component: React.lazy(() => import('@l/BusinessLayout')),
    component: React.lazy(() =>
      import(/* webpackChunkName: "businessLayout" */ '@l/BusinessLayout')
    ),
    meta: {
      title: '业务',
    },
    redirect: '/home/dashboard',
    children: [
      {
        path: '/home',
        meta: {
          title: '首页',
          icon: 'dashboard',
        },
        redirect: '/home/dashboard',
        children: [
          {
            path: '/home/dashboard',
            component: React.lazy(() =>
              import(
                /* webpackChunkName: "dashboard" */ '@v/homepage/Dashboard'
              )
            ),
            meta: {
              title: '系统介绍',
              icon: 'read',
            },
          },
        ],
      },
      // 以下的路由改动请小心，涉及权限校验模块
      {
        path: '/auth',
        meta: {
          title: '权限管理',
        },
        redirect: '/auth/role',
        children: [
          {
            path: '/auth/role',
            auth: true,
            meta: {
              title: '角色管理',
            },
            component: React.lazy(() =>
              import(/* webpackChunkName: "404" */ '@v/auth/role')
            ),
          },
        ],
      },
      {
        path: '/content',
        meta: {
          title: '内容管理',
        },
        redirect: '/content/create',
        children: [
          {
            path: '/content/list',
            auth: true,
            meta: {
              title: '内容列表',
            },
            component: React.lazy(() =>
              import(/* webpackChunkName: "contentList" */ '@v/content/List')
            ),
          },
          {
            path: '/content/create',
            auth: true,
            meta: {
              title: '新建内容',
            },
            component: React.lazy(() =>
              import(
                /* webpackChunkName: "createContent" */ '@v/content/create'
              )
            ),
          },
        ],
      },
      {
        path: '/error',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
        children: [
          {
            path: '/error/404',
            auth: false,
            component: React.lazy(() =>
              import(/* webpackChunkName: "404" */ '@v/error/notFound')
            ),
            meta: {
              title: '页面不存在',
            },
          },
          {
            path: '/error/403',
            auth: false,
            component: React.lazy(() =>
              import(/* webpackChunkName: "403" */ '@v/error/forbidden')
            ),
            meta: {
              title: '暂无权限',
            },
          },
        ],
      },
      {
        path: '/*',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
      },
    ],
  },
];

export default routes;
