const AdminConfig = {
  BASENAME: '/react-ant-admin',
  THEME_STYLE: 'dark',
  LAYOUT_STYLE: 'side',
  LOGIN_EXPIRE: 401,
  // 请求成功状态码
  SUCCESS_CODE: 200,
  API_BASE_URL: {
    production: 'https://www.landluck.cn/react-ant-admin-api',
    test: 'https://www.landluck.cn/react-ant-admin-api/test',
    pre: 'https://www.landluck.cn/react-ant-admin-api/pre',
    development: 'https://www.landluck.cn/react-ant-admin-api/dev',
  },
};
export default AdminConfig;
