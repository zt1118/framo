# Framo - 个人动画作品展示集设计文档

**项目名称：** Framo  
**设计日期：** 2026-04-16  
**设计目的：** 创建个人 2D 手绘动画作品展示网站，供朋友和同好欣赏

---

## 一、项目概述

### 1.1 项目定位
- **目标用户**：朋友、同好、动画爱好者
- **核心价值**：展示 2D 手绘动画创作能力和个人风格
- **内容特点**：作品数量适中，持续增长

### 1.2 内容类型
- **主要媒体**：
  - 视频文件（MP4/MOV 等渲染完成的动画）
  - GIF 动图（循环播放的动画片段）
- **辅助内容**：
  - 制作过程记录（草图、分镜、制作笔记等静态图片）
- **作品信息**：
  - 标题和简介
  - 创作信息（时间、工具、技术标签）
  - 创作故事/理念（灵感、想法、背后的故事）

### 1.3 设计风格
**极简干净** - 大量留白，简洁排版，让作品成为焦点

---

## 二、技术架构

### 2.1 技术栈选择
**方案：纯静态网站（HTML + CSS + Vanilla JavaScript）**

**选择理由：**
- 完美匹配个人展示需求
- 零成本部署和维护
- 加载速度快，SEO 友好
- 添加新作品简单（编辑 JSON 文件）
- 完全掌控设计，易于实现极简美学

**核心技术：**
- HTML5（语义化标签）
- CSS3（Grid/Flexbox 布局，CSS 变量）
- Vanilla JavaScript（ES6+）
- JSON 数据文件（作品内容管理）

**依赖库（CDN 引入）：**
- Masonry.js (~7KB) - 瀑布流布局
- GLightbox (~20KB) - 图片灯箱效果（可选，或自实现）

### 2.2 项目结构
```
framo/
├── index.html              # 首页（作品列表）
├── work.html              # 作品详情页模板
├── about.html             # 关于我页面（可选）
├── css/
│   ├── main.css          # 主样式文件
│   └── work.css          # 作品详情页样式
├── js/
│   ├── main.js           # 首页逻辑（瀑布流、搜索、懒加载）
│   ├── work.js           # 作品详情逻辑
│   └── masonry.min.js    # 瀑布流库（或使用 CDN）
├── data/
│   └── works.json        # 作品数据文件
├── assets/
│   ├── videos/           # 视频文件
│   ├── gifs/             # GIF 动图
│   ├── images/           # 静态图片（过程记录）
│   └── thumbnails/       # 缩略图（优化后的预览图）
├── .gitignore
└── README.md             # 项目说明文档
```

---

## 三、数据模型

### 3.1 作品数据结构（works.json）

```json
{
  "works": [
    {
      "id": "work-001",
      "title": "作品标题",
      "description": "作品简短描述，一两句话概括主题和风格",
      "story": "创作灵感和背后的故事。可以是多段文字，描述创作动机、想法演进、技术挑战等。",
      "createdDate": "2024-03",
      "tools": ["Procreate", "After Effects", "Premiere Pro"],
      "tags": ["角色动画", "逐帧", "实验性"],
      "thumbnail": "assets/thumbnails/work-001.jpg",
      "media": {
        "type": "video",
        "url": "assets/videos/work-001.mp4",
        "poster": "assets/thumbnails/work-001.jpg"
      },
      "additionalMedia": [
        {
          "type": "gif",
          "url": "assets/gifs/work-001-loop.gif",
          "caption": "循环片段"
        },
        {
          "type": "image",
          "url": "assets/images/work-001-sketch.jpg",
          "caption": "早期草图"
        },
        {
          "type": "image",
          "url": "assets/images/work-001-storyboard.jpg",
          "caption": "分镜设计"
        }
      ],
      "duration": "15s",
      "featured": true
    }
  ]
}
```

### 3.2 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识符，用于 URL 和数据查找 |
| `title` | string | ✅ | 作品标题 |
| `description` | string | ⭕ | 简短描述（在列表页显示） |
| `story` | string | ⭕ | 创作故事/理念（在详情页显示，支持多段） |
| `createdDate` | string | ⭕ | 创作时间（格式：YYYY-MM） |
| `tools` | array | ⭕ | 使用的工具列表 |
| `tags` | array | ⭕ | 分类标签（用于搜索） |
| `thumbnail` | string | ✅ | 缩略图路径 |
| `media` | object | ✅ | 主要媒体（video 或 gif） |
| `media.type` | string | ✅ | 媒体类型："video" 或 "gif" |
| `media.url` | string | ✅ | 媒体文件路径 |
| `media.poster` | string | ⭕ | 视频封面图（仅 video 类型） |
| `additionalMedia` | array | ⭕ | 额外媒体（过程记录图片、GIF等） |
| `duration` | string | ⭕ | 作品时长 |
| `featured` | boolean | ⭕ | 是否精选（用于排序优先级） |

---

## 四、页面设计

### 4.1 首页（index.html）

**布局结构：**

```
┌────────────────────────────────────────┐
│  Header                                │
│  ┌──────────────────────────────────┐  │
│  │ Framo                            │  │
│  │ 个人 2D 手绘动画作品展示            │  │
│  │                                  │  │
│  │ [搜索框]                [关于我]   │  │
│  └──────────────────────────────────┘  │
├────────────────────────────────────────┤
│  Main Content                          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │作品│ │作品│ │作品│ │作品│           │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │           │
│  └────┘ └────┘ └────┘ └────┘          │
│  ┌────┐ ┌────┐ ┌────┐                 │
│  │作品│ │作品│ │作品│                  │
│  │ 5  │ │ 6  │ │ 7  │                  │
│  └────┘ └────┘ └────┘                 │
│    （瀑布流布局，高度自适应）            │
├────────────────────────────────────────┤
│  Footer                                │
│  © 2024 Framo                          │
└────────────────────────────────────────┘
```

**组件详细设计：**

1. **Header（页头）**
   - 网站标题："Framo"（可使用自定义字体）
   - 副标题/简介：一句话描述（可选）
   - 搜索框：实时搜索作品（标题、描述、标签）
   - 导航链接："关于我"（可选）
   - 布局：居中对齐，最大宽度 1200px

2. **搜索功能**
   - 位置：Header 右侧
   - 样式：极简输入框，无边框，底部下划线
   - 交互：
     - 输入时实时过滤作品
     - 搜索范围：标题、描述、标签
     - 无结果时显示提示："未找到相关作品"
     - 清空按钮：搜索有内容时显示
   - 实现：纯前端 JavaScript 过滤

3. **作品卡片（瀑布流网格）**
   - 布局：Masonry 瀑布流
     - 桌面（>1024px）：3-4 列
     - 平板（769-1024px）：2 列
     - 移动（<768px）：1 列
   - 卡片内容：
     - 缩略图（16:9 或原始比例）
     - 悬停遮罩（半透明黑色，透明度 0.7）
     - 悬停时显示：标题、创作时间
   - 交互效果：
     - 默认：仅显示图片
     - 鼠标悬停：
       - 图片轻微放大（scale: 1.05）
       - 显示遮罩和文字信息
       - 过渡时间：0.3s ease-out
     - 点击：进入作品详情页

4. **页面加载动画**
   - 作品卡片依次淡入（stagger 动画）
   - 每个卡片延迟 50ms
   - 动画时长：0.4s

5. **懒加载**
   - 图片使用 `loading="lazy"` 属性
   - 视口外的图片延迟加载
   - 加载占位符：浅灰色背景

### 4.2 作品详情页（work.html）

**布局结构（单栏垂直）：**

```
┌─────────────────────────────────────┐
│ ← 返回首页                           │
├─────────────────────────────────────┤
│                                     │
│   ┌───────────────────────────┐     │
│   │                           │     │
│   │   [视频/GIF 播放器]        │     │
│   │   （居中，最大宽度 900px）   │     │
│   │                           │     │
│   └───────────────────────────┘     │
│                                     │
├─────────────────────────────────────┤
│  作品标题（大字号）                   │
│  ────────────────────────────        │
│  2024-03 · Procreate · 15s          │
├─────────────────────────────────────┤
│  简介段落                             │
│  （舒适的行高和字间距）                │
├─────────────────────────────────────┤
│  创作故事                             │
│  ────────                            │
│  多段文字描述创作灵感...              │
│  （留白充足，易于阅读）                │
├─────────────────────────────────────┤
│  制作过程                             │
│  ────────                            │
│  ┌────┐ ┌────┐ ┌────┐               │
│  │草图│ │分镜│ │其他│                │
│  └────┘ └────┘ └────┘               │
│  （横向滚动或网格布局）                │
└─────────────────────────────────────┘
```

**组件详细设计：**

1. **返回导航**
   - 位置：页面顶部左上角
   - 样式：`← 返回首页`
   - 交互：点击返回 index.html
   - 过渡：页面淡出/淡入动画

2. **主要媒体区域**
   - 视频播放器：
     - 自动播放（autoplay，muted）
     - 循环播放（loop）
     - 控制条：显示播放/暂停、音量、全屏
     - 响应式：宽度 100%，最大 900px
   - GIF 显示：
     - 自动循环
     - 居中显示
     - 最大宽度：900px

3. **作品信息区域**
   - 标题：大字号（32-40px），加粗
   - 元信息行：
     - 创作时间 · 使用工具（用点号分隔）
     - 字号小（14px），颜色浅灰
   - 简介：
     - 正文字号（16-18px）
     - 行高：1.7
     - 颜色：深灰 `#1A1A1A`

4. **创作故事区域**
   - 小标题："创作故事"（或"创作理念"）
   - 多段落文本：
     - 段落间距：1.5em
     - 支持多段
   - 布局：最大宽度 700px，居中

5. **制作过程区域**
   - 小标题："制作过程"
   - 图片画廊：
     - 布局：横向网格或滚动
     - 缩略图：宽度 200-300px
     - 图片标题（caption）显示在下方
   - 交互：
     - 点击图片放大（Lightbox 效果）
     - 左右切换查看所有过程图
     - ESC 或点击背景关闭

6. **响应式适配**
   - 移动端：
     - 所有内容堆叠
     - 字号适当缩小
     - 侧边距减小（16-24px）
   - 平板/桌面：
     - 内容居中
     - 左右留白充足（48-64px）

### 4.3 关于我页面（about.html，可选）

**简单的单页介绍：**
- 个人简介
- 联系方式（可选）
- 社交媒体链接（可选）

---

## 五、视觉设计规范

### 5.1 配色方案（极简干净）

```css
:root {
  /* 主色调 */
  --color-bg: #FFFFFF;           /* 背景 - 纯白 */
  --color-bg-alt: #FAFAFA;       /* 次级背景 - 浅灰 */
  
  /* 文字颜色 */
  --color-text-primary: #1A1A1A;   /* 主要文字 - 深灰接近黑 */
  --color-text-secondary: #666666; /* 辅助文字 - 中灰 */
  --color-text-tertiary: #999999;  /* 次要文字 - 浅灰 */
  
  /* 强调色 */
  --color-accent: #000000;         /* 强调 - 纯黑 */
  
  /* 边框和分隔 */
  --color-border: #E0E0E0;         /* 边框 - 浅灰 */
  
  /* 遮罩 */
  --color-overlay: rgba(0, 0, 0, 0.7); /* 半透明黑遮罩 */
}
```

### 5.2 字体规范

**字体家族：**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", 
             "Helvetica Neue", Arial, sans-serif;
```

**字号系统：**
- 特大标题：40px（桌面）/ 32px（移动）
- 大标题：32px（桌面）/ 28px（移动）
- 中标题：24px
- 小标题：18px
- 正文：16px（桌面）/ 15px（移动）
- 辅助信息：14px
- 小字：12px

**行高：**
- 标题：1.2-1.3
- 正文：1.6-1.8

**字重：**
- 标题：600-700（加粗）
- 正文：400（常规）
- 辅助：400（常规）

### 5.3 间距系统

**基础单位：** 8px

**间距级别：**
```css
--space-xs: 8px;     /* 极小间距 */
--space-sm: 16px;    /* 小间距 */
--space-md: 24px;    /* 中等间距 */
--space-lg: 32px;    /* 大间距 */
--space-xl: 48px;    /* 超大间距 */
--space-xxl: 64px;   /* 巨大间距 */
```

**应用规则：**
- 组件内元素：8-16px
- 组件间距：24-32px
- 区块间距：48-64px
- 页面边距：24px（移动）/ 48px（桌面）

### 5.4 布局约束

**最大宽度：**
- 内容容器：1200px
- 文本内容：700px（长文本）
- 媒体内容：900px（视频/图片）

**网格系统（瀑布流）：**
- 列间距（gap）：20px（移动）/ 24px（桌面）
- 列数：
  - 移动（<768px）：1 列
  - 平板（768-1024px）：2 列
  - 桌面（>1024px）：3-4 列

### 5.5 动画和过渡

**过渡时长：**
```css
--transition-fast: 0.15s;    /* 快速反馈 */
--transition-normal: 0.3s;   /* 标准过渡 */
--transition-slow: 0.5s;     /* 慢速动画 */
```

**缓动函数：**
```css
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);  /* 自然减速 */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* 平滑进出 */
```

**应用场景：**
- 悬停效果：0.3s ease-out
- 页面过渡：0.5s ease-in-out
- 元素淡入：0.4s ease-out

**动画原则：**
- 避免过度动画
- 保持克制和优雅
- 性能优先（使用 transform 和 opacity）
- 尊重用户系统设置（prefers-reduced-motion）

---

## 六、核心功能实现

### 6.1 瀑布流布局

**实现方式：** Masonry.js

**初始化代码（伪代码）：**
```javascript
// 等待所有图片加载完成
imagesLoaded(container, function() {
  // 初始化 Masonry
  new Masonry(container, {
    itemSelector: '.work-card',
    columnWidth: '.work-card',
    gutter: 24,
    percentPosition: true,
    transitionDuration: '0.3s'
  });
});
```

**响应式处理：**
- CSS 媒体查询控制列宽
- Masonry 自动计算列数
- 窗口 resize 时自动重排

### 6.2 搜索功能

**搜索范围：**
- 作品标题（title）
- 作品描述（description）
- 标签（tags）

**实现逻辑：**
```javascript
function searchWorks(query) {
  const lowerQuery = query.toLowerCase();
  
  return allWorks.filter(work => {
    // 搜索标题
    if (work.title.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // 搜索描述
    if (work.description?.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // 搜索标签
    if (work.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      return true;
    }
    
    return false;
  });
}
```

**UI 交互：**
1. 用户输入搜索词
2. 实时过滤作品列表（debounce 300ms）
3. 更新 Masonry 布局
4. 显示匹配数量："找到 X 件作品"
5. 无结果时显示提示
6. 清空搜索时恢复所有作品

**样式：**
- 输入框：极简无边框，仅底部下划线
- 占位符："搜索作品..."
- 清空按钮：输入后显示 ✕ 图标

### 6.3 懒加载

**图片懒加载：**
```html
<img 
  src="placeholder.jpg" 
  data-src="actual-image.jpg" 
  loading="lazy"
  alt="作品标题"
>
```

**视频懒加载：**
- 首屏外的视频不自动加载
- 进入视口后加载视频
- 使用 Intersection Observer API

**实现步骤：**
1. 初始加载：仅加载首屏可见内容
2. 滚动监听：检测元素进入视口
3. 动态加载：替换 data-src 为 src
4. 加载完成：触发 Masonry 布局更新

### 6.4 作品详情页路由

**URL 格式：**
```
work.html?id=work-001
```

**实现逻辑：**
1. 从 URL 获取作品 ID（URLSearchParams）
2. 从 works.json 加载数据
3. 查找匹配的作品
4. 渲染作品详情
5. 404 处理：作品不存在时显示提示

**页面过渡：**
- 进入：淡入动画（0.5s）
- 退出：淡出动画（0.3s）
- 使用 CSS transitions

### 6.5 图片灯箱（Lightbox）

**功能需求：**
- 点击过程图片放大查看
- 支持左右切换
- 显示图片标题（caption）
- ESC 键关闭
- 点击背景关闭

**实现方案：**
- 使用 GLightbox 库（轻量）
- 或自己实现简单版本

**自实现版本结构：**
```html
<div class="lightbox" id="lightbox">
  <div class="lightbox-backdrop"></div>
  <div class="lightbox-content">
    <img src="" alt="">
    <div class="lightbox-caption"></div>
    <button class="lightbox-prev">←</button>
    <button class="lightbox-next">→</button>
    <button class="lightbox-close">✕</button>
  </div>
</div>
```

---

## 七、性能优化

### 7.1 图片优化

**缩略图规范：**
- 尺寸：宽度 600px
- 格式：WebP（带 JPG 降级）
- 质量：85%
- 命名：`{work-id}.webp` / `{work-id}.jpg`

**详情页图片：**
- 尺寸：宽度 1200px
- 格式：WebP（带 JPG 降级）
- 质量：90%

**视频优化：**
- 编码：H.264
- 分辨率：1920×1080 或 1280×720
- 码率：2-5 Mbps
- 时长：尽量控制在 30s 内

**GIF 优化：**
- 尺寸：最大 800px 宽
- 颜色：256 色以内
- 帧数：12-24 fps
- 文件大小：<5MB

### 7.2 加载策略

**关键资源优先：**
```html
<link rel="preload" href="css/main.css" as="style">
<link rel="preload" href="js/main.js" as="script">
<link rel="preload" href="data/works.json" as="fetch" crossorigin>
```

**异步加载非关键资源：**
```html
<script src="js/masonry.min.js" defer></script>
<link rel="stylesheet" href="css/work.css" media="print" onload="this.media='all'">
```

**懒加载策略：**
1. 首屏图片：立即加载
2. 首屏外图片：懒加载
3. 视频：仅详情页加载
4. 过程图片：点击后加载

### 7.3 缓存策略

**浏览器缓存头（服务器配置）：**
```
# 静态资源长期缓存
Cache-Control: public, max-age=31536000

# HTML 文件不缓存
Cache-Control: no-cache

# JSON 数据短期缓存
Cache-Control: public, max-age=3600
```

**版本控制（文件名哈希）：**
```
main.css?v=abc123
main.js?v=xyz789
```

### 7.4 代码优化

**CSS 优化：**
- 使用 CSS 变量减少重复
- 避免深层嵌套
- 关键 CSS 内联

**JavaScript 优化：**
- 事件委托减少监听器
- Debounce/Throttle 搜索和滚动
- 避免强制同步布局（layout thrashing）

**渲染优化：**
- 使用 `will-change` 提示浏览器
- 动画使用 `transform` 和 `opacity`
- 避免复杂的 CSS 选择器

---

## 八、响应式设计

### 8.1 断点定义

```css
/* 移动端（竖屏） */
@media (max-width: 767px) {
  /* 1 列布局 */
  /* 字号缩小 */
  /* 间距紧凑 */
}

/* 平板（竖屏和小屏横屏） */
@media (min-width: 768px) and (max-width: 1024px) {
  /* 2 列布局 */
  /* 中等字号 */
  /* 适中间距 */
}

/* 桌面 */
@media (min-width: 1025px) {
  /* 3-4 列布局 */
  /* 标准字号 */
  /* 宽松间距 */
}
```

### 8.2 移动端优化

**触摸优化：**
- 点击目标至少 44×44px
- 卡片间距充足（至少 16px）
- 支持滑动手势

**视口设置：**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```

**移动端特殊处理：**
- 视频自动播放需要静音
- 减少动画复杂度
- 字号和间距适配

### 8.3 测试设备

**必测设备/分辨率：**
- iPhone SE (375×667)
- iPhone 14 Pro (393×852)
- iPad (768×1024)
- iPad Pro (1024×1366)
- 桌面 1920×1080

---

## 九、部署方案

### 9.1 部署平台选择

**推荐：GitHub Pages**

**优点：**
- 完全免费
- 自动 HTTPS
- 自定义域名支持
- Git 版本控制
- 每次 push 自动部署
- 无需配置服务器

**部署步骤：**
1. 创建 GitHub 仓库（命名为 `framo`）
2. 将代码推送到仓库
3. 进入仓库 Settings → Pages
4. 选择分支：`main`
5. 选择目录：`/ (root)`
6. 保存，等待 2-5 分钟
7. 访问：`https://{username}.github.io/framo`

**自定义域名（可选）：**
1. 购买域名（如 `framo.art`）
2. DNS 配置：添加 CNAME 记录指向 `{username}.github.io`
3. GitHub Pages 设置中填入自定义域名
4. 等待 DNS 生效（24-48小时）

### 9.2 替代方案

**Vercel：**
- 更快的 CDN
- 更好的构建性能
- 自动预览链接
- 部署步骤：导入 GitHub 仓库 → 自动部署

**Netlify：**
- 拖拽部署
- 表单处理（如需联系表单）
- 部署步骤：连接 GitHub → 自动部署

### 9.3 持续部署

**工作流程：**
1. 本地开发和测试
2. Git commit 提交更改
3. Git push 推送到 GitHub
4. 自动触发部署
5. 1-2 分钟后网站更新

**无需手动操作，完全自动化！**

---

## 十、日常维护

### 10.1 添加新作品流程

**步骤：**

1. **准备媒体文件**
   - 视频：放入 `assets/videos/`
   - GIF：放入 `assets/gifs/`
   - 图片：放入 `assets/images/`
   - 缩略图：放入 `assets/thumbnails/`

2. **编辑 works.json**
   ```json
   {
     "id": "work-002",
     "title": "新作品标题",
     "description": "简短描述",
     "story": "创作故事",
     "createdDate": "2024-04",
     "tools": ["工具1", "工具2"],
     "tags": ["标签1", "标签2"],
     "thumbnail": "assets/thumbnails/work-002.jpg",
     "media": {
       "type": "video",
       "url": "assets/videos/work-002.mp4",
       "poster": "assets/thumbnails/work-002.jpg"
     },
     "additionalMedia": [
       // 过程图片...
     ],
     "duration": "20s"
   }
   ```

3. **提交和部署**
   ```bash
   git add .
   git commit -m "Add new work: 作品标题"
   git push
   ```

4. **等待部署**（1-2 分钟后生效）

**就是这么简单！无需构建、编译、登录后台。**

### 10.2 修改作品信息

1. 打开 `data/works.json`
2. 找到对应作品条目
3. 修改字段内容
4. Git commit + push
5. 自动更新

### 10.3 删除作品

1. 从 `works.json` 删除对应条目
2. （可选）删除对应媒体文件
3. Git commit + push

### 10.4 备份建议

- GitHub 自动保存所有历史版本
- 本地保留源文件备份
- 定期导出 `works.json`

---

## 十一、未来扩展（可选）

以下功能暂不实现，但预留扩展可能：

### 11.1 标签筛选
- 在首页添加标签过滤器
- 点击标签只显示对应作品
- URL 支持标签参数

### 11.2 深色模式
- CSS 变量切换
- 保存用户偏好（localStorage）
- 自动检测系统主题

### 11.3 多语言支持
- 中英文切换
- 语言文件独立管理
- URL 参数控制语言

### 11.4 访问统计
- Google Analytics
- 查看作品浏览量
- 了解用户行为

### 11.5 RSS 订阅
- 生成 RSS feed
- 新作品自动推送
- 订阅者获取更新

---

## 十二、项目时间线

### 12.1 实施阶段

**阶段一：核心功能（1-2天）**
- 项目结构搭建
- 首页布局和瀑布流
- 作品详情页
- 数据加载和渲染
- 基础样式

**阶段二：交互优化（1天）**
- 搜索功能
- 懒加载
- 页面过渡动画
- 响应式适配

**阶段三：视觉打磨（0.5天）**
- 细节调整
- 动画优化
- 浏览器兼容性测试

**阶段四：部署上线（0.5天）**
- GitHub Pages 配置
- 测试访问
- 性能优化
- 文档完善

**总计：3-4天完成**

### 12.2 示例数据准备

**初期需准备：**
- 3-5 件示例作品
- 对应的缩略图、视频/GIF
- 作品描述和创作故事
- 过程记录图片（可选）

---

## 十三、技术细节补充

### 13.1 浏览器兼容性

**目标浏览器：**
- Chrome/Edge（最新版 + 前两个版本）
- Firefox（最新版 + 前两个版本）
- Safari（最新版 + 前两个版本）
- iOS Safari（iOS 14+）
- Android Chrome（Android 10+）

**降级处理：**
- WebP 图片提供 JPG 降级
- CSS Grid 降级到 Flexbox
- 现代 JS 特性使用 Babel 转译（可选）

### 13.2 SEO 优化

**HTML Meta 标签：**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Framo - 个人 2D 手绘动画作品展示">
<meta name="keywords" content="动画,2D动画,手绘动画,作品集">
<meta name="author" content="作者名">

<!-- Open Graph (社交分享) -->
<meta property="og:title" content="Framo - 动画作品集">
<meta property="og:description" content="个人 2D 手绘动画作品展示">
<meta property="og:image" content="share-image.jpg">
<meta property="og:url" content="https://username.github.io/framo">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Framo - 动画作品集">
<meta name="twitter:description" content="个人 2D 手绘动画作品展示">
<meta name="twitter:image" content="share-image.jpg">
```

**语义化 HTML：**
- 使用 `<article>`, `<section>`, `<header>`, `<footer>` 等语义标签
- 图片添加有意义的 `alt` 属性
- 链接添加 `title` 属性

**性能即 SEO：**
- 快速加载时间
- 移动端友好
- 无 JavaScript 阻塞

### 13.3 无障碍访问（A11y）

**基础要求：**
- 键盘导航支持（Tab 键切换）
- 焦点样式清晰可见
- 图片 alt 文本描述
- 颜色对比度符合 WCAG 2.1 AA 标准

**ARIA 标签：**
```html
<nav aria-label="主导航">
<button aria-label="关闭对话框">
<img src="work.jpg" alt="作品标题 - 简短描述">
```

**动画控制：**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 十四、设计决策记录

### 14.1 为什么选择纯静态方案？

**决策：** 不使用 React/Vue 等框架，采用纯 HTML/CSS/JS

**理由：**
1. **简单性**：项目规模小，无需复杂框架
2. **性能**：无框架运行时，加载更快
3. **可维护性**：代码直观，易于修改
4. **部署**：无需构建步骤，直接部署
5. **学习成本**：HTML/CSS/JS 是基础技能

**权衡：**
- 失去：组件化、状态管理、开发工具
- 获得：零依赖、极致性能、简单维护

### 14.2 为什么使用 JSON 而非 CMS？

**决策：** 作品数据存储在 JSON 文件，而非数据库或 CMS

**理由：**
1. **零成本**：无需数据库服务器
2. **版本控制**：Git 追踪所有变更
3. **简单性**：编辑文本文件即可
4. **备份**：自动备份在 GitHub
5. **性能**：本地文件读取极快

**权衡：**
- 失去：可视化编辑界面
- 获得：完全掌控、零成本、版本历史

### 14.3 为什么选择瀑布流布局？

**决策：** 首页使用瀑布流（Masonry）而非统一网格

**理由：**
1. **视觉活力**：高度不一致带来动态感
2. **空间利用**：减少空白区域
3. **灵活性**：适应不同比例的缩略图
4. **流行趋势**：符合现代设计审美

**权衡：**
- 失去：整齐划一的秩序感
- 获得：视觉趣味、更好的空间利用

---

## 十五、风险和注意事项

### 15.1 潜在风险

**1. 大文件加载性能**
- **风险**：视频文件过大导致加载缓慢
- **缓解**：
  - 视频压缩到合理大小（<10MB）
  - 使用懒加载
  - 提供加载进度提示

**2. 浏览器兼容性**
- **风险**：旧浏览器不支持某些特性
- **缓解**：
  - 渐进增强策略
  - 关键功能降级方案
  - 测试主流浏览器

**3. 移动端流量消耗**
- **风险**：自动播放视频消耗流量
- **缓解**：
  - 检测网络状态（Navigator.connection）
  - 移动端默认不自动播放
  - 显示文件大小提示

### 15.2 注意事项

**开发阶段：**
- 使用本地服务器测试（如 `python -m http.server`）
- 避免硬编码路径，使用相对路径
- 提交前检查所有媒体文件路径

**部署阶段：**
- 检查 `.gitignore` 配置（排除大文件）
- 验证所有链接可访问
- 测试不同设备和浏览器

**维护阶段：**
- 定期检查外部库版本
- 备份源文件到本地
- 监控网站加载性能

---

## 十六、成功指标

### 16.1 核心指标

**性能指标：**
- 首屏加载时间 < 3秒
- 首次内容绘制（FCP）< 1.5秒
- 最大内容绘制（LCP）< 2.5秒
- 累积布局偏移（CLS）< 0.1

**用户体验指标：**
- 移动端友好（Google Mobile-Friendly Test 通过）
- 无障碍评分 > 90（Lighthouse）
- SEO 评分 > 90（Lighthouse）

**功能指标：**
- 所有作品正常加载和显示
- 搜索功能准确响应
- 详情页路由正确工作
- 响应式布局无错位

### 16.2 验收标准

**必须满足：**
✅ 首页正确展示所有作品（瀑布流布局）  
✅ 搜索功能实时过滤作品  
✅ 点击作品进入详情页  
✅ 详情页展示视频/GIF、描述、创作故事、过程图片  
✅ 移动端/平板/桌面完美适配  
✅ 图片和视频懒加载  
✅ 部署到 GitHub Pages 并可访问  
✅ 添加新作品流程简单（编辑 JSON）  

**应该满足：**
✅ 页面过渡动画流畅  
✅ 悬停效果优雅  
✅ 加载性能优秀（<3秒）  
✅ 代码结构清晰易维护  

---

## 十七、总结

### 17.1 设计亮点

1. **极简美学** - 让作品成为绝对焦点
2. **零成本维护** - 免费托管，无服务器费用
3. **简单易用** - 添加作品只需编辑 JSON
4. **性能优秀** - 静态网站，加载极快
5. **响应式设计** - 所有设备完美体验
6. **可扩展性** - 预留未来功能扩展空间

### 17.2 适用场景

✅ **非常适合：**
- 个人作品展示
- 作品数量中等（<100件）
- 不需要频繁更新（周/月级别）
- 重视视觉呈现和性能
- 希望完全掌控设计

❌ **不太适合：**
- 需要多人协作编辑
- 作品数量巨大（>200件）
- 需要复杂的后台管理
- 需要用户评论/互动功能
- 需要实时更新（秒级）

### 17.3 下一步行动

**立即开始：**
1. 创建 GitHub 仓库
2. 搭建项目结构
3. 实现首页和详情页
4. 添加示例作品数据
5. 部署上线测试

**准备工作：**
- 整理 3-5 件示例作品
- 准备视频和图片素材
- 编写作品描述和故事
- 优化媒体文件大小

---

**设计文档完成！** 🎉

所有技术细节、设计规范、实施步骤都已明确。接下来可以开始编写实现计划，逐步构建这个优雅的动画作品展示网站。
