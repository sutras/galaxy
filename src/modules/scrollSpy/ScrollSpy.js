import Module from '../Module';
import defaults from './defaults';
import {
  $, $$, throttle, matchesSelector, addClass, removeClass,
  getScrollTop, getOffsetTop, getScrollHeight, getClientHeight
} from '../../utils/utils';
import { on, off } from '../../utils/event';

export default class ScrollSpy extends Module {
  constructor(el, params) {
    super(el, params, defaults);
  }

  _init() {
    const params = this.params;
    this.labels = $$(params.labels, this.el);
    this.targets = [];
    this.scrollBox = $(params.scrollBox);
    this.currentTarget = null;

    this.labels.forEach(label => {
      const el = $(label.getAttribute('href'));
      if (el) {
        this.targets.push([el, getOffsetTop(el, this.scrollBox)]);
      }
    });

    this.targets.sort((a, b) => {
      return a[1] - b[1];
    });

    const scrollHandler = throttle(this.scrollHandler.bind(this), params.threshold);

    on(this.scrollBox, 'scroll' + this.namespace, () => {
      scrollHandler();
    });
    scrollHandler();
  }

  scrollHandler() {
    const params = this.params;
    const scrollTop = getScrollTop(this.scrollBox);
    const currentTarget = this.currentTarget;
    this.refresh();
    let current = this.targets[0];
    if (this.isScrollToBottom()) {
      current = this.targets[this.targets.length - 1];
    } else {
      this.targets.forEach(target => {
        if (scrollTop + params.offsetTop >= target[1]) {
          current = target;
        }
      });
    }
    if (current && (!currentTarget || currentTarget[0] !== current[0])) {
      this.currentTarget = current;
      this.labels.forEach(label => {
        if (matchesSelector(current[0], label.getAttribute('href'))) {
          addClass(label, this.params.activeClass);
        } else {
          removeClass(label, this.params.activeClass);
        }
      });
    }
  }

  isScrollToBottom() {
    const scrollBox = this.scrollBox;
    return getClientHeight(scrollBox) + getScrollTop(scrollBox) >= getScrollHeight(scrollBox);
  }

  refresh() {
    this.targets.forEach(target => {
      target[1] = getOffsetTop(target[0], this.scrollBox);
    });

    this.targets.sort((a, b) => {
      return a[1] - b[1];
    });
  }

  _destroy() {
    off(this.scrollBox, this.namespace);
  }
}