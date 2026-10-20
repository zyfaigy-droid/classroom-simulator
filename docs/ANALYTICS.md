# 仅本人可见的试玩统计

## 当前状态

2026-10-20 检查原始及当前游戏代码，未发现此前的统计接入。因此历史试玩人数为 **未知**，不是 0，也不能用仓库浏览量或克隆数代替。GitHub Traffic 统计的是仓库流量：[官方说明](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository)。

选用 Umami Cloud Hobby。本人已完成注册并提供 Website ID，已写入配置并在 c2dbdc2 发布，线上 20 项资源与两入口已核对；只统计此后的正式开始。当前没有后台读取权限或历史记录，不能声称已经查到真实人数。游戏同步、脚本触发和后台入库分别验收。

## 方案与口径

- 仅在线正式域名 `zyfaigy-droid.github.io/classroom-simulator/` 启用；直接打开文件、桌面包、本地服务器和自动化浏览器不请求统计服务。
- 首次点击“正式进入游戏”后才加载统计脚本并手动发送一次页面记录与 `game_start` 事件。本页点击重开不会再次记录，刷新页面后可以再次记录。
- Umami 后台选定时间范围的 Visitors 用作“试玩独立访客估算”；`game_start` 为发生正式开始的页面次数，不等于现实中的自然人数。这里没有首页打开即计为试玩的逻辑。
- Umami 根据站点、IP、User-Agent 和轮换盐计算会话标识；同一网络/浏览器可能合并，换设备或跨轮换周期可能重复。我们不额外设置持久玩家 ID，也不上传存档、背包或剧情选择。
- 不启用自动页面/点击追踪、录屏或热力图；统计服务失败不阻止游戏，不弹错误窗。
- URL 增加 `?analytics=off` 可关闭本页统计，适合本人验收；自动化测试默认通过 webdriver 标记跳过。

指标定义依据：[Umami 指标定义](https://docs.umami.is/docs/metric-definitions)、[手动追踪配置](https://docs.umami.is/docs/tracker-configuration)。IP 仍会经统计服务进行请求处理，不能将此描述为完全不处理网络身份信息。

## 账号与接入

1. 由本人在 [Umami Cloud](https://cloud.umami.is/signup) 完成免费账号注册。不要选择付费试用或填写付款信息。
2. 添加网站，域名填写 `zyfaigy-droid.github.io`。两个游戏入口共用同一个网站记录。
3. 保持 Share URL / 公开分享关闭，不邀请其他成员。Umami 的网站指标默认私有：[官方说明](https://docs.umami.is/docs/enable-share-url)。
4. 复制跟踪代码中的 Website ID，填写到 `assets/analytics-config.js`。该 ID 是公开的收集标识，不能据此读取后台；账号密码、API Key、分享密钥不能写入仓库。
5. 发布后本人用普通浏览器点击开始，登录后台检查事件和访客数据；再用未登录浏览器确认没有公开统计页。未完成这个验收前，不把脚本测试写成真实数据已到账。

## 免费方案边界

官方当前 Hobby 为每月 100,000 个事件、1 个网站、保留 6 个月。页面记录和自定义事件都占用额度；每次有效开始至少产生两条记录。超过保留期不能从后台补回全部历史，长期累计需本人定期导出留档。以 [官方价格页](https://umami.is/pricing) 的实际方案为准，本项目不自动升级或开通付费。

## 实现与验证

统计为独立可选脚本，不改剧情引擎、结局或存档语义。将 Website ID 清空即可停用；客户端没有任何读取统计数据的 API 密钥或公开人数接口。后台是否开启分享仍由账号本人控制，本次没有创建分享链接或邀请成员。

`node tests/analytics.cjs` 检查正式开始触发、未配置/本地/自动化禁用、单页去重、延迟加载及异常隔离。它使用模拟服务，不会制造真实玩家数据。

`node tests/analytics-browser.cjs` 用真实 Edge 加载两个实际 HTML 的 DOM，模拟统计服务并验证开局跳转与单页去重；不向真实后台制造测试玩家。本人可打开在线游戏点击开始，然后在 Umami 的 Realtime / Events 中查看 `game_start`；只有在真实后台看到事件后才能确认该次实际入库。
