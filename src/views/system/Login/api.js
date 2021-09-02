import request from '@/request';

export const apiPostLogin = (params) => {
  return request({
    method: 'POST',
    url: '/user/login',
    params,
  });
};
