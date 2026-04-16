# Framo - 个人动画作品展示集

极简风格的个人 2D 手绘动画作品展示网站。

## 特性

- 🎨 极简干净的设计风格
- 📱 完全响应式设计（支持手机/平板/桌面）
- 🔍 实时搜索功能
- 🖼️ 瀑布流布局展示
- 🎬 支持视频、GIF、图片展示
- ⚡ 懒加载优化性能
- 📦 纯静态网站，零依赖后端

## 技术栈

- HTML5
- CSS3 (Grid/Flexbox)
- Vanilla JavaScript (ES6+)
- Masonry.js (瀑布流布局)

## 快速开始

### 本地开发

使用任意 HTTP 服务器运行：

```bash
# Python 3
python -m http.server 8000

# Node.js (npx http-server)
npx http-server -p 8000
```

访问 `http://localhost:8000`

### 添加新作品

1. 将媒体文件放入对应目录：
   - 视频：`assets/videos/`
   - GIF：`assets/gifs/`
   - 图片：`assets/images/`
   - 缩略图：`assets/thumbnails/`

2. 编辑 `data/works.json`，添加新作品条目：

```json
{
  "id": "work-003",
  "title": "新作品标题",
  "description": "简短描述",
  "story": "创作故事",
  "createdDate": "2024-04",
  "tools": ["Procreate", "After Effects"],
  "tags": ["角色动画", "逐帧"],
  "thumbnail": "assets/thumbnails/work-003.jpg",
  "media": {
    "type": "video",
    "url": "assets/videos/work-003.mp4",
    "poster": "assets/thumbnails/work-003.jpg"
  },
  "additionalMedia": [],
  "duration": "15s"
}
```

3. 提交并推送：

```bash
git add .
git commit -m "Add new work: 作品标题"
git push
```

### 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 进入仓库 Settings → Pages
3. 选择分支：`main`，目录：`/ (root)`
4. 保存，等待 2-5 分钟
5. 访问：`https://{username}.github.io/framo`

## 项目结构

```
framo/
├── index.html              # 首页
├── work.html              # 作品详情页
├── css/
│   ├── main.css          # 首页样式
│   └── work.css          # 详情页样式
├── js/
│   ├── main.js           # 首页逻辑
│   ├── work.js           # 详情页逻辑
│   └── lightbox.js       # 图片灯箱
├── data/
│   └── works.json        # 作品数据
├── assets/
│   ├── videos/           # 视频文件
│   ├── gifs/             # GIF 文件
│   ├── images/           # 图片文件
│   └── thumbnails/       # 缩略图
└── README.md
```

## License

MIT
