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

import { setUserInfo } from '@s/modules/global/action';
import localStorage from '@u/localStorage';
import { encrypt, decrypt } from '@u/secret';
import { login } from './api';
import style from './style.scss';

const formItemLayout = {
  // labelCol: { span: 4 },
  wrapperCol: { offset: 4, span: 16 },
};

const selfMarginBottom = {
  marginBottom: 16,
};

// const { Option } = Select;

// const selectAfter = (
//   <Select defaultValue="phone" className="select-before">
//     <Option value="phone">手机号码</Option>
//     <Option value="email">邮箱账号</Option>
//   </Select>
// );

const Login = (props) => {
  const [info, setInfo] = useState({
    loading: false,
  });

  const { history, location } = props;
  const searchObj = queryString.parse(location.search);

  const onFinish = (values) => {
    setInfo(() => ({ loading: true }));
    const { username, password } = values;
    decrypt(encrypt(password));
    const params = {
      username,
      password: encrypt(password),
      accountType: isPhone.test(username) ? 'phone' : 'email',
    };
    login(params)
      .then((res) => {
        setInfo(() => ({ loading: false }));
        if (res.code === 200 && res.data.token) {
          localStorage.setValue('userInfo', res.data);
          props.changeUserInfo(res.data);
          if (searchObj && searchObj.redirecturl) {
            const redirectUrlObj = new Url(searchObj.redirecturl);
            const { pathname, query, hash } = redirectUrlObj;
            history.push(`${pathname}${query}${hash}`);
          } else {
            history.push('/');
          }
        }
      })
      .catch(() => {
        setInfo(() => ({ loading: false }));
      });
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
              message: '用户账号不能为空',
            },
            () => ({
              validator(_, value) {
                if (!value || isPhone.test(value) || isEmail.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('账号格式不对'));
              },
            }),
          ]}
        >
          <Input
            // addonAfter={selectAfter}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入您注册的手机账号或邮箱"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
          ]}
          style={selfMarginBottom}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入您的密码"
          />
        </Form.Item>
        <Form.Item
          style={selfMarginBottom}
          name="autoLogin"
          valuePropName="checked"
        >
          <div className={style.spaceBetween}>
            <Checkbox>自动登录</Checkbox>
            <Link to="">忘记密码</Link>
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
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <div className={style.spaceBetween}>
            <div className={style.otherLogin}>
              其他登录方式：
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
            <Link to="/system/register">注册账号</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeUserInfo: (...params) => dispatch(setUserInfo(...params)),
});

export default connect(({ global }) => ({ global }), mapDispatchToProps)(Login);
