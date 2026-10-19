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

  workNote: '全部为个人独立开发（TinyShop 一项为开源项目重构），可点开 Demo 与源码',

  work: [
    {
      index: '01',
      title: 'TinyShop 跨端商城重构',
      subtitle: 'uni-app · Vue3 · TypeScript',
      year: '2026',
      role: '独立完成',
      summary:
        '把一个 1.8k star 的开源商城（Vue2 + webpack）重构成 uni-app + Vue3 + TS + Vite + Pinia，产出 H5 与微信小程序双端。',
      points: [
        '请求层重写：Token 注入、401 带 redirect 回跳、loading 引用计数、Mock 与真实接口双通道',
        '按业务域拆分 order / account 子包并配置 preloadRule，主包控制在 629KB',
        'Vitest 16 个用例 + CI 五道门（lint → type-check → test → build → deploy）'
      ],
      tags: ['uni-app', 'Vue3', 'TypeScript', 'Vite', 'Pinia', 'Vitest'],
      metrics: [
        { v: '629KB', l: '小程序主包' },
        { v: '2.1s', l: 'LCP' },
        { v: '81', l: 'Lighthouse' }
      ],
      image: 'assets/tinyshop-home.webp',
      imageAlt: '小蜂商城首页：Banner、分类入口、双列商品瀑布流',
      imageFit: 'phone',
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
        '一句话需求 → 结构化大纲 → 逐页生成 → 导出 .pptx；支持把 Word / PDF / Excel 作为上下文，并用自然语言生成图表。',
      points: [
        '用结构化 Prompt 约束模型输出大纲，stream 增量返回，边生成边渲染打字机效果',
        '重型依赖（ECharts / pdfjs / xlsx / pptxgenjs）改为按需动态加载，首屏 JS 4.13MB → 1.41MB',
        'API Key 移到服务端转发，前端构建产物中不再包含任何密钥'
      ],
      tags: ['Vue3', 'Vite', 'Element Plus', 'DeepSeek', 'pptxgenjs', 'ECharts'],
      metrics: [
        { v: '-53%', l: '首屏 JS' },
        { v: '3 种', l: '文档解析' },
        { v: '.pptx', l: '导出格式' }
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
        '面向动漫爱好者的内容社区：前台展示站 + 后台管理系统 + 后端 API，三端由我一人完成，覆盖 12 个业务模块、16 张表。',
      points: [
        '封装 Axios 单例：重复请求取消、响应统一解包、401 清理登录态并跳转登录页',
        'ECharts 实现番剧六维度雷达评分（音乐 / 美术 / 剧本 / 演出 / 节目 / 声优）',
        '后端 Spring Boot + MyBatis-Plus + JWT(HS256) + BCrypt，按「公开读 / 登录互动 / 管理员改删」做接口级权限'
      ],
      tags: ['Vue3', 'TypeScript', 'Element Plus', 'ECharts', 'Spring Boot', 'MySQL'],
      metrics: [
        { v: '12', l: '业务模块' },
        { v: '16', l: '数据表' },
        { v: '3', l: '端' }
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
      period: '2025.09 — 2026.06',
      org: '惠州圣格易途科技有限公司',
      role: '前端开发实习',
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
