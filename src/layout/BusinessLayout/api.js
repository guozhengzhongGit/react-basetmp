import request from '@/request';
export function apiGetMenuList(params) {
  return request({
    method: 'GET',
    url: '/api/user/menu',
    params,
  });
}
