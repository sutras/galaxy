import { namespace } from '../../../utils/utils';
import { on, off } from '../../../utils/event';
import { MOUSEENTER, MOUSELEAVE } from '../../../const';

class Autoplay {
  constructor(host) {
    this.host = host;
    this.timer = null;
    this.running = false;
    this.duration = 0;
    this.namespace = namespace();
  }

  play() {
    const host = this.host;
    if (this.running) {
      return;
    }
    this.running = true;
    this.timer = setInterval(() => {
      host.tick();
    }, host.interval);
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

  init() {
    const host = this.host;
    if (host.params.hoverPause) {
      on(host.wrapper, MOUSEENTER + this.namespace, () => this.pause());
      on(host.wrapper, MOUSELEAVE + this.namespace, () => this.play());
    }
    this.play();
  }

  destroy() {
    const host = this.host;

    this.pause();
    if (host.params.hoverPause) {
      off(host.el, this.namespace);
    }
  }
}

export default {
  name: 'autoplay',
  create(instance) {
    instance.autoplay = new Autoplay(instance);
  },
  on: {
    init(instance) {
      instance.autoplay.init();
    },
    destroy(instance) {
      instance.autoplay.destroy();
    }
  }
};