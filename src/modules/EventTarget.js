export default class EventTarget {
  constructor() {
    this.typesHandlers = {};
  }

  on(types, handler, priority) {
    if (typeof handler !== 'function') {
      return this;
    }
    const method = priority ? 'unshift' : 'push';
    types.split(/\s+/).forEach(type => {
      let handlers;
      if (!(handlers = this.typesHandlers[type])) {
        handlers = this.typesHandlers[type] = [];
      }
      handlers[method](handler);
    })
    return this;
  }

  once(types, handler, priority) {
    if (typeof handler !== 'function') {
      return this;
    }
    const onceHandler = (...rest) => {
      handler(...rest);
      this.off(types, onceHandler);
    }
    return this.on(types, onceHandler, priority);
  }

  off(types, handler) {
    types.split(/\s+/).forEach(type => {
      if (handler === void 0) {
        return delete this.typesHandlers[type];
      }
      let handlers = this.typesHandlers[type];
      if (handlers) {
        for (let i = 0, l = handlers.length; i < l; i++) {
          if (handlers[i] === handler) {
            handlers.splice(i--, 1);
          }
        }
      }
    });
    return this;
  }

  emit(types, ...rest) {
    types.split(/\s+/).forEach(type => {
      let handlers = this.typesHandlers[type];
      if (handlers) {
        for (let i = 0, l = handlers.length; i < l; i++) {
          handlers[i].call(this, this, ...rest);
        }
      }
    });
  }
}