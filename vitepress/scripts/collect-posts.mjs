#!/usr/bin/env node
/**
 * 扫描 posts/*.md，把文章列表、归档、标签、篇数写回 index.md / archive.md。
 * 构建前自动执行（npm run build 会先跑它），所以新增文章只要放一个 md 文件。
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = join(root, 'posts')

const files = readdirSync(postsDir).filter((f) => f.endsWith('.md'))

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/)
    if (!m) continue
    const [, key, valueRaw] = m
    let value = valueRaw.trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    } else {
      value = value.replace(/^['"]|['"]$/g, '')
    }
    data[key] = value
  }
  return data
}

const posts = files
  .map((file) => {
    const slug = file.replace(/\.md$/, '')
    const raw = readFileSync(join(postsDir, file), 'utf8')
    const fm = parseFrontmatter(raw)
    const date = String(fm.date || '').slice(0, 10)
    return {
      slug,
      title: fm.title || slug,
      date,
      year: date.slice(0, 4) || '—',
      md: date.slice(5, 10),
      tags: Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : [],
      summary: fm.description || ''
    }
  })
  .filter((p) => p.date)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

const byYear = new Map()
for (const post of posts) {
  if (!byYear.has(post.year)) byYear.set(post.year, [])
  byYear.get(post.year).push(post)
}
const years = [...byYear.keys()].sort((a, b) => Number(b) - Number(a))

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* ---------- 首页列表 ---------- */
const cards = years
  .map((year) => {
    const items = byYear
      .get(year)
      .map(
        (p) => `<a class="post-item" href="./posts/${p.slug}">
  <span class="post-item__meta">${p.date} · ${p.tags.length ? esc(p.tags.join(' / ')) : '笔记'}</span>
  <span class="post-item__title">${esc(p.title)}</span>
  <p class="post-item__summary">${esc(p.summary)}</p>
</a>`
      )
      .join('\n\n')
    return `## ${year}\n\n${items}`
  })
  .join('\n\n')

/* ---------- 归档 ---------- */
const archive = years
  .map((year) => {
    const rows = byYear
      .get(year)
      .map(
        (p) => `<a class="archive-row" href="./posts/${p.slug}">
  <span class="archive-row__date">${p.md}</span>
  <span class="archive-row__title">${esc(p.title)}</span>
  <span class="archive-row__tags">${esc(p.tags.join(' · '))}</span>
</a>`
      )
      .join('\n\n')
    return `## ${year}\n\n${rows}`
  })
  .join('\n\n')

/* ---------- 标签 ---------- */
const tagCount = new Map()
for (const post of posts) {
  for (const tag of post.tags) tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
}
const tags = [...tagCount.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .map(([tag]) => `<a class="blog-tag" href="#${esc(tag)}">${esc(tag)}</a>`)
  .join('\n  ')

/* ---------- 写回 ---------- */
function replaceBetween(doc, startMarker, endMarker, body) {
  const start = doc.indexOf(startMarker)
  const end = doc.indexOf(endMarker)
  if (start < 0 || end < 0) return doc
  return doc.slice(0, start + startMarker.length) + '\n' + body + '\n' + doc.slice(end)
}

const indexPath = join(root, 'index.md')
let index = readFileSync(indexPath, 'utf8')
index = replaceBetween(index, '<!-- POSTS:START -->', '<!-- POSTS:END -->', cards)
index = replaceBetween(index, '<!-- TAGS:START -->', '<!-- TAGS:END -->', tags)
index = index.replace(/<!-- COUNT:START -->.*?<!-- COUNT:END -->/, `<!-- COUNT:START -->共 ${posts.length} 篇笔记<!-- COUNT:END -->`)
writeFileSync(indexPath, index, 'utf8')

const archivePath = join(root, 'archive.md')
let archiveDoc = readFileSync(archivePath, 'utf8')
archiveDoc = replaceBetween(archiveDoc, '<!-- ARCHIVE:START -->', '<!-- ARCHIVE:END -->', archive)
writeFileSync(archivePath, archiveDoc, 'utf8')

console.log(`已同步 ${posts.length} 篇文章：${posts.map((p) => p.slug).join(', ') || '(无)'}`)
