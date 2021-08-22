import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
// import { apiGetMenuList } from '../views/auth/user/service';
import TransitionRoute from '@c/TransitionRoute';
import { setSidebarRoutes } from '@s/modules/global/action';

const list = [
  {
    id: 5,
    name: '首页',
    url: '/homepage',
    icon: 'DashboardOutlined',
    desc: '首页',
    sort: 1,
    parentId: 0,
    level: 1,
    children: [
      {
        id: 6,
        name: '系统介绍',
        url: '/homepage/dashboard',
        icon: 'ReadOutlined',
        desc: '系统介绍',
        sort: 1,
        parentId: 5,
        level: 2,
      },
    ],
  },
  {
    id: 1,
    name: '权限管理',
    url: '/auth',
    icon: 'MenuUnfoldOutlined',
    desc: '权限管理',
    sort: 10,
    parentId: 0,
    level: 1,
    children: [
      {
        id: 2,
        name: '菜单管理',
        url: '/auth/menu',
        icon: 'MenuOutlined',
        desc: '菜单管理',
        sort: 1,
        parentId: 1,
        level: 2,
      },
      {
        id: 3,
        name: '用户管理',
        url: '/auth/user',
        icon: 'UserOutlined',
        desc: '用户管理',
        sort: 2,
        parentId: 1,
        level: 2,
      },
      {
        id: 4,
        name: '角色管理',
        url: '/auth/role',
        icon: 'TeamOutlined',
        desc: '角色管理',
        sort: 3,
        parentId: 1,
        level: 2,
      },
    ],
  },
];

function formatMenuToRoute(menus) {
  const result = [];

  menus.forEach((menu) => {
    const route = {
      path: menu.url,
      meta: {
        title: menu.name,
        icon: menu.icon,
      },
    };
    if (menu.children) {
      route.children = formatMenuToRoute(menu.children);
    }
    result.push(route);
  });

  return result;
}

function AsyncRoutes(props) {
  if (!props.global.load) {
    Promise.resolve(list)
      .then((data) => {
        props.setSideBarRoutes(formatMenuToRoute(data));
      })
      .catch(() => {});

    return <Spin className="layout__loading" />;
  }

  return <TransitionRoute>{props.children}</TransitionRoute>;
}

const mapStateToProps = ({ global }) => ({
  global,
});

const mapDispatchToProps = (dispatch) => ({
  setSideBarRoutes: (...rest) => dispatch(setSidebarRoutes(...rest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AsyncRoutes);
