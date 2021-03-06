import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isPhone, isEmail } from '@u/validate';
import { Form, Input, Button, Checkbox } from 'antd';
import queryString from 'query-string';
import Url from 'url-parse';
import {
  UserOutlined,
  LockOutlined,
  GithubOutlined,
  WeiboCircleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { setUserInfo, setSidebarRoutes } from '@s/modules/global/action';
import localStorage from '@u/localStorage';
import { encrypt } from '@u/secret';
import { apiPostLogin } from './api';
import style from './style.scss';

const formItemLayout = {
  // labelCol: { span: 4 },
  wrapperCol: { offset: 4, span: 16 },
};

const selfMarginBottom = {
  marginBottom: 16,
};

const Login = (props) => {
  const [info, setInfo] = useState({
    loading: false,
  });

  const { history, location } = props;
  const searchObj = queryString.parse(location.search);

  const submitLogin = async (params) => {
    try {
      const res = await apiPostLogin(params);
      if (res.code === 200 && res.data.token) {
        localStorage.setValue('userInfo', res.data);
        if (searchObj && searchObj.redirecturl) {
          const redirectUrlObj = new Url(searchObj.redirecturl);
          const { pathname, query, hash } = redirectUrlObj;
          history.push(`${pathname}${query}${hash}`);
        } else {
          history.push('/home/dashboard');
        }
      }
    } catch (error) {
      setInfo(() => ({ loading: false }));
      console.error(error);
    }
  };

  const onFinish = (values) => {
    setInfo(() => ({ loading: true }));
    const { username, password } = values;
    const params = {
      username,
      password: encrypt(password),
      accountType: isPhone.test(username) ? 'phone' : 'email',
    };
    submitLogin(params);
  };

  return (
    <div className={style.formOuter}>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        {...formItemLayout}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '????????????????????????',
            },
            () => ({
              validator(_, value) {
                if (!value || isPhone.test(value) || isEmail.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('??????????????????'));
              },
            }),
          ]}
        >
          <Input
            // addonAfter={selectAfter}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="??????????????????????????????????????????"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '??????????????????',
            },
          ]}
          style={selfMarginBottom}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="?????????????????????"
          />
        </Form.Item>
        <Form.Item
          style={selfMarginBottom}
          name="autoLogin"
          valuePropName="checked"
        >
          <div className={style.spaceBetween}>
            <Checkbox>????????????</Checkbox>
            <Link to="">????????????</Link>
          </div>
        </Form.Item>
        <Form.Item style={selfMarginBottom}>
          <Button
            loading={info.loading}
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            ??????
          </Button>
        </Form.Item>
        <Form.Item>
          <div className={style.spaceBetween}>
            <div className={style.otherLogin}>
              ?????????????????????
              <span className={style.loginType}>
                <GithubOutlined />
              </span>
              <span className={style.loginType}>
                <WeiboCircleOutlined />
              </span>
              <span className={style.loginType}>
                <TwitterOutlined />
              </span>
            </div>
            <Link to="/system/register">????????????</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeUserInfo: (...params) => dispatch(setUserInfo(...params)),
  setSideBarRoutes: (...rest) => dispatch(setSidebarRoutes(...rest)),
});

export default connect(({ global }) => ({ global }), mapDispatchToProps)(Login);
