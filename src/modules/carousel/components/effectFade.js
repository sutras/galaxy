import { extend } from '../../../utils/utils';
import animate from '../../../utils/animate';
import vivid from 'vivid';
import { TRANSITION_START, TRANSITION_END } from '../../../const';

const { css } = vivid;
const FADE = 'fade';

class EffectFade {
  constructor(host) {
    this.host = host;
  }

  init() {
    extend(this, this.host.params.effectFade);
    this.initStyle();
  }

  initStyle() {
    const host = this.host;
    if (css(host.wrapper, 'position') === 'static') {
      css(host.wrapper, 'position', 'relative');
    }

    host.slideList.forEach((el, index) => {
      css(el, {
        position: 'absolute',
        left: 0,
        top: 0
      });
      animate(el)[index === host.activeIndex ? 'fadeIn' : 'fadeOut']({
        duration: 0
      });
    });

    this.updateStyle();
  }

  updateStyle() {
    const host = this.host;
    host.slideList.concat(host.wrapper).forEach((slide) => {
      css(slide, {
        width: host.width,
        height: host.height
      });
    });
  }

  switch() {
    const host = this.host;
    const duration = host.params.duration;
    const easing = host.params.easing;
    const fadeInDuration = this.fadeInDuration !== null ? this.fadeInDuration : duration;
    const fadeOutDuration = this.fadeOutDuration !== null ? this.fadeOutDuration : duration;

    host.slideList.forEach(slide => animate(slide).clearQueue().finish());
    host.transitional = true;

    host.emit(TRANSITION_START);
    host.slideList.forEach((slide, index) => {
      if (index === host.activeIndex) {
        animate(slide).fadeIn({
          duration: fadeInDuration,
          easing,
          complete() {
            host.transitional = false;
            host.emit(TRANSITION_END);
          }
        });
      } else {
        animate(slide).fadeOut({
          duration: fadeOutDuration,
          easing
        });
      }
    });
  }

  destroy() {
    this.host.slideList.forEach((slide) => {
      animate(slide).clearQueue().finish().fadeIn({
        duration: 0
      });
    });
  }
}

export default {
  name: 'effectFade',
  params: {
    effectFade: {
      // 是否淡出，在标签切换效果中，标签页一般不是使用绝对定位，而是通常的布局方式，
      // 如果使用淡入淡出效果，在标签页切换时，则页面上会存在两个标签页，此时会破坏布局，
      // 因此可设置fadeOut为false，让上一个标签页立即消失，上一个标签页淡入。
      fadeInDuration: null,
      fadeOutDuration: null
    }
  },
  create(instance) {
    instance.effectFade = new EffectFade(instance);
  },
  on: {
    init(instance) {
      if (instance.params.effect === FADE) {
        instance.effectFade.init();
      }
    },
    switch(instance) {
      if (instance.params.effect === FADE) {
        instance.effectFade.switch();
      }
    },
    destroy(instance) {
      if (instance.params.effect === FADE) {
        instance.effectFade.destroy();
      }
    },
    sizeChange(instance) {
      if (instance.params.effect === FADE) {
        instance.effectFade.updateStyle();
      }
    }
  }
};