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

文章列表、归档、标签、篇数都由 `vitepress/scripts/collect-posts.mjs` 扫描 `posts/*.md` 自动生成，
**发布一篇文章只需要新增一个 md 文件**，不用改其他地方。

### 方式一：直接在 GitHub 网页上写（不用本地环境）

1. 打开 <https://github.com/sansanyih/sansanyih.github.io/new/main?filename=vitepress/posts/my-post.md>
2. 文件名填 `英文-slug.md`（例如 `vue3-migration.md`）
3. 内容：

```md
---
title: 文章标题
date: 2026-02-01
tags: [性能, Vite]
description: 一句话摘要，会显示在列表、归档和搜索结果里
---

正文用 Markdown 写。
```

4. 点 **Commit changes** —— Actions 自动构建，约 1 分钟后上线
   <https://sansanyih.github.io/blog/>

### 方式二：本地写（能实时预览）

```bash
cd vitepress
npm install            # 只在第一次需要
npm run new "文章标题" my-slug   # 生成 posts/my-slug.md
npm run dev            # 打开 http://localhost:5173/blog/ 实时预览
```

写完提交：

```bash
git add . && git commit -m "post: 文章标题" && git push
```

`npm run build` 会先执行 `collect` 再构建，所以线上和本地看到的一致。

### front matter 说明

| 字段 | 说明 |
| --- | --- |
| `title` | 文章标题，列表、归档、浏览器标签都用它 |
| `date` | `YYYY-MM-DD`，决定排序和分组（按年倒序） |
| `tags` | 数组，会显示在卡片上并汇总成标签栏 |
| `description` | 列表里的一句话摘要，也用于搜索结果 |

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
