// import React, { useState } from 'react';
// import { Button, DatePicker, message } from 'antd';
// import { connect } from 'react-redux';
// import Icon from '@c/Icon';
// import AntIcon from '@c/AntIcon';
// import LoadingIcon from '@c/Loading';
// import { toggleSidebarOpened } from '@/store/modules/global/action';
// import './rootApp.css';
//
// const RootApp = (props) => {
//   const [info, setInfo] = useState({
//     count: 0,
//     name: 'gzz',
//     age: 18,
//   });
//   const handleAdd = () => {
//     setInfo((prev) => ({
//       ...prev,
//       count: prev.count + 1,
//     }));
//   };
//   const handleChange = (value) => {
//     message.info(
//       `您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`
//     );
//   };
//   const handleToggleSidebar = () => {
//     const { sidebarIsOpen } = props.global;
//     props.toggleSidebarOpened(!sidebarIsOpen);
//   };
//   return (
//     <div>
//       <p>
//         num: <b>{info.count}</b>
//       </p>
//       hello world, {info.name}
//       <Button onClick={handleAdd} type="primary">
//         add
//       </Button>
//       <DatePicker onChange={handleChange} />
//       <Icon type="icon-gzznan" style={{ fontSize: '28px', color: '#000' }} />
//       <AntIcon type="icon-gzznv" style={{ fontSize: 28, color: '#000' }} />
//       <LoadingIcon style={{ fontSize: 28, color: '#13c2c2' }} />
//       <Button onClick={handleToggleSidebar}>toggle</Button>
//     </div>
//   );
// };
// const mapStateToProps = ({ global }) => ({ global });
// const mapDispatchToProps = (dispatch) => ({
//   toggleSidebarOpened: (...rest) => dispatch(toggleSidebarOpened(...rest)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(RootApp);

import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { layoutRouteList } from '@r/utils';
import adminConfig from '@/config/adminConfig';
import style from './rootApp.scss';

function App() {
  return (
    <Suspense fallback={<Spin size="large" className={style.loading} />}>
      <BrowserRouter>
        <Switch>
          {layoutRouteList.map((route) => (
            <Route
              key={adminConfig.BASENAME + route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
