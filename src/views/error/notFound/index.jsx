import React from 'react';
import { Result, Button } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurBusinessPath } from '@s/modules/global/action';

function Error404(props) {
  const gotoHomePage = () => {
    props.changeCurrentBusinessPath('/home/dashboard');
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="系统提示：您访问的页面不存在，请检查后重新使用"
      extra={
        <Button type="primary" onClick={gotoHomePage}>
          <Link to="/home/dashboard">返回首页</Link>
        </Button>
      }
    />
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeCurrentBusinessPath: (...params) =>
    dispatch(setCurBusinessPath(...params)),
});

export default connect(() => ({}), mapDispatchToProps)(Error404);
