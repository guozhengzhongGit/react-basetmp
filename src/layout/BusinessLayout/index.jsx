import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import BusinessLayoutHeader from '@c/BusinessLayoutHeader';
import Sidebar from '@c/Sidebar';
import localStorage from '@/utils/localStorage';
import { initSystemInfo } from '@s/modules/global/action';
import RouterView from './RouterView';

import style from './index.scss';

const BusinessLayout = (props) => {
  // useEffect(() => {
  //   props.changeCurrentBusinessPath(window.location.pathname);
  // });

  const { history } = props;

  const logout = () => {
    localStorage.removeValue('userInfo');
    props.clearSystemInfo();
    history.push('/system/login');
  };
  return (
    <div className={style.layout}>
      <Sidebar />
      <div className={style.rightMain}>
        <BusinessLayoutHeader logout={logout} />
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
    // changeCurrentBusinessPath: (...params) =>
    //   dispatch(setCurBusinessPath(...params)),
    clearSystemInfo: () => dispatch(initSystemInfo()),
  };
};
export default connect(() => ({}), mapDispatchToProps)(BusinessLayout);
