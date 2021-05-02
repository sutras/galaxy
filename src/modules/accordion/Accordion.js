import Module from '../Module';
import defaults from './defaults';
import { $$, addClass, removeClass, hasClass } from '../../utils/utils';
import { on, off } from '../../utils/event';
import animate from '../../utils/animate';
import { HORIZONTAL, MOUSEOVER, MOUSEENTER, MOUSEOUT, MOUSELEAVE } from '../../const';

export default class Accordion extends Module {
  constructor(el, params) {
    super(el, params, defaults);
  }

  _init() {
    const params = this.params;
    this.labels = $$(params.labels, this.el);
    this.panels = $$(params.panels, this.el);
    this.activeIndex = params.activeIndex;
    this.isHorizontal = params.direction === HORIZONTAL;
    this.timer = null;
    // 是否处于过渡期
    this.transitional = [];

    const triggerType = params.triggerType;

    this.panels.forEach((panel, index) => {
      if (this.activeIndex === index) {
        addClass(panel, params.panelActiveClass);
        addClass(this.labels[index], params.labelActiveClass);
        animate(panel).fadeIn({ duration: 0 });
      } else {
        removeClass(panel, params.panelActiveClass);
        removeClass(this.labels[index], params.labelActiveClass);
        animate(panel).fadeOut({ duration: 0 });
      }
    });

    if (triggerType === MOUSEOVER || triggerType === MOUSEENTER) {
      this.labels.forEach((label, index) => {
        on(label, triggerType + this.namespace, () => {
          this.timer = setTimeout(() => {
            this.trigger(index);
          }, params.triggerDelay);
        });
        on(label, (triggerType === MOUSEOVER ? MOUSEOUT : MOUSELEAVE) + this.namespace, () => {
          if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
          }
        });
      });
    } else {
      this.labels.forEach((label, index) => {
        on(label, params.triggerType + this.namespace, () => {
          this.trigger(index);
        });
      });
    }
  }

  trigger(index) {
    const params = this.params;
    if (!params.instant && this.transitional.some(item => item)) {
      return;
    }
    if (params.multiple) {
      this.toggle(index);
    } else {
      if (params.atLeastOne) {
        this.onlyShow(index);
      } else {
        this.hideOthersAndToggle(index);
      }
    }
  }

  show(index) {
    const params = this.params;
    const activeLabel = this.labels[index];
    const activePanel = this.panels[index];
    if (activeLabel && activePanel && !hasClass(activePanel, params.panelActiveClass)) {
      addClass(activeLabel, params.labelActiveClass);
      addClass(activePanel, params.panelActiveClass);
      animate(activePanel).clearQueue().finish();
      this.transitional[index] = true;
      animate(activePanel)[this.isHorizontal ? 'slideRight' : 'slideDown']({
        duration: params.duration,
        easing: params.easing,
        complete: () => {
          this.transitional[index] = false;
        }
      });
    }
    return this;
  }

  hide(index) {
    const params = this.params;
    const activeLabel = this.labels[index];
    const activePanel = this.panels[index];
    if (activeLabel && activePanel && hasClass(activePanel, params.panelActiveClass)) {
      removeClass(activeLabel, params.labelActiveClass);
      removeClass(activePanel, params.panelActiveClass);
      animate(activePanel).clearQueue().finish();
      this.transitional[index] = true;
      animate(activePanel)[this.isHorizontal ? 'slideLeft' : 'slideUp']({
        duration: params.duration,
        easing: params.easing,
        complete: () => {
          this.transitional[index] = false;
        }
      });
    }
    return this;
  }

  toggle(index) {
    const activePanel = this.panels[index];
    if (activePanel) {
      if (hasClass(activePanel, this.params.panelActiveClass)) {
        this.hide(index);
      } else {
        this.show(index);
      }
      return this;
    }
  }

  showAll() {
    this.panels.forEach((panel, index) => {
      this.show(index);
    });
    return this;
  }

  hideAll() {
    this.panels.forEach((panel, index) => {
      this.hide(index);
    });
    return this;
  }

  onlyShow(index) {
    this.panels.forEach((panel, i) => {
      if (i === index) {
        this.show(i);
      } else {
        this.hide(i);
      }
    });
    return this;
  }

  onlyHide(index) {
    this.panels.forEach((panel, i) => {
      if (i !== index) {
        this.show(i);
      } else {
        this.hide(i);
      }
    });
    return this;
  }

  hideOthersAndToggle(index) {
    this.panels.forEach((panel, i) => {
      if (i === index) {
        this.toggle(i);
      } else {
        this.hide(i);
      }
    });
    return this;
  }

  showOthersAndToggle(index) {
    this.panels.forEach((panel, i) => {
      if (i === index) {
        this.toggle(i);
      } else {
        this.show(i);
      }
    });
    return this;
  }

  _destroy() {
    this.labels.forEach((label) => {
      off(label, this.namespace);
    });

    this.panels.forEach((panel, index) => {
      animate(panel).clearQueue().finish();
    });
  }
}