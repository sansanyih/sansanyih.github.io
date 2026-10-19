#!/usr/bin/env node
/**
 * 新建一篇笔记的 md（列表由 collect-posts.mjs 自动生成，无需手改 index.md）
 *
 * 用法：node scripts/new-post.mjs "文章标题" [slug]
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = join(root, 'posts')

const title = process.argv[2]
if (!title) {
  console.error('用法: node scripts/new-post.mjs "文章标题" [slug]')
  process.exit(1)
}

const now = new Date()
const pad = (n) => String(n).padStart(2, '0')
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`

const slug = process.argv[3] || `post-${date}`
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('slug 只能用英文小写字母、数字和连字符，例如 vue3-migration')
  process.exit(1)
}

if (!existsSync(postsDir)) mkdirSync(postsDir, { recursive: true })
const postPath = join(postsDir, `${slug}.md`)
if (existsSync(postPath)) {
  console.error(`已存在：posts/${slug}.md`)
  process.exit(1)
}

const template = `---
title: ${title}
date: ${date}
tags: []
description: 一句话摘要，会显示在列表、归档和搜索结果里
---

# ${title}

正文用 Markdown 写。

## 小标题

段落……

::: tip 提示
用 ::: tip 可以做一个提示框
:::
`
writeFileSync(postPath, template, 'utf8')

console.log(`已创建 posts/${slug}.md`)
console.log('写完正文后直接提交，列表会自动生成：')
console.log(`  git add . && git commit -m "post: ${title}" && git push`)
console.log('也可以在 GitHub 网页上传这个 md 文件，效果一样。')
