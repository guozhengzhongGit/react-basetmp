import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BusinessLayoutHeader from '@c/BusinessLayoutHeader';
import localStorage from '@/utils/localStorage';
import { setUserInfo } from '@s/modules/global/action';

const UserCenter = (props) => {
  const { history, userInfo } = props;
  useEffect(() => {
    const userInfo = localStorage.getValue('userInfo');
    if (!userInfo) {
      history.push('/system/login');
    } else {
      props.changeUserInfo(userInfo);
    }
  }, []);
  const logout = () => {
    localStorage.removeValue('userInfo');
    props.changeUserInfo({});
    history.push('/system/login');
  };
  return (
    <div>
      <BusinessLayoutHeader userInfo={userInfo} logout={logout} />
      <h1>hello, {userInfo.nickname}</h1>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUserInfo: (...params) => dispatch(setUserInfo(...params)),
  };
};

export default connect(
  ({ global }) => ({ userInfo: global.userInfo }),
  mapDispatchToProps
)(UserCenter);
