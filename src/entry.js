import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';

import zhCN from 'antd/lib/locale/zh_CN';

import { enableMapSet, enablePatches } from 'immer';
import 'antd/dist/antd.less';

import 'dayjs/locale/zh-cn';
import store from './store';
import RootApp from './RootApp';
dayjs.locale('zh-cn');

enableMapSet();
enablePatches();

console.log('入口文件entry', SYSTEM_BUILD_TARGET);

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <RootApp />
    </ConfigProvider>
  </Provider>,
  document.querySelector('#app')
);
