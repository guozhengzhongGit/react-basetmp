import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';

import zhCN from 'antd/lib/locale/zh_CN';

import RootApp from './RootApp';
import 'antd/dist/antd.less';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <RootApp />
  </ConfigProvider>,
  document.querySelector('#app')
);
