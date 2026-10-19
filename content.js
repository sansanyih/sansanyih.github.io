/**
 * 站点内容配置 —— 以后维护只改这个文件，不用碰 HTML / CSS / JS。
 * 改完直接 commit & push，GitHub Pages 会自动更新。
 */
window.SITE = {
  profile: {
    eyebrow: '2026 届 · 深圳 / 广州 · 接受远程',
    name: '申思宇',
    latin: 'SHEN SIYU',
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
      { label: '在线 Demo', href: 'https://sansanyih.github.io/tinyshop-vue3/' },
      { label: 'GitHub', href: 'https://github.com/sansanyih', external: true }
    ]
  },

  workNote: '三个项目都是我自己从设计、开发到部署做完的。点卡片看：项目是什么、我做了什么、亮点在哪',

  work: [
    {
      index: '01',
      title: 'TinyShop 跨端商城重构',
      subtitle: 'uni-app · Vue3 · TypeScript',
      year: '2026',
      role: '独立完成',
      summary:
        '一套代码同时产出 H5 与微信小程序的商城，覆盖首页、分类、详情、购物车、下单、订单、地址的完整交易链路。',
      what:
        '原项目是 2020 年的 Vue2 + webpack 商城，在新版 Node 上连装依赖都会失败。我把它整体迁到 uni-app + Vue3 + TypeScript + Vite + Pinia，并补上 Mock 层、分包和测试，让它变成能维护的工程。',
      did: [
        '重写 10 个页面：首页、分类、详情、购物车、搜索、我的、登录、确认订单、订单列表、收货地址',
        '重写请求层与状态层：uni.request 拦截器、Pinia 三个 store、401 带 redirect 回跳',
        '自建 Mock 层：按 METHOD + url 拦截，不启动后端就能跑通下单全流程',
        '工程化：vue-tsc 类型检查、Vitest 16 个用例、分包 + preloadRule、GitHub Actions 自动部署'
      ],
      highlights: [
        {
          title: '不启动后端也能演示',
          desc: 'Mock 层模拟 120–300ms 网络延迟，切真实后端只改一个环境变量，业务代码零改动——所以这个 Demo 点进去就能完整走完下单。'
        },
        {
          title: '主包压在 629KB',
          desc: '按业务域拆 order / account 子包，配合 preloadRule 在购物车与我的页面空闲时预加载，避免主包随页面数量线性增长。'
        },
        {
          title: '有测试和门禁，不是「能跑就行」',
          desc: '16 个用例覆盖购物车合并、数量边界、合计金额与请求层；CI 依次跑 lint → type-check → test → build → deploy，任一步失败就不会上线。'
        }
      ],
      limits: '只迁了核心 10 / 53 页，评价、优惠券、发票等页面未迁移；图片未转 WebP；未接真实后端联调。',
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
          caption: 'H5 首页 —— 真实运行截图'
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
        '输入一句需求，生成结构化大纲，逐步生成页面，最后一键导出可编辑的 .pptx；也能把 Word / PDF / Excel 当上下文。',
      what:
        '大模型写 PPT 的痛点不是「写得不好」，而是「写出来的东西没法直接变成幻灯片」。我把模型输出约束成固定大纲结构，前端按结构渲染并负责导出，同时把 4MB 的重依赖从首屏挪走。',
      did: [
        '接入 DeepSeek 流式接口，按结构化 Prompt 输出「标题 + 要点 + 配图建议」大纲',
        '流式渲染 + 自动滚动 + 打字机效果，生成过程中输入框不阻塞',
        '用 pptxgenjs 逐页生成并导出 .pptx，支持 Word / PDF / Excel 作为上下文',
        '把 ECharts、pdfjs-dist、xlsx、pptxgenjs 改成动作触发的动态 import'
      ],
      highlights: [
        {
          title: '首屏砍掉 53%',
          desc: '重依赖不再随首屏加载：首屏 JS 从 4.13MB 降到 1.41MB，不点「生成 PPT」就不会下载 pptxgenjs。'
        },
        {
          title: '让模型输出「可排版」的结构',
          desc: '不用自由文本，而是约束成标题 / 要点 / 配图建议三段式，前端照着结构渲染——排版不会随模型发挥而崩。'
        },
        {
          title: '密钥不进前端',
          desc: '大模型请求走服务端代理（Vite proxy / Vercel Function），构建产物里搜不到任何 sk- 开头的字符串。'
        }
      ],
      limits: 'PPT 模板样式固定、未做自定义主题；对话历史未落库，刷新即丢；超长文档未做上下文裁剪。',
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
        '面向动漫爱好者的内容社区：前台展示站 + 后台管理系统 + 后端 API，一个人把三端从数据库表设计做到页面。',
      what:
        '这个项目最想解决的不是页面数量，而是「三端协同」：同一个内容模型要同时喂给前台展示、后台管理和后端接口。我把响应结构、权限划分和字段命名统一起来，改一处不用等联调。',
      did: [
        '前台：番剧列表 / 详情 / 社区，ECharts 六维雷达评分（音乐 / 美术 / 剧本 / 演出 / 节目 / 声优）',
        '后台：侧边栏 + 路由守卫 + ECharts 统计看板 + 番剧 / 文章 / 视频 / 用户四套 CRUD 表单',
        '后端：Spring Boot + MyBatis-Plus + JWT(HS256) + BCrypt，12 个业务模块、16 张表',
        '数据层：统一响应体 { code, message, data }、全局异常、参数校验、逻辑删除'
      ],
      highlights: [
        {
          title: '三端一个人闭环',
          desc: '从建表、写接口到前台和后台页面全部自己完成，接口字段要变时前后端一起改，不会有「等对方联调」的空转。'
        },
        {
          title: '响应体统一，前端不再到处判 code',
          desc: '后端统一返回 { code, message, data }，前端在 axios 拦截器里一次性解包并处理 401，业务层只拿数据本身。'
        },
        {
          title: '后台有真正能用的数据看板',
          desc: 'ECharts 环形图看内容分布、折线图看 7 日新增趋势，运营扫一眼就知道哪类内容在涨；四套 CRUD 表单配路由守卫按权限隔离。'
        }
      ],
      limits: '种子数据的封面是占位图；评论与搜索未做分页优化；后台统计接口需管理员权限，演示账号看到的是本地兜底数据。',
      tags: ['Vue3', 'TypeScript', 'Element Plus', 'ECharts', 'Spring Boot', 'MySQL'],
      metrics: [
        { v: '12', l: '业务模块' },
        { v: '16', l: '数据表' },
        { v: '3', l: '端' }
      ],
      images: [
        {
          src: 'assets/cnacg.jpg',
          alt: 'CnAcg 前台首页：番剧轮播与随机推荐卡片',
          caption: '前台展示站'
        },
        {
          src: 'assets/cnacg-admin.jpg',
          alt: 'CnAcg 后台管理：统计卡片与 ECharts 环形图、7 日趋势折线图',
          caption: '后台管理系统 · ECharts 看板'
        }
      ],
      links: [
        { label: '前端仓库', href: 'https://github.com/sansanyih/ACGfans-web', primary: true },
        { label: '后端仓库', href: 'https://github.com/sansanyih/Acg-fans' }
      ]
    }
  ],

  approach: [
    {
      index: '01',
      title: '先量再改',
      body: '优化之前先拿数据：构建耗时、包体积、LCP、TBT。没有基线就没有“优化了多少”这句话。'
    },
    {
      index: '02',
      title: '结构优先',
      body: '先定分层（接口 / 请求 / 状态 / 视图）再写页面。页面可以返工，分层返工代价太大。'
    },
    {
      index: '03',
      title: '为三个月后的自己写代码',
      body: '能一句话说清的接口不写三段注释；能用类型约束的地方不靠记忆。重构的标准是“下一个改的人不用问”。'
    }
  ],

  journey: [
    {
      period: '2025.09 — 2026.03',
      org: '惠州学院 · 薪火工作室',
      role: '前端开发',
      note: '按 UI 稿实现列表 / 表单 / 详情页，负责前后端联调与既有页面维护'
    },
    {
      period: '2024.07 — 2024.09',
      org: 'FRE123 导航平台',
      role: '开源协作贡献者',
      note: '负责后台「导航管理」模块：多级分类 CRUD、HTML5 拖拽排序、JSON 批量导入导出'
    },
    {
      period: '2022.09 — 2026.06',
      org: '惠州学院',
      role: '软件工程 · 本科',
      note: '蓝桥杯省级二等奖、算法杯二等奖'
    }
  ],

  contact: {
    email: 'shensiyu144@gmail.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/sansanyih' },
      { label: 'TinyShop Demo', href: 'https://sansanyih.github.io/tinyshop-vue3/' }
    ],
    location: '深圳 / 广州'
  }
}
