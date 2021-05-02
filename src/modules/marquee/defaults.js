export default {
  init: true,  // 实例化后是否立即初始化
  interval: 20,  // 每一次位移的时间间隔
  downInterval: 5,  // 鼠标按下时的interval值
  offset: 1,  // wrapper每一次位移的偏移量，单位px
  downOffset: null,  // 鼠标按下时的offset值，如果不设置，默认等同于offset
  direction: 'vertical',  // 运动方向
  translate: 0,  // 初始化时的位移,
  hoverPause: true,  // 鼠标移上去是否停止
};