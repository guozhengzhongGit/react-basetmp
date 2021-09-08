import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { apiGetMenuTree } from './api';
// import TransitionRoute from '@c/TransitionRoute';
import { Switch } from 'react-router-dom';
import {
  setSidebarRoutes,
  setUserInfo,
  setCurBusinessPath,
} from '@s/modules/global/action';
import localStorage from '@u/localStorage';
import style from './index.scss';

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
  const userInfo = localStorage.getValue('userInfo');
  if (!props.menuLoad) {
    console.log('请求tree');
    apiGetMenuTree({ roleId: userInfo.role_id })
      .then((res) => {
        if (res.code === 200) {
          props.setSideBarRoutes(formatMenuToRoute(res.data.list));
          props.changeUserInfo(userInfo);
          props.changeCurrentBusinessPath(window.location.pathname);
        }
      })
      .catch((e) => e);

    return <Spin size="large" className={style.loading} />;
  }

  return <Switch>{props.children}</Switch>;
}

const mapDispatchToProps = (dispatch) => ({
  changeCurrentBusinessPath: (...params) =>
    dispatch(setCurBusinessPath(...params)),
  setSideBarRoutes: (...rest) => dispatch(setSidebarRoutes(...rest)),
  changeUserInfo: (...params) => dispatch(setUserInfo(...params)),
});

export default connect(
  ({ global }) => ({ menuLoad: global.load }),
  mapDispatchToProps
)(AsyncRoutes);
