/**
 * 站点内容配置 —— 以后维护只改这个文件。
 * 改完 commit & push，GitHub Pages 自动更新。
 */
window.SITE = {
  profile: {
    eyebrow: '2026 届 · 深圳 / 广州 · 接受远程',
    name: '叁叁一',
    latin: 'SAN SAN YI',
    role: '前端开发工程师',
    tagline: '把想法做成能用的产品，把旧代码改成能维护的样子。',
    stack: ['Vue3', 'TypeScript', 'uni-app', 'Vite', 'Pinia', 'Spring Boot'],
    metrics: [
      { value: '3', label: '完整项目' },
      { value: '4480', label: '行重构代码' },
      { value: '2.1s', label: '首屏 LCP' }
    ],
    actions: [
      { label: '看作品', href: '#work', primary: true },
      { label: '技术笔记', href: '#notes' },
      { label: '在线 Demo', href: 'https://sansanyih.github.io/tinyshop-vue3/' },
      { label: 'GitHub', href: 'https://github.com/sansanyih', external: true }
    ]
  },

  workNote: '三个项目从设计、开发到部署均为独立完成。点卡片看完整说明',

  work: [
    {
      index: '01',
      title: 'TinyShop 跨端商城重构',
      subtitle: 'uni-app · Vue3 · TypeScript',
      year: '2026',
      role: '独立完成',
      summary:
        '一套代码同时产出 H5 与微信小程序的商城，覆盖首页、分类、详情、购物车、下单、订单、地址的完整交易链路。',
      paragraphs: [
        '原始项目是 2020 年的 Vue2 + webpack 商城，在新版 Node 上装依赖就会失败。迁移时没有逐行翻译语法，而是先定分层再迁页面：重写 10 个交易链路页面，请求层换成 uni.request 拦截器（Token 注入、401 带 redirect 回跳、loading 计数），状态层换成 Pinia，并补了一层按 METHOD + url 拦截的 Mock，不启动后端也能完整走完下单。',
        '工程侧按业务域拆 order / account 子包并配置 preloadRule，把小程序主包控制在 629KB；用 vue-tsc 做类型检查、Vitest 覆盖购物车与请求层，CI 依次执行 lint → type-check → test → build → deploy，任一步失败不会上线。'
      ],
      points: [
        'H5 首屏 JS 259KB（gzip 94KB），LCP 2.1s，Lighthouse 81',
        '小程序主包 629KB，order 分包 13.4KB、account 分包 11KB',
        'Vitest 16 个用例，覆盖同 SKU 合并、数量边界、合计金额与 Mock 路由',
        'switchTab / navigateTo 按 tabBar 页面自动分流，登录后原路回跳'
      ],
      tags: ['uni-app', 'Vue3', 'TypeScript', 'Vite', 'Pinia', 'Vitest'],
      metrics: [
        { v: '629KB', l: '小程序主包' },
        { v: '2.1s', l: 'LCP' },
        { v: '81', l: 'Lighthouse' }
      ],
      images: [
        {
          src: 'assets/tinyshop-home.webp',
          alt: '小蜂商城首页：Banner、分类入口、双列商品瀑布流',
          fit: 'phone',
          caption: '首页'
        },
        {
          src: 'assets/tinyshop-detail.jpg',
          alt: '小蜂商城商品详情页：价格区、规格选择与底部购买栏',
          fit: 'phone',
          caption: '商品详情页'
        }
      ],
      links: [
        { label: '在线 Demo', href: 'https://sansanyih.github.io/tinyshop-vue3/', primary: true },
        { label: '源码', href: 'https://github.com/sansanyih/tinyshop-vue3' }
      ]
    },

    {
      index: '02',
      title: 'AI PPT 生成器',
      subtitle: 'Vue3 · Vite · DeepSeek',
      year: '2025',
      role: '独立完成',
      summary:
        '输入一句需求，生成结构化大纲，逐步生成页面，最后一键导出可编辑的 .pptx；也能把 Word / PDF / Excel 作为上下文。',
      paragraphs: [
        '大模型写 PPT 的难点不是「写得不好」，而是写出来的东西没法直接变成幻灯片。方案是把模型输出约束成固定大纲结构（标题 + 要点 + 配图建议），前端按结构渲染并负责导出，排版不会随模型自由发挥而崩。',
        '另一个问题是首屏体积：pptxgenjs、pdfjs-dist、xlsx、ECharts 一度把首屏包推到 4MB 以上。这些依赖全部改成动作触发的动态 import，不点「生成 PPT」就不会下载 pptxgenjs。大模型请求走服务端代理，构建产物里搜不到任何密钥。'
      ],
      points: [
        '首屏 JS 4.13MB → 1.41MB（-53%）',
        '流式增量渲染，生成过程不阻塞输入框，自动滚动到底',
        '支持 Word / PDF / Excel 解析为上下文，按自然语言生成图表',
        'Key 只存在服务端（Vite 代理 / Vercel Function），前端不可见'
      ],
      tags: ['Vue3', 'Vite', 'Element Plus', 'DeepSeek', 'pptxgenjs', 'ECharts'],
      metrics: [
        { v: '-53%', l: '首屏 JS' },
        { v: '3 种', l: '文档解析' },
        { v: '.pptx', l: '导出格式' }
      ],
      images: [
        {
          src: 'assets/aippt.jpg',
          alt: 'AI PPT 生成器：输入需求后由 DeepSeek 流式返回 5 页 PPT 大纲',
          fit: 'desktop',
          caption: '真实调用 DeepSeek 生成的 5 页大纲'
        }
      ],
      links: [{ label: '源码', href: 'https://github.com/sansanyih/ai-ppt-generator', primary: true }]
    },

    {
      index: '03',
      title: 'CnAcg 动漫信息平台',
      subtitle: 'Vue3 全栈 · Spring Boot',
      year: '2025',
      role: '全栈独立开发',
      summary:
        '面向动漫爱好者的内容社区：前台展示站 + 后台管理系统 + 后端 API 放在同一个仓库维护，三端从数据库表设计做到页面。',
      paragraphs: [
        '最难处理的不是页面数量，而是三端协同：同一个内容模型要同时喂给前台展示、后台管理和后端接口。做法是后端统一返回 { code, message, data }，前端在 axios 拦截器里一次性解包并处理 401，业务层只拿数据本身，字段改动时不用逐页改判断。',
        '后台用 Element Plus 搭侧边栏 + 路由守卫 + ECharts 统计看板（内容分布环形图、7 日新增折线图），配番剧 / 文章 / 视频 / 用户四套 CRUD 表单；后端 Spring Boot + MyBatis-Plus + JWT(HS256) + BCrypt，按「公开读 / 登录互动 / 管理员改删」做接口级权限。'
      ],
      points: [
        '12 个业务模块、16 张表，逻辑删除 + 全局异常 + 参数校验',
        '前台用 ECharts 做番剧六维雷达评分（音乐 / 美术 / 剧本 / 演出 / 节目 / 声优）',
        '后台数据看板：内容分布环形图 + 近 7 天新增趋势折线图',
        '三端同一套接口约定，改字段时前后端一起改，不用等联调'
      ],
      tags: ['Vue3', 'TypeScript', 'Element Plus', 'ECharts', 'Spring Boot', 'MySQL'],
      metrics: [
        { v: '12', l: '业务模块' },
        { v: '16', l: '数据表' },
        { v: '3', l: '端' }
      ],
      images: [
        {
          src: 'assets/cnacg-home.jpg',
          alt: 'CnAcg 前台首页：横幅位与随机推荐番剧卡片',
          fit: 'desktop',
          caption: '前台首页'
        },
        {
          src: 'assets/cnacg-sections.jpg',
          alt: 'CnAcg 前台内容区：最新动态、每周速报、最新文章',
          fit: 'desktop',
          caption: '前台内容区'
        },
        {
          src: 'assets/cnacg-admin.jpg',
          alt: 'CnAcg 后台管理：统计卡片与 ECharts 环形图、7 日趋势折线图',
          fit: 'desktop',
          caption: '后台管理系统 · ECharts 看板'
        }
      ],
      links: [{ label: '源码（三端同仓）', href: 'https://github.com/sansanyih/Acg-fans', primary: true }]
    }
  ],

  approach: [
    {
      index: '01',
      title: '接手别人的代码，先让它跑起来',
      body: '拿到旧项目先 clone、装依赖、跑到能看见页面，再决定动哪一行。跑不起来就先修构建——迁移 TinyShop 时 node-sass 直接编译失败，就是这么开始查的。'
    },
    {
      index: '02',
      title: '先定分层，再写页面',
      body: '接口层、请求层、状态层、视图层先分开，页面才开始写。页面写坏了能返工，分层写坏了整盘都要返工。'
    },
    {
      index: '03',
      title: '每个项目都留能复现的数字',
      body: '构建耗时、包体积、LCP、测试用例数都写进 README，别人 clone 下来能跑出同样的结果，而不是一句“优化了性能”。'
    }
  ],

  journey: [
    {
      period: '2025.09 — 2026.06',
      org: '惠州圣格易途科技有限公司',
      role: '前端开发实习',
      note: '按 UI 稿实现列表 / 表单 / 详情页，负责前后端联调与既有页面维护'
    },
    {
      period: '2024.07 — 2025.03',
      org: '惠州学院 · 薪火工作室',
      role: '前端开发'
    },
    {
      period: '2022.09 — 2026.06',
      org: '惠州学院',
      role: '软件工程 · 本科',
      note: '蓝桥杯省级二等奖、算法杯二等奖'
    }
  ],

  blog: {
    intro: '重构、性能、跨端——写清楚踩过的坑和当时的判断依据，而不是「优化了性能」这种结论。',
    allUrl: 'https://sansanyih.github.io/blog/',
    posts: [
      {
        title: '把 2020 年的商城迁到 Vue3 之后',
        date: '2026-01-12',
        tags: ['重构', 'uni-app'],
        summary: 'node-sass 编译失败、53 个页面共用一套 mixin、Vuex 全局状态——迁移真正的难点不在语法，而在决定先动哪一层。',
        href: 'https://sansanyih.github.io/blog/posts/tinyshop-migration'
      },
      {
        title: '首屏 4MB 是怎么砍到 1.4MB 的',
        date: '2025-06-20',
        tags: ['性能', 'Vite'],
        summary: '为什么「动作触发的动态 import」比「路由级懒加载」更适合工具类应用。',
        href: 'https://sansanyih.github.io/blog/posts/first-screen-4mb'
      }
    ]
  },

  contact: {
    email: 'shensiyu144@gmail.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/sansanyih' },
      { label: 'TinyShop Demo', href: 'https://sansanyih.github.io/tinyshop-vue3/' }
    ],
    location: '深圳 / 广州'
  }
}
