# sansanyih.github.io

个人主页（展示页）。纯 HTML / CSS / 原生 JS，**没有构建步骤**——改完推上去，GitHub Pages 自动更新。

线上地址：https://sansanyih.github.io/

## 怎么改内容

只改 `content.js`，不用碰 HTML / CSS / JS。

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、岗位、一句话介绍、技术栈、首屏三个数字 | `SITE.profile` |
| 作品（标题、简介、要点、标签、指标、链接、截图） | `SITE.work` |
| 「我怎么做事」三条 | `SITE.approach` |
| 实习 / 教育 / 开源经历 | `SITE.journey` |
| 邮箱、GitHub 等联系方式 | `SITE.contact` |

改完直接：

```bash
git add -A
git commit -m "content: 更新 xx"
git push
```

约 1 分钟后线上生效。

## 给作品加截图

1. 把图片放到 `assets/`（建议 WebP，宽度 900px 左右，控制在 100KB 内）
2. 在 `content.js` 对应作品里加两个字段：

```js
image: 'assets/your-shot.webp',
imageAlt: '这张图说明了什么（无障碍必填）'
```

没配 `image` 的作品会显示「关键数据 + 技术标签」的规格面板，不会出现空白。

## 文件说明

```
index.html    页面骨架（各区块的容器 + 导航 + 页脚）
styles.css    全部样式（设计变量在 :root 里）
content.js    站点内容（唯一需要日常维护的文件）
main.js       渲染逻辑 + 导航高亮 + 滚动渐显 + 复制邮箱
assets/       图片与 favicon
```

## 设计约束（改样式时别破坏）

- 强调色只有一个：`--accent`（#ff5a3c）。加第二个颜色会立刻变廉价
- 首屏必须在 5 秒内看到：岗位 + 技术栈 + 可点 Demo + 邮箱，不要加长滚动动画
- 每个作品卡最多 3 条要点，每条不超过 40 字
- 数字要能对得上（构建时间、包体积、LCP 都能在对应仓库里查）

## 部署

仓库推到 `main` 分支即可，GitHub Pages 会直接托管根目录（已放 `.nojekyll` 跳过 Jekyll 处理）。
