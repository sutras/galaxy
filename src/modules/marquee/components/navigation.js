import { extend, $, addClass, removeClass, namespace } from '../../../utils/utils';
import { on, off } from '../../../utils/event';

class Navigation {
  constructor(host) {
    this.host = host;
    this.namespace = namespace();
  }

  init() {
    const host = this.host;
    extend(this, host.params.navigation);
    this.prevEl = $(this.prevEl, host.el) || $(this.prevEl);
    this.nextEl = $(this.nextEl, host.el) || $(this.nextEl);

    const downHandler = event => {
      event.preventDefault();
      this.down = true;
      addClass(event.currentTarget, this.downClass);
      host.autoplay.pause();
      host.interval = host.params.downInterval;
      host.offset = host.params.downOffset === null ? host.params.offset : host.params.downOffset;
      host.autoplay.play();
    };

    if (this.prevEl) {
      on(this.prevEl, 'mousedown' + this.namespace, event => {
        host.reverse = true;
        downHandler(event);
      });
    }
    if (this.nextEl) {
      on(this.nextEl, 'mousedown' + this.namespace, event => {
        host.reverse = false;
        downHandler(event);
      });
    }
    if (this.prevEl || this.nextEl) {
      on(document, 'mouseup' + this.namespace, () => {
        if (this.down) {
          this.down = false;
          removeClass(this.prevEl, this.downClass);
          removeClass(this.nextEl, this.downClass);
          host.autoplay.pause();
          host.interval = host.params.interval;
          host.offset = host.params.offset;
          host.autoplay.play();
        }
      });
    }
  }

  destroy() {
    if (this.prevEl) {
      off(this.prevEl, this.namespace);
    }
    if (this.nextEl) {
      off(this.nextEl, this.namespace);
    }
  }
}

export default {
  name: 'navigation',
  params: {
    navigation: {
      nextEl: null,
      prevEl: null,
      downClass: 'galaxy-button-down'
    }
  },
  create(instance) {
    instance.navigation = new Navigation(instance);
  },
  on: {
    init(instance) {
      instance.navigation.init();
    },
    destroy(instance) {
      instance.navigation.destroy();
    }
  }
};