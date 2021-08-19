import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';

import zhCN from 'antd/lib/locale/zh_CN';

import RootApp from './RootApp';
import 'antd/dist/antd.less';

import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <RootApp />
  </ConfigProvider>,
  document.querySelector('#app')
);
