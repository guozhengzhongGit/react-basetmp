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

import localStorage from '@u/localStorage';
localStorage.setValue('token', 'dasfsfsjkldsfjls89779e0ew8r0wrwe');

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <RootApp />
    </ConfigProvider>
  </Provider>,
  document.querySelector('#app')
);
