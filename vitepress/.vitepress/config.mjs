import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '叁叁一 · 技术笔记',
  description: '重构、性能、跨端——写清楚踩过的坑和当时的判断依据。',
  base: '/blog/',
  appearance: 'force-dark',
  titleTemplate: false,
  srcExclude: ['README.md'],
  cleanUrls: false,
  head: [
    ['meta', { name: 'theme-color', content: '#0b0b0c' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/blog/favicon.svg' }]
  ],
  themeConfig: {
    logo: false,
    siteTitle: '叁叁一 · 笔记',
    nav: [
      { text: '笔记', link: '/' },
      { text: '归档', link: '/archive' },
      { text: '主页', link: 'https://sansanyih.github.io/', target: '_self' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/sansanyih' }],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文章', buttonAriaLabel: '搜索文章' },
          modal: { noResultsText: '没有找到相关文章', resetButtonTitle: '清空', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
        }
      }
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '主题',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'medium' } },
    footer: {
      message: '重构 · 性能 · 跨端',
      copyright: '© 叁叁一'
    }
  },
  markdown: { lineNumbers: true }
})
