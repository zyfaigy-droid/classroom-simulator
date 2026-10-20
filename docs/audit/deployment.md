# 发布与原链接验收（2026-10-20）

## 当前结果

用户恢复 Git 登录后，CLI 凭据可用；fetch 核对远程 main 无新增冲突，普通快进推送提交 `17c1a6827f48d3d20a53ecaf9d2ed2d19364ac72` 成功，ls-remote 确认 main 指向该提交。未改仓库名、入口名或 Pages 设置，未强推。

- 原根页面与中文入口实际请求均 HTTP 200，包含本次共享引擎与各自剧情脚本。
- 线上主回归 **1084 项通过、0 失败**，243 场景、683 次选项操作，18 项当时运行资源全部 HTTP 200 且内容匹配。证据：`remote-browser.json`。
- 两入口各 11 个正式结局从开局正常点击到达；累计原指定 8 结局后的寄语、零元贷款返回并支付均通过。证据：`remote-endings.json`，complete=true、failed=[]。
- 线上与本地测试项相差 file:// 检查；不能把 HTTP 结果代替本地文件运行验收。

后续提交 `c2dbdc2ca625435fbdf9f016278f8d440d91a460` 增加可选试玩统计，已正常推送 main 并完成实际部署验收。全部 20 项运行资源 HTTP 200、内容哈希与源一致；两入口实际开局无 JS 错误，自动化没有上报统计；不带查询参数的原根 URL 也 HTTP 200 且含统计脚本。证据：`remote-final-assets.json`，complete=true、failed=[]。

本地最终主回归 **1094 项通过、0 失败**，统计 8 项单元及两个 HTML 的真实浏览器模拟集成通过，20 项桌面资源与源字节相同，EXE 自检退出码 0。此后归档报告的提交仅更新文档/证据，不改变已验收运行资源。

## 私有统计边界

本人已提供 Umami Website ID，配置不含后台读取密钥，没有公开人数接口或公开分享链接。仅正式在线点击开始后记录；模拟测试不会制造真实玩家。官方脚本请求 HTTP 200，但真实后台入库和账号分享设置仍需本人登录确认。本次没有读取后台数据，历史试玩人数为未知。方案与指标见 `../ANALYTICS.md`。

GitHub 公共 Actions API 在当前网络出口触发速率限制，因此使用实际页面与资源内容验证部署，未声称查询到工作流成功状态。初次线上回归因大 PNG 超过 30 秒中止，并非 404；增加可选 AUDIT_PROXY 和远程整文件获取超时后重跑通过。代理地址不进入游戏代码。

远程重验需 AUDIT_URL 以 `/` 结尾，必要时设置 AUDIT_PROXY；用 AUDIT_ENDING_OUTPUT 写入独立远程证明，不覆盖本地记录。测试使用临时上下文，不清除个人存档。

## 以下为凭据恢复前的历史阻塞记录（已由上述发布结果取代）

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
