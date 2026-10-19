---
title: 首屏 4MB 是怎么砍到 1.4MB 的
date: 2025-06-20
tags: [性能, Vite]
description: 为什么「动作触发的动态 import」比「路由级懒加载」更适合工具类应用。
---

# 首屏 4MB 是怎么砍到 1.4MB 的

AI PPT 生成器的首屏一开始是 4.13MB。原因很直接：`pptxgenjs`、`pdfjs-dist`、`xlsx`、`echarts` 这四个依赖全部是静态 import，只要打开首页就全下载一遍，而用户真正用到它们平均在几分钟之后。

## 为什么路由级懒加载不够

这个应用只有一个主页面，路由懒加载帮不上忙——重依赖都在同一个页面里。

真正的分界线不是「路由」，而是**用户动作**：不点「生成 PPT」就不需要 pptxgenjs，不上传 Excel 就不需要 xlsx。

```js
// 改之前：静态引入，首屏必下载
import pptxgen from 'pptxgenjs'

// 改之后：点「生成 PPT」时才下载
const { default: pptxgen } = await import('pptxgenjs')
```

## 怎么确认没有副作用

动态 import 的风险是「点下去白屏一秒」。做法是给每个入口加 loading 态，并在构建后对比 chunk 列表：

| 指标 | 改之前 | 改之后 |
| --- | --- | --- |
| 首屏 JS | 4.13MB | 1.41MB（-53%） |
| pptxgenjs | 打包进首屏 | 独立 chunk，生成时才请求 |
| 导出流程 | 正常 | 正常（生成 / 导出 / 下载同一流程） |

另外把大模型请求挪到服务端代理（Vite proxy / Vercel Function），构建产物里搜不到任何 `sk-` 开头的字符串。

## 顺带学到的

「按需加载」不只是拆包技巧，它其实是一个产品判断：**什么算首屏**。

把「用户第一眼要看到的东西」和「用户之后才会用到的工具」分开，比单纯调构建配置更能降体积。

::: tip 项目地址
[ai-ppt-generator](https://github.com/sansanyih/ai-ppt-generator)
:::
