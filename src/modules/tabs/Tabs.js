import Module from '../Module';
import defaults from './defaults';
import { $$, addClass, removeClass, hasClass } from '../../utils/utils';
import { on, off } from '../../utils/event';
import animate from '../../utils/animate';
import { MOUSEENTER, MOUSELEAVE, MOUSEOVER, MOUSEOUT } from '../../const';

export default class Tabs extends Module {
  constructor(el, params) {
    super(el, params, defaults);
  }

  _init() {
    const params = this.params;
    this.labels = $$(params.labels, this.el);
    this.panels = $$(params.panels, this.el);
    this.activeIndex = params.activeIndex;
    this.timer = null;
    // 是否处于过渡期
    this.transitional = false;

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
    if (!this.params.instant && this.transitional) {
      return;
    }
    this.goto(index);
  }

  show(index) {
    const params = this.params;
    const activeLabel = this.labels[index];
    const activePanel = this.panels[index];
    if (activeLabel && activePanel && !hasClass(activePanel, params.panelActiveClass)) {
      addClass(activeLabel, params.labelActiveClass);
      addClass(activePanel, params.panelActiveClass);
      animate(activePanel).clearQueue().finish();
      this.transitional = true;
      animate(activePanel).fadeIn({
        duration: params.duration,
        easing: params.easing,
        complete: () => {
          this.transitional = false;
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
      animate(activePanel).clearQueue().finish().fadeOut({
        duration: 0
      });
    }
    return this;
  }

  goto(index) {
    this.panels.forEach((panel, i) => {
      if (i === index) {
        this.show(i);
      } else {
        this.hide(i);
      }
    });
    return this;
  }

  _destroy() {
    this.panels.forEach((panel) => {
      animate(panel).clearQueue().finish();
    });

    this.labels.forEach((label) => {
      off(label, this.namespace);
    });
  }
}