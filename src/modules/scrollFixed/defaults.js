export default {
  init: true,  // 实例化后是否立即初始化
  fixedBox: null,  // 用于固定的盒子，默认为el的第一个子元素
  scrollBox: window,  // 被监听滚动的盒子
  threshold: 25,  // 触发滚动事件的阈值
  offsetTop: 0,  // 偏移顶部距离
  fixedClass: 'galaxy-fixed'
};