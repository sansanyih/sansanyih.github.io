/**
 * 渲染与交互 —— 内容全部来自 content.js，这里只负责「怎么呈现」
 */
;(function () {
  const S = window.SITE
  if (!S) return

  const $ = (sel, root = document) => root.querySelector(sel)
  const el = (tag, cls, text) => {
    const node = document.createElement(tag)
    if (cls) node.className = cls
    if (text != null) node.textContent = text
    return node
  }
  // 外站新开标签页，同站（如 Demo 子路径）保持当前页跳转
  const external = (a) => {
    try {
      if (new URL(a.href, location.href).origin !== location.origin) {
        a.target = '_blank'
        a.rel = 'noopener'
      }
    } catch {
      /* ignore */
    }
    return a
  }

  /* ---------------- 项目详情弹层 ---------------- */
  let modal = null
  let lastFocused = null

  function buildModal() {
    const box = el('div', 'modal')
    box.setAttribute('role', 'dialog')
    box.setAttribute('aria-modal', 'true')
    box.setAttribute('aria-labelledby', 'modal-title')
    box.hidden = true

    const close = el('button', 'modal__close', '✕')
    close.type = 'button'
    close.setAttribute('aria-label', '关闭')

    const panel = el('div', 'modal__panel')
    const media = el('div', 'modal__media')
    const body = el('div', 'modal__body')

    const meta = el('p', 'modal__meta')
    const title = el('h3', 'modal__title')
    title.id = 'modal-title'
    const subtitle = el('p', 'modal__subtitle')
    const summary = el('p', 'modal__lead')
    const prose = el('div', 'modal__prose')
    const points = el('ul', 'modal__points')
    const tags = el('div', 'modal__tags')
    const stats = el('div', 'modal__metrics')
    const links = el('div', 'modal__links')

    body.append(meta, title, subtitle, summary, prose, points, tags, stats, links)
    panel.append(media, body)
    box.append(close, panel)
    document.body.appendChild(box)

    const hide = () => {
      box.hidden = true
      document.body.classList.remove('is-locked')
      lastFocused?.focus?.()
    }
    box.addEventListener('click', (event) => {
      if (event.target === box) hide()
    })
    close.addEventListener('click', hide)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !box.hidden) hide()
    })

    return { box, media, meta, title, subtitle, summary, prose, points, tags, stats, links }
  }

  function openDetail(item) {
    if (!modal) modal = buildModal()
    const m = modal

    // 图片上下叠放：桌面截图铺满，手机截图按高度约束并居中
    m.media.replaceChildren()
    ;(item.images ?? []).forEach((image) => {
      const figure = el('figure', 'modal__figure')
      const link = external(el('a', 'modal__shot'))
      link.href = image.src
      link.setAttribute('aria-label', `查看原图：${image.caption ?? item.title}`)
      const node = el('img', 'modal__img modal__img--' + (image.fit ?? 'desktop'))
      node.src = image.src
      node.alt = image.alt ?? item.title
      link.appendChild(node)
      figure.appendChild(link)
      if (image.caption) figure.appendChild(el('figcaption', 'modal__caption', image.caption))
      m.media.appendChild(figure)
    })
    const imgs = item.images ?? []
    m.media.hidden = !imgs.length
    m.box.classList.toggle('modal--phone', imgs.length > 0 && imgs.every((img) => img.fit === 'phone'))

    m.meta.textContent = `${item.index} / ${item.year} · ${item.role}`
    m.title.textContent = item.title
    m.subtitle.textContent = item.subtitle
    m.summary.textContent = item.summary

    m.prose.replaceChildren()
    ;(item.paragraphs ?? []).forEach((text) => m.prose.appendChild(el('p', 'modal__text', text)))

    m.points.replaceChildren()
    ;(item.points ?? []).forEach((line) => m.points.appendChild(el('li', null, line)))
    m.points.hidden = !(item.points ?? []).length

    m.tags.replaceChildren()
    ;(item.tags ?? []).forEach((t) => m.tags.appendChild(el('span', 'tag', t)))

    m.stats.replaceChildren()
    ;(item.metrics ?? []).forEach((metric) => {
      const cell = el('div', 'modal__metric')
      cell.appendChild(el('strong', null, metric.v))
      cell.appendChild(el('span', null, metric.l))
      m.stats.appendChild(cell)
    })

    m.links.replaceChildren()
    ;(item.links ?? []).forEach((link) => {
      const a = external(el('a', 'link' + (link.primary ? ' link--primary' : ''), link.label + ' ↗'))
      a.href = link.href
      m.links.appendChild(a)
    })

    m.box.hidden = false
    m.box.querySelector('.modal__panel').scrollTop = 0
    document.body.classList.add('is-locked')
    lastFocused = document.activeElement
    m.box.querySelector('.modal__close').focus()
  }

  /* ---------------- 首屏 ---------------- */
  const p = S.profile
  $('#hero-eyebrow').textContent = p.eyebrow
  $('#hero-title').innerHTML = `${escapeHtml(p.name)}<span class="dot">.</span>`
  $('#hero-role').textContent = `${p.role} · ${p.latin}`
  $('#hero-tagline').textContent = p.tagline

  const stack = $('#hero-stack')
  p.stack.forEach((item) => stack.appendChild(el('li', 'chip', item)))

  const actions = $('#hero-actions')
  p.actions.forEach((action) => {
    const a = el('a', 'btn' + (action.primary ? ' btn--primary' : ''), action.label)
    a.href = action.href
    if (action.external) a.rel = 'noopener'
    if (action.href.startsWith('http') && !action.href.startsWith(location.origin)) {
      a.target = '_blank'
    }
    actions.appendChild(a)
  })

  const metrics = $('#hero-metrics')
  p.metrics.forEach((metric) => {
    const li = el('li', 'metric')
    li.appendChild(el('strong', 'metric__value', metric.value))
    li.appendChild(el('span', 'metric__label', metric.label))
    metrics.appendChild(li)
  })

  /* ---------------- 作品 ---------------- */
  $('#work-note').textContent = S.workNote ?? ''

  const workList = $('#work-list')
  S.work.forEach((item, i) => {
    const card = el('article', 'card reveal')
    card.style.setProperty('--i', String(i))

    const cover = (item.images ?? [])[0]
    const visual = el('div', 'card__visual')
    if (cover) {
      const img = el('img', 'card__img' + (cover.fit === 'phone' ? ' card__img--phone' : ''))
      img.src = cover.src
      img.alt = cover.alt ?? item.title
      img.loading = i === 0 ? 'eager' : 'lazy'
      visual.appendChild(img)
      visual.classList.add('card__visual--zoom')
      visual.appendChild(el('span', 'card__zoom-hint', '查看项目 +'))
      visual.addEventListener('click', () => openDetail(item))
      visual.tabIndex = 0
      visual.setAttribute('role', 'button')
      visual.setAttribute('aria-label', `查看「${item.title}」详情`)
      visual.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openDetail(item)
        }
      })
    } else {
      const spec = el('div', 'spec')
      spec.appendChild(el('span', 'spec__label', 'KEY RESULT'))
      const first = item.metrics?.[0]
      if (first) spec.appendChild(el('strong', 'spec__value', first.v))
      if (first) spec.appendChild(el('span', 'spec__caption', first.l))
      const specTags = el('div', 'spec__tags')
      ;(item.tags ?? []).forEach((t) => specTags.appendChild(el('span', 'spec__tag', t)))
      spec.appendChild(specTags)
      visual.appendChild(spec)
    }

    const body = el('div', 'card__body')
    const head = el('div', 'card__head')
    head.appendChild(el('span', 'card__index', item.index))
    head.appendChild(el('span', 'card__year', item.year))
    body.appendChild(head)

    const title = el('h3', 'card__title card__title--clickable', item.title)
    title.tabIndex = 0
    title.setAttribute('role', 'button')
    title.addEventListener('click', () => openDetail(item))
    title.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openDetail(item)
      }
    })
    body.appendChild(title)
    body.appendChild(el('p', 'card__subtitle', `${item.subtitle} · ${item.role}`))
    body.appendChild(el('p', 'card__summary', item.summary))

    const tags = el('div', 'card__tags')
    ;(item.tags ?? []).forEach((t) => tags.appendChild(el('span', 'tag', t)))
    body.appendChild(tags)

    if (item.metrics?.length) {
      const stats = el('div', 'card__metrics')
      item.metrics.forEach((metric) => {
        const cell = el('div', 'card__metric')
        cell.appendChild(el('strong', null, metric.v))
        cell.appendChild(el('span', null, metric.l))
        stats.appendChild(cell)
      })
      body.appendChild(stats)
    }

    const links = el('div', 'card__links')
    ;(item.links ?? []).forEach((link) => {
      const a = external(el('a', 'link' + (link.primary ? ' link--primary' : ''), link.label + ' ↗'))
      a.href = link.href
      links.appendChild(a)
    })
    const detailBtn = el('button', 'link link--ghost', '项目详情 +')
    detailBtn.type = 'button'
    detailBtn.addEventListener('click', () => openDetail(item))
    links.appendChild(detailBtn)
    body.appendChild(links)

    card.appendChild(visual)
    card.appendChild(body)
    workList.appendChild(card)
  })

  /* ---------------- 方法 ---------------- */
  const approach = $('#approach-list')
  S.approach.forEach((item) => {
    const block = el('div', 'approach__item reveal')
    block.appendChild(el('span', 'approach__index', item.index))
    block.appendChild(el('h3', 'approach__title', item.title))
    block.appendChild(el('p', 'approach__body', item.body))
    approach.appendChild(block)
  })

  /* ---------------- 技术笔记 ---------------- */
  if (S.blog) {
    $('#notes-note').textContent = S.blog.intro ?? ''
    const list = $('#notes-list')
    ;(S.blog.posts ?? []).forEach((post) => {
      const a = el('a', 'note')
      a.href = post.href
      const meta = el('div', 'note__meta')
      meta.appendChild(el('span', null, post.date))
      ;(post.tags ?? []).forEach((tag) => meta.appendChild(el('span', 'note__tag', tag)))
      a.appendChild(meta)
      a.appendChild(el('h3', 'note__title', post.title))
      a.appendChild(el('p', 'note__summary', post.summary))
      a.appendChild(el('span', 'note__more', '阅读全文 →'))
      list.appendChild(a)
    })
    const all = $('#notes-all')
    if (all && S.blog.allUrl) all.href = S.blog.allUrl
  }

  /* ---------------- 经历 ---------------- */
  const journey = $('#journey-list')
  S.journey.forEach((row) => {
    const li = el('li', 'journey__row')
    li.appendChild(el('span', 'journey__period', row.period))
    const main = el('div', 'journey__main')
    main.appendChild(el('strong', 'journey__org', row.org))
    main.appendChild(el('span', 'journey__role', row.role))
    if (row.note) main.appendChild(el('p', 'journey__note', row.note))
    li.appendChild(main)
    journey.appendChild(li)
  })

  /* ---------------- 联系 ---------------- */
  const email = $('#contact-email')
  email.textContent = S.contact.email
  email.href = `mailto:${S.contact.email}`

  const copyBtn = $('#copy-email')
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(S.contact.email)
      copyBtn.textContent = '已复制 ✓'
    } catch {
      copyBtn.textContent = '复制失败，手动选一下吧'
    }
    setTimeout(() => (copyBtn.textContent = '复制邮箱'), 1800)
  })

  const links = $('#contact-links')
  S.contact.links.forEach((link) => {
    const li = el('li')
    const a = external(el('a', null, link.label + ' ↗'))
    a.href = link.href
    li.appendChild(a)
    links.appendChild(li)
  })

  /* ---------------- 导航高亮 + 渐显 ---------------- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const sections = ['work', 'approach', 'notes', 'journey', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean)

  if (!reduce && 'IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            reveal.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((node) => reveal.observe(node))
  } else {
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-in'))
  }

  const navLinks = new Map()
  document.querySelectorAll('[data-nav]').forEach((a) => navLinks.set(a.dataset.nav, a))

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        navLinks.forEach((a) => a.classList.remove('is-active'))
        navLinks.get(entry.target.id)?.classList.add('is-active')
      })
    },
    { rootMargin: '-45% 0px -50% 0px' }
  )
  sections.forEach((section) => spy.observe(section))

  $('#footer-name').textContent = `${p.name} · ${p.latin}`
  $('#footer-year').textContent = `© ${new Date().getFullYear()}`

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (event) => {
      const id = a.getAttribute('href').slice(1)
      const target = document.getElementById(id)
      if (!target) return
      event.preventDefault()
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    })
  })

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
  }
})()
