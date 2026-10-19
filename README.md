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

### 发一篇新文章（一条命令）

```bash
cd vitepress
node scripts/new-post.mjs "文章标题" my-slug
```

脚本会做三件事：生成 `posts/my-slug.md`（带 front matter 模板）、在首页列表按年份插入卡片、在归档页插入一行，并把「共 N 篇笔记」加一。

然后：

1. 打开 `vitepress/posts/my-slug.md` 写正文，补 `tags` 和 `description`
2. 改 `vitepress/index.md` 里那张卡片的 `标签` 和 `一句话摘要`（脚本生成的是占位文字）
3. `git add . && git commit -m "post: 文章标题" && git push` —— Actions 自动构建发布，约 1 分钟

### 手动发（不想用脚本）

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

2. 在 `vitepress/index.md` 的对应年份下加一张卡片（`<a class="post-item" href="./posts/文件名">`）
3. 在 `vitepress/archive.md` 加一行（`<a class="archive-row" ...>`），并把左栏「共 N 篇笔记」加一
4. `git push`

### 本地预览

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
