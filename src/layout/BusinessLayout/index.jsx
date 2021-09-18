import React, { Suspense, useRef, useState } from 'react';
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
  const prevScrollTopRef = useRef(0);
  const [bar, setBar] = useState({
    topBarIsShow: true,
  });
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
  const handleScroll = (e) => {
    const scrollHeight = e.target.scrollTop;
    const prev = prevScrollTopRef.current;
    const flag = scrollHeight - prev;
    if (flag > 0 && Math.abs(flag) > 100) {
      prevScrollTopRef.current = scrollHeight;
      setBar({
        topBarIsShow: false,
      });
    }
    if (flag < 0 && Math.abs(flag) > 50) {
      prevScrollTopRef.current = scrollHeight;
      setBar({
        topBarIsShow: true,
      });
    }
  };
  return (
    <Layout className={style.layout}>
      <Sider trigger={null} collapsible collapsed={!sidebarIsOpen}>
        <Sidebar />
      </Sider>
      <div className={style.rightMain} onScroll={handleScroll}>
        <BusinessLayoutHeader logout={logout} topBarIsShow={bar.topBarIsShow} />
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
