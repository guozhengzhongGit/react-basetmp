import request from '@/request';

export const apiPostSubmitRegister = (params) => {
  return request({
    method: 'POST',
    url: '/user/register',
    params,
  });
};
