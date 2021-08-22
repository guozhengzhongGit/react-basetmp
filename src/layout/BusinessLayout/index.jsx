import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import BusinessLayoutHeader from '@c/BusinessLayoutHeader';
import Sidebar from '@c/Sidebar';
import RouterView from './RouterView';

import style from './index.scss';

const Layout = () => {
  return (
    <div className={style.layout}>
      <Sidebar />
      <div className={style.rightMain}>
        <BusinessLayoutHeader />
        <div className={style.container}>
          <Suspense fallback={<Spin size="large" className={style.loading} />}>
            <RouterView />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default connect()(Layout);
