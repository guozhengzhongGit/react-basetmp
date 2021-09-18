import React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Avatar } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { toggleSidebarOpened } from '@s/modules/global/action';
import style from './index.scss';

const menuStyle = {
  display: 'block',
};

const BusinessLayoutHeader = (props) => {
  const { userInfo, logout, sidebarIsOpen } = props;
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span style={menuStyle}>个人中心</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span onClick={logout} style={menuStyle}>
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  );
  const toggleCollapsed = () => {
    props.changeCollapsed(!sidebarIsOpen);
  };
  return (
    <header
      className={
        sidebarIsOpen
          ? `${style.businessLayoutHeader}`
          : `${style.businessLayoutHeader} ${style.businessLayoutHeaderWhenClose}`
      }
    >
      <div className={style.collapsed} onClick={toggleCollapsed}>
        {sidebarIsOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <div className={style.userAvatarOuter}>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Avatar src={userInfo.avatar} />
            <span className={style.userName}>欢迎您，{userInfo.nickname}</span>
          </a>
        </Dropdown>
      </div>
    </header>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeCollapsed: (...params) => dispatch(toggleSidebarOpened(...params)),
  };
};
export default connect(
  ({ global }) => ({
    userInfo: global.userInfo,
    sidebarIsOpen: global.sidebarIsOpen,
  }),
  mapDispatchToProps
)(BusinessLayoutHeader);
