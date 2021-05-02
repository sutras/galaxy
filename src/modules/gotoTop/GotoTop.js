import Module from '../Module';
import defaults from './defaults';
import { throttle } from '../../utils/utils';
import { on, off } from '../../utils/event';
import animate from '../../utils/animate';

export default class Marquee extends Module {
  constructor(el, params) {
    super(el, params, defaults);
  }

  _init() {
    const toggle = throttle(this.toggle.bind(this), this.params.threshold);

    if (this.params.togglePoint > 0) {
      on(window, 'scroll' + this.namespace, () => {
        toggle();
      });
    }
    on(this.el, 'click' + this.namespace, () => {
      [document.documentElement, document.body].forEach(el => {
        animate(el).clearQueue().finish().custom({
          scrollTop: 0
        }, {
          duration: this.params.duration
        });
      });
    });
    toggle(true);
  }

  getScrollTop() {
    return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  }

  toggle(init) {
    const show = this.getScrollTop() >= this.params.togglePoint;
    if (show !== this.show) {
      this.show = show;
      animate(this.el).clearQueue().finish()[show ? 'fadeIn' : 'fadeOut']({
        duration: init ? 0 : this.params.fadeDuration
      });
    }
  }

  _destroy() {
    off(this.el, this.namespace);
    if (this.params.togglePoint > 0) {
      off(window, this.namespace);
    }
    [document.documentElement, document.body, this.el].forEach(el => {
      animate(el).clearQueue().finish();
    });
  }
}