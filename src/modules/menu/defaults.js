export default {
  init: true,  // 实例化后是否立即初始化
  menuItems: null,  // 菜单项元素或选择器
  subMenu: null,  // 子菜单元素或选择器
  effect: 'fade',  // 菜单项显示/隐藏效果，可选'fade', 'slide'
  activeClass: 'galaxy-menu-item-active',  // 当前活动菜单项添加的类名
  duration: 300,  // 切换持续时间，单位毫秒
  showDelay: 50,  // 延迟显示的时间，单位毫秒，为避免短时间类重复多次切换菜单
  hideDelay: 50,  // 延迟隐藏的时间，单位毫秒，可在彻底隐藏前把鼠标移到菜单项上阻止隐藏
};