# 个人主页 · sansanyih.github.io

在线地址：**https://sansanyih.github.io/**
技术笔记：**https://sansanyih.github.io/blog/**

主站是纯 HTML / CSS / 原生 JS 的静态页面（无框架、无构建）；博客在 `/blog/` 子目录，用 VitePress 从 Markdown 构建。

## 结构

| 路径 | 内容 |
| --- | --- |
| `index.html` / `styles.css` / `content.js` / `main.js` | 主站（作品、方法、经历、联系） |
| `vitepress/` | 博客源码（Markdown + 主题配置） |
| `vitepress/posts/*.md` | 文章 |
| `.github/workflows/deploy.yml` | 构建博客 + 部署整站到 GitHub Pages |

## 主站

- 内容集中在 `content.js`，`main.js` 只负责渲染与交互
- 三个作品卡片，点开是详情弹层（多图、正文、指标、链接）
- 响应式断点 960px / 560px；图片带 `alt`，尊重「减少动态效果」设置
- 视觉：近黑底 + 单一强调色 `#ff5a3c`

## 博客（VitePress）

写一篇新文章的流程：

1. 在 `vitepress/posts/` 新建 Markdown，文件头写 front matter：

```md
---
title: 文章标题
date: 2026-01-12
tags: [重构, uni-app]
description: 一句话摘要，会出现在列表和搜索结果里
---

正文……
```

2. 在 `vitepress/index.md` 的列表里加一张卡片（指向 `./posts/你的文件名`）
3. `git push` —— GitHub Actions 会自动跑 `vitepress build`，把产物放进 `/blog/` 并部署

本地预览：

```bash
cd vitepress
npm install
npm run dev      # http://localhost:5173/blog/
```

## 部署

GitHub Pages 的 source 设为 **GitHub Actions**（不是分支部署），因为博客需要构建。
`.github/workflows/deploy.yml` 会：装依赖 → `vitepress build` → 把主站文件 + 博客产物组装成 `_site/` → 上传发布。

## 本地预览主站

```bash
npx serve .
```

## 联系

shensiyu144@gmail.com · [GitHub](https://github.com/sansanyih)
