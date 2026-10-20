# Classroom Simulator / 安K模拟器

基于 HTML、CSS 和原生 JavaScript 的 Galgame / 互动剧情项目：通过选择改变理智、金钱与尊严，探索不同事件、作品和结局。

**[在线试玩](https://zyfaigy-droid.github.io/classroom-simulator/)** · [中文扩展剧情入口](https://zyfaigy-droid.github.io/classroom-simulator/%E5%AE%89%E5%A0%83%E6%A8%A1%E6%8B%9F%E5%99%A8.html)

## 运行

直接访问在线试玩，或下载完整仓库后双击 `index.html`。无需安装 Node、Python 或后端服务即可游玩。请保留 assets 文件夹和所有配套素材。

`index.html` 与 `安堃模拟器.html` 保留了两个不同版本的剧情和结局规则，原有 113 / 118 个场景；新增短事件后为 119 / 124 个场景；不要用其中一个文件覆盖另一个。

音乐在点击“播放 BGM”后加载。浏览器只保存**已解锁成就和结局**，不保存当前场景、背包或本局数值；“重新开局”保留成就，“清空存档”需确认后清除。不同浏览器、网页与 file 入口的存档不自动互通。

## 功能与实现

- 抬头、一米距离、恋爱怪论三张短事件，选择后有简短反击回应。
- 数据驱动的分支剧情、数值变化、道具收集与多结局。
- 作品文本/图片阅读器和条件触发的作品入口。
- localStorage 成就记录、手动循环背景音乐。
- 原生 DOM 与 CSS Grid 响应式界面，无运行时第三方依赖。
- 两版本共享渲染和交互引擎，各自保留剧情数据与毕业判定。
- 两版本各 11 个正式结局均有从开局正常点击到达的无贷款路线；贷款是一次性可选救济，申请前显示代价。详见 [结局与贷款验证](ENDING_REACHABILITY.md)。
- 可选试玩统计仅在正式在线点击开始后记录，游戏页面不公开人数；离线游玩不连接统计服务。后台和统计口径见 [试玩统计说明](docs/ANALYTICS.md)。

## 目录

```text
index.html / 安堃模拟器.html   网页入口
assets/game.css               共用样式
assets/game.js                共用状态、渲染与交互
assets/story-*.js             两版本剧情和毕业规则
*.jpg / *.png / *.mp3         图片与音乐
*.txt / *.docx                保留的作品原件
runtime-files.json            桌面打包资源白名单
desktop/                      Windows 原型源码与构建
tests/                        浏览器、打包测试与基线快照
tools/                        资源扫描和打包工具
docs/audit/                   测试和审计证据
```

## 开发与验证

游戏本身不需要构建。以下依赖只用于开发测试：Node.js、Playwright（已验证工具版本 1.62.1）、Python 3.9+；图片信息扫描可选安装 Pillow。

```powershell
npm install
npm run check
# 默认使用已安装的 Edge；所有测试使用独立临时配置，不清除个人存档。
npm test
npm run test:endings
node tests/analytics-browser.cjs
python -m unittest discover -s tests -p test_package.py -v
python tools/inventory.py . --exclude dist --exclude node_modules --exclude __pycache__ --output test-results/inventory.json
```

浏览器测试启动仅绑定 127.0.0.1 的临时 HTTP 服务，结束后关闭；结果写入 test-results。若需 Chrome，设置 `AUDIT_CHANNEL=chrome` 并预先安装 Chrome。若需远程验收，设置 `AUDIT_URL` 为同一项目的发布根 URL（结尾 `/`）。

网络需要代理时，测试可通过 `AUDIT_PROXY` 指定代理地址。远程结局证据可用 `AUDIT_ENDING_OUTPUT` 写入独立 JSON，避免覆盖本地记录。自动化浏览器不向真实统计后台添加试玩。

## Windows 原型

在 Windows 中运行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File desktop/build.ps1
```

输出 `dist/AnkunSimulator.zip`。完整解压后打开 EXE；需 Edge 或 Chrome 和 .NET Framework 4.x。这是浏览器应用窗口启动器，**不是内嵌浏览器或正式安装器**，不带签名或自动更新。源码仓库不提交可重建 EXE。详见 [桌面方案](DESKTOP_PLAN.md)。

## 审计

- [软件工程审计](PROJECT_AUDIT.md)
- [资源统计与保留核对](RESOURCE_REPORT.md)
- [桌面化方案](DESKTOP_PLAN.md)
- [修改记录](CHANGELOG.md)
- [全结局可达性与贷款验证](ENDING_REACHABILITY.md)
- [部署验证](docs/audit/deployment.md)

所有疑似未使用剧情/素材保留；测试范围和 Chrome/Android 真机等未验证项在审计中明确列出。
