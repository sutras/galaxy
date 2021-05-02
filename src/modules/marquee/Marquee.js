import Module from '../Module';
import defaults from './defaults';
import { $, $$ } from '../../utils/utils';
import vivid from 'vivid';
import { HORIZONTAL, TRANSLATE_X, TRANSLATE_Y } from '../../const';

const { css } = vivid;

export default class Marquee extends Module {
  constructor(el, params) {
    super(el, params, defaults);
  }

  _init() {
    const params = this.params;
    this.wrapper = $(params.wrapper, this.el);
    this.slideList = params.slideList ? $$(params.slideList, this.el) : $$(this.wrapper.children);
    this.translate = params.translate;
    this.interval = params.interval;
    this.offset = params.offset;
    this.reverse = false;
    this.isHorizontal = params.direction === HORIZONTAL;
    this.property = this.isHorizontal ? TRANSLATE_X : TRANSLATE_Y;
    this.clonedSlideList = [];

    this.cloneNodes();

    if (this.isHorizontal) {
      this.slideList.concat(this.clonedSlideList).forEach((slide) => {
        css(slide, 'float', 'left');
      });
      css(this.wrapper, {
        width: this.getWrapperWidth() * 2,
        overflow: 'hidden'
      });
      this.wrapperSize = this.wrapper.offsetWidth / 2;
    } else {
      this.wrapperSize = this.wrapper.offsetHeight / 2;
    }
  }

  getWrapperWidth() {
    return this.slideList.reduce((total, el) => total + this.getWideWidth(el), 0);
  }

  getWideWidth(elem) {
    return elem.offsetWidth + parseFloat(css(elem, 'marginLeft')) + parseFloat(css(elem, 'marginRight'));
  }

  cloneNodes() {
    const docFrag = document.createDocumentFragment();
    this.slideList.forEach(el => {
      const clonedNode = el.cloneNode(true);
      docFrag.appendChild(clonedNode);
      this.clonedSlideList.push(clonedNode);
    });
    this.wrapper.appendChild(docFrag);
  }

  prevTick() {
    let translate = this.translate - this.offset;
    if (translate < 0) {
      translate = this.wrapperSize;
    }
    this.translateTo(translate);
  }

  nextTick() {
    let translate = this.translate + this.offset;
    if (translate > this.wrapperSize) {
      translate = 0;
    }
    this.translateTo(translate);
  }

  tick() {
    if (this.reverse) {
      this.prevTick();
    } else {
      this.nextTick();
    }
  }

  translateTo(value) {
    this.translate = Math.min(Math.max(0, value), this.wrapperSize);
    css(this.wrapper, this.property, -this.translate);
  }

  _destroy() {
    if (this.clonedSlideList.length) {
      this.clonedSlideList.forEach(slide => slide.parentNode.removeChild(slide));
    }
  }
}