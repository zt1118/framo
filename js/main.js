/**
 * Framo - 首页主脚本
 * 功能：加载作品数据、初始化瀑布流布局、实现搜索功能
 */

// 全局变量
let allWorks = [];
let filteredWorks = [];
let masonryInstance = null;

// DOM 元素
const worksGrid = document.getElementById('worksGrid');
const loading = document.getElementById('loading');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const searchStatus = document.getElementById('searchStatus');

/**
 * 初始化应用
 */
async function init() {
  try {
    // 加载作品数据
    await loadWorks();
    
    // 渲染作品
    renderWorks(allWorks);
    
    // 初始化瀑布流
    initMasonry();
    
    // 绑定搜索事件
    bindSearchEvents();
    
    // 隐藏加载状态
    hideLoading();
  } catch (error) {
    console.error('初始化失败:', error);
    showError('加载失败，请刷新页面重试');
  }
}

/**
 * 加载作品数据
 */
async function loadWorks() {
  const response = await fetch('data/works.json');
  if (!response.ok) {
    throw new Error('Failed to load works data');
  }
  const data = await response.json();
  allWorks = data.works || [];
  filteredWorks = allWorks;
}

/**
 * 渲染作品卡片
 */
function renderWorks(works) {
  // 清空现有内容
  worksGrid.innerHTML = '';
  
  if (works.length === 0) {
    showEmptyState();
    return;
  }
  
  hideEmptyState();
  
  // 渲染每个作品卡片
  works.forEach((work, index) => {
    const card = createWorkCard(work, index);
    worksGrid.appendChild(card);
  });
}

/**
 * 创建作品卡片元素
 */
function createWorkCard(work, index) {
  const card = document.createElement('div');
  card.className = 'work-card';
  card.style.animationDelay = `${index * 0.05}s`;
  
  card.innerHTML = `
    <a href="work.html?id=${work.id}" class="work-card-link">
      <div class="work-card-image">
        <img 
          src="${work.thumbnail}" 
          alt="${work.title}"
          loading="lazy"
        >
      </div>
      <div class="work-card-overlay">
        <h3 class="work-card-title">${work.title}</h3>
        <p class="work-card-meta">${work.createdDate || ''}</p>
      </div>
    </a>
  `;
  
  return card;
}

/**
 * 初始化 Masonry 瀑布流布局
 */
function initMasonry() {
  // 等待所有图片加载完成
  imagesLoaded(worksGrid, function() {
    masonryInstance = new Masonry(worksGrid, {
      itemSelector: '.work-card',
      columnWidth: '.work-card',
      gutter: 24,
      percentPosition: true,
      transitionDuration: '0.3s'
    });
  });
}

/**
 * 更新 Masonry 布局
 */
function updateMasonry() {
  if (masonryInstance) {
    // 等待新图片加载
    imagesLoaded(worksGrid, function() {
      masonryInstance.reloadItems();
      masonryInstance.layout();
    });
  } else {
    // 如果还没初始化，则初始化
    initMasonry();
  }
}

/**
 * 绑定搜索相关事件
 */
function bindSearchEvents() {
  // 搜索输入事件（debounce）
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();
    
    // 显示/隐藏清空按钮
    if (query) {
      searchClear.classList.remove('hidden');
    } else {
      searchClear.classList.add('hidden');
    }
    
    // 延迟执行搜索（300ms）
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);
  });
  
  // 清空按钮点击事件
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.classList.add('hidden');
    performSearch('');
  });
}

/**
 * 执行搜索
 */
function performSearch(query) {
  if (!query) {
    // 空查询，显示所有作品
    filteredWorks = allWorks;
    hideSearchStatus();
  } else {
    // 执行搜索过滤
    filteredWorks = searchWorks(query);
    showSearchStatus(query, filteredWorks.length);
  }
  
  // 重新渲染
  renderWorks(filteredWorks);
  
  // 更新布局
  updateMasonry();
}

/**
 * 搜索作品
 */
function searchWorks(query) {
  const lowerQuery = query.toLowerCase();
  
  return allWorks.filter(work => {
    // 搜索标题
    if (work.title && work.title.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // 搜索描述
    if (work.description && work.description.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // 搜索标签
    if (work.tags && work.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      return true;
    }
    
    return false;
  });
}

/**
 * 显示搜索状态
 */
function showSearchStatus(query, count) {
  searchStatus.textContent = `搜索 "${query}" 找到 ${count} 件作品`;
  searchStatus.classList.remove('hidden');
}

/**
 * 隐藏搜索状态
 */
function hideSearchStatus() {
  searchStatus.classList.add('hidden');
}

/**
 * 显示空状态
 */
function showEmptyState() {
  emptyState.classList.remove('hidden');
}

/**
 * 隐藏空状态
 */
function hideEmptyState() {
  emptyState.classList.add('hidden');
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
  loading.classList.add('hidden');
}

/**
 * 显示错误信息
 */
function showError(message) {
  loading.innerHTML = `<p style="color: #e53e3e;">${message}</p>`;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
