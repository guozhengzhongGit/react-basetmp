import request from '@/request';

export const login = (params) => {
  return request({
    method: 'POST',
    url: '/user/login',
    params,
  });
};
