/*
|-------------------------------------------------------------------------------
| 事件模块
|-------------------------------------------------------------------------------
|
*/

import { data, removeData } from './cache';
import CustomEvent from './CustomEvent';
import { matchesSelector, namespace } from './utils';
import { MOUSEOVER, MOUSEENTER, MOUSELEAVE, MOUSEOUT } from '../const';


const NAMESPACE = '_event';

const specialTypes = {
  wheel: {
    getType() {
      return 'onwheel' in document || window.WheelEvent && WheelEvent.prototype.hasOwnProperty('deltaY')
        ? 'wheel'
        : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    }
  },
  transitionend: {
    getType() {
      return window.TransitionEvent ? 'transitionend' : 'webkitTransitionEnd';
    }
  },
  animationend: {
    getType() {
      return window.AnimationEvent ? 'animationend' : 'webkitAnimationEnd';
    }
  },
  animationstart: {
    getType() {
      return window.AnimationEvent ? 'animationstart' : 'webkitAnimationStart';
    }
  },
  animationiteration: {
    getType() {
      return window.AnimationEvent ? 'animationiteration' : 'webkitAnimationIteration';
    }
  },
  DOMMouseScroll: {
    fixEvent(event) {
      event.deltaY = event.deltaX = event.detail;
    }
  },
  mousewheel: {
    fixEvent(event) {
      event.deltaY = event.deltaX = -event.wheelDelta;
    }
  }
};


[
  [MOUSEENTER, MOUSEOVER],
  [MOUSELEAVE, MOUSEOUT]
].forEach(([origin, fix]) => {
  specialTypes[origin] = {
    getType: function () {
      return 'on' + MOUSEENTER in document ? origin : fix;
    },
    handler: function (event, bakHandler) {
      const related = event.relatedTarget;
      if (event.type === origin || !related || !this.contains(related)) {
        bakHandler.call(this, event);
      }
    }
  };
});

function fixEvent(event) {
  const specialType = specialTypes[event.type] || {};

  if (specialType.fixEvent) {
    specialType.fixEvent(event);
  }
  return event;
}

function agency(event) {
  let current, events, type;

  event = fixEvent(event);

  current = event.currentTarget;

  events = data(event.currentTarget, NAMESPACE);

  type = event.type;

  events[type].forEach(handlerObj => {
    let target, handler, bakHandler, removed;

    bakHandler = handler = function (event) {
      handlerObj.handler.call(this, event);

      if (handlerObj.once && !removed) {
        off(current, type, handlerObj.handler);
        removed = true;
      }
    };
    if (handlerObj.specialHandler) {
      handler = function (event) {
        handlerObj.specialHandler.call(this, event, bakHandler);
      }
    }

    if (handlerObj.selector) {
      target = event.target;
      do {
        if (matchesSelector(target, handlerObj.selector)) {
          handler.call(target, event);
        }
      }
      while ((target = target.parentNode) && target.nodeType === 1);
    } else {
      handler.call(current, event);
    }
  });
}

export function on(elem, type, selector, handler, once) {
  let events, types, l, type_namespace, namespace, handlerObjList, special;

  if (typeof selector === 'function') {
    handler = selector;
    selector = null;
  }

  events = data(elem, NAMESPACE);

  if (!events) {
    events = data(elem, NAMESPACE, {});
  }

  // 可以一次性绑定通过空格分割的多个事件
  types = type.split(/\s+/);
  l = types.length;

  while (l--) {
    type = types[l];
    type_namespace = type.split('.');
    type = type_namespace[0];
    namespace = type_namespace.slice(1);

    if (!type) {
      continue;
    }

    // 处理特殊的事件
    special = specialTypes[type] || {};
    if (special.getType) {
      type = special.getType();
    }

    if (!(handlerObjList = events[type])) {
      handlerObjList = events[type] = [];
      elem.addEventListener(type, agency, false);
    }

    handlerObjList.push({
      handler: handler,
      specialHandler: special.handler,
      type: type,
      selector: selector,
      namespace: namespace,
      once: once
    });
  }

}

export function once(elem, type, selector, handler) {
  on(elem, type, selector, handler, true);
}

export function off(elem, type, handler) {
  let events, types, l, type_namespace, namespace, handlerObjList, special;

  events = data(elem, NAMESPACE);

  if (!events) {
    return;
  }

  // 移除所有绑定的事件
  if (!type) {
    for (type in events) {
      elem.removeEventListener(type, agency, false);
    }
    return removeData(elem, NAMESPACE);
  }

  // 可以一次性移除通过空格分割的多个事件
  types = type.split(/\s+/);
  l = types.length;

  while (l--) {
    type = types[l];
    type_namespace = type.split('.');
    type = type_namespace[0];
    namespace = type_namespace.slice(1);

    if (type) {
      // 处理特殊的事件
      if ((special = specialTypes[type]) && special.getType) {
        type = special.getType();
      }
      remove(type, namespace);
    } else {
      // 仅有命名空间
      for (type in events) {
        remove(type, namespace);
      }
    }
  }

  type = '';
  for (type in events) {
    break;
  }

  if (!type) {
    removeData(elem, NAMESPACE);
  }

  function remove(type, namespace) {
    let handlerObjList = events[type],
      handlerObj,
      i = 0;

    for (; i < handlerObjList.length; i++) {
      handlerObj = handlerObjList[i];

      // 命名空间：我有的你都有，则符合匹配
      if (namespace.filter(e => handlerObj.namespace.indexOf(e) === -1).length === 0) {
        if (!handler || handler === handlerObj.handler) {
          handlerObjList.splice(i--, 1);
        }
      }
    }

    if (handlerObjList.length === 0) {
      elem.removeEventListener(type, agency, false);
      delete events[type];
    }
  }
}

export function emit(elem, type, detail) {
  let special;

  // 处理特殊的事件
  if ((special = specialTypes[type]) && special.getType) {
    type = special.getType();
  }

  const event = new CustomEvent(type, {
    bubbles: false,
    detail: detail
  });
  elem.dispatchEvent(event);
}

// 添加带有延迟的事件，只针对mouseover、mouseenter事件
export function addEventWithDelay(targets, type, handler, delay) {
  let timer;
  const _namespace = namespace();
  if (!Array.isArray(targets)) {
    targets = [targets];
  }
  if (type === MOUSEOVER || type === MOUSEENTER) {
    targets.forEach((target, i) => {
      on(target, type + _namespace, () => {
        timer = setTimeout(() => {
          handler(target, i);
        }, delay);
      });
      on(target, (type === MOUSEOVER ? MOUSEOUT : MOUSELEAVE) + _namespace, () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      });
    });
  } else {
    targets.forEach((target, i) => {
      on(target, type + _namespace, () => {
        handler(target, i);
      });
    });
  }
  return () => {
    targets.forEach(target => {
      off(target, _namespace);
    });
  };
}

export default { on, off, once, emit, addEventWithDelay };