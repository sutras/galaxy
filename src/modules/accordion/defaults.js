export default {
  init: true,  // 实例化后是否立即初始化
  labels: null,  // 手风琴控制元件
  panels: null,  // 手风琴面板元素
  multiple: false,  // 是否可以打开多个
  atLeastOne: true,  // 当multiple为false时使用，至少要有一个显示，默认显示下标为activeIndex的panel
  instant: true,  // 切换时，如果上一个动画还没有过渡完，立即完成上一次动画并开始新的动画。
  triggerType: 'click',  // labels触发事件的类型：可选'click', 'mouseenter'
  triggerDelay: 150,  // 当triggerType为'mouseenter'时，为避免无意间滑动鼠标导致展开折叠
  duration: 300,  // 滑块切换持续时间，单位毫秒
  easing: 'easeInOutQuad',  // 缓动公式
  activeIndex: 0,  // 默认活动滑块的下标
  direction: 'vertical',  // 滑块切换的轴线，可选：'horizontal', 'vertical'
  labelActiveClass: 'galaxy-label-active',
  panelActiveClass: 'galaxy-panel-active',
};