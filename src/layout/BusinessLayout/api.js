import request from '@/request';

export const apiGetMenuTree = (params) => {
  return request({
    method: 'GET',
    url: '/menu/tree',
    params,
  });
};
