# Windows 桌面原型

完整解压后双击 `AnkunSimulator.exe`，不要单独移动 EXE。Windows 10/11，需已安装 Edge 或 Chrome、.NET Framework 4.x。

这是复用系统浏览器的应用窗口启动器，不是内嵌 WebView2、Electron 或 Tauri。首次游戏启动即可离线运行，不连接游戏后端；浏览器自身的后台更新行为不属于游戏请求。

游戏资源在 game/，中文扩展入口仍可直接打开。EXE 默认启动 index.html 的原在线版本。成就和结局存入专用浏览器配置；不会自动同步 GitHub Pages 的存档。当前剧情不自动恢复。

专用浏览器配置位于 `%LOCALAPPDATA%/AnkunSimulator/BrowserProfile`，网页存档同时受 file URL 影响。升级时保留同一解压路径和配置目录。若换目录，旧存档可能无法读取；正式版本应改用稳定的应用源和存档导入导出。

原型不包含安装器、签名、自动更新或独立浏览器运行时；Windows 可能提示未知发布者。请勿将它描述为正式签名安装包。

构建：在项目根目录运行 `powershell -ExecutionPolicy Bypass -File desktop/build.ps1`（需 Python 3.9+ 与系统 C# 编译器）。已有输出目录不会覆盖。

验证启动配置（不打开窗口）：`AnkunSimulator.exe --check check.txt`，退出码 0 表示资源与浏览器检测通过。此检查不等于 GUI 端到端测试。
