import { extend } from '../../../utils/utils';
import animate from '../../../utils/animate';
import vivid from 'vivid';
import { TRANSITION_START, TRANSITION_END, HORIZONTAL, TRANSLATE_X, TRANSLATE_Y } from '../../../const';

const { css } = vivid;
const DECK = 'deck';
const COVER = 'cover';
const DRAW = 'draw';

class EffectDeck {
  constructor(host) {
    this.host = host;
  }

  init() {
    const host = this.host;
    extend(this, host.params.effectDeck);
    this.isHorizontal = host.params.direction === HORIZONTAL;
    this.property = this.isHorizontal ? TRANSLATE_X : TRANSLATE_Y;
    this.size = this.isHorizontal ? 'width' : 'height';
    this.initStyle();
  }

  initStyle() {
    const host = this.host;

    if (css(host.wrapper , 'position') === 'static') {
      css(host.wrapper , 'position', 'relative');
    }
    this.originalZIndex = host.slideList.map(slide => {
      css(slide, {
        position: 'absolute',
        left: 0,
        top: 0
      });
      return [slide, css(slide, 'zIndex')];
    });
    this.updateZIndex(host.activeIndex);
    this.updateStyle();
  }

  updateStyle() {
    const host = this.host;
    host.slideList.concat(host.wrapper ).forEach(slide => {
      css(slide, {
        width: host.width,
        height: host.height
      });
    });
  }

  updateZIndex(activeIndex) {
    this.host.slideList.forEach((slide, index) => {
      css(slide, 'zIndex', index === activeIndex ? 0 : -1);
    });
  }

  switch() {
    const host = this.host;
    const activeIndex = host.activeIndex;
    const previousActiveIndex = host.previousActiveIndex;

    host.slideList.forEach(slide => animate(slide).clearQueue().finish());
    host.transitional = true;

    const diff = activeIndex - previousActiveIndex;
    const isNext = host.switchType === 'next' || diff > 0 && host.switchType !== 'prev';
    const easing = (isNext ? this.nextEasing : this.prevEasing) || host.params.easing;
    const duration = isNext
      ? (this.nextDuration !== null ? this.nextDuration : host.params.duration)
      : (this.prevDuration !== null ? this.prevDuration : host.params.duration);
    const preset = this.type === COVER && isNext || this.type !== COVER && !isNext;
    const currentIndex = preset ? activeIndex : previousActiveIndex;
    const relatedIndex = !preset ? activeIndex : previousActiveIndex;

    if (preset) {
      css(host.slideList[currentIndex], this.property, host[this.size] * (this.type === COVER ? -1 : 1));
    }
    host.slideList.forEach((slide, index) => {
      css(slide, 'zIndex', index === currentIndex ? 0 : index === relatedIndex ? -1 : -2);
    });

    host.emit(TRANSITION_START);
    animate(host.slideList[currentIndex]).custom({
      [this.property]: preset ? 0 : host[this.size] * (this.type === COVER ? -1 : 1)
    }, {
      duration,
      easing,
      complete: () => {
        this.updateZIndex(preset ? currentIndex : relatedIndex);
        if (!preset) {
          css(host.slideList[currentIndex], this.property, 0);
        }
        host.transitional = false;
        host.emit(TRANSITION_END);
      }
    });
  }

  destroy() {
    this.host.slideList.forEach(slide => animate(slide).clearQueue().finish());
    this.originalZIndex.forEach(([slide, zIndex]) => {
      css(slide, 'zIndex', zIndex);
    });
  }
}

export default {
  name: 'effectDeck',
  params: {
    effectDeck: {
      // 牌组类型，可选：'draw'-抽取、'cover'-覆盖
      type: DRAW,
      prevEasing: '',
      nextEasing: '',
      prevDuration: null,
      nextDuration: null
    }
  },
  create(instance) {
    instance.effectDeck = new EffectDeck(instance);
  },
  on: {
    init(instance) {
      if (instance.params.effect === DECK) {
        instance.effectDeck.init();
      }
    },
    switch(instance) {
      if (instance.params.effect === DECK) {
        instance.effectDeck.switch();
      }
    },
    destroy(instance) {
      if (instance.params.effect === DECK) {
        instance.effectDeck.destroy();
      }
    },
    sizeChange(instance) {
      if (instance.params.effect === DECK) {
        instance.effectDeck.updateStyle();
      }
    }
  }
};