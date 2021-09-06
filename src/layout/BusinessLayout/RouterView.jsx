/**
 * @业务路由渲染
 * @将路由表里的打平的业务路由传给 Auth 组件并用 Route 组件 render
 */
import React, { useMemo, memo } from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './Auth';
import { businessRouteList, getPageTitle } from '@r/utils';
import AsyncRoutes from './AsyncRoutes';

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

function RouterView() {
  const routeList = useMemo(() => renderRouteList(), []);

  return <AsyncRoutes>{routeList}</AsyncRoutes>;
}

export default connect(({ global }) => ({ menuLoad: global.load }))(
  memo(RouterView)
);
