# react-basetmp
## HMR react-refresh
对于 Class 类组件，react-refresh 会一律重新刷新(remount)，已有的 state  会被重置

而对于函数组件，react-refresh 则会保留已有的 state

所以 react-refresh 对函数类组件体验会更好

但使用 react hooks 时，useEffect、useCallback、useMemo 等会重新执行

可以在文件中添加以下注释使得每次热更新都会 remount
```
/* @refresh reset */
```
## 禁用 eslint
```
/* eslint-disable */
alert('foo');
/* eslint-enable */
```
或者
```
/* eslint-disable no-alert, no-console */

alert('foo');
console.log('bar');

/* eslint-enable no-alert, no-console */
```
或者
```
// eslint-disable-line
/* eslint-disable-line */
// eslint-disable-next-line
/* eslint-disable-next-line */
```

## commit lint

```
build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
docs：文档更新
feat：新增功能
merge：分支合并 Merge branch ? of ?
fix：bug 修复
perf：性能, 体验优化
refactor：重构代码(既没有新增功能，也没有修复 bug)
style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
test：新增测试用例或是更新现有测试
revert：回滚某个更早之前的提交
chore：不属于以上类型的其他类型
```
## npm run dev 启动开发模式
需要 https 服务的，可修改 package.json 中的 dev 脚本，在最后添加 --https 即可
