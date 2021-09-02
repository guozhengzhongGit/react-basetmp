import axios from 'axios';
import React from 'react';
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import AdminConfig from '@/config/adminConfig';

import localStorage from '@u/localStorage';

const getToken = () => {
  const userInfo = localStorage.getValue('userInfo');
  return (userInfo && userInfo.token) || '';
};

const baseURL = AdminConfig.API_BASE_URL[SYSTEM_BUILD_TARGET];
if (!baseURL) console.error('当前构建参数错误，拿不到正确的请求地址');
const instance = axios.create({
  'Content-Type': 'application/json;charset=utf-8',
  baseURL,
});
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = getToken();

    // 获取用户token，用于校验
    /* eslint-disable  no-param-reassign */
    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 添加响应拦截器，拦截登录过期或者没有权限

instance.interceptors.response.use(
  (response) => {
    if (!response.data) {
      return Promise.resolve(response);
    }

    // 登录已过期或者未登录
    if (response.data.code === AdminConfig.LOGIN_EXPIRE) {
      Modal.confirm({
        title: '系统提示',
        content: response.data.msg,
        okText: '重新登录',
        onOk() {
          window.location.href = `${
            window.location.origin
          }/system/login?redirectURL=${encodeURIComponent(
            window.location.href
          )}`;
        },
        onCancel() {},
      });

      return Promise.reject(new Error(response.data.msg));
    }

    // 请求成功
    if (response.data.code === AdminConfig.SUCCESS_CODE) {
      return response.data;
    }

    // 请求成功，状态不为成功时
    message.error(response.data.msg);

    return Promise.reject(new Error(response.data.msg));
  },
  (error) => {
    /**
     * axios 文档：http://www.axios-js.com/zh-cn/docs/#%E5%93%8D%E5%BA%94%E7%BB%93%E6%9E%84
     * 某个请求的响应包含以下 6 个信息
     * status，statusText，data，headers，config，request
     */
    const { response } = error;
    const { status } = response;
    if (status === 401) {
      Modal.confirm({
        title: '系统提示',
        icon: <ExclamationCircleOutlined />,
        content: response.data.msg,
        okText: '重新登录',
        onOk() {
          window.location.href = `${
            window.location.origin
          }/system/login?redirecturl=${encodeURIComponent(
            window.location.href
          )}`;
        },
        onCancel() {},
      });
      return;
    }
    message.error(error.message);

    return Promise.reject(error);
  }
);

// 统一发起请求的函数
export default function request(options) {
  const { method, params, ...rest } = options;
  if (method && method.toLowerCase() !== 'get') {
    return instance.request({ method, data: { ...params }, ...rest });
  }
  return instance.request(options);
}
