import React from 'react';
import 'bytemd/dist/index.min.css';
import { Viewer } from '@bytemd/react';
import 'juejin-markdown-theme-cyanosis';
import styles from './style.scss';
import 'highlight.js/styles/atom-one-light.css';

const value = `## 系统简介
**admin 管理工具**
> 工程构建
- 使用 \`webpack\` 从零搭建项目框架
- 跟进最新 \`web\` 标准，拥抱现代技术 \`api\`
    - ES2015+-
    - 全面使用 \`react-hooks\` ，抛弃 \`class\` 组件
    - 使用 \`Suspense\` 与 \`React.lazy\` 所以组件基于路由异步加载  
> 业务设计
- 动态权限设计，路由菜单动态获取，用户角色权限动态分配
> 信息安全
- **全站升级为基于 \`TLS 1.3\` 的 \`HTTPS\` 协议**
- 全站支持 \`HTTP2\`
- 敏感信息(如密码等)加密处理，防止明文传输可能带来的安全漏洞
## 技术栈
### 前端
- 视图框架：\`React\`
- UI 组件：\`Antd For React\`
- 状态管理：\`redux\`、\`react-redux\`、\`immer\`、\`redux-logger\`
- 接口请求：\`axios\`
- - -
### 后端
- 框架：\`egg\`
- 数据库: \`MySQL\`
### TODO
- 用户登录
- 注册用户
- 上传工具
- 自动登录(待开发)
- 忘记密码(待开发)
- PWA(待开发)
### fix
- 浏览器标签页信息同步
- 侧边栏收缩状态下菜单悬浮
`;

const Welcome = () => {
  return (
    <div className={styles.welcomeOuter}>
      <div className={styles.contentContainer}>
        <Viewer value={value} />
      </div>
      <div className={styles.previewImg}>
        <img
          src="https://qiniucdn.airbry.com/welcome-31caea1c50b2725e30fb131df93aa78130799fe26527ecbccafd06d30c66d3e9.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Welcome;
