import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import renderMenu from './Menu';
import { getPagePathList } from '@r/utils';

import style from './index.scss';

function LayoutSideBar({ themeStyle, layoutStyle, sidebarIsOpen, routes }) {
  const inlineCollapsed = {};

  if (layoutStyle === 'side') {
    inlineCollapsed.inlineCollapsed = !sidebarIsOpen;
  }

  const { pathname } = window.location;

  return (
    <aside className={style.leftSidebar}>
      <div className={style.leftSidebarLogoContainer}>
        <h1>react</h1>
      </div>
      <div className={style.leftSidebarMenuContainer}>
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={
            layoutStyle === 'side' && sidebarIsOpen
              ? getPagePathList(pathname)
              : []
          }
          mode={layoutStyle === 'side' ? 'inline' : 'horizontal'}
          theme={themeStyle}
          {...inlineCollapsed}
        >
          {routes.map((menu) => renderMenu(menu))}
        </Menu>
      </div>
    </aside>
  );
}

const mapStateToProps = (state) => {
  const { theme, routes, sidebarIsOpen } = state.global;
  return {
    themeStyle: theme.themeStyle,
    layoutStyle: theme.layoutStyle,
    sidebarIsOpen,
    routes,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSideBar);
