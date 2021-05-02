import { extend, $, $$, addClass, removeClass } from '../../../utils/utils';
import { addEventWithDelay } from '../../../utils/event';

const Bullets = {
  initItems() {
    if (this.autoPaging) {
      this.el.innerHTML = Array.apply(null, { length: this.host.pages }).reduce((total, index) => {
        return total + this.renderBullets(index, this.bulletClass);
      }, '');
      this.bulletList = $$(this.el.children);
    } else {
      this.bulletList = $$(this.bulletEl, this.el);
    }
    this.updateItems();

    if (this.triggerType) {
      this.offEvent = addEventWithDelay(this.bulletList, this.triggerType, (bullet, index) => {
        this.trigger(index);
      }, this.triggerDelay);
    }
  },

  updateItems() {
    this.bulletList.forEach((bullet, index) => {
      (index === this.host.activeIndex ? addClass : removeClass)(bullet, this.bulletActiveClass);
    });
  },

  destroyItems() {
    if (this.offEvent) {
      this.offEvent();
    }
    if (this.autoPaging) {
      this.el.innerHTML = '';
    }
  }
};

const Fraction = {
  initItems() {
    this.el.innerHTML = this.renderFraction(this.currentClass, this.totalClass);
    this.fractionCurrentEl = $('.' + this.currentClass, this.el);
    this.fractionTotalEl = $('.' + this.totalClass, this.el);
    this.updateItems();
  },

  updateItems() {
    const host = this.host;
    this.fractionCurrentEl.innerHTML = host.activeIndex + 1;
    this.fractionTotalEl.innerHTML = host.pages;
  },

  destroyItems() {
    this.el.innerHTML = '';
  }
};

const Custom = {
  initItems() {
    this.update();
  },

  updateItems() {
    const host = this.host;
    this.el.innerHTML = this.renderCustom(host, host.activeIndex + 1, host.pages);
  },

  destroyItems() {
    this.el.innerHTML = '';
  }
};

class Pagination {
  constructor(host) {
    this.host = host;
  }

  init() {
    const host = this.host;
    extend(this, host.params.pagination);
    if (!this.el) {
      return;
    }
    this.el = $(this.el, host.el) || $(this.el);
    extend(this, Pagination.types[this.type]);
    if (this.el) {
      this.initItems();
    }
  }

  trigger(index) {
    this.host.switchTo(index);
  }

  update() {
    if (this.el) {
      this.updateItems();
    }
  }

  destroy() {
    if (this.el) {
      this.destroyItems();
    }
  }
}

Pagination.types = {
  bullets: Bullets,
  fraction: Fraction,
  custom: Custom
};

export default {
  name: 'pagination',
  params: {
    pagination: {
      el: null,

      // 分页类型，可选：'bullets', 'fraction', 'custom'。
      type: 'bullets',

      // bullets触发滑块切换的事件类型，可选：'click', 'mouseover', 'mouseenter', 'mousedown', 'mouseup' 等鼠标事件；
      // 也可传入false来不让bullets控制切换滑块
      triggerType: 'click',

      // 触发延迟，当triggerType为'mouseover'或'mouseenter'时，为防止误触发，鼠标移上一定时间内才触发事件来切换滑块。
      triggerDelay: 150,

      // 是否自动分页，如果基于现有的DOM作为分页项，可设为false，并使用el选项指定分页项。
      autoPaging: true,

      // 用于非自动分页指定bullets元素
      bulletEl: null,

      renderBullets(index, bulletClass) {
        return `<span class="${bulletClass}"></span>`;
      },

      renderFraction(currentClass, totalClass) {
        return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
      },
      renderCustom(host, current, total) {
        return current + ' / ' + total;
      },

      // 命名空间
      bulletClass: 'galaxy-pagination-bullet',
      bulletActiveClass: 'galaxy-pagination-bullet-active',
      currentClass: 'galaxy-pagination-current',
      totalClass: 'galaxy-pagination-total',
    }
  },
  create(instance) {
    instance.pagination = new Pagination(instance);
  },
  on: {
    init(instance) {
      instance.pagination.init();
    },
    activeIndexChange(instance) {
      instance.pagination.update();
    },
    destroy(instance) {
      instance.pagination.destroy();
    }
  }
};