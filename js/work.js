/**
 * Framo - 作品详情页脚本
 * 功能：加载作品数据、渲染内容、处理媒体、集成灯箱
 */

// 当前作品数据
let currentWork = null;

// DOM 元素
const loading = document.getElementById('loading');
const workContent = document.getElementById('workContent');
const notFound = document.getElementById('notFound');

/**
 * 初始化详情页
 */
async function init() {
  try {
    // 从 URL 获取作品 ID
    const urlParams = new URLSearchParams(window.location.search);
    const workId = urlParams.get('id');
    
    if (!workId) {
      showNotFound();
      return;
    }
    
    // 加载作品数据
    await loadWork(workId);
    
    if (!currentWork) {
      showNotFound();
      return;
    }
    
    // 渲染作品内容
    renderWork();
    
    // 显示内容，隐藏加载
    hideLoading();
    showContent();
    
  } catch (error) {
    console.error('初始化失败:', error);
    showError();
  }
}

/**
 * 加载作品数据
 */
async function loadWork(workId) {
  const response = await fetch('data/works.json');
  if (!response.ok) {
    throw new Error('Failed to load works data');
  }
  
  const data = await response.json();
  const works = data.works || [];
  
  // 查找匹配的作品
  currentWork = works.find(work => work.id === workId);
}

/**
 * 渲染作品内容
 */
function renderWork() {
  if (!currentWork) return;
  
  // 设置页面标题
  document.title = `${currentWork.title} - Framo`;
  
  // 渲染主媒体
  renderMedia();
  
  // 渲染作品信息
  renderInfo();
  
  // 渲染简介
  renderDescription();
  
  // 渲染创作故事
  renderStory();
  
  // 渲染制作过程
  renderProcess();
}

/**
 * 渲染主媒体（视频或 GIF）
 */
function renderMedia() {
  const mediaContainer = document.getElementById('mediaContainer');
  const media = currentWork.media;
  
  if (!media) return;
  
  if (media.type === 'video') {
    // 渲染视频
    const video = document.createElement('video');
    video.src = media.url;
    video.poster = media.poster || currentWork.thumbnail;
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    
    // 点击取消静音
    video.addEventListener('click', () => {
      video.muted = !video.muted;
    });
    
    mediaContainer.appendChild(video);
  } else if (media.type === 'gif') {
    // 渲染 GIF
    const img = document.createElement('img');
    img.src = media.url;
    img.alt = currentWork.title;
    mediaContainer.appendChild(img);
  }
}

/**
 * 渲染作品信息
 */
function renderInfo() {
  // 标题
  const titleElement = document.getElementById('workTitle');
  titleElement.textContent = currentWork.title;
  
  // 元信息
  const metaElement = document.getElementById('workMeta');
  const metaItems = [];
  
  // 创作时间
  if (currentWork.createdDate) {
    metaItems.push(`<div class="work-meta-item">
      <span class="work-meta-label">创作时间：</span>
      <span>${currentWork.createdDate}</span>
    </div>`);
  }
  
  // 使用工具
  if (currentWork.tools && currentWork.tools.length > 0) {
    metaItems.push(`<div class="work-meta-item">
      <span class="work-meta-label">工具：</span>
      <span>${currentWork.tools.join(', ')}</span>
    </div>`);
  }
  
  // 时长
  if (currentWork.duration) {
    metaItems.push(`<div class="work-meta-item">
      <span class="work-meta-label">时长：</span>
      <span>${currentWork.duration}</span>
    </div>`);
  }
  
  metaElement.innerHTML = metaItems.join('');
  
  // 标签
  if (currentWork.tags && currentWork.tags.length > 0) {
    const tagsHtml = `<div class="work-meta-item">
      <span class="work-meta-label">标签：</span>
      <div class="work-tags">
        ${currentWork.tags.map(tag => `<span class="work-tag">${tag}</span>`).join('')}
      </div>
    </div>`;
    metaElement.innerHTML += tagsHtml;
  }
}

/**
 * 渲染简介
 */
function renderDescription() {
  if (!currentWork.description) return;
  
  const descSection = document.getElementById('workDescription');
  descSection.innerHTML = `<div class="work-description">
    <p>${currentWork.description}</p>
  </div>`;
}

/**
 * 渲染创作故事
 */
function renderStory() {
  if (!currentWork.story) {
    document.getElementById('workStory').classList.add('hidden');
    return;
  }
  
  const storyContent = document.getElementById('storyContent');
  
  // 将换行符转换为段落
  const paragraphs = currentWork.story.split('\n\n').filter(p => p.trim());
  const storyHtml = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
  
  storyContent.innerHTML = storyHtml;
}

/**
 * 渲染制作过程
 */
function renderProcess() {
  if (!currentWork.additionalMedia || currentWork.additionalMedia.length === 0) {
    document.getElementById('workProcess').classList.add('hidden');
    return;
  }
  
  const processGallery = document.getElementById('processGallery');
  const additionalMedia = currentWork.additionalMedia;
  
  // 渲染每个过程项
  additionalMedia.forEach((item, index) => {
    const processItem = document.createElement('div');
    processItem.className = 'process-item';
    
    processItem.innerHTML = `
      <div class="process-item-image">
        <img src="${item.url}" alt="${item.caption || ''}" loading="lazy">
      </div>
      ${item.caption ? `<div class="process-item-caption">${item.caption}</div>` : ''}
    `;
    
    // 点击打开灯箱
    processItem.addEventListener('click', () => {
      const images = additionalMedia
        .filter(m => m.type === 'image')
        .map(m => ({ url: m.url, caption: m.caption || '' }));
      
      // 找到当前图片在数组中的索引
      const imageIndex = images.findIndex(img => img.url === item.url);
      
      openLightbox(images, imageIndex);
    });
    
    processGallery.appendChild(processItem);
  });
}

/**
 * 显示内容
 */
function showContent() {
  workContent.classList.remove('hidden');
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
  loading.classList.add('hidden');
}

/**
 * 显示 404 页面
 */
function showNotFound() {
  loading.classList.add('hidden');
  notFound.classList.remove('hidden');
}

/**
 * 显示错误
 */
function showError() {
  loading.innerHTML = '<p style="color: #e53e3e;">加载失败，请刷新页面重试</p>';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
