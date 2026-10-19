import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '申思宇 · 技术笔记',
  description: '重构、性能、跨端——写清楚踩过的坑和当时的判断依据。',
  base: '/blog/',
  srcExclude: ['README.md'],
  cleanUrls: false,
  themeConfig: {
    logo: false,
    siteTitle: '申思宇 · 笔记',
    nav: [
      { text: '首页', link: '/' },
      { text: '重构', link: '/posts/tinyshop-migration' },
      { text: '性能', link: '/posts/first-screen-4mb' },
      { text: '返回主页', link: 'https://sansanyih.github.io/' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/sansanyih' }],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '主题',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    lastUpdated: {
      text: '最后更新',
      formatOptions: { dateStyle: 'medium' }
    },
    footer: {
      message: '重构 · 性能 · 跨端',
      copyright: '© 申思宇'
    }
  },
  markdown: {
    lineNumbers: true
  },
  head: [
    ['meta', { name: 'theme-color', content: '#0b0b0c' }]
  ]
})
