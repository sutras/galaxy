import { extend, namespace  } from '../../../utils/utils';
import { on, off } from '../../../utils/event';
import { MOUSEENTER, MOUSELEAVE  } from '../../../const';

class Autoplay {
  constructor(host) {
    this.host = host;
    this.timer = null;
    this.running = false;
    this.duration = 0;
    this.mouseleave = true;
    this._namespace  = namespace();
  }

  play() {
    if (this.running || !this.mouseleave) {
      return;
    }
    this.running = true;
    this.timer = setInterval(() => {
      this.duration += this.interval;
      if (this.duration >= this.delay) {
        this.duration = this.delay;
      }
      if (this.progress) {
        this.progress(this.duration / this.delay);
      }
      if (this.duration === this.delay) {
        this.stop();
        this.host.gotoNext();
      }
    }, this.interval);
  }

  pause() {
    if (!this.running) {
      return;
    }
    this.running = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  stop() {
    this.pause();
    this.duration = 0;
  }

  init() {
    const host = this.host;
    extend(this, host.params.autoplay);
    if (!this.enabled) {
      return;
    }
    this.play();
    if (this.hoverPause) {
      this.enterHandler = () => {
        this.mouseleave = false;
        this.pause();
      };
      this.leaveHandler = () => {
        this.mouseleave = true;
        this.play();
      };
      on(host.el, MOUSEENTER + this._namespace , this.enterHandler);
      on(host.el, MOUSELEAVE + this._namespace , this.leaveHandler);
    }
  }

  destroy() {
    const host = this.host;
    if (!this.enabled) {
      return;
    }
    this.stop();
    if (this.hoverPause) {
      off(host.el, this._namespace );
    }
  }
}

export default {
  name: 'autoplay',
  params: {
    autoplay: {
      enabled: false,
      delay: 3000,
      progress: null,
      interval: 16.667,
      hoverPause: true
    }
  },
  create(instance) {
    instance.autoplay = new Autoplay(instance);
  },
  on: {
    init(instance) {
      instance.autoplay.init();
    },
    destroy(instance) {
      instance.autoplay.destroy();
    },
    transitionEnd(instance) {
      if (instance.params.autoplay.enabled) {
        instance.autoplay.play();
      }
    }
  }
};