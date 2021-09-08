import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Spin, Layout } from 'antd';
import BusinessLayoutHeader from '@c/BusinessLayoutHeader';
import Sidebar from '@c/Sidebar';
import localStorage from '@/utils/localStorage';
import { initSystemInfo } from '@s/modules/global/action';
import RouterView from './RouterView';
import { getToken } from '@u/auth';

import style from './index.scss';
import { Redirect } from 'react-router-dom';

const { Sider } = Layout;

const BusinessLayout = (props) => {
  console.log('到达布局组件');
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

  const { history, sidebarIsOpen } = props;

  const logout = () => {
    localStorage.removeValue('userInfo');
    props.clearSystemInfo();
    history.push('/system/login');
  };
  return (
    <Layout className={style.layout}>
      <Sider trigger={null} collapsible collapsed={!sidebarIsOpen}>
        <Sidebar />
      </Sider>
      <div className={style.rightMain}>
        <BusinessLayoutHeader logout={logout} />
        <div className={style.container}>
          <Suspense fallback={<Spin size="large" className={style.loading} />}>
            <RouterView />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    // changeCurrentBusinessPath: (...params) =>
    //   dispatch(setCurBusinessPath(...params)),
    clearSystemInfo: () => dispatch(initSystemInfo()),
  };
};
export default connect(
  ({ global }) => ({ sidebarIsOpen: global.sidebarIsOpen }),
  mapDispatchToProps
)(BusinessLayout);
