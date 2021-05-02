export default {
  init: true,  // 实例化后是否立即初始化
  labels: null,  // 标签元素或选择器
  scrollBox: window,  // 被监听滚动的盒子
  offsetTop: 1,  // 偏移顶部距离，默认值为1是为避免有些浏览器定位到hash时，元素与浏览器顶部仍然有一个像素的距离导致无法切换
  threshold: 25,  // 触发滚动事件的阈值
  activeClass: 'galaxy-label-active',  // 当前活动的标签元素添加的类名
};