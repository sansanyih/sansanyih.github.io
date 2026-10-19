#!/usr/bin/env node
/**
 * 新建一篇笔记：生成 md + 自动在首页列表和归档页插入条目 + 更新篇数
 *
 * 用法：
 *   node scripts/new-post.mjs "文章标题"
 *   node scripts/new-post.mjs "文章标题" my-slug
 *
 * 生成后：写正文 → git add . && git commit -m "post: xxx" && git push
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = join(root, 'posts')

const title = process.argv[2]
if (!title) {
  console.error('用法: node scripts/new-post.mjs "文章标题" [slug]')
  process.exit(1)
}

const today = new Date()
const pad = (n) => String(n).padStart(2, '0')
const date = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
const year = String(today.getFullYear())
const md = `${pad(today.getMonth() + 1)}-${pad(today.getDate())}`

const argSlug = process.argv[3]
const slug =
  argSlug ||
  `post-${date}`
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

const frontmatter = `---
title: ${title}
date: ${date}
tags: []
description: 一句话摘要，会显示在列表和搜索结果里
---

# ${title}

正文用 Markdown 写。

## 小标题

段落……

\`\`\`js
// 代码块
\`\`\`
`
writeFileSync(postPath, frontmatter, 'utf8')

/* ---------- 首页列表 ---------- */
const indexPath = join(root, 'index.md')
let index = readFileSync(indexPath, 'utf8')
let archive = readFileSync(join(root, 'archive.md'), 'utf8')

const card = `<a class="post-item" href="./posts/${slug}">
  <span class="post-item__meta">${date} · 标签</span>
  <span class="post-item__title">${title}</span>
  <p class="post-item__summary">一句话摘要</p>
</a>

`

const row = `<a class="archive-row" href="./posts/${slug}">
  <span class="archive-row__date">${md}</span>
  <span class="archive-row__title">${title}</span>
  <span class="archive-row__tags">标签</span>
</a>

`

function insertUnderYear(doc, year, block) {
  const heading = `## ${year}`
  const idx = doc.indexOf(heading)
  if (idx >= 0) {
    const insertAt = idx + heading.length + 1
    return doc.slice(0, insertAt) + '\n' + block + doc.slice(insertAt)
  }
  // 没有该年份：按年份倒序插到第一个年份标题之前
  const firstYear = doc.match(/^## (\d{4})$/m)
  if (firstYear) {
    const at = doc.indexOf(firstYear[0])
    return doc.slice(0, at) + `${heading}\n\n${block}` + doc.slice(at)
  }
  const foot = doc.indexOf('<p class="blog-foot">')
  if (foot >= 0) return doc.slice(0, foot) + `${heading}\n\n${block}` + doc.slice(foot)
  return doc.replace(/<\/div>\s*<\/div>\s*$/, `${heading}\n\n${block}</div>\n</div>\n`)
}

index = insertUnderYear(index, year, card)
archive = insertUnderYear(archive, year, row)

// 更新「共 N 篇笔记」
const countMatch = index.match(/共 (\d+) 篇笔记/)
if (countMatch) {
  index = index.replace(countMatch[0], `共 ${Number(countMatch[1]) + 1} 篇笔记`)
}

writeFileSync(indexPath, index, 'utf8')
writeFileSync(join(root, 'archive.md'), archive, 'utf8')

console.log(`已创建 posts/${slug}.md`)
console.log('已在 index.md 与 archive.md 插入条目')
console.log('')
console.log('接下来：')
console.log('  1. 打开文件写正文、补 tags 与 description')
console.log('  2. 本地预览: npm run dev  → http://localhost:5173/blog/')
console.log('  3. 发布: git add . && git commit -m "post: ' + title + '" && git push')
