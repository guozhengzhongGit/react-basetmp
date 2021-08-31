import React, { Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin, Typography } from 'antd';

import { getPageTitle, systemRouteList } from '@r/utils';

import { getSecretKey } from './api';
import style from './index.scss';

const UserLayout = () => {
  const title = getPageTitle(systemRouteList);
  useEffect(() => {
    getSecretKey()
      .then((res) => {
        if (res && res.code === 200) {
          sessionStorage.setItem('secretKey', JSON.stringify(res.data));
        }
      })
      .catch((e) => e);
  }, []);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={style.userLayout}>
        <div className={style.content}>
          <Typography.Title className={style.header}>
            <Link to="/">
              <span>React Base Admin</span>
            </Link>
          </Typography.Title>
          <div className={style.desc}>全栈开发的 react admin</div>
          <Suspense fallback={<Spin className="layout__loading" />}>
            <Switch>
              {systemRouteList.map((menu) => (
                <Route
                  exact
                  key={menu.path}
                  path={menu.path}
                  component={menu.component}
                />
              ))}
            </Switch>
          </Suspense>
        </div>
        <footer>React Base Admin</footer>
      </div>
    </>
  );
};

export default connect()(UserLayout);
