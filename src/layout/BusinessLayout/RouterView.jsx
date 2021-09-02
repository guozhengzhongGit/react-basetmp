/**
 * @业务路由渲染
 * @将路由表里的打平的业务路由传给 Auth 组件并用 Route 组件 render
 */
import React, { useMemo, memo } from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Auth from './Auth';
import { businessRouteList, getPageTitle } from '@r/utils';
import TransitionRoute from '@c/TransitionRoute';
import style from './index.scss';

function renderRoute(route) {
  const title = getPageTitle(businessRouteList);

  const { component: Component } = route;

  return (
    <Route
      key={route.path}
      exact={route.path !== '*'}
      path={route.path}
      render={(props) => (
        <Auth {...props} route={route}>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={title} />
          </Helmet>
          <Component {...props} />
        </Auth>
      )}
    />
  );
}

function renderRouteList() {
  const result = [];
  businessRouteList.forEach((child) => {
    result.push(renderRoute(child));
  });

  return result;
}

function RouterView(props) {
  if (!props.menuLoad) return <Spin size="large" className={style.loading} />;
  const routeList = useMemo(() => renderRouteList(), []);

  return <TransitionRoute>{routeList}</TransitionRoute>;
}

export default connect(({ global }) => ({ menuLoad: global.load }))(
  memo(RouterView)
);
