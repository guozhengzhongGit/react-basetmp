import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  DashboardOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import adminConfig from '@/config/adminConfig';

const iconMap = {
  MenuUnfoldOutlined: <MenuUnfoldOutlined />,
  MenuOutlined: <MenuOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  ReadOutlined: <ReadOutlined />,
};

function renderTitle(meta) {
  /* eslint-disable no-confusing-arrow */
  return (
    <span className="menu-item-inner">
      {meta.icon && iconMap[meta.icon]}
      <span className="menu-title"> {meta.title} </span>
    </span>
  );
}

function renderMenuRoute(menu) {
  return (
    <Menu.Item key={adminConfig.BASENAME + menu.path}>
      <Link to={menu.path}>{renderTitle(menu.meta)}</Link>
    </Menu.Item>
  );
}

function renderSubMenu(menu) {
  return (
    <Menu.SubMenu
      title={renderTitle(menu.meta)}
      key={adminConfig.BASENAME + menu.path}
    >
      {menu.children.map((item) =>
        item.children ? renderSubMenu(item) : renderMenuRoute(item)
      )}
    </Menu.SubMenu>
  );
}

function renderMenu(menu) {
  if (menu.children) {
    return renderSubMenu(menu);
  }

  return renderMenuRoute(menu);
}

export default renderMenu;
