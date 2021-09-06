import request from '@/request';

export const apiGetRoleInfo = () => {
  return request({
    method: 'GET',
    url: '/role/list',
  });
};
