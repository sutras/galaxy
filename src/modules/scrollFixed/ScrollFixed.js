import Module from '../Module';
import defaults from './defaults';
import { $, throttle, addClass, removeClass, getOffsetTop, getScrollTop } from '../../utils/utils';
import { on, off } from '../../utils/event';

export default class ScrollFixed extends Module {
  constructor(el, params) {
    super(el, params, defaults);
  }

  _init() {
    const params = this.params;
    this.scrollBox = $(params.scrollBox);
    this.fixedBox = $(params.fixedBox, this.el) || this.el.children[0];
    this.isFixed = false;

    const scrollHandler = throttle(this.scrollHandler.bind(this), params.threshold);

    on(this.scrollBox, 'scroll' + this.namespace, () => {
      scrollHandler();
    });
    scrollHandler();
  }

  scrollHandler() {
    const params = this.params;
    const fixedClass = params.fixedClass;
    const scrollTop = getScrollTop(this.scrollBox);
    const offsetTop = getOffsetTop(this.el, this.scrollBox);
    const willFixed = scrollTop + params.offsetTop >= offsetTop;

    if (willFixed && !this.isFixed) {
      addClass(this.fixedBox, fixedClass);
    } else if (!willFixed && this.isFixed) {
      removeClass(this.fixedBox, fixedClass);
    }

    this.isFixed = willFixed;
  }

  _destroy() {
    off(this.scrollBox, this.namespace);
  }
}