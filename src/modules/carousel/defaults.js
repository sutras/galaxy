export default {
  wrapper: '.galaxy-wrapper',

  // 默认获取wrapper的子元素作为滑块，如果滑块同级有其他元素，可直接指定滑块
  slideList: null,

  // 滑块切换效果，可选：'fade', 'slide', 'deck'
  effect: 'fade',

  // 切换时，如果上一个动画还没有过渡完，立即完成上一次动画并开始新的动画。
  instant: true,

  // 实例化后是否立即初始化
  init: true,

  // 滑块切换持续时间，单位毫秒
  duration: 500,

  // 缓动公式
  easing: 'easeInOutQuad',

  // 默认活动滑块的下标
  activeIndex: 0,

  // 滑块切换的轴线，可选：'horizontal', 'vertical'
  direction: 'horizontal',

  // 当前活动滑块添加的类名
  activeClass: 'galaxy-slide-active',
};