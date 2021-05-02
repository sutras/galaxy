import Module from '../Module';
import defaults from './defaults';
import { $, $$ } from '../../utils/utils';
import vivid from 'vivid';
const { css } = vivid;

export default class Carousel extends Module {
  constructor(el, params) {
    super(el, params, defaults);
  }

  _init() {
    this.wrapper = $(this.params.wrapper, this.el);
    this.slideList = this.params.slideList ? $$(this.params.slideList, this.el) : $$(this.wrapper.children);
    this.width = parseFloat(css(this.el, 'width'));
    this.height = parseFloat(css(this.el, 'height'));
    this.pages = this.slideList.length;
    this.activeIndex = Math.max(Math.min(~~this.params.activeIndex, this.pages - 1), 0);
    // 是否处于过渡期
    this.transitional = false;
  }

  _destroy() {
  }

  switchTo(index, type) {
    if (this.pages <= 1 || !this.params.instant && this.transitional) {
      return this;
    }
    index = Math.min(Math.abs(~~index), this.pages - 1);
    if (index === this.activeIndex) {
      return this;
    }
    this.switchType = type;
    this.previousActiveIndex = this.activeIndex;
    this.activeIndex = index;
    this.lastToFirst = this.activeIndex === 0 && type === 'next';
    this.firstToLast = this.activeIndex === this.pages - 1 && type === 'prev';
    this.emit('activeIndexChange');
    this.emit('switch');
    return this;
  }

  goto(index) {
    return this.switchTo(index);
  }

  gotoNext() {
    return this.switchTo((this.activeIndex + 1) % this.pages, 'next');
  }

  gotoPrev() {
    return this.switchTo((this.activeIndex - 1 + this.pages) % this.pages, 'prev');
  }

  gotoFirst() {
    return this.switchTo(0);
  }

  gotoLast() {
    return this.switchTo(this.pages - 1);
  }
}