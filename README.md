# Classroom Simulator / 课堂互动模拟器

一个基于 **HTML、CSS 与原生 JavaScript** 开发的单页互动剧情模拟项目，用于个人作品集与前端交互展示。

> 在线体验：https://zyfaigy-droid.github.io/classroom-simulator/

## 项目简介

项目以课堂场景为基础，通过分支剧情、状态变化、道具收集与成就记录构成互动体验。玩家在不同场景中做出选择，后续剧情会根据当前状态与已触发事件继续推进。

## 主要功能

- 分支剧情系统：不同选择会进入不同场景与后续事件。
- 状态数值系统：包含理智、金钱、尊严等状态，并随剧情动态变化。
- 道具与成就：剧情过程中可获得道具并记录成就。
- 进度保存：使用浏览器本地存储保存游戏进度，可继续上次体验。
- 作品阅读入口：在页面中整合部分文本与图片内容，作为剧情和世界观扩展。
- 纯前端运行：无需后端服务，打开网页即可运行。

## 技术实现

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- Git / GitHub
- GitHub Pages

项目当前采用单页结构，核心界面、场景数据与交互逻辑均由前端实现。

## 在线运行

直接访问 GitHub Pages：

https://zyfaigy-droid.github.io/classroom-simulator/

也可以下载仓库后直接打开 `index.html` 运行。

## 项目结构

```text
classroom-simulator/
├── index.html          # 主页面与核心交互逻辑
├── *.jpg / *.png       # 页面及剧情图片资源
├── *.txt / *.docx      # 部分扩展作品与文本资源
└── README.md           # 项目说明
