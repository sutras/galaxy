import { extend, addClass, $$, matchesSelector } from '../../../utils/utils';
import { addEventWithDelay } from '../../../utils/event';
import animate from '../../../utils/animate';
import vivid from 'vivid';
import { TRANSITION_START, TRANSITION_END, HORIZONTAL, GALAXY_CLONED_SLIDE, DATA_GALAXY_SLIDE_INDEX } from '../../../const';

const { css, stagger } = vivid;

const STACK = 'stack';
const SWITCH_BY_CLONED_SLIDE = 'switchByClonedSlide';

class EffectStack {
  constructor(host) {
    this.host = host;
  }

  init() {
    const host = this.host;
    extend(this, host.params.effectStack);
    const isHorizontal = this.isHorizontal = host.params.direction === HORIZONTAL;
    const focusWidth = this.focusWidth = this.focusWidth === null ? parseFloat(css(host.slideList[host.activeIndex], 'width')) : this.focusWidth;
    const focusHeight = this.focusHeight = this.focusHeight === null ? parseFloat(css(host.slideList[host.activeIndex], 'height')) : this.focusHeight;

    this.mainAxisFocusSize = isHorizontal ? focusWidth : focusHeight;
    this.crossAxisFocusSize = isHorizontal ? focusHeight : focusWidth;
    this.mainAxisSize = isHorizontal ? 'width' : 'height';
    this.crossAxisSize = isHorizontal ? 'height' : 'width';
    this.mainAxisPos = isHorizontal ? 'left' : 'top';
    this.crossAxisPos = isHorizontal ? 'top' : 'left';

    this.layer = Math.max(~~this.layer, 2);
    this.teamNum = this.layer * 2 + 1;

    this.clonedSlideList = [];
    
    if (host.slideList.length < this.teamNum - 2) {
      this.loop = false;
    }
    if (this.loop) {
      this.loopedSlides = this.layer * 2 - 2;
      this.cloneSlide(this.loopedSlides);
      host.allSlideList = $$(host.wrapper.children);
    } else {
      this.loopedSlides = 0;
      host.allSlideList = host.slideList.slice();
    }

    if (this.switchBySlide) {
      this.offEvent = addEventWithDelay(host.allSlideList, this.triggerType, (slide, index) => {
        if (!host.transitional) {
          let switchType;
          let i = index;
          if (this.loop) {
            i = slide.getAttribute(this.slideIndexAttrName);
          }
          if (matchesSelector(slide, '.' + this.clonedSlideClass)) {
            this.clonedSlideIndex = index;
            switchType = SWITCH_BY_CLONED_SLIDE;
          }
          host.switchTo(i, switchType);
        }
      }, this.triggerDelay);
    }

    this.initStyle();
  }

  cloneSlide(clonedNum) {
    const host = this.host;

    // 把下标保存到元素属性
    // 为了使克隆和被克隆的滑块行为统一
    host.slideList.forEach((slide, index) => {
      slide.setAttribute(this.slideIndexAttrName, index);
    });

    // 往wapper前添加克隆滑块
    for (let i = 1; i <= clonedNum; i++) {
      let clonedNode = host.slideList[host.slideList.length - i].cloneNode(true);
      this.clonedSlideList.push(clonedNode);
      addClass(clonedNode, this.clonedSlideClass);
      host.wrapper.insertBefore(clonedNode, host.wrapper.firstChild);
    }

    // 往wapper后添加克隆滑块
    for (let i = 0; i < clonedNum; i++) {
      let clonedNode = host.slideList[i].cloneNode(true);
      this.clonedSlideList.push(clonedNode);
      addClass(clonedNode, this.clonedSlideClass);
      host.wrapper.appendChild(clonedNode);
    }
  }

  initStyle() {
    const host = this.host;

    if (css(host.wrapper, 'position') === 'static') {
      css(host.wrapper, 'position', 'relative');
    }
    css(host.wrapper, 'overflow', 'hidden');
    host.allSlideList.forEach(el => {
      css(el, 'position', 'absolute');
    });
    this.originalZIndex = host.slideList.map(slide => {
      return [slide, css(slide, 'zIndex')];
    });
    this.updateStyle();
  }

  getFocusIndex() {
    const host = this.host;
    const loopedSlides = this.loopedSlides;
    if (this.loop && host.lastToFirst) {
      return loopedSlides + host.slideList.length;
    }
    if (this.loop && host.firstToLast) {
      return loopedSlides - 1;
    }
    if (this.loop && host.switchType === SWITCH_BY_CLONED_SLIDE) {
      return this.clonedSlideIndex;
    }
    return loopedSlides + host.activeIndex;
  }

  getOffset(focusIndex, index) {
    return Math.min(Math.max((this.teamNum - 1) / 2 - (focusIndex - index), 0), this.teamNum - 1);
  }

  getOffsetRelAllSlideList(index) {
    return this.getOffset(this.getFocusIndex(), index);
  }

  getOffsetRelSlideList(index) {
    return this.getOffset(this.host.activeIndex + this.loopedSlides, index);
  }

  setZIndex(slide, index, slideList, before) {
    const focusIndex = before ? this.getFocusIndex() : this.host.activeIndex + this.loopedSlides;
    css(slide, 'zIndex', slideList.length - Math.abs(focusIndex - index));
  }

  updateStyle() {
    const host = this.host;
    const mainAxisWrapperSize = Math.max(host[this.mainAxisSize], this.mainAxisFocusSize);

    if (!this.isHorizontal) {
      this.crossAxisFocusSize = host.width;
    }

    css(host.wrapper, {
      width: host.width,
      height: this.isHorizontal ? this.focusHeight : host.height
    });

    const teamStyle = [];
    const sizeStagger = stagger(this.scale, {
      start: 1,
      from: 'center',
      easing: this.scaleEasing
    });
    for (let i = 0; i < this.teamNum; i++) {
      const scale = Math.max(sizeStagger(i, this.teamNum), 0);
      const mainAxisFocusSize = this.mainAxisFocusSize * scale;
      const crossAxisFocusSize = this.crossAxisFocusSize * scale;
      const crossAxisPos = this.align === 'start'
        ? 0
        : this.align === 'end'
          ? this.crossAxisFocusSize - crossAxisFocusSize
          : (this.crossAxisFocusSize - crossAxisFocusSize) / 2;
      teamStyle.push({
        [this.mainAxisSize]: mainAxisFocusSize,
        [this.crossAxisSize]: crossAxisFocusSize,
        [this.crossAxisPos]: crossAxisPos
      });
    }

    const styles = teamStyle.slice(1, this.layer);
    const gap = ((mainAxisWrapperSize - this.mainAxisFocusSize) / 2 - styles.reduce((total, style) => total + style[this.mainAxisSize], 0)) / styles.length;
    let incrWidth = 0;
    teamStyle.forEach((style, i, arr) => {
      const mainAxisSize = style[this.mainAxisSize];
      style[this.mainAxisPos] = i === 0
        ? -mainAxisSize
        : i === arr.length - 1
          ? mainAxisWrapperSize
          : i <= this.layer
            ? incrWidth
            : mainAxisWrapperSize - teamStyle[arr.length - 1 - i][this.mainAxisPos] - mainAxisSize;

      if (i > 0) {
        incrWidth += mainAxisSize + gap;
      }
    });

    this.teamStyle = teamStyle;

    host.allSlideList.forEach((slide, i, slideList) => {
      this.setZIndex(slide, i, slideList, this.changeZIndex === 'before' && host.transitional ? true : false);
      const offset = host.transitional ? this.getOffsetRelAllSlideList(i) : this.getOffsetRelSlideList(i);
      slide.setAttribute(this.visibleSlideDataName, offset);
      css(slide, teamStyle[offset]);
    });
  }

  switch() {
    const host = this.host;

    host.allSlideList.forEach(slide => animate(slide).clearQueue().finish());
    host.transitional = true;

    const lastToFirst = host.lastToFirst;
    const firstToLast = host.firstToLast;
    const switchByClonedSlide = host.switchType === SWITCH_BY_CLONED_SLIDE;

    host.emit(TRANSITION_START);
    host.allSlideList.forEach((slide, i, slideList) => {
      const offset = this.getOffsetRelAllSlideList(i);
      const completeOffset = this.getOffsetRelSlideList(i);
      if (this.changeZIndex === 'before') {
        this.setZIndex(slide, i, slideList, true);
      }
      slide.setAttribute(this.visibleSlideDataName, offset);
      animate(slide).custom(this.teamStyle[offset], {
        duration: host.params.duration,
        easing: host.params.easing,
        complete: () => {
          this.setZIndex(slide, i, slideList);
          if (this.loop && (lastToFirst || firstToLast || switchByClonedSlide)) {
            css(slide, this.teamStyle[completeOffset]);
          }
          host.transitional = false;
          host.emit(TRANSITION_END);
        }
      });
    });
  }

  destroy() {
    const host = this.host;

    host.allSlideList.forEach(slide => animate(slide).clearQueue().finish());
    if (this.offEvent) {
      this.offEvent();
    }
    if (this.clonedSlideList.length) {
      this.clonedSlideList.forEach(slide => slide.parentNode.removeChild(slide));
    }
    this.originalZIndex.forEach(([slide, zIndex]) => {
      css(slide, {
        width: this.focusWidth,
        height: this.focusHeight,
        zIndex: zIndex
      });
    });
  }
}

export default {
  name: 'effectStack',
  params: {
    effectStack: {
      loop: true,  // 是否循环，当总滑块数小于可视滑块数时，强制不循环
      layer: 2,  // 堆叠的层数，最少两层
      scale: -.12,  // 逐层缩小比率
      scaleEasing: 'linear',
      changeZIndex: 'after',  // 在动画开始之前或动画结束之后改变层级，可选: 'before', 'after'
      focusWidth: null,  // 焦点滑块的宽度
      focusHeight: null,  // 焦点滑块的高度
      align: 'center',  // 层的对齐方式，可选：'start', 'center', 'end'
      visibleSlideIndexAttrName: 'data-visible-slide-index',  // 可见滑块
      // 滑块下标值对应的元素属性名，用于loop模式下
      slideIndexAttrName: DATA_GALAXY_SLIDE_INDEX,
      clonedSlideClass: GALAXY_CLONED_SLIDE,
      // 是否可通过操作滑块进行切换
      switchBySlide: true,
      // 通过操作滑块进行切换的事件类型
      triggerType: 'click',
      triggerDelay: 150
    }
  },
  create(instance) {
    instance.effectStack = new EffectStack(instance);
  },
  on: {
    init(instance) {
      if (instance.params.effect === STACK) {
        instance.effectStack.init();
      }
    },
    switch(instance) {
      if (instance.params.effect === STACK) {
        instance.effectStack.switch();
      }
    },
    destroy(instance) {
      if (instance.params.effect === STACK) {
        instance.effectStack.destroy();
      }
    },
    sizeChange(instance) {
      if (instance.params.effect === STACK) {
        instance.effectStack.updateStyle();
      }
    }
  }
};