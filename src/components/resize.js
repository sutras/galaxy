class Resize {
  constructor(host) {
    this.resizeHandler = () => {
      host.emit('resize');
    };
  }
}

export default {
  name: 'resize',
  params: {
    resize: false
  },
  create() {
    this.resize = new Resize(this);
  },
  on: {
    init() {
      if (this.params.resize) {
        window.addEventListener('resize', this.resize.resizeHandler);
      }
    },
    destroy() {
      if (this.params.resize) {
        window.removeEventListener('resize', this.resize.resizeHandler);
      }
    }
  }
};