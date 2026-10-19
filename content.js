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

  workNote: '全部为个人独立开发（TinyShop 一项为开源项目重构）。点卡片看完整案例：问题、取舍、方案结构与已知限制',

  work: [
    {
      index: '01',
      title: 'TinyShop 跨端商城重构',
      subtitle: 'uni-app · Vue3 · TypeScript',
      year: '2026',
      role: '独立完成',
      summary:
        '把 1.8k star 的开源商城（Vue2 + webpack）重构成 uni-app + Vue3 + TS + Vite + Pinia，一次代码产出 H5 与微信小程序双端。',
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
      sections: [
        {
          title: '问题',
          body: '原项目停留在 2020 年的技术栈：node-sass 4 在 Node 22 下直接编译失败，clone 下来跑不起来；53 个页面共用一套 mixin 与 Vuex 全局状态，改一个页面要同时读三处文件，改动成本远高于页面本身。'
        },
        {
          title: '我的取舍',
          body: '没有做逐行语法翻译（Vue2 → Vue3 的语法转换容易漏、且无法验证），而是先定分层再迁页面：接口层 / 请求层 / 状态层 / 视图层。页面只迁「交易闭环」的 10 个，其余按业务价值排优先级——展示完整性比页数重要，剩余页面按需追加。'
        }
      ],
      structure: [
        { index: '01', title: '请求层', desc: 'uni.request 封装拦截器：Token 注入、401 带 redirect 回跳、loading 引用计数、错误统一兜底' },
        { index: '02', title: 'Mock 层', desc: '按 METHOD + url 匹配 handler，不启动后端就能跑通下单全流程；切真后端只改 VITE_API_BASE' },
        { index: '03', title: '状态层', desc: 'Pinia 三个 store（user / cart / app）+ 本地持久化，替代 Vuex 的全局 mutation' },
        { index: '04', title: '质量门禁', desc: 'vue-tsc 0 error + Vitest 16 用例 + CI 五道门（lint → type-check → test → build → deploy）' }
      ],
      result:
        '构建 15.8s；小程序主包 629KB（order / account 分包 13.4KB / 11KB）；H5 首屏 JS 259KB（gzip 94KB）；LCP 2.1s；Lighthouse 81。',
      openIssues: [
        '只迁了 10 / 53 页，评价、优惠券、发票等页面未迁移',
        '商品图仍是 JPG，未转 WebP 与多尺寸',
        '未接真实后端联调，接口只按约定结构实现'
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
        '一句话需求 → 结构化大纲 → 逐页生成 → 导出 .pptx；支持把 Word / PDF / Excel 作为上下文，并用自然语言生成图表。',
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
      sections: [
        {
          title: '问题',
          body: '大模型的输出是长文本，直接塞进 DOM 会边生成边抖动；同时 pptxgenjs、pdfjs-dist、xlsx 这类重依赖把首屏包推到 4MB 以上，首屏要等十几秒。'
        },
        {
          title: '我的取舍',
          body: '不追求「什么都能生成」，而是用结构化 Prompt 约束模型先输出「标题 + 要点 + 配图建议」的大纲，前端按结构渲染，排版才可控；重依赖全部改成动作触发的动态 import——不点「生成 PPT」就不下载 pptxgenjs。'
        }
      ],
      structure: [
        { index: '01', title: 'Prompt 层', desc: '约束模型输出固定大纲结构，避免自由发挥导致排版不可控' },
        { index: '02', title: '流式渲染', desc: 'SSE 增量接收，边生成边渲染 + 自动滚动，输入框不阻塞' },
        { index: '03', title: '导出链路', desc: 'pptxgenjs 按需加载，逐页生成 .pptx，导出时才拉取 300KB+ 依赖' },
        { index: '04', title: '密钥安全', desc: 'Key 只存在服务端，Vite 代理 / Vercel Function 转发，前端 bundle 里搜不到 sk-' }
      ],
      result:
        '首屏 JS 从 4.13MB 降到 1.41MB（-53%）；真实调用生成 5 页大纲（见左侧截图）；支持 Word / PDF / Excel 解析作为上下文。',
      openIssues: [
        'PPT 模板样式固定，未做自定义主题',
        '对话历史未落库，刷新丢失',
        '长文档未做上下文裁剪，超长输入会超 token'
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
        '面向动漫爱好者的内容社区：前台展示站 + 后台管理系统 + 后端 API，三端一人完成，覆盖 12 个业务模块、16 张表。',
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
          caption: '前台展示站 —— 番剧轮播与推荐'
        },
        {
          src: 'assets/cnacg-admin.jpg',
          alt: 'CnAcg 后台管理：统计卡片与 ECharts 环形图、7 日趋势折线图',
          caption: '后台管理系统 —— ECharts 统计看板'
        }
      ],
      sections: [
        {
          title: '问题',
          body: '内容型社区要同时供「前台展示站 + 后台管理系统 + 后端 API」。早期接口没有统一响应体，前端每处都要判断 code / data，字段一变整页就崩——首页卡片空白、日期渲染成 NaN 都属于这类问题。'
        },
        {
          title: '我的取舍',
          body: '后端统一 { code, message, data }，前端在 axios 响应拦截器里一次性解包，业务层只拿数据本身；权限按「公开读 / 登录互动 / 管理员改删」三层切，而不是每个接口各写一套判断。'
        }
      ],
      structure: [
        { index: '01', title: '前台展示站', desc: 'Vue3 + Element Plus：番剧列表 / 详情 / 社区；ECharts 六维雷达评分（音乐 / 美术 / 剧本 / 演出 / 节目 / 声优）' },
        { index: '02', title: '后台管理', desc: '侧边栏 + 路由守卫 + 统计看板（ECharts 环形图与 7 日折线图）+ 番剧 / 文章 / 视频 / 用户四套 CRUD 表单' },
        { index: '03', title: '后端 API', desc: 'Spring Boot + MyBatis-Plus + JWT(HS256) + BCrypt，12 个模块 16 张表，逻辑删除 + 全局异常 + 参数校验' },
        { index: '04', title: '数据一致性', desc: '统一响应体 + 拦截器解包 + 401 清理登录态，前端不再散落 code 判断' }
      ],
      result:
        '3 端 / 12 个业务模块 / 16 张表；前台首页与后台 ECharts 看板均有实拍（见左侧两张）。',
      openIssues: [
        '种子数据里的封面是占位图，真实内容需自行补图',
        '评论与搜索未做分页优化，数据量大时会全量返回',
        '后台统计接口需管理员权限，演示账号只能看到本地兜底数据'
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
