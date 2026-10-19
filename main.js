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

  /* ---------------- 截图弹层 ---------------- */
  let lightbox = null
  let lastFocused = null

  function buildLightbox() {
    const box = el('div', 'lightbox')
    box.setAttribute('role', 'dialog')
    box.setAttribute('aria-modal', 'true')
    box.setAttribute('aria-label', '截图预览')
    box.hidden = true

    const close = el('button', 'lightbox__close', '✕')
    close.type = 'button'
    close.setAttribute('aria-label', '关闭预览')

    const figure = el('figure', 'lightbox__figure')
    const img = el('img', 'lightbox__img')
    img.alt = ''
    const caption = el('figcaption', 'lightbox__caption')
    figure.appendChild(img)
    figure.appendChild(caption)

    box.appendChild(close)
    box.appendChild(figure)
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

    return { box, img, caption, hide }
  }

  function openLightbox(src, alt, captionText) {
    if (!lightbox) lightbox = buildLightbox()
    lightbox.img.src = src
    lightbox.img.alt = alt ?? ''
    lightbox.caption.textContent = captionText ?? ''
    lightbox.box.hidden = false
    document.body.classList.add('is-locked')
    lastFocused = document.activeElement
    lightbox.box.querySelector('.lightbox__close').focus()
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
  p.metrics.forEach((m) => {
    const li = el('li', 'metric')
    li.appendChild(el('strong', 'metric__value', m.value))
    li.appendChild(el('span', 'metric__label', m.label))
    metrics.appendChild(li)
  })

  /* ---------------- 作品 ---------------- */
  $('#work-note').textContent = S.workNote ?? ''

  const workList = $('#work-list')
  S.work.forEach((item, i) => {
    const card = el('article', 'card reveal')
    card.style.setProperty('--i', String(i))

    // 视觉区：有截图用截图，没有则用「规格面板」（不伪造界面截图）
    const visual = el('div', 'card__visual')
    if (item.image) {
      const img = el('img', 'card__img' + (item.imageFit === 'phone' ? ' card__img--phone' : ''))
      img.src = item.image
      img.alt = item.imageAlt ?? item.title
      img.loading = i === 0 ? 'eager' : 'lazy'
      visual.appendChild(img)

      // 卡片里只显示一截，点击看完整截图
      visual.classList.add('card__visual--zoom')
      visual.tabIndex = 0
      visual.setAttribute('role', 'button')
      visual.setAttribute('aria-label', `查看「${item.title}」完整截图`)
      visual.appendChild(el('span', 'card__zoom-hint', '点击查看大图'))
      const open = () => openLightbox(item.image, item.imageAlt ?? item.title, item.title)
      visual.addEventListener('click', open)
      visual.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          open()
        }
      })
    } else {
      const spec = el('div', 'spec')
      spec.appendChild(el('span', 'spec__label', 'KEY RESULT'))
      const first = item.metrics?.[0]
      if (first) spec.appendChild(el('strong', 'spec__value', first.v))
      if (first) spec.appendChild(el('span', 'spec__caption', first.l))
      const tags = el('div', 'spec__tags')
      ;(item.tags ?? []).forEach((t) => tags.appendChild(el('span', 'spec__tag', t)))
      spec.appendChild(tags)
      visual.appendChild(spec)
    }

    const body = el('div', 'card__body')
    const head = el('div', 'card__head')
    head.appendChild(el('span', 'card__index', item.index))
    head.appendChild(el('span', 'card__year', item.year))
    body.appendChild(head)

    const title = el('h3', 'card__title', item.title)
    body.appendChild(title)
    body.appendChild(el('p', 'card__subtitle', `${item.subtitle} · ${item.role}`))
    body.appendChild(el('p', 'card__summary', item.summary))

    if (item.points?.length) {
      const ul = el('ul', 'card__points')
      item.points.forEach((point) => ul.appendChild(el('li', null, point)))
      body.appendChild(ul)
    }

    const tags = el('div', 'card__tags')
    ;(item.tags ?? []).forEach((t) => tags.appendChild(el('span', 'tag', t)))
    body.appendChild(tags)

    if (item.metrics?.length) {
      const stats = el('div', 'card__metrics')
      item.metrics.forEach((m) => {
        const cell = el('div', 'card__metric')
        cell.appendChild(el('strong', null, m.v))
        cell.appendChild(el('span', null, m.l))
        stats.appendChild(cell)
      })
      body.appendChild(stats)
    }

    if (item.links?.length) {
      const links = el('div', 'card__links')
      item.links.forEach((link) => {
        const a = el('a', 'link' + (link.primary ? ' link--primary' : ''), link.label + ' ↗')
        a.href = link.href
        a.target = '_blank'
        a.rel = 'noopener'
        links.appendChild(a)
      })
      body.appendChild(links)
    }

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

  /* ---------------- 经历 ---------------- */
  const journey = $('#journey-list')
  S.journey.forEach((row) => {
    const li = el('li', 'journey__row')
    li.appendChild(el('span', 'journey__period', row.period))
    const main = el('div', 'journey__main')
    main.appendChild(el('strong', 'journey__org', row.org))
    main.appendChild(el('span', 'journey__role', row.role))
    main.appendChild(el('p', 'journey__note', row.note))
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
    const a = el('a', null, link.label + ' ↗')
    a.href = link.href
    a.target = '_blank'
    a.rel = 'noopener'
    li.appendChild(a)
    links.appendChild(li)
  })

  /* ---------------- 导航高亮 + 渐显 ---------------- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const sections = ['work', 'approach', 'journey', 'contact']
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

  // 平滑滚动（尊重系统减动效设置）
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
