import { extend, addClass, $$ } from '../../../utils/utils';
import animate from '../../../utils/animate';
import vivid from 'vivid';
import { TRANSITION_START, TRANSITION_END, HORIZONTAL, TRANSLATE_X, TRANSLATE_Y,
  GALAXY_CLONED_SLIDE, DATA_GALAXY_SLIDE_INDEX } from '../../../const';

const { css } = vivid;
const SLIDE = 'slide';

class EffectSlide {
  constructor(host) {
    this.host = host;
  }

  init() {
    const host = this.host;
    extend(this, host.params.effectSlide);
    this.isHorizontal = host.params.direction === HORIZONTAL;
    this.property = this.isHorizontal ? TRANSLATE_X : TRANSLATE_Y;
    this.visibleSlides = Math.max(~~this.visibleSlides, 1);
    this.scrolledSlides = Math.min(Math.max(~~this.scrolledSlides, 1), this.visibleSlides);
    this.lastScrolledSlides = host.slideList.length > this.visibleSlides
      ? host.slideList.length % this.visibleSlides || this.scrolledSlides
      : 0;

    this.clonedSlideList = [];
    if (this.loop) {
      host.pages = Math.ceil(host.slideList.length / this.scrolledSlides);
      this.clonedSlides = Math.max(~~this.clonedSlides, this.visibleSlides);
      if (host.pages > 1) {
        this.cloneSlide(this.clonedSlides);
        this.allSlideList = $$(host.wrapper.children);
      } else {
        this.allSlideList = host.slideList.slice();
      }
    } else {
      // 最后一页滑块数为可视滑块数
      host.pages = Math.ceil(Math.max(host.slideList.length - this.visibleSlides, 0) / this.scrolledSlides) + 1;
      this.allSlideList = host.slideList.slice();
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
    if (this.isHorizontal) {
      this.allSlideList.forEach(slide => {
        css(slide, 'position', 'absolute');
      });
    }
    this.updateStyle();
  }

  updateStyle() {
    const host = this.host;
    const isHorizontal = this.isHorizontal;
    const slideWidth = host.width / (isHorizontal ? this.visibleSlides : 1);
    const slideHeight = host.height / (!isHorizontal ? this.visibleSlides : 1);
    const slideSize = this.slideSize = isHorizontal ? slideWidth : slideHeight;
    this.allSlideList.forEach((slide, index) => {
      css(slide, {
        top: isHorizontal ? 0 : index * slideHeight,
        left: !isHorizontal ? 0 : index * slideWidth,
        width: slideWidth,
        height: slideHeight
      });
    });

    css(host.wrapper, {
      width: slideWidth * (isHorizontal ? this.allSlideList.length : 1),
      height: slideHeight * (!isHorizontal ? this.allSlideList.length : 1)
    });
    css(host.wrapper, this.property, -slideSize * (host.activeIndex + this.clonedSlides));
  }

  getScrolledSlides() {
    const host = this.host;

    if (this.loop) {
      if (host.lastToFirst) {
        return host.slideList.length + this.clonedSlides;
      }
      if (host.firstToLast) {
        return this.clonedSlides - this.lastScrolledSlides;
      }
      return host.activeIndex * this.scrolledSlides + this.clonedSlides;
    } else {
      return host.activeIndex >= host.pages - 1 ? host.slideList.length - this.visibleSlides : host.activeIndex * this.scrolledSlides;
    }
  }

  switch() {
    const host = this.host;

    animate(host.wrapper).clearQueue().finish();
    host.transitional = true;

    const lastToFirst = host.lastToFirst;
    const firstToLast = host.firstToLast;

    host.emit(TRANSITION_START);
    animate(host.wrapper).custom({
      [this.property]: -this.slideSize * this.getScrolledSlides()
    }, {
      duration: host.params.duration,
      easing: host.params.easing,
      complete: () => {
        if (this.loop) {
          if (lastToFirst) {
            css(host.wrapper, this.property, -this.slideSize * this.clonedSlides);
          } else if (firstToLast) {
            css(host.wrapper, this.property, -this.slideSize * (host.slideList.length + this.clonedSlides - this.lastScrolledSlides));
          }
        }
        host.transitional = false;
        host.emit(TRANSITION_END);
      }
    });
  }

  destroy() {
    const host = this.host;
    animate(host.wrapper).clearQueue().finish();
    if (this.clonedSlideList.length) {
      this.clonedSlideList.forEach(slide => slide.parentNode.removeChild(slide));
    }
    css(host.wrapper, this.property, 0);
  }
}

export default {
  name: 'effectSlide',
  params: {
    effectSlide: {
      loop: false,
      // 可视滑块个数
      visibleSlides: 1,
      // 每次滚动的滑块数，不大于可视滑块数
      scrolledSlides: 1,
      // 前后克隆的滑块数，默认和可视滑块数相同，不可小于可视滑块数
      clonedSlides: 0,
      // 滑块下标值对应的元素属性名，用于loop模式下
      slideIndexAttrName: DATA_GALAXY_SLIDE_INDEX,
      clonedSlideClass: GALAXY_CLONED_SLIDE,
    }
  },
  create(instance) {
    instance.effectSlide = new EffectSlide(instance);
  },
  on: {
    init(instance) {
      if (instance.params.effect === SLIDE) {
        instance.effectSlide.init();
      }
    },
    switch(instance) {
      if (instance.params.effect === SLIDE) {
        instance.effectSlide.switch();
      }
    },
    destroy(instance) {
      if (instance.params.effect === SLIDE) {
        instance.effectSlide.destroy();
      }
    },
    sizeChange(instance) {
      if (instance.params.effect === SLIDE) {
        instance.effectSlide.updateStyle();
      }
    }
  }
};