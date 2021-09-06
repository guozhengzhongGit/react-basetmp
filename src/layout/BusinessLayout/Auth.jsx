import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import store from '@s/index';
import { businessRouteList } from '@r/utils';
import localStorage from '@u/localStorage';

const getToken = () => {
  const userInfo = localStorage.getValue('userInfo');
  return (userInfo && userInfo.token) || '';
};

function checkAuth(location) {
  // redux 中的 routes 同时负责渲染 sidebar
  const { flattenRoutes } = store.getState().global;

  // 判断当前访问路由是否在系统路由中, 不存在直接走最后默认的 404 路由

  const route = businessRouteList.find(
    (child) => child.path === location.pathname
  );

  if (!route) {
    return true;
  }

  if (route.redirect) {
    return true;
  }

  if (route.auth === false) {
    return true;
  }

  // 路由存在于系统中，查看该用户是否有此路由权限，find 找不到的话返回 undefined
  if (!flattenRoutes.find((child) => child.path === location.pathname)) {
    return false;
  }

  return true;
}

function Auth(props) {
  // 未登录
  if (!getToken()) {
    return (
      <Redirect
        to={`/system/login?redirectURL=${encodeURIComponent(
          window.location.origin +
            props.location.pathname +
            props.location.search
        )}`}
      />
    );
  }

  // 检查授权，checkAuth 为 false，则无权限
  if (!checkAuth(props.location)) {
    return <Redirect to="/error/403" push />;
  }

  if (props.route.redirect) {
    return <Redirect to={props.route.redirect} push />;
  }

  return <>{props.children}</>;
}

export default memo(Auth);
