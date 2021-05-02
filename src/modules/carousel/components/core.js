import { addClass, removeClass } from '../../../utils/utils';
import vivid from 'vivid';
const { css } = vivid;

function toggleActiveClass(instance) {
  const activeClass = instance.params.activeClass;
  instance.slideList.forEach((slide, index) => {
    if (index === instance.activeIndex) {
      addClass(slide, activeClass);
    } else {
      removeClass(slide, activeClass);
    }
  });
}

export default {
  name: 'core',
  on: {
    activeIndexChange(instance) {
      toggleActiveClass(instance);
    },
    init(instance) {
      toggleActiveClass(instance);
    },
    resize(instance) {
      const width = parseFloat(css(instance.el, 'width'));
      const height = parseFloat(css(instance.el, 'height'));
      if (width !== instance.width || height !== instance.height) {
        instance.width = width;
        instance.height = height;
        instance.emit('sizeChange');
      }
    }
  }
};