import { on, off } from '../../utils/event';
import { $, addClass, removeClass } from '../../utils/utils';
import animate from '../../utils/animate';
import { MOUSEENTER, MOUSELEAVE } from '../../const';

export default class MenuItem {
  constructor(item, host) {
    this.item = item;
    this.host = host;
    this.subMenu = $(host.params.subMenu, this.item);
    this.hidden = true;
    this.state = 0;  // 0: hidden, 1: shown, 2: hiding, 3: showing
  }

  init() {
    const host = this.host;

    const enterHandler = () => {
      // 还未隐藏
      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
        this.hideTimer = null;

        // 已经隐藏
      } else if (this.state === 0) {
        this.showTimer = setTimeout(() => {
          this.showTimer = null;
          this.show();
        }, host.params.showDelay);

        // 正在隐藏
      } else {
        this.show(true);
      }
    };

    const leaveHandler = () => {
      // 还未显示
      if (this.showTimer) {
        clearTimeout(this.showTimer);
        this.showTimer = null;

        // 已经显示
      } else {
        this.hideTimer = setTimeout(() => {
          this.hideTimer = null;
          this.hide();
        }, host.params.hideDelay);
      }
    };

    on(this.item, MOUSEENTER + host.namespace, enterHandler);
    on(this.item, MOUSELEAVE + host.namespace, leaveHandler);

    this.showHandler = target => {
      if (target !== this) {
        if (this.hideTimer) {
          clearTimeout(this.hideTimer);
          this.hideTimer = null;
        }
        this.hide(true);
      }
    };

    this.host.on('show', this.showHandler);
  }

  show(instant) {
    if (this.state === 1) {
      return;
    }
    if (this.state === 3) {
      if (instant) {
        animate(this.subMenu).finish();
      }
      return;
    }
    this.state = 3;  // showing
    const host = this.host;
    const activeClass = host.params.activeClass;
    const complete = () => {
      this.state = 1;  // shown
    };

    this.host.emit('show', this);

    if (this.subMenu) {
      animate(this.subMenu).clearQueue().finish()[host.showType]({
        duration: host.params.duration,
        easing: host.params.easing,
        complete
      });
      if (instant) {
        animate(this.subMenu).finish();
      }
    } else {
      complete();
    }
    if (host.activeItem) {
      removeClass(host.activeItem, host.params.activeClass);
    }
    addClass(this.item, activeClass);
  }

  hide(instant) {
    if (this.state === 0) {
      return;
    }
    if (this.state === 2) {
      if (instant) {
        animate(this.subMenu).finish();
      }
      return;
    }
    this.state = 2;  // hiding
    const host = this.host;
    const activeClass = host.params.activeClass;
    const complete = () => {
      removeClass(this.item, activeClass);
      this.state = 0;  // hidden
      if (host.activeItem) {
        addClass(host.activeItem, activeClass);
      }
    };

    if (this.subMenu) {
      animate(this.subMenu).clearQueue().finish()[host.hideType]({
        duration: host.params.duration,
        easing: host.params.easing,
        complete
      });
      if (instant) {
        animate(this.subMenu).finish();
      }
    } else {
      complete();
    }
  }

  destroy() {
    if (this.subMenu) {
      animate(this.subMenu).clearQueue().finish();
    }
    off(item, this.host.namespace);

    this.host.off('show', this.showHandler);
  }
}