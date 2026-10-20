# Windows 桌面化方案

开始评估：2026-10-04；最终原型构建：2026-10-19。当前游戏运行资源约 4.69 MB，无后端、无需 Node 运行时，无原生系统 API 需求。

## 结论

小型个人游戏的正式 EXE 首选 **Tauri + WebView2**；仅用于简历展示和轻量离线试玩时，现有网页加浏览器应用窗口更省事。本次环境有 .NET Framework 编译器和 Edge，但未检测到 Rust/Cargo 或现代 dotnet SDK，因此先实现可构建的 **C# EXE + 已安装浏览器应用窗口** 原型。原网页保持独立运行，不被桌面框架绑死。

## 比较

下列非原型大小均为工程预算估计，不是本项目实测构建值；压缩格式、架构、运行时版本会改变结果。必须把应用资源与浏览器运行时分开计算。

| 方案 | 安装包/分发大小 | HTML 改动 | 难度 | Windows | 离线 | 自动更新 | 小型个人游戏 |
|---|---|---|---|---|---|---|---|
| Electron | 常为百 MB 量级，主要来自自带 Chromium/Node；本项目未构建 | 小，增加安全主进程配置 | 中 | 以所选 Electron 版本支持为准，建议 Win10/11 | 可完整自包含 | 有 updater 机制，仍需发布服务和签名 | 快速但本项目体积成本偏高 |
| Tauri 2 | 游戏资源 + 数 MB 至数十 MB 框架开销的预算；WebView2 离线安装器/固定运行时另算 | 小，静态资源和路径配置 | 中高，Rust/MSVC/安装工具 | 建议 Win10/11，需 WebView2 | 已有运行时可离线；干净机器需离线运行时方案 | updater 插件 + 签名 + 更新源，需配置 | 正式版推荐 |
| PWA | 网站资源 + 缓存，无传统独立 EXE 安装包 | 中，manifest/service worker/缓存版本策略 | 低中 | 支持安装的现代浏览器 | 首次缓存后可离线；不等于第一次无网安装 | 由网站和 SW 更新，需避免旧缓存混用 | 在线简历演示很合适 |
| C# + WebView2 | 资源 + 较小宿主；自包含 .NET / WebView2 离线运行时会增大 | 小，虚拟域映射、存储配置 | 中，Windows 专用 | Win10/11 与所选 SDK | 需已有或随包带运行时 | 自行设计或使用安装分发服务 | 只做 Windows 时也合适 |
| 本次 EXE 启动器 | **EXE 6,144 B；完整 ZIP 4,436,224 B**，不含浏览器 | 无桌面专属网页改造 | 低 | .NET Framework 4.x + Edge/Chrome；本机 Edge 检测通过 | 已有浏览器且完整解压即可运行 | 原型无；手动替换包 | 最适合当前阶段的轻量原型 |

## 本次原型交付

- 源码：`desktop/Launcher.cs`，构建脚本：`desktop/build.ps1`。
- 本地产物：`dist/AnkunSimulator-20261019-release/AnkunSimulator.exe`、`dist/AnkunSimulator-20261019-release.zip`，不把可重建二进制提交到源码仓库。
- 游戏保留两个 HTML 入口，EXE 默认打开原在线 index 版本；资源由 `runtime-files.json` 的 18 项白名单复制。
- 通过系统目录查找浏览器，URI 编码支持中文和空格；不写死 E 盘，不启动本地网络服务，不给页面提供任意文件/命令执行接口。
- 浏览器专用配置位于 `%LOCALAPPDATA%/AnkunSimulator/BrowserProfile`，无需写安装目录。
- EXE 自检退出码 0，确认 5 项核心启动资产、浏览器路径和 file URI。打包文件与源文件逐字节核对通过。

## 明确限制

这是启动器，不是把浏览器内核编译进 EXE，也不是正式安装包。未签名、无自动更新、无卸载器；离线电脑仍需预装浏览器。WebView2 Evergreen 的自动更新是运行时更新，不是游戏自动更新。

存档不跨网页/桌面共享；file 存储受路径影响，升级应保留同一解压位置。当前存档仍只记录成就和结局。正式桌面版应固定应用源并增加明确的存档导出/迁移方案。

没有在用户日常浏览器中执行清档或读取其配置；自动测试使用临时浏览器配置。未完成 Android 真机、多版本 Windows 或安装器签名验收。

## 进入正式 Tauri 版的步骤

1. 在专用分支安装 Rust/MSVC，使用当前网页运行白名单作为 frontendDist，保留网页根目录。
2. 默认不暴露 shell/filesystem 权限；固定应用 origin，限制导航到外部站点。
3. 确认现有用户存档迁移方式后，再设计版本化存档与导入导出。
4. 在干净 Win10/Win11 虚拟机测已装/未装 WebView2；分别测联网和完全离线安装。
5. 实测 MSI/NSIS 大小、冷启动、内存；再决定是否带离线运行时。
6. 配置代码签名、更新签名和失败回滚；不能使用未签名脚本自动替换程序。

## 官方依据

- [Tauri Windows 安装器与 WebView2 分发选项](https://v2.tauri.app/distribute/windows-installer/)：支持 MSI/NSIS，可选不同 WebView2 安装策略。
- [Tauri 大小优化](https://v2.tauri.app/concept/size/)：大小取决于构建配置；没有把通用宣传大小当本项目实测值。
- [Microsoft WebView2 分发](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution)：Evergreen 共享运行时与 Fixed Version 的成本/更新责任不同，启动需检测运行时。
- [Electron 应用分发](https://www.electronjs.org/docs/latest/tutorial/application-distribution)及[更新机制](https://www.electronjs.org/docs/latest/tutorial/updates)：打包和自动更新是需要分别配置的步骤。
- [Microsoft PWA 概览](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps/)：浏览器安装、离线能力依赖 Web 应用能力，不能当作无需缓存的离线 EXE。
