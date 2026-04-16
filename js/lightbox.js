/**
 * Framo - 图片灯箱功能
 * 支持点击放大查看、键盘导航、左右切换
 */

let currentImages = [];
let currentIndex = 0;

/**
 * 打开灯箱
 * @param {Array} images - 图片数组 [{url, caption}]
 * @param {number} index - 当前图片索引
 */
function openLightbox(images, index = 0) {
  currentImages = images;
  currentIndex = index;
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  // 显示灯箱
  lightbox.classList.remove('hidden');
  
  // 设置图片和标题
  updateLightboxImage();
  
  // 禁止body滚动
  document.body.style.overflow = 'hidden';
  
  // 绑定键盘事件
  document.addEventListener('keydown', handleKeyDown);
}

/**
 * 关闭灯箱
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  
  // 恢复body滚动
  document.body.style.overflow = '';
  
  // 移除键盘事件
  document.removeEventListener('keydown', handleKeyDown);
  
  // 清空数据
  currentImages = [];
  currentIndex = 0;
}

/**
 * 上一张图片
 */
function prevImage() {
  if (currentImages.length === 0) return;
  
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightboxImage();
}

/**
 * 下一张图片
 */
function nextImage() {
  if (currentImages.length === 0) return;
  
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightboxImage();
}

/**
 * 更新灯箱中的图片
 */
function updateLightboxImage() {
  if (currentImages.length === 0) return;
  
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const currentImage = currentImages[currentIndex];
  
  // 设置图片
  lightboxImage.src = currentImage.url;
  lightboxImage.alt = currentImage.caption || '';
  
  // 设置标题
  if (currentImage.caption) {
    lightboxCaption.textContent = currentImage.caption;
    lightboxCaption.style.display = 'block';
  } else {
    lightboxCaption.style.display = 'none';
  }
  
  // 更新前后按钮可见性
  const prevButton = document.querySelector('.lightbox-prev');
  const nextButton = document.querySelector('.lightbox-next');
  
  if (currentImages.length <= 1) {
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  } else {
    prevButton.style.display = 'flex';
    nextButton.style.display = 'flex';
  }
}

/**
 * 处理键盘事件
 */
function handleKeyDown(e) {
  switch(e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      prevImage();
      break;
    case 'ArrowRight':
      nextImage();
      break;
  }
}

// 防止灯箱内容区域的点击事件冒泡到背景
document.addEventListener('DOMContentLoaded', () => {
  const lightboxContent = document.querySelector('.lightbox-content');
  if (lightboxContent) {
    lightboxContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});
