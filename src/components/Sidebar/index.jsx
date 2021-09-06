import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
// import renderMenu from './Menu';
import { getPagePathList } from '@r/utils';
import logo from '@a/imgs/logo.png';
import {
  HomeOutlined,
  UserOutlined,
  CopyOutlined,
  HighlightOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

import style from './index.scss';

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

function LayoutSideBar(props) {
  const {
    themeStyle,
    layoutStyle,
    sidebarIsOpen,
    routes,
    curBusinessPath,
    rootMenuKeys,
  } = props;
  const inlineCollapsed = {};

  const [selectMenuInfo, setSelectMenuInfo] = useState({
    openKeys: [''],
    selectedKeys: [''],
    itemName: '',
  });

  useEffect(() => {
    const { pathname } = window.location;
    setSelectMenuInfo((prev) => ({
      ...prev,
      selectedKeys: [pathname],
      openKeys: getPagePathList(pathname),
    }));
  }, [curBusinessPath]);

  if (layoutStyle === 'side') {
    inlineCollapsed.inlineCollapsed = !sidebarIsOpen;
  }

  const onOpenChange = (keys) => {
    const { openKeys } = selectMenuInfo;
    const latestOpenKeys = keys.find((key) => !openKeys.includes(key));
    if (rootMenuKeys.indexOf(latestOpenKeys) === -1) {
      setSelectMenuInfo((prev) => ({
        ...prev,
        openKeys: keys,
      }));
    } else {
      setSelectMenuInfo((prev) => ({
        ...prev,
        openKeys: keys,
      }));
    }
  };

  const gotoPathView = (innerMenu) => {
    props.history.push(innerMenu.path);
    setSelectMenuInfo((prev) => ({
      ...prev,
      selectedKeys: innerMenu.path,
    }));
  };

  const renderMenu = (innerMenu) => {
    return (
      <Menu.Item key={innerMenu.path} onClick={() => gotoPathView(innerMenu)}>
        <span>{renderTitle(innerMenu.meta)}</span>
      </Menu.Item>
    );
  };

  const renderSubMenu = (menuItem) => {
    return (
      <Menu.SubMenu key={menuItem.path} title={renderTitle(menuItem.meta)}>
        {menuItem.children.map((inner) =>
          inner.children && inner.children.length
            ? renderSubMenu(inner)
            : renderMenu(inner)
        )}
      </Menu.SubMenu>
    );
  };

  // console.log(getPagePathList(pathname), curBusinessPath);

  return (
    <aside className={style.leftSidebar}>
      <div className={style.leftSidebarLogoContainer}>
        <div className={style.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={style.systemName}>react base Admin</div>
      </div>
      <div className={style.leftSidebarMenuContainer}>
        <Menu
          onOpenChange={onOpenChange}
          selectedKeys={selectMenuInfo.selectedKeys}
          openKeys={
            layoutStyle === 'side' && sidebarIsOpen
              ? selectMenuInfo.openKeys
              : []
          }
          mode={layoutStyle === 'side' ? 'inline' : 'horizontal'}
          theme={themeStyle}
          {...inlineCollapsed}
        >
          {routes.map((routeItem) =>
            routeItem.children && routeItem.children.length
              ? renderSubMenu(routeItem)
              : renderMenu(routeItem)
          )}
        </Menu>
      </div>
    </aside>
  );
}

const mapStateToProps = (state) => {
  const { theme, routes, sidebarIsOpen, curBusinessPath, rootMenuKeys } =
    state.global;
  return {
    themeStyle: theme.themeStyle,
    layoutStyle: theme.layoutStyle,
    sidebarIsOpen,
    routes,
    curBusinessPath,
    rootMenuKeys,
  };
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LayoutSideBar));
