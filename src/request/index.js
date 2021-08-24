import axios from 'axios';
import { message, Modal } from 'antd';

import AdminConfig from '@/config/adminConfig';

import localStorage from '@u/localStorage';

const getToken = () => localStorage.getValue('token');

const instance = axios.create({
  'Content-Type': 'application/json;charset=utf-8',
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

axios.interceptors.response.use(
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
    message.error(error.message);

    return Promise.reject(error);
  }
);

// 统一发起请求的函数
export default function request(options) {
  return instance.request(options);
}
