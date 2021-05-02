import { extend, $, addClass, removeClass } from '../../../utils/utils';
import { addEventWithDelay } from '../../../utils/event';

class Navigation {
  constructor(host) {
    this.host = host;
  }

  init() {
    const host = this.host;
    extend(this, host.params.navigation);
    this.prevEl = $(this.prevEl, host.el) || $(this.prevEl);
    this.nextEl = $(this.nextEl, host.el) || $(this.nextEl);

    this.toggleClasses();

    this.prevHandler = () => {
      if (!this.disabledIfEdge || host.activeIndex !== 0) {
        host.gotoPrev();
      }
    };

    this.nextHandler = () => {
      if (!this.disabledIfEdge || host.activeIndex !== host.slideList.length - 1) {
        host.gotoNext();
      }
    };

    if (this.prevEl) {
      this.offPrevElEvent = addEventWithDelay(this.prevEl, this.triggerType, () => {
        this.prevHandler();
      }, this.triggerDelay);
    }
    if (this.nextEl) {
      this.offNextElEvent = addEventWithDelay(this.nextEl, this.triggerType, () => {
        this.nextHandler();
      }, this.triggerDelay);
    }
  }

  toggleClasses() {
    const host = this.host;
    if (!this.disabledIfEdge) {
      return;
    }
    if (this.prevEl) {
      (host.activeIndex === 0 ? addClass : removeClass)(this.prevEl, this.disabledClass);
    }
    if (this.nextEl) {
      (host.activeIndex === host.slideList.length - 1 ? addClass : removeClass)(this.nextEl, this.disabledClass);
    }
  }

  destroy() {
    if (this.offPrevElEvent) {
      this.offPrevElEvent();
    }
    if (this.offNextElEvent) {
      this.offNextElEvent();
    }
  }
}

export default {
  name: 'navigation',
  params: {
    navigation: {
      nextEl: null,
      prevEl: null,

      // 按钮触发滑块切换的事件类型，可选：'click', 'mousedown', 'mouseup'等鼠标事件。
      triggerType: 'click',
      triggerDelay: 150,
      disabledIfEdge: false,  // 到达边缘是否禁止切换
      disabledClass: 'galaxy-button-disabled',  // disabledIfEdge为true情况下，到达边缘时添加的类名。
    }
  },
  create(instance) {
    instance.navigation = new Navigation(instance);
  },
  on: {
    init(instance) {
      instance.navigation.init();
    },
    activeIndexChange(instance) {
      instance.navigation.toggleClasses();
    },
    destroy(instance) {
      instance.navigation.destroy();
    }
  }
};