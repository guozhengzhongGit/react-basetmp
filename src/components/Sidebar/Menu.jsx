import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  CopyOutlined,
  HighlightOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

const iconMap = {
  HomeOutlined: <HomeOutlined />,
  UserOutlined: <UserOutlined />,
  CopyOutlined: <CopyOutlined />,
  HighlightOutlined: <HighlightOutlined />,
  LineChartOutlined: <LineChartOutlined />,
};

function renderTitle(meta) {
  return (
    <span>
      {meta.icon && iconMap[meta.icon]}
      <span className="menu-title"> {meta.title} </span>
    </span>
  );
}

function renderMenuRoute(menu) {
  return (
    <Menu.Item key={menu.path}>
      <Link to={menu.path}>{renderTitle(menu.meta)}</Link>
    </Menu.Item>
  );
}

function renderSubMenu(menu) {
  return (
    <Menu.SubMenu title={renderTitle(menu.meta)} key={menu.path}>
      {menu.children.map((item) =>
        item.children.length ? renderSubMenu(item) : renderMenuRoute(item)
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
