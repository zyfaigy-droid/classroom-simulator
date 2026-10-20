# 发布状态（2026-10-20）

本地审计、内容更新、回归和桌面打包已完成。**新版尚未同步到 GitHub，尚未完成更新后的线上验收。**

目标仓库：zyfaigy-droid/classroom-simulator。原试玩地址：https://zyfaigy-droid.github.io/classroom-simulator/ 。仓库名、Pages 发布路径、index 与中文入口均保留。

2026-10-11 原网页检查：HTTP 200；Content-Length 162073；Last-Modified 2026-09-16。2026-10-20 只读查询最新仓库提交仍为 fb10939ca36e8353e0d4ecc345a2bb03d5bbb22e。它仍是旧版，不将旧版正常响应写成新版上线成功。今日复查原 URL 时，本机代理连接被拒绝，网页读取工具也不可达，因此不能以历史结果保证今日网络可用。

阻塞证据：

- 普通 Git 连接经 Windows 现有代理恢复；推送检查无可用凭据，返回 Cannot prompt because user interactivity has been disabled。
- GitHub 连接器读取账号及仓库成功，账号仓库角色显示可 push；但是实际 create-blob 写入返回 HTTP 403 Resource not accessible by integration。仓库角色与连接器令牌的写入范围不同。
- 未提交任何新的远程 commit，未移动 main 引用，未改 Pages 设置；已生成待发布源文件白名单。

需要完成 GitHub 登录或给现有 GitHub 集成授权此仓库的写入范围。不要粘贴密码或 Token 到聊天。授权恢复后按以下顺序继续：

1. 获取远程最新 main，若有新改动先核对，不强推。
2. 仅提交本次游戏、报告、测试及桌面源码；dist、个人文档、浏览器配置不提交。
3. 普通快进推送；保留原 root/index/中文路径。
4. 等待 Pages 部署完成；比对两个 HTML、共享脚本与所有 18 项运行资源。
5. 针对同一 URL 运行 tests/browser-audit.cjs（AUDIT_URL 为发布根地址），检查所有场景、新反击正序/逆序、音乐、成就和清档；使用临时浏览器上下文。
   再运行 `npm run test:endings`（设置同一 AUDIT_URL），真实点击复核两个入口各 11 个正式结局、累计终章和零元贷款流程。
6. 线上验收通过后，把实际提交 SHA、部署结果和远程测试 JSON 补入此记录。

如需回滚，应以正常 revert 提交恢复原基线网页代码，保留媒体原件；不 reset/force-push 删除历史。
