import DefaultTheme from 'vitepress/theme'
import './custom.css'

/**
 * VitePress 的 SPA 路由会拦截同域链接。博客挂在 /blog/ 子路径，
 * 指向主站（https://sansanyih.github.io/...）的链接不在这个 SPA 的路由表里，
 * 被拦截后会静默失败。这里把「离开博客」的链接改成整页跳转：
 * 同一标签页打开，浏览器后退键能正常回到博客。
 */
if (typeof window !== 'undefined') {
  window.addEventListener('click', (event) => {
    if (event.defaultPrevented) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return

    const anchor = event.target instanceof Element ? event.target.closest('a') : null
    if (!anchor) return
    if (anchor.target === '_blank') return

    const href = anchor.getAttribute('href')
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) return

    let url
    try {
      url = new URL(anchor.href)
    } catch {
      return
    }

    if (url.origin !== window.location.origin) return
    if (url.pathname.startsWith('/blog/')) return

    // 同域但不在博客子路径下 → 整页跳转（而不是被 SPA 路由吞掉）
    event.preventDefault()
    window.location.assign(anchor.href)
  })
}

export default DefaultTheme
