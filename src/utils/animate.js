import vivid from 'vivid';
import { data } from './cache';
import { extend, addClass, removeClass, sandbox } from './utils';

const SHOW = 'show';
const HIDE = 'hide';
const TOGGLE = 'toggle';

const NAMESPACE = '_animation';
const DISPLAY = '_display';

const cacheDisplay = {};

function getSrcDisplay(elem) {
  let display,
    el,
    tagName = elem.tagName;

  if (!(display = cacheDisplay[tagName])) {
    sandbox((win, doc, html, body) => {
      el = doc.createElement(tagName);
      body.appendChild(el);
      // 低版本Firefox只能使用window，不能使用iframe里面的window，否则getComputedStyle()返回null
      cacheDisplay[tagName] = display = window.getComputedStyle(el, null).display;
    });
  }
  return display;
}

function getDisplay(elem) {
  let display = data(elem, DISPLAY);
  if (!display) {
    display = getComputedStyle(elem).display;
    if (display === 'none') {
      display = getSrcDisplay(elem);
    }
    data(elem, DISPLAY, display)
  }
  return display;
}

let defaults = {
  duration: 400,
  easing: 'easeInOutQuad',
  delay: 0,
  endDelay: 0
};

class Animation {
  constructor(elem) {
    this._elem = elem;
    this._list = [];
    this._vivid = null;
  }

  _queue(fn) {
    this._list.push(fn);
    if (this._list[0] !== 'guard') {
      this._dequeue();
    }
    return this;
  }

  _dequeue() {
    let fn = this._list.shift();

    if (fn === 'guard') {
      fn = this._list.shift();
    }

    if (fn) {
      this._list.unshift('guard');

      this._vivid = fn();
    }
    return this;
  }

  _mergeConfig(options, complete) {
    return extend({}, defaults, options, {
      autoplay: true,
      complete: () => {
        this._vivid = null;
        complete && complete();
        options.complete && options.complete();
        this._dequeue();
      }
    });
  }

  restart() {
    if (this._vivid) {
      this._vivid.restart();
    }
    return this;
  }

  pause() {
    if (this._vivid) {
      this._vivid.pause();
    }
    return this;
  }

  play() {
    if (this._vivid) {
      this._vivid.play();
    }
    return this;
  }

  stop() {
    this.pause();
    this._vivid = null;
    return this._dequeue();
  }

  finish() {
    if (this._vivid) {
      this._vivid.finish();
    }
    return this;
  }

  finishAll() {
    // finish后会设置 currentAnime 为 null
    // 接着 dequeue，如果队列不为空，currentAnime 会被赋新值
    while (this._vivid) {
      this._vivid.finish();
    }
    return this;
  }

  clearQueue() {
    this._list.length = 0;
    return this;
  }

  custom(properties, options) {
    return this._queue(() => {
      return vivid(this._elem, properties, this._mergeConfig(options || {}));
    });
  }
}

function addAnimate(name, animating, action) {
  if (Animation.prototype.hasOwnProperty(name)) {
    return;
  }

  Animation.prototype[name] = function (options = {}) {
    const args = arguments;

    return this._queue(() => {
      let hidden,
        complete,
        isToggle = action === SHOW || action === HIDE || action === TOGGLE;

      if (isToggle) {
        hidden = getComputedStyle(this._elem).display === 'none';

        if (hidden && action === HIDE || !hidden && action === SHOW) {
          options.complete && options.complete();
          this._dequeue();
          return;
        }
      }

      const [properties, vividOptions] = animating.apply(null, args)(this._elem, completeCb => {
        complete = completeCb;
      }, () => {
        if (isToggle) {
          // 允许通过类名来显示/隐藏元素
          if (options.className) {
            (hidden ? addClass : removeClass)(options.elem || this._elem, typeof options.className === 'string' ? options.className : SHOW);
          } else {
            this._elem.style.display = hidden ? getDisplay(this._elem) : 'none';
          }
        }
      }, hidden);

      return vivid(this._elem, properties, this._mergeConfig(vividOptions, complete));
    });
  };
};


// # 各种合成动画
// ==============
var fxAttrs = [
  ['height', 'marginTop', 'marginBottom', 'borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom'],
  ['width', 'marginLeft', 'marginRight', 'borderLeftWidth', 'borderRightWidth', 'paddingLeft', 'paddingRight'],
  ['opacity']
];

// 生成属性数组
function genFx(type, start, end) {
  return [type, fxAttrs.concat.apply([], fxAttrs.slice(start, end))];
}

[
  ['show', genFx(SHOW, 0)],
  ['hide', genFx(HIDE, 0)],
  ['toggle', genFx(TOGGLE, 0)],
  ['slideDown', genFx(SHOW, 0, 1)],
  ['slideUp', genFx(HIDE, 0, 1)],
  ['slideToggleY', genFx(TOGGLE, 0, 1)],
  ['slideLeft', genFx(HIDE, 1, 2)],
  ['slideRight', genFx(SHOW, 1, 2)],
  ['slideToggleX', genFx(TOGGLE, 1, 2)],
  ['fadeIn', genFx(SHOW, 2)],
  ['fadeOut', genFx(HIDE, 2)],
  ['fadeToggle', genFx(TOGGLE, 2)]
].forEach(([method, [action, attrs]]) => {
  addAnimate(method, (options = {}) => {
    return function (elem, complete, toggle, hidden) {
      let srcValues = {},
        toValues = {},
        style = elem.style;

      complete(() => {
        if (!hidden) {
          toggle();
        }

        for (let prop in srcValues) {
          style[prop] = srcValues[prop];
        }
      });

      if (hidden) {
        toggle();
      }

      attrs.forEach(prop => {
        srcValues[prop] = style[prop];
        if (hidden) {
          toValues[prop] = getComputedStyle(elem)[prop];
          style[prop] = 0;
        } else {
          toValues[prop] = 0;
        }
      });

      // 涉及到宽高的还需要保存并设置溢出隐藏。
      if (attrs.indexOf('width') !== -1 || attrs.indexOf('height') !== -1) {
        ['', 'X', 'Y'].forEach(postfix => {
          const attr = 'overflow' + postfix;
          srcValues[attr] = style[attr];
        })
        style.overflow = 'hidden';
      }

      return [
        toValues,
        options
      ];
    }
  }, action);
});

Animation.prototype.slideToggle = Animation.prototype.slideToggleY;

addAnimate('fadeTo', (opacity, options = {}) => {
  return function () {
    return [
      {
        opacity
      },
      options
    ];
  };
});


// # 对外接口
// ==========
function animate(elem) {
  let instance = data(elem, NAMESPACE);

  if (!instance) {
    instance = data(elem, NAMESPACE, new Animation(elem));
  }
  return instance;
}

animate.add = addAnimate;
animate.defaults = defaults;

export default animate;