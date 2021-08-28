const AdminConfig = {
  BASENAME: '/react-ant-admin',
  THEME_STYLE: 'dark',
  LAYOUT_STYLE: 'side',
  LOGIN_EXPIRE: 201,
  // 请求成功状态码
  SUCCESS_CODE: 200,
  API_BASE_URL: {
    production: 'http://127.0.0.1:7001',
    test: 'http://127.0.0.1:7001',
    pre: 'http://127.0.0.1:7001',
    development: 'http://127.0.0.1:7001',
  },
};
export default AdminConfig;
