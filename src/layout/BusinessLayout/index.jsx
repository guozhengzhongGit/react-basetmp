import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import BusinessLayoutHeader from '@c/BusinessLayoutHeader';
import Sidebar from '@c/Sidebar';
import localStorage from '@/utils/localStorage';
import {
  setUserInfo,
  setSidebarRoutes,
  initSystemInfo,
} from '@s/modules/global/action';
import RouterView from './RouterView';

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

const Layout = (props) => {
  const { history, userInfo } = props;
  useEffect(() => {
    const userInfo = localStorage.getValue('userInfo');
    if (userInfo) {
      props.changeUserInfo(userInfo);
      changeSideBarRoute(userInfo.menu_list.list);
    }
  }, []);
  const changeSideBarRoute = (list) => {
    const res = formatMenuToRoute(list);
    props.setSideBarRoutes(res);
  };
  const logout = () => {
    localStorage.removeValue('userInfo');
    props.clearSystemInfo();
    history.push('/system/login');
  };
  return (
    <div className={style.layout}>
      <Sidebar />
      <div className={style.rightMain}>
        <BusinessLayoutHeader userInfo={userInfo} logout={logout} />
        <div className={style.container}>
          <Suspense fallback={<Spin size="large" className={style.loading} />}>
            <RouterView />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeUserInfo: (...params) => dispatch(setUserInfo(...params)),
    setSideBarRoutes: (...rest) => dispatch(setSidebarRoutes(...rest)),
    clearSystemInfo: () => dispatch(initSystemInfo()),
  };
};
export default connect(
  ({ global }) => ({ userInfo: global.userInfo }),
  mapDispatchToProps
)(Layout);
