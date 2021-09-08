import React, { useState } from 'react';
import { isPhone } from '@u/validate';

import { Form, Input, Select, Checkbox, Button, Modal } from 'antd';
import { apiPostSubmitRegister } from './api';
import style from './style.scss';

const { Option } = Select;

const hiddenLabelStyle = {
  visibility: 'hidden',
};

const defaultMaleAvatar = 'https://qiniucdn.airbry.com/boy-circle.png';
const defaultFemaleAvatar = 'https://qiniucdn.airbry.com/girl-circle.png';
const defaultAvatar = 'https://qiniucdn.airbry.com/default-avatar.png';

const Register = (props) => {
  const { history } = props;
  const [form] = Form.useForm();
  const [info, setInfo] = useState({
    loading: false,
  });

  const submitRegister = async (params) => {
    setInfo(() => ({ loading: true }));
    try {
      params.role_id = -1;
      const res = await apiPostSubmitRegister(params);
      setInfo(() => ({ loading: false }));
      if (res.code === 200) {
        // 注册成功
        Modal.success({
          title: '注册成功',
          content: <div>恭喜，您的账号已注册成功！</div>,
          okText: '去登录',
          onOk() {
            history.push('/system/login');
          },
        });
      }
    } catch (error) {
      setInfo(() => ({ loading: false }));
    }
  };

  const onFinish = (values) => {
    const { username, password, phone, email, nickname, signature, gender } =
      values;
    const params = {
      gender: gender ? gender : 'secret',
      signature: signature ? signature : '',
      nickname,
      email,
      mobile_phone: phone,
      password,
      username,
      avatar: gender
        ? gender === 'male'
          ? defaultMaleAvatar
          : defaultFemaleAvatar
        : defaultAvatar,
    };
    submitRegister(params);
  };

  return (
    <div className={style.formOuter}>
      <Form
        colon={false}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="账户名称:"
          rules={[
            {
              required: true,
              message: '账户名称不能为空',
            },
          ]}
        >
          <Input placeholder="请输入账户名称" maxLength={18} />
        </Form.Item>

        <Form.Item
          name="password"
          label="账户密码:"
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="请输入密码" maxLength={18} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码:"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('两次密码输入不一致'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请确认密码" maxLength={18} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号码:"
          rules={[
            {
              required: true,
              message: '手机号码不能为空',
            },
            () => ({
              validator(_, value) {
                if (!value || isPhone.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('手机号码格式不对'));
              },
            }),
          ]}
        >
          <Input
            maxLength={11}
            placeholder="请输入手机号码"
            addonBefore="+86"
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱账号:"
          rules={[
            {
              type: 'email',
              message: '邮箱格式不正确',
            },
            {
              required: true,
              message: '请输入您的邮箱',
            },
          ]}
        >
          <Input placeholder="请输入邮箱账号" maxLength={18} />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="我的昵称:"
          tooltip="站点将用来展示如何称呼您"
          rules={[
            {
              required: true,
              message: '请输入您的昵称',
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="请输入您的昵称" maxLength={8} />
        </Form.Item>
        <Form.Item name="signature" label="个性签名:">
          <Input.TextArea
            placeholder="您可以展示自己~"
            maxLength={120}
            showCount={true}
          />
        </Form.Item>

        <Form.Item name="gender" label="我的性别:">
          <Select placeholder="您可以告诉我们您的性别">
            <Option value="male">我是帅哥</Option>
            <Option value="female">我是靓妹</Option>
            <Option value="secret">就不告诉你</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<span style={hiddenLabelStyle}>我的性别</span>}
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请阅读我们的用户使用协议')),
            },
          ]}
        >
          <Checkbox>
            我已经阅读产品相关<a href="">协议</a>
          </Checkbox>
        </Form.Item>
        <Form.Item label={<span style={hiddenLabelStyle}>我的性别</span>}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            loading={info.loading}
          >
            立即注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
