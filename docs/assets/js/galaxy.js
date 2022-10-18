/**
 * @version v0.1.0
 * @link https://github.com/sutras/galaxy#readme
 * @license MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.galaxy = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /*
  |-------------------------------------------------------------------------------
  | 缓动公式
  |-------------------------------------------------------------------------------
  |
  */
  var easing = {
    def: 'easeInOutQuad',
    linear: function linear(k) {
      //无缓动效果
      return k;
    },
    easeInQuad: function easeInQuad(k) {
      return k * k;
    },
    easeOutQuad: function easeOutQuad(k) {
      return k * (2 - k);
    },
    easeInOutQuad: function easeInOutQuad(k) {
      if ((k *= 2) < 1) return 0.5 * k * k;
      return -0.5 * (--k * (k - 2) - 1);
    },
    easeInCubic: function easeInCubic(k) {
      return k * k * k;
    },
    easeOutCubic: function easeOutCubic(k) {
      return --k * k * k + 1;
    },
    easeInOutCubic: function easeInOutCubic(k) {
      if ((k *= 2) < 1) return 0.5 * k * k * k;
      return 0.5 * ((k -= 2) * k * k + 2);
    },
    easeInQuart: function easeInQuart(k) {
      return k * k * k * k;
    },
    easeOutQuart: function easeOutQuart(k) {
      return 1 - --k * k * k * k;
    },
    easeInOutQuart: function easeInOutQuart(k) {
      if ((k *= 2) < 1) return 0.5 * k * k * k * k;
      return -0.5 * ((k -= 2) * k * k * k - 2);
    },
    easeInQuint: function easeInQuint(k) {
      return k * k * k * k * k;
    },
    easeOutQuint: function easeOutQuint(k) {
      return --k * k * k * k * k + 1;
    },
    easeInOutQuint: function easeInOutQuint(k) {
      if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },
    easeInSine: function easeInSine(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },
    easeOutSine: function easeOutSine(k) {
      return Math.sin(k * Math.PI / 2);
    },
    easeInOutSine: function easeInOutSine(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    },
    easeInExpo: function easeInExpo(k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    easeOutExpo: function easeOutExpo(k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    easeInOutExpo: function easeInOutExpo(k) {
      if (k === 0) return 0;
      if (k === 1) return 1;
      if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },
    easeInCirc: function easeInCirc(k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    easeOutCirc: function easeOutCirc(k) {
      return Math.sqrt(1 - --k * k);
    },
    easeInOutCirc: function easeInOutCirc(k) {
      if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },
    easeInElastic: function easeInElastic(k) {
      if (k === 0) return 0;
      if (k === 1) return 1;
      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    },
    easeOutElastic: function easeOutElastic(k) {
      if (k === 0) return 0;
      if (k === 1) return 1;
      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
    },
    easeInOutElastic: function easeInOutElastic(k) {
      if (k === 0) return 0;
      if (k === 1) return 1;
      k *= 2;
      if (k < 1) return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
    },
    easeInBack: function easeInBack(k) {
      var s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    easeOutBack: function easeOutBack(k) {
      var s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    easeInOutBack: function easeInOutBack(k) {
      var s = 1.70158 * 1.525;
      if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },
    easeInBounce: function easeInBounce(k) {
      return 1 - easing.easeOutBounce(1 - k);
    },
    easeOutBounce: function easeOutBounce(k) {
      if (k < 1 / 2.75) {
        return 7.5625 * k * k;
      } else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    easeInOutBounce: function easeInOutBounce(k) {
      if (k < 0.5) return easing.easeInBounce(k * 2) * 0.5;
      return easing.easeOutBounce(k * 2 - 1) * 0.5 + 0.5;
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | requestAnimationFrame
  |-------------------------------------------------------------------------------
  |
  | 改编自司徒正美《javascript框架设计》
  |
  */
  function getAnimationFrameController() {
    // IE10、chrome24
    if (window.requestAnimationFrame) {
      return {
        request: requestAnimationFrame,
        cancel: cancelAnimationFrame
      };
    } // Firefox11没有实现 cancelRequestAnimiationFrame
    // 并且 mozRequestAnimationFrame 与标准出入过大


    if (window.mozCancelRequestAnimationFrame && window.mozCancelAnimationFrame) {
      return {
        request: mozRequestAnimationFrame,
        cancel: mozCancelAnimationFrame
      };
    } // 某个webkit版本没有返回id值，因此要用setInterval实现


    if (window.webkitRequestAnimationFrame && webkitRequestAnimationFrame(String)) {
      return {
        // 修正某个特异的webkit版本下没有time参数（意义不大，而且这个time并不是页面打开到如今的毫秒数）
        request: function request(callback) {
          return window.webkitRequestAnimationFrame(function () {
            return callback(new Date() - 0);
          });
        },
        cancel: window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame
      };
    }

    var millisec = 1000 / 60,
        callbacks = [],
        id = 1,
        cursor = 0,
        timer;

    function playAll() {
      var i, cloned, callback;
      timer = null;
      cloned = callbacks.slice();
      cursor += callbacks.length;
      callbacks.length = 0; // 清空队列

      for (i = 0; callback = cloned[i++];) {
        if (callback !== 'cancelled') {
          callback(new Date() - 0);
        }
      }
    }

    return {
      request: function request(handler) {
        callbacks.push(handler);

        if (!timer) {
          timer = window.setTimeout(playAll, millisec);
        }

        return id++;
      },
      cancel: function cancel(id) {
        callbacks[id - cursor] = 'cancelled';
      }
    };
  }

  /*
  |-------------------------------------------------------------------------------
  | Set
  |-------------------------------------------------------------------------------
  |
  */
  var Set = window.Set && window.Set.prototype.forEach ? window.Set : function () {
    function Set(arr) {
      this.values = [];
      this.size = 0;

      if (Array.isArray(arr)) {
        this.values = arr.slice();
        this.size = arr.length;
      } else if (arr instanceof Set) {
        this.values = arr.values.slice();
        this.size = arr.size;
      }
    }

    Set.prototype = {
      add: function add(value) {
        if (this.values.indexOf(value) === -1) {
          this.values.push(value);
          this.size++;
        }

        return this;
      },
      has: function has(value) {
        return this.values.indexOf(value) !== -1;
      },
      forEach: function forEach(fn) {
        for (var i = 0; i < this.size; i++) {
          fn(this.values[i], this.values[i], this);
        }
      },
      'delete': function _delete(value) {
        var i;

        if ((i = this.values.indexOf(value)) !== -1) {
          this.values.splice(i, 1);
          this.size--;
          return true;
        }

        return false;
      }
    };
    return Set;
  }();

  /*
  |-------------------------------------------------------------------------------
  | 引擎
  |-------------------------------------------------------------------------------
  |
  | 使用requestAnimationFrame或定时器驱动集合里面的时间轴运行调用。
  | 引擎对外暴露了add和remove两个方法用来向引擎添加或删除时间轴。
  |
  */

  var _getAnimationFrameCon = getAnimationFrameController(),
      request = _getAnimationFrameCon.request,
      cancel = _getAnimationFrameCon.cancel;

  var timelines = new Set(),
      id = null,
      paused = true;

  function add(tick) {
    timelines.add(tick);
    run();
  }

  function remove(tick) {
    timelines['delete'](tick);
  }

  function step() {
    if (timelines.size === 0) {
      stop();
    } else {
      new Set(timelines).forEach(function (tick) {
        return tick();
      });
      id = request(step);
    }
  }

  function run() {
    if (paused) {
      paused = false;
      id = request(step);
    }
  }

  function stop() {
    if (!paused) {
      paused = true;
      cancel(id);
    }
  }

  var engine = {
    add: add,
    remove: remove
  };

  /*
  |-------------------------------------------------------------------------------
  | 工具函数
  |-------------------------------------------------------------------------------
  |
  */
  var rNum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/;
  var rUnit = /%|px|em|ex|ch|rem|vw|vh|vmin|vmax|pc|pt|in|cm|mm|deg|rad|turn/;
  var rCssNumVal = new RegExp('^([+\\-*/%]=|)(' + rNum.source + ')(' + rUnit.source + '|)$', 'i');
  var rNums = new RegExp(rNum.source, 'g');
  var toString = Object.prototype.toString;
  function assignObjectProp(target) {
    var i = 1,
        j,
        l = arguments.length,
        options;

    for (; i < l; i++) {
      options = arguments[i];

      for (j in options) {
        target[j] = options[j];
      }
    }

    return target;
  }
  function copyObject(target) {
    var i,
        obj = {};

    for (i in target) {
      obj[i] = target[i];
    }

    return obj;
  }
  function overrideObject(target) {
    var i = 1,
        j,
        l = arguments.length,
        options;

    for (; i < l; i++) {
      options = arguments[i];

      for (j in target) {
        if (options && options.hasOwnProperty(j)) {
          target[j] = options[j];
        }
      }
    }

    return target;
  }
  function assignObject(target) {
    var i = 1,
        j,
        l = arguments.length,
        options;

    for (; i < l; i++) {
      options = arguments[i];

      for (j in options) {
        target[j] = options[j];
      }
    }

    return target;
  }
  function isFunction(target) {
    return typeof target === 'function';
  }
  function isPlainObject(target) {
    return toString.call(target) === '[object Object]';
  }
  function isEmptyObject(target) {
    var i;

    for (i in target) {
      break;
    }

    return i === void 0;
  }
  function isArrayLike(target) {
    return target != null && _typeof(target) === 'object' && isFinite(target.length) && target.length >= 0 && target.length === Math.floor(target.length) && target.length < 4294967296;
  }

  function flattenArray(target, depth) {
    var result = [],
        i,
        l,
        item;
    depth = depth || 1;

    for (i = 0, l = target.length; i < l; i++) {
      item = target[i];
      result = result.concat(Array.isArray(item) && depth > 1 ? flattenArray(item, depth - 1) : item);
    }

    return result;
  } // 数组去重

  function uniqueArray(target) {
    var result = [],
        i,
        l,
        item;

    for (i = 0, l = target.length; i < l; i++) {
      item = target[i];

      if (target.indexOf(item) === i) {
        result.push(item);
      }
    }

    return result;
  }
  function arrayPluck(target, key) {
    var result = [],
        prop,
        i = 0,
        l = target.length;

    for (; i < l; i++) {
      prop = target[i][key];

      if (prop != null) {
        result.push(prop);
      }
    }

    return result;
  }
  function sortBy(target, fn, scope) {
    var array = target.map(function (item, index) {
      return {
        el: item,
        ret: fn.call(scope, item, index)
      };
    }).sort(function (left, right) {
      var a = left.ret,
          b = right.ret; // 字符串不能相减，但可以比较大小，显式返回大于0、小于0、0等于就可以满足sort函数的要求

      return a < b ? -1 : a > b ? 1 : 0;
    });
    return arrayPluck(array, 'el');
  }
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /*
  |-------------------------------------------------------------------------------
  | 交错动画
  |-------------------------------------------------------------------------------
  |
  */
  var staggerOptions = {
    start: 0,
    from: 0,
    direction: 'normal',
    easing: null,
    grid: null
  };
  function stagger(val, options) {
    options = assignObjectProp({}, staggerOptions, options);
    var direction = options.direction,
        tween = isFunction(options.easing) ? options.easing : easing[options.easing],
        grid = options.grid,
        axis = options.axis,
        fromIndex = options.from || 0,
        fromFirst = fromIndex === 'first',
        fromCenter = fromIndex === 'center',
        fromLast = fromIndex === 'last',
        isRange = Array.isArray(val),
        val1 = isRange ? parseFloat(val[0]) : parseFloat(val),
        val2 = isRange ? parseFloat(val[1]) : 0,
        start = options.start || 0 + (isRange ? val1 : 0),
        values = [],
        maxValue = 0;
    return function (index, total) {
      var i, fromX, fromY, toX, toY, distanceX, distanceY, value, spacing;
      fromIndex = fromFirst ? 0 : fromCenter ? (total - 1) / 2 : fromLast ? total - 1 : fromIndex;

      if (!values.length) {
        for (i = 0; i < total; i++) {
          if (!grid) {
            values.push(Math.abs(fromIndex - i));
          } else {
            fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
            fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
            toX = i % grid[0];
            toY = Math.floor(i / grid[0]);
            distanceX = fromX - toX;
            distanceY = fromY - toY;
            value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            value = axis === 'x' ? -distanceX : axis === 'y' ? -distanceY : value;
            values.push(value);
          }

          maxValue = Math.max.apply(null, values);
        }

        if (tween) {
          values = values.map(function (val) {
            return tween(val / maxValue) * maxValue;
          });
        }

        if (direction === 'reverse') {
          values = values.map(function (val) {
            return axis ? -val : Math.abs(maxValue - val);
          });
        }
      }

      spacing = isRange ? (val2 - val1) / maxValue : val1;

      if (spacing === Infinity) {
        spacing = 0;
      }

      return start + spacing * (Math.round(values[index] * 100) / 100);
    };
  }

  /*
  |-------------------------------------------------------------------------------
  | Map
  |-------------------------------------------------------------------------------
  |
  */
  var Map = window.Map && window.Map.prototype.forEach ? window.Map : function () {
    function Map() {
      this.keys = [];
      this.values = [];
      this.size = 0;
    }

    Map.prototype = {
      set: function set(key, value) {
        var i;

        if ((i = this.keys.indexOf(key)) === -1) {
          this.keys.push(key);
          this.size = this.keys.length;
          return this.values.push(value);
        }

        this.values[i] = value;
      },
      get: function get(key) {
        return this.values[this.keys.indexOf(key)];
      },
      has: function has(key) {
        return this.keys.indexOf(key) !== -1;
      },
      forEach: function forEach(fn) {
        for (var i = 0; i < this.size; i++) {
          fn(this.values[i], this.keys[i], this);
        }
      },
      'delete': function _delete(key) {
        var i;

        if ((i = this.keys.indexOf(key)) !== -1) {
          this.keys.splice(i, 1);
          this.values.splice(i, 1);
          this.size = this.keys.length;
          return true;
        }

        return false;
      }
    };
    return Map;
  }();

  /*
  |-------------------------------------------------------------------------------
  | 全局内部变量
  |-------------------------------------------------------------------------------
  |
  */

  var DIRECTION_ALTERNATE_REVERSE = 'alternate-reverse';
  var DIRECTION_REVERSE = 'reverse';
  var DIRECTION_ALTERNATE = 'alternate'; // 插件（洋葱模型）

  var plugins = [];
  var ids = {}; // 类型

  var SPECIAL_VALUE = {};
  var TERMINATE = {};
  var WITH_FROM = {};
  var KEYFRAMES = {};

  function parseTargets(target) {
    var result = [],
        i,
        l,
        item;

    if (!Array.isArray(target)) {
      target = [target];
    }

    target = flattenArray(target);

    for (i = 0, l = target.length; i < l; i++) {
      item = target[i];

      if (item) {
        if (typeof item === 'string' && (item = document.querySelectorAll(item)) || isArrayLike(item)) {
          result.push.apply(result, item);
        } else if (_typeof(item) === 'object' || typeof item === 'function') {
          result.push(item);
        }
      }
    }

    return uniqueArray(result);
  }

  function getEasing(ease) {
    return isFunction(ease) ? ease : easing[ease] || easing[easing.def];
  }

  function isReverse(direction) {
    return direction === DIRECTION_REVERSE || direction === DIRECTION_ALTERNATE_REVERSE;
  }

  function isAlternate(direction) {
    return direction === DIRECTION_ALTERNATE || direction === DIRECTION_ALTERNATE_REVERSE;
  }

  function getFuncValue(value, animatable) {
    return isFunction(value) ? value(animatable.id, animatable.total, animatable.target) : value;
  }

  function getTweenValue(progress, tween) {
    var duration = tween.duration,
        delay = tween.delay,
        begin = tween.begin;

    function getOneItem(item) {
      var value,
          from = item.from,
          to = item.to,
          round = item.round;
      value = progress <= begin + delay ? from : progress >= begin + delay + duration ? to : from + tween.easing((progress - begin - delay) / duration) * (to - from);

      if (round) {
        value = Math.round(value * round) / round;
      }

      return value;
    }

    return tween.between.map(function (item) {
      return getOneItem(item);
    });
  }
  /*
  |-------------------------------------------------------------------------------
  | 时间轴
  |-------------------------------------------------------------------------------
  |
  | 每一次调用对外接口返回的就是一个时间轴对象，用于对时间进行控制；
  | 例如播放、暂停、跳转到指定时间、跳转到最后、重新播放等。
  |
  */


  function getAnimatables(targets) {
    return targets.map(function (target, i) {
      return {
        target: target,
        id: i,
        total: targets.length
      };
    });
  } // # 基础类型
  // - 数值
  // - 字符串
  // - 数组
  // - 对象
  // 
  // # 特殊类型
  // - 带起始值 withFrom
  // - 关键帧 keyframes
  // - 其他类型
  // 统一转换为 [{ value }]


  function structureTween(value, animatable, properties) {
    value = getFuncValue(value, animatable);

    if (value.type === KEYFRAMES) {
      return value.keyframes.map(function (value) {
        return structureTween(value, animatable, true);
      });
    }

    if (!isPlainObject(value) || value.sign === SPECIAL_VALUE) {
      value = {
        value: value
      };
    }

    return properties ? value : [value];
  }

  function normalizeTweens(animatable, tweenConfigs, property, options, beginTime, animationProperties, averageDuration) {
    var duration = averageDuration === void 0 ? options.duration : averageDuration,
        l = tweenConfigs.length,
        tweens,
        endTime = beginTime || 0,
        prevTween;
    averageDuration = duration / l;

    function normalizeTween(tweenConfig, index, prevTween) {
      var duration = getFuncValue(tweenConfig.duration === void 0 ? averageDuration : tweenConfig.duration, animatable),
          delay = getFuncValue(tweenConfig.delay === void 0 ? index === 0 ? options.delay : 0 : tweenConfig.delay, animatable),
          endDelay = getFuncValue(tweenConfig.endDelay === void 0 ? index === l - 1 ? options.endDelay : 0 : tweenConfig.endDelay, animatable),
          total = delay + duration + endDelay,
          begin = endTime,
          end = begin + total,
          value,
          to,
          from,
          tween,
          round = tweenConfig.round || options.round,
          easing = getEasing(tweenConfig.easing || options.easing),
          values,
          i,
          l,
          parts,
          withFrom,
          retValue;
      endTime += total;
      value = tweenConfig.value;
      withFrom = value.type === WITH_FROM; // 带有起始值

      if (withFrom) {
        from = value.from;
        to = value.to;
      } else {
        to = value;
      }

      if (!prevTween) {
        prevTween = animationProperties && !isEmptyObject(animationProperties) && (values = animationProperties[property]) ? values[values.length - 1] : null;
      }

      from = withFrom ? getFuncValue(from, animatable) : prevTween ? prevTween.to : animatable.target[property];
      tween = {
        animatable: animatable,
        property: property,
        duration: duration,
        delay: delay,
        endDelay: endDelay,
        begin: begin,
        end: end,
        easing: easing,
        pluginData: {}
      };

      if (parts = rCssNumVal.exec(to)) {
        assignObject(tween, {
          operator: parts[1],
          unit: parts[3]
        });
        to = parseFloat(parts[2]) || 0;
      }

      tween.from = from;
      tween.to = to;
      tween.round = round;

      for (i = 0, l = plugins.length; i < l; i++) {
        retValue = plugins[i].init(tween, TERMINATE);

        if (retValue === TERMINATE) {
          break;
        }
      }

      return tween;
    }

    tweens = sortBy(tweenConfigs.map(function (tweenConfig, index) {
      return prevTween = normalizeTween(tweenConfig, index, prevTween);
    }), function (item) {
      return item.begin;
    });
    return {
      endTime: endTime,
      tweens: tweens
    };
  }

  function getOneKeyframeSetting(animatable, properties, options, beginTime, animationProperties, averageDuration) {
    var props = {},
        p,
        value;

    for (p in properties) {
      if ((value = properties[p]) == null) {
        continue;
      }

      props[p] = normalizeTweens(animatable, structureTween(value, animatable), p, options, beginTime, animationProperties, averageDuration);
    }

    return props;
  }

  function getKeyframesAnimationProperties(animatable, keyframes, options) {
    var oneKeyframeSetting,
        animationProperties = {},
        endTime = 0,
        averageDuration = options.duration / keyframes.length;
    keyframes.forEach(function (properties) {
      var p;
      oneKeyframeSetting = getOneKeyframeSetting(animatable, properties, options, endTime, animationProperties, averageDuration);

      for (p in oneKeyframeSetting) {
        endTime = Math.max(endTime, oneKeyframeSetting[p].endTime);
        animationProperties[p] = (animationProperties[p] || []).concat(oneKeyframeSetting[p].tweens);
      }
    });
    return animationProperties;
  }

  function flattenKeyframesAnimationProperties(animationPropertiesGroup) {
    var animationProperties = animationPropertiesGroup[0],
        i,
        l = animationPropertiesGroup.length,
        p,
        anotherAnimationProperties;

    for (i = 1; i < l; i++) {
      anotherAnimationProperties = animationPropertiesGroup[i];

      for (p in anotherAnimationProperties) {
        animationProperties[p] = (animationProperties[p] || []).concat(anotherAnimationProperties[p]);
      }
    }

    return animationProperties;
  }

  function getAllAnimationProperties(animatable, keyframes, options) {
    return flattenKeyframesAnimationProperties([keyframes].map(function (keyframes) {
      return getKeyframesAnimationProperties(animatable, keyframes, options);
    }));
  }

  function getAnimations(animatables, keyframes, options) {
    keyframes = Array.isArray(keyframes) ? keyframes : [keyframes];
    return flattenArray(animatables.map(function (animatable) {
      var animationProperties = getAllAnimationProperties(animatable, keyframes, options),
          p,
          animations = [];

      for (p in animationProperties) {
        animations.push(createAnimation(animationProperties[p]));
      }

      return animations;
    }));
  }

  function getAnimationsDuration(animations) {
    return Math.max.apply(null, animations.map(function (animation) {
      return Math.max.apply(null, animation.tweens.map(function (tween) {
        return tween.end;
      }));
    }));
  }

  var defaultTimelineSettings = {
    autoplay: true,
    delegate: false,
    loop: 0,
    direction: 'normal',
    // normal, reverse, alternate, alternate-reverse
    begin: null,
    complete: null,
    loopBegin: null,
    loopComplete: null,
    pause: null,
    play: null,
    update: null
  };
  var defaultTweenSettings = {
    duration: 400,
    delay: 0,
    endDelay: 0,
    easing: easing.def,
    round: 0
  };

  function createTimeline(targets, keyframes, configuration) {
    var timelineOptions,
        tweenOptions,
        autoplay,
        delegate,
        loopAmount,
        loopCount,
        reversed,
        animatables,
        animations,
        isPlaying = false,
        started = false,
        duration = 0,
        startTime = 0,
        position = 0;
    timelineOptions = overrideObject(copyObject(defaultTimelineSettings), configuration);
    tweenOptions = overrideObject(copyObject(defaultTweenSettings), configuration);
    targets = parseTargets(targets);
    autoplay = timelineOptions.autoplay;
    delegate = timelineOptions.delegate;
    loopAmount = timelineOptions.loop === true ? Infinity : timelineOptions.loop || 1;
    loopCount = loopAmount;
    reversed = isReverse(timelineOptions.direction);
    animatables = getAnimatables(targets);
    animations = getAnimations(animatables, keyframes || [], tweenOptions);
    duration = getAnimationsDuration(animations);

    if (autoplay) {
      start();
    }

    function isCompleted() {
      return loopCount === 0 && position === duration && !isPlaying;
    }

    function invokeCallback(name) {
      if (isFunction(timelineOptions[name])) {
        timelineOptions[name]();
      }
    }

    function start() {
      if (!started) {
        started = true;
        invokeCallback('begin');
      } else {
        position = 0;
      }

      invokeCallback('loopBegin');
      play();
    }

    function restart() {
      pause();
      position = 0;
      started = false;
      loopCount = loopAmount;
      reversed = isReverse(timelineOptions.direction);
      play();
    }

    function play() {
      // 第一次start
      if (!started) {
        return start();
      }

      if (isPlaying) {
        return;
      } // complete状态下，调用play，相当于调用restart


      if (isCompleted()) {
        return restart();
      }

      isPlaying = true;
      startTime = new Date();

      if (!delegate) {
        engine.add(_tick);
      }

      invokeCallback('play');
    }

    function pause() {
      if (!isPlaying) {
        return;
      }

      isPlaying = false;

      if (!delegate) {
        engine.remove(_tick);
      }

      invokeCallback('pause');
    }

    function reverse() {
      reversed = !reversed;
    }

    function seek(progress) {
      var finished,
          i = 0,
          l = animations.length;

      if (progress >= duration) {
        progress = duration;
        finished = true;
      }

      position = progress || 0;

      for (; i < l; i++) {
        animations[i].update(reversed ? duration - progress : progress);
      }

      invokeCallback('update');

      if (finished) {
        pause();

        if (isAlternate(timelineOptions.direction)) {
          reverse();
        }

        invokeCallback('loopComplete');

        if (--loopCount < 0) {
          loopCount = 0;
        }

        if (loopCount === 0) {
          invokeCallback('complete');
        } else {
          start();
        }
      }
    }

    function _tick() {
      if (isPlaying) {
        var currTime = new Date(); // currTime - startTime：两次tick的时间间隔
        // startTime：默认添加到引擎的时间，之后为上一次tick的时间

        seek(currTime - startTime + position);
        startTime = currTime;
      }
    }

    function finish() {
      if (!isCompleted()) {
        seek(duration);
      }
    }

    return {
      animations: animations,
      restart: restart,
      play: play,
      pause: pause,
      seek: seek,
      finish: finish,
      tick: function tick() {
        if (delegate) {
          _tick();
        }
      },
      getPosition: function getPosition() {
        return position;
      },
      getDuration: function getDuration() {
        return duration;
      },
      getProgress: function getProgress() {
        return duration === 0 ? 0 : position / duration;
      }
    };
  }
  /*
  |-------------------------------------------------------------------------------
  | 动画
  |-------------------------------------------------------------------------------
  |
  | 返回一个拥有update方法的对象，update功能是接受时间进度来设置target的属性值。
  |
  */


  function createAnimation(tweens) {
    function update(progress) {
      var i, tween, currTween, value, calcVal;

      for (i = 0; tween = tweens[i++];) {
        if (tween.begin <= progress && tween.end >= progress) {
          currTween = tween;
          break;
        }

        if (progress > tween.end) {
          if (!tweens[i + 1] || tweens[i + 1].begin > progress) {
            currTween = tween;
          }
        }
      }

      if (currTween) {
        value = getTweenValue(progress, currTween);

        for (i = plugins.length - 1; i >= 0; i--) {
          calcVal = plugins[i].update(currTween, value, TERMINATE);

          if (calcVal === TERMINATE) {
            return;
          }

          if (calcVal !== void 0) {
            value = calcVal;
          }
        }
      }
    }

    return {
      update: update,
      tweens: tweens
    };
  }
  /*
  |-------------------------------------------------------------------------------
  | 对外接口
  |-------------------------------------------------------------------------------
  |
  */


  function vivid(targets, keyframes, configuration) {
    return createTimeline(targets, keyframes, configuration);
  }

  vivid.addEasing = function (name, handle) {
    if (isPlainObject(name)) {
      for (var i in name) {
        easing[i] = name[i];
      }
    } else {
      easing[name] = handle;
    }
  };

  vivid.withFrom = function (from, to) {
    return {
      from: from,
      to: to,
      sign: SPECIAL_VALUE,
      type: WITH_FROM
    };
  }; // 属性关键帧


  vivid.keyframes = function (keyframes) {
    return {
      type: KEYFRAMES,
      keyframes: keyframes
    };
  };

  vivid.stagger = stagger;
  vivid.engine = engine;
  vivid.random = random;
  vivid.Set = Set;
  vivid.Map = Map;

  vivid.use = function (plugin) {
    var priority, i, l, id;

    if (!plugin || !(id = plugin.id) || ids[id]) {
      return;
    } // 优先级越高，越早读取，越晚写入


    priority = plugin.priority || 0;

    for (i = 0, l = plugins.length; i < l; i++) {
      if (priority > plugins[i].priority) {
        break;
      }
    }

    plugins.splice(i, 0, plugin);
    ids[id] = true;

    if (isFunction(plugin.install)) {
      plugin.install(vivid, SPECIAL_VALUE);
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 更新守卫
  |-------------------------------------------------------------------------------
  |
  */
  var updateGuardPlugin = {
    id: 'updateGuard',
    priority: 100,
    init: function init() {},
    update: function update(tween, value, TERMINATE) {
      if (Array.isArray(value) && value.length === 1) {
        value = value[0];
      }

      if (!Array.isArray(value) && tween.unit) {
        value += tween.unit;
      }

      tween.animatable.target[tween.property] = value;
      return TERMINATE;
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | css插件
  |-------------------------------------------------------------------------------
  |
  */
  var cssProps = {};
  var prefixes = ['', 'webkit', 'Moz', 'O', 'ms'];
  var html = document.documentElement;
  var transformValues = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective'];
  var transformValuesMap = arrayToObject(transformValues);
  var optionalUnitProperties = arrayToObject(['columnCount', 'fillOpacity', 'fontSizeAdjust', 'fontWeight', 'lineHeight', 'opacity', 'orphans', 'widows', 'zIndex', 'zoom', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'order', 'flexGrow', 'flexShrink', 'scrollLeft', 'scrollTop', 'strokeDashoffset', 'strokeDasharray']);
  var cssTypeWhitelist = arrayToObject(['opacity']);

  function arrayToObject(array, val) {
    var map = {},
        i,
        l;
    val = val === void 0 ? 1 : val;

    for (i = 0, l = array.length; i < l; i++) {
      map[array[i]] = val;
    }

    return map;
  }

  function isElement(target) {
    return target && target.nodeType === 1;
  } // 连字符、小驼峰 -> 大驼峰


  function pascalCase(target) {
    return target.replace(/[-]([^-])/g, function (m, g1) {
      return g1.toUpperCase();
    }).replace(/^./, function (m) {
      return m.toUpperCase();
    });
  } // 连字符、大驼峰 -> 小驼峰


  function camalCase(target) {
    return target.replace(/[-]([^-])/g, function (m, g1) {
      return g1.toUpperCase();
    }).replace(/^./, function (m) {
      return m.toLowerCase();
    });
  }

  function getPrefixedCssProp(name, host) {
    var i, l, prefix, fitName;

    if (cssProps[name]) {
      return cssProps[name];
    }

    host = host || html.style;

    for (i = 0, l = prefixes.length; i < l; i++) {
      prefix = prefixes[i];
      fitName = prefix ? prefix + pascalCase(name) : camalCase(name);

      if (fitName in host) {
        return cssProps[name] = fitName;
      }
    }

    return null;
  }

  function combinedWithUnit(prop, val) {
    return !isNaN(Number(val)) && !optionalUnitProperties[prop] ? val + 'px' : val;
  }

  function getStyle(elem, prop) {
    return (window.getComputedStyle ? window.getComputedStyle(elem) : elem.currentStyle)[getPrefixedCssProp(prop)];
  }

  function setStyle(elem, prop, val) {
    elem.style[getPrefixedCssProp(prop)] = combinedWithUnit(prop, val);
  }

  function setStyleIgnoreUnit(elem, prop, val) {
    elem.style[getPrefixedCssProp(prop)] = val;
  }

  function setStyleFromTransformMap(elem, map) {
    var value = '';
    map.forEach(function (val, key) {
      return value += key + '(' + val + ') ';
    });
    setStyleIgnoreUnit(elem, 'transform', value);
  }

  var cssHooks = {
    _default: {
      get: function get(elem, prop) {
        return getStyle(elem, prop);
      },
      set: function set(elem, prop, val) {
        setStyle(elem, prop, val);
      }
    },
    'float': {
      get: function get(elem, prop) {
        if (!('float' in html.style)) {
          prop = 'cssFloat';
        }

        return getStyle(elem, prop);
      },
      set: function set(elem, prop, val) {
        if (!('float' in html.style)) {
          prop = 'cssFloat';
        }

        setStyle(elem, prop, val);
      }
    }
  };
  ['scrollTop', 'scrollLeft'].forEach(function (item) {
    cssHooks[item] = {
      get: function get(elem, prop) {
        return elem[prop];
      },
      set: function set(elem, prop, value) {
        elem[prop] = value;
      }
    };
  });
  transformValues.forEach(function (item) {
    cssHooks[item] = {
      get: function get(elem, prop) {
        return getTransformValuesMap(elem).get(prop);
      },
      set: function set(elem, prop, value) {
        var transformValuesMap = getTransformValuesMap(elem);
        transformValuesMap.set(prop, combinedWithUnit(prop, value));
        setStyleFromTransformMap(elem, transformValuesMap);
      }
    };
  });

  function css(elem, prop, value) {
    var i;

    if (!elem || !prop) {
      return;
    }

    if (isPlainObject(prop)) {
      for (i in prop) {
        css(elem, i, prop[i]);
      }

      return;
    }

    if (value === void 0) {
      return (cssHooks[prop] && cssHooks[prop].get || cssHooks._default.get)(elem, prop);
    }

    (cssHooks[prop] && cssHooks[prop].set || cssHooks._default.set)(elem, prop, value);
  }

  function getDefaultUnit(prop) {
    if (/rotate|skew/.test(prop)) {
      return 'deg';
    }

    if (optionalUnitProperties[prop]) {
      return '';
    }

    return 'px';
  }

  function getTransformValuesMap(target) {
    var str, reg, m, transforms;

    if (!isElement(target)) {
      return;
    }

    transforms = new Map(); // 确保有序性

    str = target.style[getPrefixedCssProp('transform')] || '';
    reg = /(\w+)\(([^)]+)\)/g;

    while (m = reg.exec(str)) {
      transforms.set(m[1], m[2]);
    }

    return transforms;
  }

  function parseUnit(value) {
    return rCssNumVal.test(value) ? RegExp.$3 : '';
  }

  function convertPxToUnit(target, value, unit) {
    var tempEl,
        parentEl,
        baseline = 100,
        factor;

    if ([parseUnit(value), 'deg', 'rad', 'turn'].indexOf(unit) !== -1) {
      return value;
    }

    tempEl = document.createElement(target.tagName);
    tempEl.style.position = 'absolute';
    tempEl.style.width = baseline + unit;
    parentEl = target.parentNode && target.parentNode !== document ? target.parentNode : document.body;
    parentEl.appendChild(tempEl);
    factor = baseline / tempEl.offsetWidth;
    parentEl.removeChild(tempEl);
    return factor * parseFloat(value);
  }

  function getCSSOriginalValue(target, prop, unit) {
    var value = getStyle(target, prop);
    return unit ? convertPxToUnit(target, value, unit) : value;
  }

  function getTransformOriginalValue(target, prop, unit) {
    var value = getTransformValuesMap(target).get(prop) || (/scale/.test(prop) ? 1 : 0 + getDefaultUnit(prop));
    return unit ? convertPxToUnit(target, value, unit) : value;
  }

  function getOriginalValue(target, prop, unit, isTransform) {
    return (isTransform ? getTransformOriginalValue : getCSSOriginalValue)(target, prop, unit);
  }

  function isTransform(prop) {
    return !!transformValuesMap[prop];
  }

  var cssPlugin = {
    id: 'css',
    priority: 90,
    install: function install(vivid) {
      vivid.css = css;
      vivid.getPrefixedCssProp = getPrefixedCssProp;
    },
    init: function init(tween) {
      var data = tween.pluginData,
          cssData,
          target = tween.animatable.target,
          property = tween.property;

      if (!isElement(target) || !getPrefixedCssProp(property) && !isTransform(property)) {
        return;
      }

      cssData = data.css = {};

      if (isTransform(property)) {
        cssData.isTransform = true;

        if (!tween.animatable.transforms) {
          tween.animatable.transforms = {
            map: getTransformValuesMap(target)
          };
        }
      }

      if (tween.from == null) {
        tween.from = getOriginalValue(target, property, tween.unit, cssData.isTransform);

        if (rCssNumVal.test(tween.from)) {
          tween.from = parseFloat(RegExp.$2);
        }
      }

      if (!tween.unit) {
        tween.unit = getDefaultUnit(property);
      }
    },
    update: function update(tween, value, TERMINATE) {
      var cssData = tween.pluginData.css,
          property,
          elem = tween.animatable.target;

      if (!cssData) {
        return;
      }

      if (Array.isArray(value)) {
        value = value[0];
      }

      value += tween.unit;
      property = tween.property;

      if (cssData.isTransform) {
        var map = tween.animatable.transforms.map;
        map.set(property, value);
        setStyleFromTransformMap(elem, map);
      } else {
        setStyleIgnoreUnit(elem, property, value);
      }

      return TERMINATE;
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 命名颜色
  |-------------------------------------------------------------------------------
  |
  */
  var namedColor = {
    black: '000000',
    silver: 'c0c0c0',
    gray: '808080',
    white: 'ffffff',
    maroon: '800000',
    red: 'ff0000',
    purple: '800080',
    fuchsia: 'ff00ff',
    green: '008000',
    lime: '00ff00',
    olive: '808000',
    yellow: 'ffff00',
    navy: '000080',
    blue: '0000ff',
    teal: '008080',
    aqua: '00ffff',
    orange: 'ffa500',
    aliceblue: 'f0f8ff',
    antiquewhite: 'faebd7',
    aquamarine: '7fffd4',
    azure: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    blanchedalmond: 'ffebcd',
    blueviolet: '8a2be2',
    brown: 'a52a2a',
    burlywood: 'deb887',
    cadetblue: '5f9ea0',
    chartreuse: '7fff00',
    chocolate: 'd2691e',
    coral: 'ff7f50',
    cornflowerblue: '6495ed',
    cornsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: '00ffff',
    darkblue: '00008b',
    darkcyan: '008b8b',
    darkgoldenrod: 'b8860b',
    darkgray: 'a9a9a9',
    darkgreen: '006400',
    darkgrey: 'a9a9a9',
    darkkhaki: 'bdb76b',
    darkmagenta: '8b008b',
    darkolivegreen: '556b2f',
    darkorange: 'ff8c00',
    darkorchid: '9932cc',
    darkred: '8b0000',
    darksalmon: 'e9967a',
    darkseagreen: '8fbc8f',
    darkslateblue: '483d8b',
    darkslategray: '2f4f4f',
    darkslategrey: '2f4f4f',
    darkturquoise: '00ced1',
    darkviolet: '9400d3',
    deeppink: 'ff1493',
    deepskyblue: '00bfff',
    dimgray: '696969',
    dimgrey: '696969',
    dodgerblue: '1e90ff',
    firebrick: 'b22222',
    floralwhite: 'fffaf0',
    forestgreen: '228b22',
    gainsboro: 'dcdcdc',
    ghostwhite: 'f8f8ff',
    gold: 'ffd700',
    goldenrod: 'daa520',
    greenyellow: 'adff2f',
    grey: '808080',
    honeydew: 'f0fff0',
    hotpink: 'ff69b4',
    indianred: 'cd5c5c',
    indigo: '4b0082',
    ivory: 'fffff0',
    khaki: 'f0e68c',
    lavender: 'e6e6fa',
    lavenderblush: 'fff0f5',
    lawngreen: '7cfc00',
    lemonchiffon: 'fffacd',
    lightblue: 'add8e6',
    lightcoral: 'f08080',
    lightcyan: 'e0ffff',
    lightgoldenrodyellow: 'fafad2',
    lightgray: 'd3d3d3',
    lightgreen: '90ee90',
    lightgrey: 'd3d3d3',
    lightpink: 'ffb6c1',
    lightsalmon: 'ffa07a',
    lightseagreen: '20b2aa',
    lightskyblue: '87cefa',
    lightslategray: '778899',
    lightslategrey: '778899',
    lightsteelblue: 'b0c4de',
    lightyellow: 'ffffe0',
    limegreen: '32cd32',
    linen: 'faf0e6',
    magenta: 'ff00ff',
    mediumaquamarine: '66cdaa',
    mediumblue: '0000cd',
    mediumorchid: 'ba55d3',
    mediumpurple: '9370db',
    mediumseagreen: '3cb371',
    mediumslateblue: '7b68ee',
    mediumspringgreen: '00fa9a',
    mediumturquoise: '48d1cc',
    mediumvioletred: 'c71585',
    midnightblue: '191970',
    mintcream: 'f5fffa',
    mistyrose: 'ffe4e1',
    moccasin: 'ffe4b5',
    navajowhite: 'ffdead',
    oldlace: 'fdf5e6',
    olivedrab: '6b8e23',
    orangered: 'ff4500',
    orchid: 'da70d6',
    palegoldenrod: 'eee8aa',
    palegreen: '98fb98',
    paleturquoise: 'afeeee',
    palevioletred: 'db7093',
    papayawhip: 'ffefd5',
    peachpuff: 'ffdab9',
    peru: 'cd853f',
    pink: 'ffc0cb',
    plum: 'dda0dd',
    powderblue: 'b0e0e6',
    rosybrown: 'bc8f8f',
    royalblue: '4169e1',
    saddlebrown: '8b4513',
    salmon: 'fa8072',
    sandybrown: 'f4a460',
    seagreen: '2e8b57',
    seashell: 'fff5ee',
    sienna: 'a0522d',
    skyblue: '87ceeb',
    slateblue: '6a5acd',
    slategray: '708090',
    slategrey: '708090',
    snow: 'fffafa',
    springgreen: '00ff7f',
    steelblue: '4682b4',
    tan: 'd2b48c',
    thistle: 'd8bfd8',
    tomato: 'ff6347',
    turquoise: '40e0d0',
    violet: 'ee82ee',
    wheat: 'f5deb3',
    whitesmoke: 'f5f5f5',
    yellowgreen: '9acd32',
    rebeccapurple: '663399'
  };

  /*
  |-------------------------------------------------------------------------------
  | color插件
  |-------------------------------------------------------------------------------
  |
  */

  function hexToRgb(hex) {
    var r = /[0-9a-f]{2}/ig,
        rgb = [];

    while (r.test(hex)) {
      rgb.push(parseInt(RegExp.lastMatch, 16));
    }

    return rgb;
  }

  function pickNumToArray(str) {
    var r = /[.\d]+/g,
        rgb = [];

    while (r.test(str)) {
      rgb.push(Number(RegExp.lastMatch));
    }

    return rgb;
  }

  function hslToRgb(h, s, l) {
    var r, g, b;

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  } // 1. 3位或6位十六进制hex
  // 2. rgb
  // 3. rgba
  // 4. hsl
  // 5. hsla
  // 6. 颜色名


  function colorToRgba(val) {
    var rgba, arr;

    if (/^#?[0-9a-f]{3}$/i.test(val)) {
      rgba = hexToRgb(val.replace(/(.)(.)(.)$/, '$1$1$2$2$3$3'));
    } else if (/^#?([0-9a-f]{6})$/i.test(val)) {
      rgba = hexToRgb(RegExp.$1);
    } else if (/^rgb/i.test(val)) {
      rgba = pickNumToArray(val);
    } else if (/^hsl/i.test(val)) {
      arr = pickNumToArray(val);
      arr[0] /= 360;
      arr[1] /= 100;
      arr[2] /= 100;
      rgba = hslToRgb.apply(null, arr).concat(arr[3]);
    } else if (namedColor.hasOwnProperty(val = String(val).toLowerCase())) {
      rgba = hexToRgb(namedColor[val]);
    } else {
      rgba = [0, 0, 0, 1];
    }

    if (typeof rgba[3] !== 'number') {
      rgba[3] = 1;
    }

    return rgba;
  }

  function isColor(value) {
    return namedColor.hasOwnProperty(String(value).toLowerCase()) || /^(?:rgb|hsl|#(?:[0-9a-f]{6}|[0-9a-f]{3})$)/i.test(value);
  }

  var colorPlugin = {
    id: 'color',
    priority: 80,
    init: function init(tween, TERMINATE) {
      var data = tween.pluginData,
          from,
          to;

      if (typeof tween.to !== "string" || !isColor(tween.to)) {
        return;
      }

      from = colorToRgba(tween.from);
      to = colorToRgba(tween.to);
      tween.between = to.map(function (value, i) {
        return {
          from: from[i],
          to: value,
          round: i === 3 ? 0 : 1
        };
      });
      tween.unit = '';
      data.color = {};
      return TERMINATE;
    },
    update: function update(tween, value) {
      var colorData = tween.pluginData.color;

      if (!colorData) {
        return;
      }

      return 'rgba(' + value.join(',') + ')';
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 处理相对值
  |-------------------------------------------------------------------------------
  |
  */
  function getRelativeValue(from, to, operator) {
    if (!operator) {
      return to;
    }

    switch (operator[0]) {
      case '+':
        return from + to;

      case '-':
        return from - to;

      case '*':
        return from * to;

      case '/':
        return from / to;

      case '%':
        return from / to;
    }
  }

  var relativePlugin = {
    id: 'relative',
    priority: 70,
    init: function init(tween, TERMINATE) {
      var from;

      if (!tween.operator) {
        return;
      }

      from = tween.from;

      if (Array.isArray(from)) {
        from = from[0];
      }

      if (typeof from !== 'number') {
        from = Number(from) || 0;
      }

      tween.to = getRelativeValue(from, parseFloat(tween.to), tween.operator);
      tween.between = [{
        from: from,
        to: tween.to,
        round: tween.round
      }];
      return TERMINATE;
    },
    update: function update() {}
  };

  /*
  |-------------------------------------------------------------------------------
  | svg：路径动画、划线动画
  |-------------------------------------------------------------------------------
  |
  */
  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  function getBaseVal(elem, prop) {
    return elem[prop].baseVal.value;
  }

  function getRadianByLine(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }

  function getAngleByLine(p1, p2) {
    return getRadianByLine(p1, p2) / Math.PI * 180;
  }

  function getPointAtLine(p1, p2, progress) {
    var radian = getRadianByLine(p1, p2),
        x = Math.cos(radian) * progress,
        y = Math.sin(radian) * progress;
    return {
      x: p1.x + x,
      y: p1.y + y
    };
  }

  function getRectTotalLength(elem) {
    return getBaseVal(elem, 'width') * 2 + getBaseVal(elem, 'height') * 2;
  }

  function getCircleTotalLength(elem) {
    return getBaseVal(elem, 'r') * 2 * Math.PI;
  } // 此公式来源于：百度百科椭圆周长第十条公式（该公式发明人周钰承）
  // 通过多次计算得出，此公式获取的周长与chrome浏览器内置的公式获取的周长有一个像素左右的误差。


  function getEllipseTotalLength(elem) {
    var rx = getBaseVal(elem, 'rx'),
        ry = getBaseVal(elem, 'ry'),
        a = Math.max(rx, ry),
        b = Math.min(rx, ry),
        c = (a - b) / (a + b),
        pi = Math.PI,
        pow = Math.pow;
    return pi * (a + b) * (1 + 3 * c * c / (10 + Math.sqrt(4 - 3 * c * c)) + (4 / pi - 14 / 11) * pow(c, 14.233 + 13.981 * pow(c, 6.42)));
  }

  function getLineTotalLength(elem) {
    return getDistance({
      x: getBaseVal(elem, 'x1'),
      y: getBaseVal(elem, 'y1')
    }, {
      x: getBaseVal(elem, 'x2'),
      y: getBaseVal(elem, 'y2')
    });
  }

  function getPolylineTotalLength(elem) {
    var points = elem.points,
        i,
        totalLength = 0;

    for (i = 1; i < points.numberOfItems; i++) {
      totalLength += getDistance(points.getItem(i - 1), points.getItem(i));
    }

    return totalLength;
  }

  function getPolygonTotalLength(elem) {
    var points = elem.points;
    return getPolylineTotalLength(elem) + getDistance(points.getItem(0), points.getItem(points.numberOfItems - 1));
  }

  function getTotalLength(elem) {
    if (elem.getTotalLength) {
      return elem.getTotalLength();
    }

    switch (elem.nodeName.toLowerCase()) {
      case 'rect':
        return getRectTotalLength(elem);

      case 'circle':
        return getCircleTotalLength(elem);

      case 'ellipse':
        return getEllipseTotalLength(elem);

      case 'line':
        return getLineTotalLength(elem);

      case 'polyline':
        return getPolylineTotalLength(elem);

      case 'polygon':
        return getPolygonTotalLength(elem);
    }
  }

  function getPointAtLengthByCircle(elem, length) {
    var radius = getBaseVal(elem, 'r'),
        cx = getBaseVal(elem, 'cx'),
        cy = getBaseVal(elem, 'cy'),
        radian = length / getTotalLength(elem) * 2 * Math.PI,
        ly = Math.sin(radian) * radius,
        lx = Math.cos(radian) * radius;
    return {
      x: cx + lx,
      y: cy + ly
    };
  }

  function getPointAtLengthByEllipse(elem, length) {
    var totalLength = getTotalLength(elem),
        rx = getBaseVal(elem, 'rx'),
        ry = getBaseVal(elem, 'ry'),
        cx = getBaseVal(elem, 'cx'),
        cy = getBaseVal(elem, 'cy'),
        radian = 2 * Math.PI * (length / totalLength);
    return {
      x: rx * Math.cos(radian) + cx,
      y: ry * Math.sin(radian) + cy
    };
  }

  function getPointAtLengthByRect(elem, length) {
    var x = getBaseVal(elem, 'x'),
        y = getBaseVal(elem, 'y'),
        width = getBaseVal(elem, 'width'),
        height = getBaseVal(elem, 'height'),
        arr = [width, height, width, height],
        section,
        i = 0,
        prev = 0,
        sum = 0;

    for (; i < 4; i++) {
      sum += arr[i];

      if (sum >= length) {
        section = length - prev;

        switch (i) {
          case 0:
            x += section;
            break;

          case 1:
            x += width;
            y += section;
            break;

          case 2:
            x += width - section;
            y += height;
            break;

          case 3:
            y += height - section;
            break;
        }

        return {
          x: x,
          y: y
        };
      }

      prev = sum;
    }
  }

  function getPointAtLengthByLine(elem, length) {
    return getPointAtLine({
      x: getBaseVal(elem, 'x1'),
      y: getBaseVal(elem, 'y1')
    }, {
      x: getBaseVal(elem, 'x2'),
      y: getBaseVal(elem, 'y2')
    }, length);
  }

  function getPointAtLengthByPolyline(elem, length, polygon) {
    var points = elem.points,
        l = points.numberOfItems + (polygon || 0),
        prev = 0,
        sum = 0,
        p1,
        p2,
        i,
        j;

    for (i = 1; i < l; i++) {
      j = i - 1;

      if (polygon && i === l - 1) {
        i = 0;
        j = l - 2;
      }

      p1 = points.getItem(j);
      p2 = points.getItem(i);
      sum += getDistance(p1, p2);

      if (sum >= length) {
        return getPointAtLine(p1, p2, length - prev);
      }

      prev = sum;
    }
  }

  function getPointAtLengthByPolygon(elem, length) {
    return getPointAtLengthByPolyline(elem, length, 1);
  }

  function getPointAtLength(elem, length) {
    if (elem.getPointAtLength) {
      return elem.getPointAtLength(length);
    }

    switch (elem.nodeName.toLowerCase()) {
      case 'rect':
        return getPointAtLengthByRect(elem, length);

      case 'circle':
        return getPointAtLengthByCircle(elem, length);

      case 'ellipse':
        return getPointAtLengthByEllipse(elem, length);

      case 'line':
        return getPointAtLengthByLine(elem, length);

      case 'polyline':
        return getPointAtLengthByPolyline(elem, length);

      case 'polygon':
        return getPointAtLengthByPolygon(elem, length);
    }
  }

  var SVG = {};
  var svgPlugin = {
    id: 'svg',
    priority: 60,
    install: function install(vivid, SPECIAL_VALUE) {
      vivid.geometry = function (elem, percent) {
        elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
        percent = percent || 100;
        return function (property) {
          return {
            el: elem,
            property: property,
            totalLength: getTotalLength(elem) * (percent / 100),
            sign: SPECIAL_VALUE,
            type: SVG
          };
        };
      };

      vivid.setDashoffset = function (id, total, elem) {
        var length = getTotalLength(elem);
        elem.setAttribute('stroke-dasharray', length);
        return length;
      };
    },
    init: function init(tween) {
      var data = tween.pluginData,
          to = tween.to;

      if (!to || to.type !== SVG) {
        return;
      }

      data.svg = {
        geometry: to
      };
      tween.from = 0;
      tween.to = to.totalLength;
      tween.unit = '';
    },
    update: function update(tween, value) {
      var svgData = tween.pluginData.svg,
          p0,
          p1;

      if (!svgData) {
        return;
      }

      value = value[0];
      p0 = getPoint(-1);
      p1 = getPoint(0);

      function getPoint(offset) {
        return getPointAtLength(svgData.geometry.el, value + offset);
      }

      switch (svgData.geometry.property) {
        case 'x':
          return p1.x + 'px';

        case 'y':
          return p1.y + 'px';

        case 'angle':
          return getAngleByLine(p0, p1) + 'deg';
      }
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 处理多个值
  |-------------------------------------------------------------------------------
  |
  | 字符串里含有数值，会将数值拿出来求值，
  | 而后将新的值替换字符串里旧的值并返回替换后的字符串。
  |
  */
  var multiPlugin = {
    id: 'multi',
    priority: 50,
    init: function init(tween) {
      var data = tween.pluginData,
          from,
          to,
          toMatch,
          fromMatch;
      to = tween.to;

      if (typeof to !== 'string' || !(toMatch = to.match(rNums))) {
        return;
      }

      data.multi = {
        strings: to.split(rNums)
      };
      from = tween.from;

      if (typeof from === 'string' && (fromMatch = from.match(rNums))) {
        from = fromMatch;
      } else if (!Array.isArray(from)) {
        from = [tween.from];
      }

      tween.from = from;
      tween.to = toMatch;
    },
    update: function update(tween, value) {
      var multiData = tween.pluginData.multi;

      if (!multiData) {
        return;
      }

      return value.map(function (num, i) {
        return multiData.strings[i] + num;
      }).join('');
    }
  };

  /*
  |-------------------------------------------------------------------------------
  | 初始化守卫
  |-------------------------------------------------------------------------------
  |
  */
  var initGuardPlugin = {
    id: 'initGuard',
    priority: 0,
    init: function init(tween, TERMINATE) {
      var to, from;

      if (tween.between) {
        return;
      }

      to = tween.to;

      if (!Array.isArray(to)) {
        to = [to];
      }

      from = tween.from;

      if (!Array.isArray(from)) {
        from = [from];
      }

      tween.between = to.map(function (value, i) {
        return {
          from: Number(from[i]) || 0,
          to: Number(value) || 0,
          round: tween.round
        };
      });
      return TERMINATE;
    },
    update: function update() {}
  };

  vivid.use(updateGuardPlugin);
  vivid.use(cssPlugin);
  vivid.use(colorPlugin);
  vivid.use(relativePlugin);
  vivid.use(svgPlugin);
  vivid.use(multiPlugin);
  vivid.use(initGuardPlugin);

  /*
  |-------------------------------------------------------------------------------
  | WeakMap
  |-------------------------------------------------------------------------------
  |
  | 兼容低版本浏览器:
  | IE 6-10
  | Firefox 2-5
  | Chrome 4-35
  |
  */
  var WeakMap = window.WeakMap || function () {
    function rand() {
      return Math.random().toString().slice(2);
    }

    function isObject(target) {
      return Object(target) === target;
    }

    return /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);

        this._id = '_WeakMap_' + rand() + '.' + rand();
      }

      _createClass(_class, [{
        key: "set",
        value: function set(key, value) {
          if (isObject(key)) {
            var entry = key[this._id];

            if (entry && entry[0] === key) {
              entry[1] === value;
            } else {
              key[this._id] = [key, value];
            }
          }

          return this;
        }
      }, {
        key: "get",
        value: function get(key) {
          if (!isObject(key)) {
            return void 0;
          }

          var entry = key[this._id];

          if (entry && entry[0] === key) {
            return entry[1];
          }
        }
      }, {
        key: "has",
        value: function has(key) {
          if (!isObject(key)) {
            return false;
          }

          var entry = key[this._id];

          if (entry && entry[0] === key) {
            return true;
          }

          return false;
        }
      }, {
        key: "delete",
        value: function _delete(key) {
          if (!isObject(key)) {
            return false;
          }

          var entry = key[this._id];

          if (entry && entry[0] === key) {
            delete key[this._id];
            return true;
          }

          return false;
        }
      }]);

      return _class;
    }();
  }();

  var Data = /*#__PURE__*/function () {
    function Data() {
      _classCallCheck(this, Data);

      this.cache = new WeakMap();
    } // 获取储物柜，没有则开一个


    _createClass(Data, [{
      key: "locker",
      value: function locker(obj) {
        var cache = this.cache.get(obj);

        if (!cache) {
          this.cache.set(obj, cache = {});
        }

        return cache;
      }
    }, {
      key: "set",
      value: function set(obj, key, value) {
        var cache = this.locker(obj);

        if (typeof key === 'string') {
          cache[key] = value;
        } else {
          for (var i in key) {
            cache[i] = key[i];
          }
        }
      }
    }, {
      key: "get",
      value: function get(obj, key) {
        var cache = this.locker(obj);
        return key === void 0 ? cache : cache[key];
      } // 存取操作

    }, {
      key: "access",
      value: function access(obj, key, value) {
        // 取
        if (key === void 0 || key && typeof key === 'string' && value === void 0) {
          return this.get(obj, key);
        } // 存


        this.set(obj, key, value);
        return value === void 0 ? key : value;
      }
    }, {
      key: "delete",
      value: function _delete(obj, key) {
        var i, l, cache;

        if (!key) {
          return this.discard(obj);
        }

        cache = this.locker(obj); // 支持数组和空格分割的字符串来批量删除数据

        if (key && typeof key === 'string') {
          key = key.split(/\s+/);
        }

        l = key.length;

        while (l--) {
          delete cache[key[l]];
          i = '';

          for (i in cache) {
            break;
          }

          if (!i) {
            return this.discard(obj);
          }
        }
      } // 抛弃储物柜

    }, {
      key: "discard",
      value: function discard(obj) {
        this.cache["delete"](obj);
      }
    }]);

    return Data;
  }();

  var data_priv = new Data();

  function data(obj, key, value) {
    return data_priv.access(obj, key, value);
  }

  function removeData(obj, key) {
    return data_priv["delete"](obj, key);
  }

  var toString$1 = Object.prototype.toString;
  function isPlainObject$1(target) {
    return toString$1.call(target) === '[object Object]';
  } // 支持深复制

  function extend() {
    var target = arguments[0],
        i = 1,
        l = arguments.length,
        options,
        name,
        src,
        copy,
        deep,
        copyIsArray,
        clone; // 深复制

    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1]; // 跳过 boolean 和 target

      i = 2;
    } // 只传递一个对象情况下，把对象合并到调用extend函数的对象上


    if (l === i) {
      // this 的特点：谁调用我，我指向谁
      target = this;
      --i;
    }

    for (; i < l; i++) {
      // 不处理null和undefined
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name]; // 防止有环

          if (target === copy) {
            continue;
          } // 深复制


          if (deep && copy && (isPlainObject$1(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject$1(src) ? src : {};
            } // 只克隆对象，不移动


            target[name] = extend(deep, clone, copy); // 不添加未定义的值
          } else if (copy !== void 0) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  }
  function sandbox(callback) {
    var sandbox, win, doc, html, body;
    sandbox = document.createElement('iframe');
    sandbox.style.cssText = 'display:none !important';
    document.body.appendChild(sandbox);
    win = sandbox.contentWindow;
    doc = win.document;
    html = doc.documentElement;
    body = doc.body; // 针对IE10-(含)

    if (!html) {
      html = doc.createElement('html');
      doc.appendChild(html);
    } // 针对IE10-(含)


    if (!body) {
      body = doc.createElement('body');
      html.appendChild(body);
    }

    callback(win, doc, html, body);
  }
  function matchesSelector(elem, selector) {
    return (elem.matches || elem.matchesSelector || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector || elem.oMatchesSelector).call(elem, selector);
  } // 支持字符串数组

  function uniqueArray$1(array) {
    return Object.keys(array.reduce(function (obj, item) {
      return (obj[item] = 1) && obj;
    }, {}));
  }
  function addClass(elem) {
    for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      classes[_key - 1] = arguments[_key];
    }

    if (elem.classList) {
      return classes.forEach(function (item) {
        return elem.classList.add(item);
      });
    }

    elem.className = uniqueArray$1((elem.className.match(/\S+/g) || []).concat(classes)).join(' ');
  }
  function removeClass(elem) {
    for (var _len2 = arguments.length, classes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      classes[_key2 - 1] = arguments[_key2];
    }

    if (elem.classList) {
      return classes.forEach(function (item) {
        return elem.classList.remove(item);
      });
    }

    elem.className = (elem.className.match(/\S+/g) || []).filter(function (item) {
      return classes.indexOf(item) === -1;
    }).join(' ');
  }
  function toggleClass(elem) {
    for (var _len3 = arguments.length, classes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      classes[_key3 - 1] = arguments[_key3];
    }

    if (elem.classList) {
      return classes.forEach(function (item) {
        return elem.classList.toggle(item);
      });
    }

    var srcClasses = elem.className.match(/\S+/g) || [];
    elem.className = srcClasses.filter(function (item) {
      return classes.indexOf(item) === -1;
    }).concat(classes.filter(function (item) {
      return srcClasses.indexOf(item) === -1;
    })).join(' ');
  }
  function hasClass(elem, cls) {
    return (elem.className.match(/\S+/g) || []).indexOf(cls) !== -1;
  }
  function $(selector, context) {
    if (typeof selector === 'string') {
      return (context || document).querySelector(selector);
    }

    return selector;
  }
  function $$(selector, context) {
    if (typeof selector === 'string') {
      selector = (context || document).querySelectorAll(selector);
    }

    return Array.prototype.slice.call(selector || []);
  } // 函数防抖

  function debounce(fn, wait) {
    var timer = null;
    return function () {
      var _this = this;

      var args = arguments;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        fn.apply(_this, args);
      }, wait != null ? wait : 150);
    };
  } // 函数节流

  function throttle(fn, wait) {
    var timer = null,
        first = true;
    return function () {
      var _this2 = this;

      var args = arguments; // 第一次执行

      if (first) {
        fn.apply(this, args);
        first = false;
      } else {
        if (!timer) {
          timer = setTimeout(function () {
            timer = null;
            fn.apply(_this2, args);
          }, wait != null ? wait : 150);
        }
      }
    };
  }
  var uuidCounter = 0;
  function uuid() {
    return 'galaxy' + ++uuidCounter + Math.random().toString().slice(2);
  }
  function namespace() {
    return '.' + uuid();
  }
  function offset(elem) {
    var top = 0,
        left = 0;

    while (elem.offsetParent) {
      top += elem.offsetTop;
      left += elem.offsetLeft;
      elem = elem.offsetParent;
    }

    return {
      top: top,
      left: left
    };
  }
  function getOffsetTop(elem, target) {
    var offsetTop = offset(elem).top;

    if (!target || target === window) {
      return offsetTop;
    } else {
      return offsetTop - offset(target).top;
    }
  }
  function getScrollTop(target) {
    return !target || target === window ? window.pageYOffset : target.scrollTop;
  }
  function getScrollHeight(target) {
    return !target || target === window ? Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) : target.scrollHeight;
  }
  function getClientHeight(target) {
    return target === window ? document.documentElement.clientHeight : target.clientHeight;
  }
  var utils = {
    isPlainObject: isPlainObject$1,
    extend: extend,
    sandbox: sandbox,
    matchesSelector: matchesSelector,
    uniqueArray: uniqueArray$1,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    hasClass: hasClass,
    $: $,
    $$: $$,
    debounce: debounce,
    throttle: throttle,
    uuid: uuid,
    offset: offset,
    getOffsetTop: getOffsetTop,
    getScrollTop: getScrollTop,
    getScrollHeight: getScrollHeight,
    getClientHeight: getClientHeight
  };

  var SHOW = 'show';
  var HIDE = 'hide';
  var TOGGLE = 'toggle';
  var NAMESPACE = '_animation';
  var DISPLAY = '_display';
  var cacheDisplay = {};

  function getSrcDisplay(elem) {
    var display,
        el,
        tagName = elem.tagName;

    if (!(display = cacheDisplay[tagName])) {
      sandbox(function (win, doc, html, body) {
        el = doc.createElement(tagName);
        body.appendChild(el); // 低版本Firefox只能使用window，不能使用iframe里面的window，否则getComputedStyle()返回null

        cacheDisplay[tagName] = display = window.getComputedStyle(el, null).display;
      });
    }

    return display;
  }

  function getDisplay(elem) {
    var display = data(elem, DISPLAY);

    if (!display) {
      display = getComputedStyle(elem).display;

      if (display === 'none') {
        display = getSrcDisplay(elem);
      }

      data(elem, DISPLAY, display);
    }

    return display;
  }

  var defaults = {
    duration: 400,
    easing: 'easeInOutQuad',
    delay: 0,
    endDelay: 0
  };

  var Animation = /*#__PURE__*/function () {
    function Animation(elem) {
      _classCallCheck(this, Animation);

      this._elem = elem;
      this._list = [];
      this._vivid = null;
    }

    _createClass(Animation, [{
      key: "_queue",
      value: function _queue(fn) {
        this._list.push(fn);

        if (this._list[0] !== 'guard') {
          this._dequeue();
        }

        return this;
      }
    }, {
      key: "_dequeue",
      value: function _dequeue() {
        var fn = this._list.shift();

        if (fn === 'guard') {
          fn = this._list.shift();
        }

        if (fn) {
          this._list.unshift('guard');

          this._vivid = fn();
        }

        return this;
      }
    }, {
      key: "_mergeConfig",
      value: function _mergeConfig(options, _complete) {
        var _this = this;

        return extend({}, defaults, options, {
          autoplay: true,
          complete: function complete() {
            _this._vivid = null;
            _complete && _complete();
            options.complete && options.complete();

            _this._dequeue();
          }
        });
      }
    }, {
      key: "restart",
      value: function restart() {
        if (this._vivid) {
          this._vivid.restart();
        }

        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        if (this._vivid) {
          this._vivid.pause();
        }

        return this;
      }
    }, {
      key: "play",
      value: function play() {
        if (this._vivid) {
          this._vivid.play();
        }

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.pause();
        this._vivid = null;
        return this._dequeue();
      }
    }, {
      key: "finish",
      value: function finish() {
        if (this._vivid) {
          this._vivid.finish();
        }

        return this;
      }
    }, {
      key: "finishAll",
      value: function finishAll() {
        // finish后会设置 currentAnime 为 null
        // 接着 dequeue，如果队列不为空，currentAnime 会被赋新值
        while (this._vivid) {
          this._vivid.finish();
        }

        return this;
      }
    }, {
      key: "clearQueue",
      value: function clearQueue() {
        this._list.length = 0;
        return this;
      }
    }, {
      key: "custom",
      value: function custom(properties, options) {
        var _this2 = this;

        return this._queue(function () {
          return vivid(_this2._elem, properties, _this2._mergeConfig(options || {}));
        });
      }
    }]);

    return Animation;
  }();

  function addAnimate(name, animating, action) {
    if (Animation.prototype.hasOwnProperty(name)) {
      return;
    }

    Animation.prototype[name] = function () {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var args = arguments;
      return this._queue(function () {
        var hidden,
            complete,
            isToggle = action === SHOW || action === HIDE || action === TOGGLE;

        if (isToggle) {
          hidden = getComputedStyle(_this3._elem).display === 'none';

          if (hidden && action === HIDE || !hidden && action === SHOW) {
            options.complete && options.complete();

            _this3._dequeue();

            return;
          }
        }

        var _animating$apply = animating.apply(null, args)(_this3._elem, function (completeCb) {
          complete = completeCb;
        }, function () {
          if (isToggle) {
            // 允许通过类名来显示/隐藏元素
            if (options.className) {
              (hidden ? addClass : removeClass)(options.elem || _this3._elem, typeof options.className === 'string' ? options.className : SHOW);
            } else {
              _this3._elem.style.display = hidden ? getDisplay(_this3._elem) : 'none';
            }
          }
        }, hidden),
            _animating$apply2 = _slicedToArray(_animating$apply, 2),
            properties = _animating$apply2[0],
            vividOptions = _animating$apply2[1];

        return vivid(_this3._elem, properties, _this3._mergeConfig(vividOptions, complete));
      });
    };
  }
  // ==============

  var fxAttrs = [['height', 'marginTop', 'marginBottom', 'borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom'], ['width', 'marginLeft', 'marginRight', 'borderLeftWidth', 'borderRightWidth', 'paddingLeft', 'paddingRight'], ['opacity']]; // 生成属性数组

  function genFx(type, start, end) {
    return [type, fxAttrs.concat.apply([], fxAttrs.slice(start, end))];
  }

  [['show', genFx(SHOW, 0)], ['hide', genFx(HIDE, 0)], ['toggle', genFx(TOGGLE, 0)], ['slideDown', genFx(SHOW, 0, 1)], ['slideUp', genFx(HIDE, 0, 1)], ['slideToggleY', genFx(TOGGLE, 0, 1)], ['slideLeft', genFx(HIDE, 1, 2)], ['slideRight', genFx(SHOW, 1, 2)], ['slideToggleX', genFx(TOGGLE, 1, 2)], ['fadeIn', genFx(SHOW, 2)], ['fadeOut', genFx(HIDE, 2)], ['fadeToggle', genFx(TOGGLE, 2)]].forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        method = _ref2[0],
        _ref2$ = _slicedToArray(_ref2[1], 2),
        action = _ref2$[0],
        attrs = _ref2$[1];

    addAnimate(method, function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return function (elem, complete, toggle, hidden) {
        var srcValues = {},
            toValues = {},
            style = elem.style;
        complete(function () {
          if (!hidden) {
            toggle();
          }

          for (var prop in srcValues) {
            style[prop] = srcValues[prop];
          }
        });

        if (hidden) {
          toggle();
        }

        attrs.forEach(function (prop) {
          srcValues[prop] = style[prop];

          if (hidden) {
            toValues[prop] = getComputedStyle(elem)[prop];
            style[prop] = 0;
          } else {
            toValues[prop] = 0;
          }
        }); // 涉及到宽高的还需要保存并设置溢出隐藏。

        if (attrs.indexOf('width') !== -1 || attrs.indexOf('height') !== -1) {
          ['', 'X', 'Y'].forEach(function (postfix) {
            var attr = 'overflow' + postfix;
            srcValues[attr] = style[attr];
          });
          style.overflow = 'hidden';
        }

        return [toValues, options];
      };
    }, action);
  });
  Animation.prototype.slideToggle = Animation.prototype.slideToggleY;
  addAnimate('fadeTo', function (opacity) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function () {
      return [{
        opacity: opacity
      }, options];
    };
  }); // # 对外接口
  // ==========

  function animate(elem) {
    var instance = data(elem, NAMESPACE);

    if (!instance) {
      instance = data(elem, NAMESPACE, new Animation(elem));
    }

    return instance;
  }

  animate.add = addAnimate;
  animate.defaults = defaults;

  /*
  |-------------------------------------------------------------------------------
  | CustomEvent
  |-------------------------------------------------------------------------------
  |
  | 解决IE不支持 `new CustomEvent()` 的形式
  |
  */
  var CustomEvent = typeof window.CustomEvent === 'function' ? window.CustomEvent : function () {
    return function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: null
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
  }();

  var TRANSITION_START = 'transitionStart';
  var TRANSITION_END = 'transitionEnd';
  var HORIZONTAL = 'horizontal';
  var TRANSLATE_X = 'translateX';
  var TRANSLATE_Y = 'translateY';
  var MOUSEOVER = 'mouseover';
  var MOUSEOUT = 'mouseout';
  var MOUSEENTER = 'mouseenter';
  var MOUSELEAVE = 'mouseleave';
  var GALAXY_CLONED_SLIDE = 'galaxy-cloned-slide';
  var DATA_GALAXY_SLIDE_INDEX = 'data-galaxy-slide-index';

  var NAMESPACE$1 = '_event';
  var specialTypes = {
    wheel: {
      getType: function getType() {
        return 'onwheel' in document || window.WheelEvent && WheelEvent.prototype.hasOwnProperty('deltaY') ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
      }
    },
    transitionend: {
      getType: function getType() {
        return window.TransitionEvent ? 'transitionend' : 'webkitTransitionEnd';
      }
    },
    DOMMouseScroll: {
      fixEvent: function fixEvent(event) {
        event.deltaY = event.deltaX = event.detail;
      }
    },
    mousewheel: {
      fixEvent: function fixEvent(event) {
        event.deltaY = event.deltaX = -event.wheelDelta;
      }
    }
  };
  [[MOUSEENTER, MOUSEOVER], [MOUSELEAVE, MOUSEOUT]].forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        origin = _ref2[0],
        fix = _ref2[1];

    specialTypes[origin] = {
      getType: function getType() {
        return 'on' + MOUSEENTER in document ? origin : fix;
      },
      handler: function handler(event, bakHandler) {
        var related = event.relatedTarget;

        if (event.type === origin || !related || !this.contains(related)) {
          bakHandler.call(this, event);
        }
      }
    };
  });

  function fixEvent(event) {
    var specialType = specialTypes[event.type] || {};

    if (specialType.fixEvent) {
      specialType.fixEvent(event);
    }

    return event;
  }

  function agency(event) {
    var current, events, type;
    event = fixEvent(event);
    current = event.currentTarget;
    events = data(event.currentTarget, NAMESPACE$1);
    type = event.type;
    events[type].forEach(function (handlerObj) {
      var target, handler, bakHandler, removed;

      bakHandler = handler = function handler(event) {
        handlerObj.handler.call(this, event);

        if (handlerObj.once && !removed) {
          off(current, type, handlerObj.handler);
          removed = true;
        }
      };

      if (handlerObj.specialHandler) {
        handler = function handler(event) {
          handlerObj.specialHandler.call(this, event, bakHandler);
        };
      }

      if (handlerObj.selector) {
        target = event.target;

        do {
          if (matchesSelector(target, handlerObj.selector)) {
            handler.call(target, event);
          }
        } while ((target = target.parentNode) && target.nodeType === 1);
      } else {
        handler.call(current, event);
      }
    });
  }

  function on(elem, type, selector, handler, once) {
    var events, types, l, type_namespace, namespace, handlerObjList, special;

    if (typeof selector === 'function') {
      handler = selector;
      selector = null;
    }

    events = data(elem, NAMESPACE$1);

    if (!events) {
      events = data(elem, NAMESPACE$1, {});
    } // 可以一次性绑定通过空格分割的多个事件


    types = type.split(/\s+/);
    l = types.length;

    while (l--) {
      type = types[l];
      type_namespace = type.split('.');
      type = type_namespace[0];
      namespace = type_namespace.slice(1);

      if (!type) {
        continue;
      } // 处理特殊的事件


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
  function once(elem, type, selector, handler) {
    on(elem, type, selector, handler, true);
  }
  function off(elem, type, handler) {
    var events, types, l, type_namespace, namespace, special;
    events = data(elem, NAMESPACE$1);

    if (!events) {
      return;
    } // 移除所有绑定的事件


    if (!type) {
      for (type in events) {
        elem.removeEventListener(type, agency, false);
      }

      return removeData(elem, NAMESPACE$1);
    } // 可以一次性移除通过空格分割的多个事件


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
      removeData(elem, NAMESPACE$1);
    }

    function remove(type, namespace) {
      var handlerObjList = events[type],
          handlerObj,
          i = 0;

      for (; i < handlerObjList.length; i++) {
        handlerObj = handlerObjList[i]; // 命名空间：我有的你都有，则符合匹配

        if (namespace.filter(function (e) {
          return handlerObj.namespace.indexOf(e) === -1;
        }).length === 0) {
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
  function emit(elem, type, detail) {
    var special; // 处理特殊的事件

    if ((special = specialTypes[type]) && special.getType) {
      type = special.getType();
    }

    var event = new CustomEvent(type, {
      bubbles: false,
      detail: detail
    });
    elem.dispatchEvent(event);
  } // 添加带有延迟的事件，只针对mouseover、mouseenter事件

  function addEventWithDelay(targets, type, handler, delay) {
    var timer;

    var _namespace = namespace();

    if (!Array.isArray(targets)) {
      targets = [targets];
    }

    if (type === MOUSEOVER || type === MOUSEENTER) {
      targets.forEach(function (target, i) {
        on(target, type + _namespace, function () {
          timer = setTimeout(function () {
            handler(target, i);
          }, delay);
        });
        on(target, (type === MOUSEOVER ? MOUSEOUT : MOUSELEAVE) + _namespace, function () {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        });
      });
    } else {
      targets.forEach(function (target, i) {
        on(target, type + _namespace, function () {
          handler(target, i);
        });
      });
    }

    return function () {
      targets.forEach(function (target) {
        off(target, _namespace);
      });
    };
  }
  var event = {
    on: on,
    off: off,
    once: once,
    emit: emit,
    addEventWithDelay: addEventWithDelay
  };

  utils.extend(utils, event);
  utils.WeakMap = WeakMap;

  var EventTarget = /*#__PURE__*/function () {
    function EventTarget() {
      _classCallCheck(this, EventTarget);

      this.typesHandlers = {};
    }

    _createClass(EventTarget, [{
      key: "on",
      value: function on(types, handler, priority) {
        var _this = this;

        if (typeof handler !== 'function') {
          return this;
        }

        var method = priority ? 'unshift' : 'push';
        types.split(/\s+/).forEach(function (type) {
          var handlers;

          if (!(handlers = _this.typesHandlers[type])) {
            handlers = _this.typesHandlers[type] = [];
          }

          handlers[method](handler);
        });
        return this;
      }
    }, {
      key: "once",
      value: function once(types, handler, priority) {
        var _this2 = this;

        if (typeof handler !== 'function') {
          return this;
        }

        var onceHandler = function onceHandler() {
          handler.apply(void 0, arguments);

          _this2.off(types, onceHandler);
        };

        return this.on(types, onceHandler, priority);
      }
    }, {
      key: "off",
      value: function off(types, handler) {
        var _this3 = this;

        types.split(/\s+/).forEach(function (type) {
          if (handler === void 0) {
            return delete _this3.typesHandlers[type];
          }

          var handlers = _this3.typesHandlers[type];

          if (handlers) {
            for (var i = 0, l = handlers.length; i < l; i++) {
              if (handlers[i] === handler) {
                handlers.splice(i--, 1);
              }
            }
          }
        });
        return this;
      }
    }, {
      key: "emit",
      value: function emit(types) {
        var _this4 = this;

        for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        types.split(/\s+/).forEach(function (type) {
          var handlers = _this4.typesHandlers[type];

          if (handlers) {
            for (var i = 0, l = handlers.length; i < l; i++) {
              var _handlers$i;

              (_handlers$i = handlers[i]).call.apply(_handlers$i, [_this4, _this4].concat(rest));
            }
          }
        });
      }
    }]);

    return EventTarget;
  }();

  var Module = /*#__PURE__*/function (_EventTarget) {
    _inherits(Module, _EventTarget);

    var _super = _createSuper(Module);

    function Module(el) {
      var _this;

      var passedParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaults = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck(this, Module);

      _this = _super.call(this);

      if (typeof el === 'string') {
        el = document.querySelector(el);
      }

      if (!(el instanceof Element)) {
        return _possibleConstructorReturn(_this);
      }

      _this.el = el;
      _this.initialized = false;
      _this.namespace = namespace(); // 合并默认参数和模块参数

      _this.params = extend({}, defaults);

      _this.useComponentsParams(_this.params);

      if (!_this.components) {
        _this.components = {};
      } // 处理传递参数


      Object.keys(_this.components).forEach(function (componentName) {
        var component = _this.components[componentName];

        if (!component.params) {
          return;
        }

        var componentParamsName = Object.keys(component.params)[0];
        var componentParams = component.params[componentParamsName];

        if (!isPlainObject$1(componentParams) || !passedParams.hasOwnProperty(componentParamsName) || !componentParams.hasOwnProperty('enabled')) {
          return;
        }

        var paramValue = passedParams[componentParamsName];

        if (!isPlainObject$1(paramValue)) {
          passedParams[componentParamsName] = {
            enabled: !!paramValue
          };
        } else {
          paramValue.enabled = paramValue.hasOwnProperty('enabled') ? !!paramValue.enabled : true;
        }
      }); // 合并传递参数

      extend(true, _this.params, passedParams);
      _this.passedParams = passedParams;

      _this.useComponents(); // 监听传参事件


      if (passedParams && passedParams.on) {
        Object.keys(passedParams.on).forEach(function (key) {
          _this.on(key, passedParams.on[key]);
        });
      }

      if (_this.params.init) {
        _this.init();
      }

      return _this;
    }

    _createClass(Module, [{
      key: "init",
      value: function init() {
        if (this.initialized) {
          return;
        }

        this._init();

        this.emit('init');
        this.initialized = true;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (!this.initialized) {
          return;
        }

        this._destroy();

        this.emit('destroy');
        this.initialized = false;
      }
    }, {
      key: "useComponentsParams",
      value: function useComponentsParams(instanceParams) {
        var _this2 = this;

        if (!this.components) {
          return this;
        }

        Object.keys(this.components).forEach(function (key) {
          var component = _this2.components[key];

          if (component.params) {
            extend(true, instanceParams, component.params);
          }
        });
        return this;
      }
    }, {
      key: "useComponents",
      value: function useComponents() {
        var _this3 = this;

        if (!this.components) {
          return this;
        }

        Object.keys(this.components).forEach(function (key) {
          var component = _this3.components[key];

          if (component.instance) {
            Object.keys(component.instance).forEach(function (key) {
              var value = component.instance[key];

              if (typeof value === 'function') {
                _this3[key] = value.bind(_this3);
              } else {
                _this3[key] = value;
              }
            });
          }

          if (component.on) {
            Object.keys(component.on).forEach(function (key) {
              _this3.on(key, component.on[key], true);
            });
          }

          if (component.create) {
            component.create.call(_this3, _this3);
          }
        });
        return this;
      }
    }, {
      key: "installComponent",
      value: function installComponent(component) {
        var _this4 = this;

        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        var components, name;

        if (Array.isArray(component)) {
          return component.forEach(function (m) {
            return _this4.installComponent.apply(_this4, [m].concat(params));
          });
        }

        if (!(components = this.components)) {
          components = this.components = {};
        }

        name = component.name || uuid();
        components[name] = component;

        if (component.proto) {
          Object.keys(component.proto).forEach(function (key) {
            _this4[key] = component.proto[key];
          });
        }

        if (component["static"]) {
          Object.keys(component["static"]).forEach(function (key) {
            _this4[key] = component["static"][key];
          });
        }

        if (component.install) {
          component.install.apply(this, params);
        }
      }
    }]);

    return Module;
  }(EventTarget);

  var defaults$1 = {
    wrapper: '.galaxy-wrapper',
    // 默认获取wrapper的子元素作为滑块，如果滑块同级有其他元素，可直接指定滑块
    slideList: null,
    // 滑块切换效果，可选：'fade', 'slide', 'deck'
    effect: 'fade',
    // 切换时，如果上一个动画还没有过渡完，立即完成上一次动画并开始新的动画。
    instant: true,
    // 实例化后是否立即初始化
    init: true,
    // 滑块切换持续时间，单位毫秒
    duration: 500,
    // 缓动公式
    easing: 'easeInOutQuad',
    // 默认活动滑块的下标
    activeIndex: 0,
    // 滑块切换的轴线，可选：'horizontal', 'vertical'
    direction: 'horizontal',
    // 当前活动滑块添加的类名
    activeClass: 'galaxy-slide-active'
  };

  var css$1 = vivid.css;

  var Carousel = /*#__PURE__*/function (_Module) {
    _inherits(Carousel, _Module);

    var _super = _createSuper(Carousel);

    function Carousel(el, params) {
      _classCallCheck(this, Carousel);

      return _super.call(this, el, params, defaults$1);
    }

    _createClass(Carousel, [{
      key: "_init",
      value: function _init() {
        this.wrapper = $(this.params.wrapper, this.el);
        this.slideList = this.params.slideList ? $$(this.params.slideList, this.el) : $$(this.wrapper.children);
        this.width = parseFloat(css$1(this.el, 'width'));
        this.height = parseFloat(css$1(this.el, 'height'));
        this.pages = this.slideList.length;
        this.activeIndex = Math.max(Math.min(~~this.params.activeIndex, this.pages - 1), 0); // 是否处于过渡期

        this.transitional = false;
      }
    }, {
      key: "_destroy",
      value: function _destroy() {}
    }, {
      key: "switchTo",
      value: function switchTo(index, type) {
        if (this.pages <= 1 || !this.params.instant && this.transitional) {
          return this;
        }

        index = Math.min(Math.abs(~~index), this.pages - 1);

        if (index === this.activeIndex) {
          return this;
        }

        this.switchType = type;
        this.previousActiveIndex = this.activeIndex;
        this.activeIndex = index;
        this.lastToFirst = this.activeIndex === 0 && type === 'next';
        this.firstToLast = this.activeIndex === this.pages - 1 && type === 'prev';
        this.emit('activeIndexChange');
        this.emit('switch');
        return this;
      }
    }, {
      key: "goto",
      value: function goto(index) {
        return this.switchTo(index);
      }
    }, {
      key: "gotoNext",
      value: function gotoNext() {
        return this.switchTo((this.activeIndex + 1) % this.pages, 'next');
      }
    }, {
      key: "gotoPrev",
      value: function gotoPrev() {
        return this.switchTo((this.activeIndex - 1 + this.pages) % this.pages, 'prev');
      }
    }, {
      key: "gotoFirst",
      value: function gotoFirst() {
        return this.switchTo(0);
      }
    }, {
      key: "gotoLast",
      value: function gotoLast() {
        return this.switchTo(this.pages - 1);
      }
    }]);

    return Carousel;
  }(Module);

  var css$2 = vivid.css;

  function toggleActiveClass(instance) {
    var activeClass = instance.params.activeClass;
    instance.slideList.forEach(function (slide, index) {
      if (index === instance.activeIndex) {
        addClass(slide, activeClass);
      } else {
        removeClass(slide, activeClass);
      }
    });
  }

  var core = {
    name: 'core',
    on: {
      activeIndexChange: function activeIndexChange(instance) {
        toggleActiveClass(instance);
      },
      init: function init(instance) {
        toggleActiveClass(instance);
      },
      resize: function resize(instance) {
        var width = parseFloat(css$2(instance.el, 'width'));
        var height = parseFloat(css$2(instance.el, 'height'));

        if (width !== instance.width || height !== instance.height) {
          instance.width = width;
          instance.height = height;
          instance.emit('sizeChange');
        }
      }
    }
  };

  var css$3 = vivid.css;
  var FADE = 'fade';

  var EffectFade = /*#__PURE__*/function () {
    function EffectFade(host) {
      _classCallCheck(this, EffectFade);

      this.host = host;
    }

    _createClass(EffectFade, [{
      key: "init",
      value: function init() {
        extend(this, this.host.params.effectFade);
        this.initStyle();
      }
    }, {
      key: "initStyle",
      value: function initStyle() {
        var host = this.host;

        if (css$3(host.wrapper, 'position') === 'static') {
          css$3(host.wrapper, 'position', 'relative');
        }

        host.slideList.forEach(function (el, index) {
          css$3(el, {
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
    }, {
      key: "updateStyle",
      value: function updateStyle() {
        var host = this.host;
        host.slideList.concat(host.wrapper).forEach(function (slide) {
          css$3(slide, {
            width: host.width,
            height: host.height
          });
        });
      }
    }, {
      key: "switch",
      value: function _switch() {
        var host = this.host;
        var duration = host.params.duration;
        var easing = host.params.easing;
        var fadeInDuration = this.fadeInDuration !== null ? this.fadeInDuration : duration;
        var fadeOutDuration = this.fadeOutDuration !== null ? this.fadeOutDuration : duration;
        host.slideList.forEach(function (slide) {
          return animate(slide).clearQueue().finish();
        });
        host.transitional = true;
        host.emit(TRANSITION_START);
        host.slideList.forEach(function (slide, index) {
          if (index === host.activeIndex) {
            animate(slide).fadeIn({
              duration: fadeInDuration,
              easing: easing,
              complete: function complete() {
                host.transitional = false;
                host.emit(TRANSITION_END);
              }
            });
          } else {
            animate(slide).fadeOut({
              duration: fadeOutDuration,
              easing: easing
            });
          }
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.host.slideList.forEach(function (slide) {
          animate(slide).clearQueue().finish().fadeIn({
            duration: 0
          });
        });
      }
    }]);

    return EffectFade;
  }();

  var effectFade = {
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
    create: function create(instance) {
      instance.effectFade = new EffectFade(instance);
    },
    on: {
      init: function init(instance) {
        if (instance.params.effect === FADE) {
          instance.effectFade.init();
        }
      },
      "switch": function _switch(instance) {
        if (instance.params.effect === FADE) {
          instance.effectFade["switch"]();
        }
      },
      destroy: function destroy(instance) {
        if (instance.params.effect === FADE) {
          instance.effectFade.destroy();
        }
      },
      sizeChange: function sizeChange(instance) {
        if (instance.params.effect === FADE) {
          instance.effectFade.updateStyle();
        }
      }
    }
  };

  var css$4 = vivid.css;
  var DECK = 'deck';
  var COVER = 'cover';
  var DRAW = 'draw';

  var EffectDeck = /*#__PURE__*/function () {
    function EffectDeck(host) {
      _classCallCheck(this, EffectDeck);

      this.host = host;
    }

    _createClass(EffectDeck, [{
      key: "init",
      value: function init() {
        var host = this.host;
        extend(this, host.params.effectDeck);
        this.isHorizontal = host.params.direction === HORIZONTAL;
        this.property = this.isHorizontal ? TRANSLATE_X : TRANSLATE_Y;
        this.size = this.isHorizontal ? 'width' : 'height';
        this.initStyle();
      }
    }, {
      key: "initStyle",
      value: function initStyle() {
        var host = this.host;

        if (css$4(host.wrapper, 'position') === 'static') {
          css$4(host.wrapper, 'position', 'relative');
        }

        this.originalZIndex = host.slideList.map(function (slide) {
          css$4(slide, {
            position: 'absolute',
            left: 0,
            top: 0
          });
          return [slide, css$4(slide, 'zIndex')];
        });
        this.updateZIndex(host.activeIndex);
        this.updateStyle();
      }
    }, {
      key: "updateStyle",
      value: function updateStyle() {
        var host = this.host;
        host.slideList.concat(host.wrapper).forEach(function (slide) {
          css$4(slide, {
            width: host.width,
            height: host.height
          });
        });
      }
    }, {
      key: "updateZIndex",
      value: function updateZIndex(activeIndex) {
        this.host.slideList.forEach(function (slide, index) {
          css$4(slide, 'zIndex', index === activeIndex ? 0 : -1);
        });
      }
    }, {
      key: "switch",
      value: function _switch() {
        var _this = this;

        var host = this.host;
        var activeIndex = host.activeIndex;
        var previousActiveIndex = host.previousActiveIndex;
        host.slideList.forEach(function (slide) {
          return animate(slide).clearQueue().finish();
        });
        host.transitional = true;
        var diff = activeIndex - previousActiveIndex;
        var isNext = host.switchType === 'next' || diff > 0 && host.switchType !== 'prev';
        var easing = (isNext ? this.nextEasing : this.prevEasing) || host.params.easing;
        var duration = isNext ? this.nextDuration !== null ? this.nextDuration : host.params.duration : this.prevDuration !== null ? this.prevDuration : host.params.duration;
        var preset = this.type === COVER && isNext || this.type !== COVER && !isNext;
        var currentIndex = preset ? activeIndex : previousActiveIndex;
        var relatedIndex = !preset ? activeIndex : previousActiveIndex;

        if (preset) {
          css$4(host.slideList[currentIndex], this.property, host[this.size] * (this.type === COVER ? -1 : 1));
        }

        host.slideList.forEach(function (slide, index) {
          css$4(slide, 'zIndex', index === currentIndex ? 0 : index === relatedIndex ? -1 : -2);
        });
        host.emit(TRANSITION_START);
        animate(host.slideList[currentIndex]).custom(_defineProperty({}, this.property, preset ? 0 : host[this.size] * (this.type === COVER ? -1 : 1)), {
          duration: duration,
          easing: easing,
          complete: function complete() {
            _this.updateZIndex(preset ? currentIndex : relatedIndex);

            if (!preset) {
              css$4(host.slideList[currentIndex], _this.property, 0);
            }

            host.transitional = false;
            host.emit(TRANSITION_END);
          }
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.host.slideList.forEach(function (slide) {
          return animate(slide).clearQueue().finish();
        });
        this.originalZIndex.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              slide = _ref2[0],
              zIndex = _ref2[1];

          css$4(slide, 'zIndex', zIndex);
        });
      }
    }]);

    return EffectDeck;
  }();

  var effectDeck = {
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
    create: function create(instance) {
      instance.effectDeck = new EffectDeck(instance);
    },
    on: {
      init: function init(instance) {
        if (instance.params.effect === DECK) {
          instance.effectDeck.init();
        }
      },
      "switch": function _switch(instance) {
        if (instance.params.effect === DECK) {
          instance.effectDeck["switch"]();
        }
      },
      destroy: function destroy(instance) {
        if (instance.params.effect === DECK) {
          instance.effectDeck.destroy();
        }
      },
      sizeChange: function sizeChange(instance) {
        if (instance.params.effect === DECK) {
          instance.effectDeck.updateStyle();
        }
      }
    }
  };

  var css$5 = vivid.css;
  var SLIDE = 'slide';

  var EffectSlide = /*#__PURE__*/function () {
    function EffectSlide(host) {
      _classCallCheck(this, EffectSlide);

      this.host = host;
    }

    _createClass(EffectSlide, [{
      key: "init",
      value: function init() {
        var host = this.host;
        extend(this, host.params.effectSlide);
        this.isHorizontal = host.params.direction === HORIZONTAL;
        this.property = this.isHorizontal ? TRANSLATE_X : TRANSLATE_Y;
        this.visibleSlides = Math.max(~~this.visibleSlides, 1);
        this.scrolledSlides = Math.min(Math.max(~~this.scrolledSlides, 1), this.visibleSlides);
        this.lastScrolledSlides = host.slideList.length > this.visibleSlides ? host.slideList.length % this.visibleSlides || this.scrolledSlides : 0;
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
    }, {
      key: "cloneSlide",
      value: function cloneSlide(clonedNum) {
        var _this = this;

        var host = this.host; // 把下标保存到元素属性
        // 为了使克隆和被克隆的滑块行为统一

        host.slideList.forEach(function (slide, index) {
          slide.setAttribute(_this.slideIndexAttrName, index);
        }); // 往wapper前添加克隆滑块

        for (var i = 1; i <= clonedNum; i++) {
          var clonedNode = host.slideList[host.slideList.length - i].cloneNode(true);
          this.clonedSlideList.push(clonedNode);
          addClass(clonedNode, this.clonedSlideClass);
          host.wrapper.insertBefore(clonedNode, host.wrapper.firstChild);
        } // 往wapper后添加克隆滑块


        for (var _i = 0; _i < clonedNum; _i++) {
          var _clonedNode = host.slideList[_i].cloneNode(true);

          this.clonedSlideList.push(_clonedNode);
          addClass(_clonedNode, this.clonedSlideClass);
          host.wrapper.appendChild(_clonedNode);
        }
      }
    }, {
      key: "initStyle",
      value: function initStyle() {
        if (this.isHorizontal) {
          this.allSlideList.forEach(function (slide) {
            css$5(slide, 'position', 'absolute');
          });
        }

        this.updateStyle();
      }
    }, {
      key: "updateStyle",
      value: function updateStyle() {
        var host = this.host;
        var isHorizontal = this.isHorizontal;
        var slideWidth = host.width / (isHorizontal ? this.visibleSlides : 1);
        var slideHeight = host.height / (!isHorizontal ? this.visibleSlides : 1);
        var slideSize = this.slideSize = isHorizontal ? slideWidth : slideHeight;
        this.allSlideList.forEach(function (slide, index) {
          css$5(slide, {
            top: isHorizontal ? 0 : index * slideHeight,
            left: !isHorizontal ? 0 : index * slideWidth,
            width: slideWidth,
            height: slideHeight
          });
        });
        css$5(host.wrapper, {
          width: slideWidth * (isHorizontal ? this.allSlideList.length : 1),
          height: slideHeight * (!isHorizontal ? this.allSlideList.length : 1)
        });
        css$5(host.wrapper, this.property, -slideSize * (host.activeIndex + this.clonedSlides));
      }
    }, {
      key: "getScrolledSlides",
      value: function getScrolledSlides() {
        var host = this.host;

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
    }, {
      key: "switch",
      value: function _switch() {
        var _this2 = this;

        var host = this.host;
        animate(host.wrapper).clearQueue().finish();
        host.transitional = true;
        var lastToFirst = host.lastToFirst;
        var firstToLast = host.firstToLast;
        host.emit(TRANSITION_START);
        animate(host.wrapper).custom(_defineProperty({}, this.property, -this.slideSize * this.getScrolledSlides()), {
          duration: host.params.duration,
          easing: host.params.easing,
          complete: function complete() {
            if (_this2.loop) {
              if (lastToFirst) {
                css$5(host.wrapper, _this2.property, -_this2.slideSize * _this2.clonedSlides);
              } else if (firstToLast) {
                css$5(host.wrapper, _this2.property, -_this2.slideSize * (host.slideList.length + _this2.clonedSlides - _this2.lastScrolledSlides));
              }
            }

            host.transitional = false;
            host.emit(TRANSITION_END);
          }
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var host = this.host;
        animate(host.wrapper).clearQueue().finish();

        if (this.clonedSlideList.length) {
          this.clonedSlideList.forEach(function (slide) {
            return slide.parentNode.removeChild(slide);
          });
        }

        css$5(host.wrapper, this.property, 0);
      }
    }]);

    return EffectSlide;
  }();

  var effectSlide = {
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
        clonedSlideClass: GALAXY_CLONED_SLIDE
      }
    },
    create: function create(instance) {
      instance.effectSlide = new EffectSlide(instance);
    },
    on: {
      init: function init(instance) {
        if (instance.params.effect === SLIDE) {
          instance.effectSlide.init();
        }
      },
      "switch": function _switch(instance) {
        if (instance.params.effect === SLIDE) {
          instance.effectSlide["switch"]();
        }
      },
      destroy: function destroy(instance) {
        if (instance.params.effect === SLIDE) {
          instance.effectSlide.destroy();
        }
      },
      sizeChange: function sizeChange(instance) {
        if (instance.params.effect === SLIDE) {
          instance.effectSlide.updateStyle();
        }
      }
    }
  };

  var css$6 = vivid.css,
      stagger$1 = vivid.stagger;
  var STACK = 'stack';
  var SWITCH_BY_CLONED_SLIDE = 'switchByClonedSlide';

  var EffectStack = /*#__PURE__*/function () {
    function EffectStack(host) {
      _classCallCheck(this, EffectStack);

      this.host = host;
    }

    _createClass(EffectStack, [{
      key: "init",
      value: function init() {
        var _this = this;

        var host = this.host;
        extend(this, host.params.effectStack);
        var isHorizontal = this.isHorizontal = host.params.direction === HORIZONTAL;
        var focusWidth = this.focusWidth = this.focusWidth === null ? parseFloat(css$6(host.slideList[host.activeIndex], 'width')) : this.focusWidth;
        var focusHeight = this.focusHeight = this.focusHeight === null ? parseFloat(css$6(host.slideList[host.activeIndex], 'height')) : this.focusHeight;
        this.mainAxisFocusSize = isHorizontal ? focusWidth : focusHeight;
        this.crossAxisFocusSize = isHorizontal ? focusHeight : focusWidth;
        this.mainAxisSize = isHorizontal ? 'width' : 'height';
        this.crossAxisSize = isHorizontal ? 'height' : 'width';
        this.mainAxisPos = isHorizontal ? 'left' : 'top';
        this.crossAxisPos = isHorizontal ? 'top' : 'left';
        this.layer = Math.max(~~this.layer, 2);
        this.teamNum = this.layer * 2 + 1;
        this.clonedSlideList = [];

        if (host.slideList.length < this.teamNum - 2) {
          this.loop = false;
        }

        if (this.loop) {
          this.loopedSlides = this.layer * 2 - 2;
          this.cloneSlide(this.loopedSlides);
          host.allSlideList = $$(host.wrapper.children);
        } else {
          this.loopedSlides = 0;
          host.allSlideList = host.slideList.slice();
        }

        if (this.switchBySlide) {
          this.offEvent = addEventWithDelay(host.allSlideList, this.triggerType, function (slide, index) {
            if (!host.transitional) {
              var switchType;
              var i = index;

              if (_this.loop) {
                i = slide.getAttribute(_this.slideIndexAttrName);
              }

              if (matchesSelector(slide, '.' + _this.clonedSlideClass)) {
                _this.clonedSlideIndex = index;
                switchType = SWITCH_BY_CLONED_SLIDE;
              }

              host.switchTo(i, switchType);
            }
          }, this.triggerDelay);
        }

        this.initStyle();
      }
    }, {
      key: "cloneSlide",
      value: function cloneSlide(clonedNum) {
        var _this2 = this;

        var host = this.host; // 把下标保存到元素属性
        // 为了使克隆和被克隆的滑块行为统一

        host.slideList.forEach(function (slide, index) {
          slide.setAttribute(_this2.slideIndexAttrName, index);
        }); // 往wapper前添加克隆滑块

        for (var i = 1; i <= clonedNum; i++) {
          var clonedNode = host.slideList[host.slideList.length - i].cloneNode(true);
          this.clonedSlideList.push(clonedNode);
          addClass(clonedNode, this.clonedSlideClass);
          host.wrapper.insertBefore(clonedNode, host.wrapper.firstChild);
        } // 往wapper后添加克隆滑块


        for (var _i = 0; _i < clonedNum; _i++) {
          var _clonedNode = host.slideList[_i].cloneNode(true);

          this.clonedSlideList.push(_clonedNode);
          addClass(_clonedNode, this.clonedSlideClass);
          host.wrapper.appendChild(_clonedNode);
        }
      }
    }, {
      key: "initStyle",
      value: function initStyle() {
        var host = this.host;

        if (css$6(host.wrapper, 'position') === 'static') {
          css$6(host.wrapper, 'position', 'relative');
        }

        css$6(host.wrapper, 'overflow', 'hidden');
        host.allSlideList.forEach(function (el) {
          css$6(el, 'position', 'absolute');
        });
        this.originalZIndex = host.slideList.map(function (slide) {
          return [slide, css$6(slide, 'zIndex')];
        });
        this.updateStyle();
      }
    }, {
      key: "getFocusIndex",
      value: function getFocusIndex() {
        var host = this.host;
        var loopedSlides = this.loopedSlides;

        if (this.loop && host.lastToFirst) {
          return loopedSlides + host.slideList.length;
        }

        if (this.loop && host.firstToLast) {
          return loopedSlides - 1;
        }

        if (this.loop && host.switchType === SWITCH_BY_CLONED_SLIDE) {
          return this.clonedSlideIndex;
        }

        return loopedSlides + host.activeIndex;
      }
    }, {
      key: "getOffset",
      value: function getOffset(focusIndex, index) {
        return Math.min(Math.max((this.teamNum - 1) / 2 - (focusIndex - index), 0), this.teamNum - 1);
      }
    }, {
      key: "getOffsetRelAllSlideList",
      value: function getOffsetRelAllSlideList(index) {
        return this.getOffset(this.getFocusIndex(), index);
      }
    }, {
      key: "getOffsetRelSlideList",
      value: function getOffsetRelSlideList(index) {
        return this.getOffset(this.host.activeIndex + this.loopedSlides, index);
      }
    }, {
      key: "setZIndex",
      value: function setZIndex(slide, index, slideList, before) {
        var focusIndex = before ? this.getFocusIndex() : this.host.activeIndex + this.loopedSlides;
        css$6(slide, 'zIndex', slideList.length - Math.abs(focusIndex - index));
      }
    }, {
      key: "updateStyle",
      value: function updateStyle() {
        var _this3 = this;

        var host = this.host;
        var mainAxisWrapperSize = Math.max(host[this.mainAxisSize], this.mainAxisFocusSize);

        if (!this.isHorizontal) {
          this.crossAxisFocusSize = host.width;
        }

        css$6(host.wrapper, {
          width: host.width,
          height: this.isHorizontal ? this.focusHeight : host.height
        });
        var teamStyle = [];
        var sizeStagger = stagger$1(this.scale, {
          start: 1,
          from: 'center',
          easing: this.scaleEasing
        });

        for (var i = 0; i < this.teamNum; i++) {
          var _teamStyle$push;

          var scale = Math.max(sizeStagger(i, this.teamNum), 0);
          var mainAxisFocusSize = this.mainAxisFocusSize * scale;
          var crossAxisFocusSize = this.crossAxisFocusSize * scale;
          var crossAxisPos = this.align === 'start' ? 0 : this.align === 'end' ? this.crossAxisFocusSize - crossAxisFocusSize : (this.crossAxisFocusSize - crossAxisFocusSize) / 2;
          teamStyle.push((_teamStyle$push = {}, _defineProperty(_teamStyle$push, this.mainAxisSize, mainAxisFocusSize), _defineProperty(_teamStyle$push, this.crossAxisSize, crossAxisFocusSize), _defineProperty(_teamStyle$push, this.crossAxisPos, crossAxisPos), _teamStyle$push));
        }

        var styles = teamStyle.slice(1, this.layer);
        var gap = ((mainAxisWrapperSize - this.mainAxisFocusSize) / 2 - styles.reduce(function (total, style) {
          return total + style[_this3.mainAxisSize];
        }, 0)) / styles.length;
        var incrWidth = 0;
        teamStyle.forEach(function (style, i, arr) {
          var mainAxisSize = style[_this3.mainAxisSize];
          style[_this3.mainAxisPos] = i === 0 ? -mainAxisSize : i === arr.length - 1 ? mainAxisWrapperSize : i <= _this3.layer ? incrWidth : mainAxisWrapperSize - teamStyle[arr.length - 1 - i][_this3.mainAxisPos] - mainAxisSize;

          if (i > 0) {
            incrWidth += mainAxisSize + gap;
          }
        });
        this.teamStyle = teamStyle;
        host.allSlideList.forEach(function (slide, i, slideList) {
          _this3.setZIndex(slide, i, slideList, _this3.changeZIndex === 'before' && host.transitional ? true : false);

          var offset = host.transitional ? _this3.getOffsetRelAllSlideList(i) : _this3.getOffsetRelSlideList(i);
          slide.setAttribute(_this3.visibleSlideDataName, offset);
          css$6(slide, teamStyle[offset]);
        });
      }
    }, {
      key: "switch",
      value: function _switch() {
        var _this4 = this;

        var host = this.host;
        host.allSlideList.forEach(function (slide) {
          return animate(slide).clearQueue().finish();
        });
        host.transitional = true;
        var lastToFirst = host.lastToFirst;
        var firstToLast = host.firstToLast;
        var switchByClonedSlide = host.switchType === SWITCH_BY_CLONED_SLIDE;
        host.emit(TRANSITION_START);
        host.allSlideList.forEach(function (slide, i, slideList) {
          var offset = _this4.getOffsetRelAllSlideList(i);

          var completeOffset = _this4.getOffsetRelSlideList(i);

          if (_this4.changeZIndex === 'before') {
            _this4.setZIndex(slide, i, slideList, true);
          }

          slide.setAttribute(_this4.visibleSlideDataName, offset);
          animate(slide).custom(_this4.teamStyle[offset], {
            duration: host.params.duration,
            easing: host.params.easing,
            complete: function complete() {
              _this4.setZIndex(slide, i, slideList);

              if (_this4.loop && (lastToFirst || firstToLast || switchByClonedSlide)) {
                css$6(slide, _this4.teamStyle[completeOffset]);
              }

              host.transitional = false;
              host.emit(TRANSITION_END);
            }
          });
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this5 = this;

        var host = this.host;
        host.allSlideList.forEach(function (slide) {
          return animate(slide).clearQueue().finish();
        });

        if (this.offEvent) {
          this.offEvent();
        }

        if (this.clonedSlideList.length) {
          this.clonedSlideList.forEach(function (slide) {
            return slide.parentNode.removeChild(slide);
          });
        }

        this.originalZIndex.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              slide = _ref2[0],
              zIndex = _ref2[1];

          css$6(slide, {
            width: _this5.focusWidth,
            height: _this5.focusHeight,
            zIndex: zIndex
          });
        });
      }
    }]);

    return EffectStack;
  }();

  var effectStack = {
    name: 'effectStack',
    params: {
      effectStack: {
        loop: true,
        // 是否循环，当总滑块数小于可视滑块数时，强制不循环
        layer: 2,
        // 堆叠的层数，最少两层
        scale: -.12,
        // 逐层缩小比率
        scaleEasing: 'linear',
        changeZIndex: 'after',
        // 在动画开始之前或动画结束之后改变层级，可选: 'before', 'after'
        focusWidth: null,
        // 焦点滑块的宽度
        focusHeight: null,
        // 焦点滑块的高度
        align: 'center',
        // 层的对齐方式，可选：'start', 'center', 'end'
        visibleSlideIndexAttrName: 'data-visible-slide-index',
        // 可见滑块
        // 滑块下标值对应的元素属性名，用于loop模式下
        slideIndexAttrName: DATA_GALAXY_SLIDE_INDEX,
        clonedSlideClass: GALAXY_CLONED_SLIDE,
        // 是否可通过操作滑块进行切换
        switchBySlide: true,
        // 通过操作滑块进行切换的事件类型
        triggerType: 'click',
        triggerDelay: 150
      }
    },
    create: function create(instance) {
      instance.effectStack = new EffectStack(instance);
    },
    on: {
      init: function init(instance) {
        if (instance.params.effect === STACK) {
          instance.effectStack.init();
        }
      },
      "switch": function _switch(instance) {
        if (instance.params.effect === STACK) {
          instance.effectStack["switch"]();
        }
      },
      destroy: function destroy(instance) {
        if (instance.params.effect === STACK) {
          instance.effectStack.destroy();
        }
      },
      sizeChange: function sizeChange(instance) {
        if (instance.params.effect === STACK) {
          instance.effectStack.updateStyle();
        }
      }
    }
  };

  var Resize = function Resize(host) {
    _classCallCheck(this, Resize);

    this.resizeHandler = function () {
      host.emit('resize');
    };
  };

  var resize = {
    name: 'resize',
    params: {
      resize: false
    },
    create: function create() {
      this.resize = new Resize(this);
    },
    on: {
      init: function init() {
        if (this.params.resize) {
          window.addEventListener('resize', this.resize.resizeHandler);
        }
      },
      destroy: function destroy() {
        if (this.params.resize) {
          window.removeEventListener('resize', this.resize.resizeHandler);
        }
      }
    }
  };

  var Bullets = {
    initItems: function initItems() {
      var _this = this;

      if (this.autoPaging) {
        this.el.innerHTML = Array.apply(null, {
          length: this.host.pages
        }).reduce(function (total, index) {
          return total + _this.renderBullets(index, _this.bulletClass);
        }, '');
        this.bulletList = $$(this.el.children);
      } else {
        this.bulletList = $$(this.bulletEl, this.el);
      }

      this.updateItems();

      if (this.triggerType) {
        this.offEvent = addEventWithDelay(this.bulletList, this.triggerType, function (bullet, index) {
          _this.trigger(index);
        }, this.triggerDelay);
      }
    },
    updateItems: function updateItems() {
      var _this2 = this;

      this.bulletList.forEach(function (bullet, index) {
        (index === _this2.host.activeIndex ? addClass : removeClass)(bullet, _this2.bulletActiveClass);
      });
    },
    destroyItems: function destroyItems() {
      if (this.offEvent) {
        this.offEvent();
      }

      if (this.autoPaging) {
        this.el.innerHTML = '';
      }
    }
  };
  var Fraction = {
    initItems: function initItems() {
      this.el.innerHTML = this.renderFraction(this.currentClass, this.totalClass);
      this.fractionCurrentEl = $('.' + this.currentClass, this.el);
      this.fractionTotalEl = $('.' + this.totalClass, this.el);
      this.updateItems();
    },
    updateItems: function updateItems() {
      var host = this.host;
      this.fractionCurrentEl.innerHTML = host.activeIndex + 1;
      this.fractionTotalEl.innerHTML = host.pages;
    },
    destroyItems: function destroyItems() {
      this.el.innerHTML = '';
    }
  };
  var Custom = {
    initItems: function initItems() {
      this.update();
    },
    updateItems: function updateItems() {
      var host = this.host;
      this.el.innerHTML = this.renderCustom(host, host.activeIndex + 1, host.pages);
    },
    destroyItems: function destroyItems() {
      this.el.innerHTML = '';
    }
  };

  var Pagination = /*#__PURE__*/function () {
    function Pagination(host) {
      _classCallCheck(this, Pagination);

      this.host = host;
    }

    _createClass(Pagination, [{
      key: "init",
      value: function init() {
        var host = this.host;
        extend(this, host.params.pagination);

        if (!this.el) {
          return;
        }

        this.el = $(this.el, host.el) || $(this.el);
        extend(this, Pagination.types[this.type]);

        if (this.el) {
          this.initItems();
        }
      }
    }, {
      key: "trigger",
      value: function trigger(index) {
        this.host.switchTo(index);
      }
    }, {
      key: "update",
      value: function update() {
        if (this.el) {
          this.updateItems();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.el) {
          this.destroyItems();
        }
      }
    }]);

    return Pagination;
  }();

  Pagination.types = {
    bullets: Bullets,
    fraction: Fraction,
    custom: Custom
  };
  var pagination = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        // 分页类型，可选：'bullets', 'fraction', 'custom'。
        type: 'bullets',
        // bullets触发滑块切换的事件类型，可选：'click', 'mouseover', 'mouseenter', 'mousedown', 'mouseup' 等鼠标事件；
        // 也可传入false来不让bullets控制切换滑块
        triggerType: 'click',
        // 触发延迟，当triggerType为'mouseover'或'mouseenter'时，为防止误触发，鼠标移上一定时间内才触发事件来切换滑块。
        triggerDelay: 150,
        // 是否自动分页，如果基于现有的DOM作为分页项，可设为false，并使用el选项指定分页项。
        autoPaging: true,
        // 用于非自动分页指定bullets元素
        bulletEl: null,
        renderBullets: function renderBullets(index, bulletClass) {
          return "<span class=\"".concat(bulletClass, "\"></span>");
        },
        renderFraction: function renderFraction(currentClass, totalClass) {
          return "<span class=\"".concat(currentClass, "\"></span> / <span class=\"").concat(totalClass, "\"></span>");
        },
        renderCustom: function renderCustom(host, current, total) {
          return current + ' / ' + total;
        },
        // 命名空间
        bulletClass: 'galaxy-pagination-bullet',
        bulletActiveClass: 'galaxy-pagination-bullet-active',
        currentClass: 'galaxy-pagination-current',
        totalClass: 'galaxy-pagination-total'
      }
    },
    create: function create(instance) {
      instance.pagination = new Pagination(instance);
    },
    on: {
      init: function init(instance) {
        instance.pagination.init();
      },
      activeIndexChange: function activeIndexChange(instance) {
        instance.pagination.update();
      },
      destroy: function destroy(instance) {
        instance.pagination.destroy();
      }
    }
  };

  var Navigation = /*#__PURE__*/function () {
    function Navigation(host) {
      _classCallCheck(this, Navigation);

      this.host = host;
    }

    _createClass(Navigation, [{
      key: "init",
      value: function init() {
        var _this = this;

        var host = this.host;
        extend(this, host.params.navigation);
        this.prevEl = $(this.prevEl, host.el) || $(this.prevEl);
        this.nextEl = $(this.nextEl, host.el) || $(this.nextEl);
        this.toggleClasses();

        this.prevHandler = function () {
          if (!_this.disabledIfEdge || host.activeIndex !== 0) {
            host.gotoPrev();
          }
        };

        this.nextHandler = function () {
          if (!_this.disabledIfEdge || host.activeIndex !== host.slideList.length - 1) {
            host.gotoNext();
          }
        };

        if (this.prevEl) {
          this.offPrevElEvent = addEventWithDelay(this.prevEl, this.triggerType, function () {
            _this.prevHandler();
          }, this.triggerDelay);
        }

        if (this.nextEl) {
          this.offNextElEvent = addEventWithDelay(this.nextEl, this.triggerType, function () {
            _this.nextHandler();
          }, this.triggerDelay);
        }
      }
    }, {
      key: "toggleClasses",
      value: function toggleClasses() {
        var host = this.host;

        if (!this.disabledIfEdge) {
          return;
        }

        if (this.prevEl) {
          (host.activeIndex === 0 ? addClass : removeClass)(this.prevEl, this.disabledClass);
        }

        if (this.nextEl) {
          (host.activeIndex === host.slideList.length - 1 ? addClass : removeClass)(this.nextEl, this.disabledClass);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.offPrevElEvent) {
          this.offPrevElEvent();
        }

        if (this.offNextElEvent) {
          this.offNextElEvent();
        }
      }
    }]);

    return Navigation;
  }();

  var navigation = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,
        // 按钮触发滑块切换的事件类型，可选：'click', 'mousedown', 'mouseup'等鼠标事件。
        triggerType: 'click',
        triggerDelay: 150,
        disabledIfEdge: false,
        // 到达边缘是否禁止切换
        disabledClass: 'galaxy-button-disabled' // disabledIfEdge为true情况下，到达边缘时添加的类名。

      }
    },
    create: function create(instance) {
      instance.navigation = new Navigation(instance);
    },
    on: {
      init: function init(instance) {
        instance.navigation.init();
      },
      activeIndexChange: function activeIndexChange(instance) {
        instance.navigation.toggleClasses();
      },
      destroy: function destroy(instance) {
        instance.navigation.destroy();
      }
    }
  };

  var Autoplay = /*#__PURE__*/function () {
    function Autoplay(host) {
      _classCallCheck(this, Autoplay);

      this.host = host;
      this.timer = null;
      this.running = false;
      this.duration = 0;
      this.mouseleave = true;
      this._namespace = namespace();
    }

    _createClass(Autoplay, [{
      key: "play",
      value: function play() {
        var _this = this;

        if (this.running || !this.mouseleave) {
          return;
        }

        this.running = true;
        this.timer = setInterval(function () {
          _this.duration += _this.interval;

          if (_this.duration >= _this.delay) {
            _this.duration = _this.delay;
          }

          if (_this.progress) {
            _this.progress(_this.duration / _this.delay);
          }

          if (_this.duration === _this.delay) {
            _this.stop();

            _this.host.gotoNext();
          }
        }, this.interval);
      }
    }, {
      key: "pause",
      value: function pause() {
        if (!this.running) {
          return;
        }

        this.running = false;

        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        this.pause();
        this.duration = 0;
      }
    }, {
      key: "init",
      value: function init() {
        var _this2 = this;

        var host = this.host;
        extend(this, host.params.autoplay);

        if (!this.enabled) {
          return;
        }

        this.play();

        if (this.hoverPause) {
          this.enterHandler = function () {
            _this2.mouseleave = false;

            _this2.pause();
          };

          this.leaveHandler = function () {
            _this2.mouseleave = true;

            _this2.play();
          };

          on(host.el, MOUSEENTER + this._namespace, this.enterHandler);
          on(host.el, MOUSELEAVE + this._namespace, this.leaveHandler);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var host = this.host;

        if (!this.enabled) {
          return;
        }

        this.stop();

        if (this.hoverPause) {
          off(host.el, this._namespace);
        }
      }
    }]);

    return Autoplay;
  }();

  var autoplay = {
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
    create: function create(instance) {
      instance.autoplay = new Autoplay(instance);
    },
    on: {
      init: function init(instance) {
        instance.autoplay.init();
      },
      destroy: function destroy(instance) {
        instance.autoplay.destroy();
      },
      transitionEnd: function transitionEnd(instance) {
        if (instance.params.autoplay.enabled) {
          instance.autoplay.play();
        }
      }
    }
  };

  Carousel.prototype.installComponent([core, effectFade, effectDeck, effectSlide, effectStack, resize, pagination, navigation, autoplay]);

  var defaults$2 = {
    init: true,
    // 实例化后是否立即初始化
    interval: 20,
    // 每一次位移的时间间隔
    downInterval: 5,
    // 鼠标按下时的interval值
    offset: 1,
    // wrapper每一次位移的偏移量，单位px
    downOffset: null,
    // 鼠标按下时的offset值，如果不设置，默认等同于offset
    direction: 'vertical',
    // 运动方向
    translate: 0,
    // 初始化时的位移,
    hoverPause: true // 鼠标移上去是否停止

  };

  var css$7 = vivid.css;

  var Marquee = /*#__PURE__*/function (_Module) {
    _inherits(Marquee, _Module);

    var _super = _createSuper(Marquee);

    function Marquee(el, params) {
      _classCallCheck(this, Marquee);

      return _super.call(this, el, params, defaults$2);
    }

    _createClass(Marquee, [{
      key: "_init",
      value: function _init() {
        var params = this.params;
        this.wrapper = $(params.wrapper, this.el);
        this.slideList = params.slideList ? $$(params.slideList, this.el) : $$(this.wrapper.children);
        this.translate = params.translate;
        this.interval = params.interval;
        this.offset = params.offset;
        this.reverse = false;
        this.isHorizontal = params.direction === HORIZONTAL;
        this.property = this.isHorizontal ? TRANSLATE_X : TRANSLATE_Y;
        this.clonedSlideList = [];
        this.cloneNodes();

        if (this.isHorizontal) {
          this.slideList.concat(this.clonedSlideList).forEach(function (slide) {
            css$7(slide, 'float', 'left');
          });
          css$7(this.wrapper, {
            width: this.getWrapperWidth() * 2,
            overflow: 'hidden'
          });
          this.wrapperSize = this.wrapper.offsetWidth / 2;
        } else {
          this.wrapperSize = this.wrapper.offsetHeight / 2;
        }
      }
    }, {
      key: "getWrapperWidth",
      value: function getWrapperWidth() {
        var _this = this;

        return this.slideList.reduce(function (total, el) {
          return total + _this.getWideWidth(el);
        }, 0);
      }
    }, {
      key: "getWideWidth",
      value: function getWideWidth(elem) {
        return elem.offsetWidth + parseFloat(css$7(elem, 'marginLeft')) + parseFloat(css$7(elem, 'marginRight'));
      }
    }, {
      key: "cloneNodes",
      value: function cloneNodes() {
        var _this2 = this;

        var docFrag = document.createDocumentFragment();
        this.slideList.forEach(function (el) {
          var clonedNode = el.cloneNode(true);
          docFrag.appendChild(clonedNode);

          _this2.clonedSlideList.push(clonedNode);
        });
        this.wrapper.appendChild(docFrag);
      }
    }, {
      key: "prevTick",
      value: function prevTick() {
        var translate = this.translate - this.offset;

        if (translate < 0) {
          translate = this.wrapperSize;
        }

        this.translateTo(translate);
      }
    }, {
      key: "nextTick",
      value: function nextTick() {
        var translate = this.translate + this.offset;

        if (translate > this.wrapperSize) {
          translate = 0;
        }

        this.translateTo(translate);
      }
    }, {
      key: "tick",
      value: function tick() {
        if (this.reverse) {
          this.prevTick();
        } else {
          this.nextTick();
        }
      }
    }, {
      key: "translateTo",
      value: function translateTo(value) {
        this.translate = Math.min(Math.max(0, value), this.wrapperSize);
        css$7(this.wrapper, this.property, -this.translate);
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        if (this.clonedSlideList.length) {
          this.clonedSlideList.forEach(function (slide) {
            return slide.parentNode.removeChild(slide);
          });
        }
      }
    }]);

    return Marquee;
  }(Module);

  var Autoplay$1 = /*#__PURE__*/function () {
    function Autoplay(host) {
      _classCallCheck(this, Autoplay);

      this.host = host;
      this.timer = null;
      this.running = false;
      this.duration = 0;
      this.namespace = namespace();
    }

    _createClass(Autoplay, [{
      key: "play",
      value: function play() {
        var host = this.host;

        if (this.running) {
          return;
        }

        this.running = true;
        this.timer = setInterval(function () {
          host.tick();
        }, host.interval);
      }
    }, {
      key: "pause",
      value: function pause() {
        if (!this.running) {
          return;
        }

        this.running = false;

        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    }, {
      key: "init",
      value: function init() {
        var _this = this;

        var host = this.host;

        if (host.params.hoverPause) {
          on(host.wrapper, MOUSEENTER + this.namespace, function () {
            return _this.pause();
          });
          on(host.wrapper, MOUSELEAVE + this.namespace, function () {
            return _this.play();
          });
        }

        this.play();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var host = this.host;
        this.pause();

        if (host.params.hoverPause) {
          off(host.el, this.namespace);
        }
      }
    }]);

    return Autoplay;
  }();

  var autoplay$1 = {
    name: 'autoplay',
    create: function create(instance) {
      instance.autoplay = new Autoplay$1(instance);
    },
    on: {
      init: function init(instance) {
        instance.autoplay.init();
      },
      destroy: function destroy(instance) {
        instance.autoplay.destroy();
      }
    }
  };

  var Navigation$1 = /*#__PURE__*/function () {
    function Navigation(host) {
      _classCallCheck(this, Navigation);

      this.host = host;
      this.namespace = namespace();
    }

    _createClass(Navigation, [{
      key: "init",
      value: function init() {
        var _this = this;

        var host = this.host;
        extend(this, host.params.navigation);
        this.prevEl = $(this.prevEl, host.el) || $(this.prevEl);
        this.nextEl = $(this.nextEl, host.el) || $(this.nextEl);

        var downHandler = function downHandler(event) {
          event.preventDefault();
          _this.down = true;
          addClass(event.currentTarget, _this.downClass);
          host.autoplay.pause();
          host.interval = host.params.downInterval;
          host.offset = host.params.downOffset === null ? host.params.offset : host.params.downOffset;
          host.autoplay.play();
        };

        if (this.prevEl) {
          on(this.prevEl, 'mousedown' + this.namespace, function (event) {
            host.reverse = true;
            downHandler(event);
          });
        }

        if (this.nextEl) {
          on(this.nextEl, 'mousedown' + this.namespace, function (event) {
            host.reverse = false;
            downHandler(event);
          });
        }

        if (this.prevEl || this.nextEl) {
          on(document, 'mouseup' + this.namespace, function () {
            if (_this.down) {
              _this.down = false;
              removeClass(_this.prevEl, _this.downClass);
              removeClass(_this.nextEl, _this.downClass);
              host.autoplay.pause();
              host.interval = host.params.interval;
              host.offset = host.params.offset;
              host.autoplay.play();
            }
          });
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.prevEl) {
          off(this.prevEl, this.namespace);
        }

        if (this.nextEl) {
          off(this.nextEl, this.namespace);
        }
      }
    }]);

    return Navigation;
  }();

  var navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,
        downClass: 'galaxy-button-down'
      }
    },
    create: function create(instance) {
      instance.navigation = new Navigation$1(instance);
    },
    on: {
      init: function init(instance) {
        instance.navigation.init();
      },
      destroy: function destroy(instance) {
        instance.navigation.destroy();
      }
    }
  };

  Marquee.prototype.installComponent([autoplay$1, navigation$1]);

  var defaults$3 = {
    init: true,
    // 实例化后是否立即初始化
    labels: null,
    // 手风琴控制元件
    panels: null,
    // 手风琴面板元素
    multiple: false,
    // 是否可以打开多个
    atLeastOne: true,
    // 当multiple为false时使用，至少要有一个显示，默认显示下标为activeIndex的panel
    instant: true,
    // 切换时，如果上一个动画还没有过渡完，立即完成上一次动画并开始新的动画。
    triggerType: 'click',
    // labels触发事件的类型：可选'click', 'mouseenter'
    triggerDelay: 150,
    // 当triggerType为'mouseenter'时，为避免无意间滑动鼠标导致展开折叠
    duration: 300,
    // 滑块切换持续时间，单位毫秒
    easing: 'easeInOutQuad',
    // 缓动公式
    activeIndex: 0,
    // 默认活动滑块的下标
    direction: 'vertical',
    // 滑块切换的轴线，可选：'horizontal', 'vertical'
    labelActiveClass: 'galaxy-label-active',
    panelActiveClass: 'galaxy-panel-active'
  };

  var Accordion = /*#__PURE__*/function (_Module) {
    _inherits(Accordion, _Module);

    var _super = _createSuper(Accordion);

    function Accordion(el, params) {
      _classCallCheck(this, Accordion);

      return _super.call(this, el, params, defaults$3);
    }

    _createClass(Accordion, [{
      key: "_init",
      value: function _init() {
        var _this = this;

        var params = this.params;
        this.labels = $$(params.labels, this.el);
        this.panels = $$(params.panels, this.el);
        this.activeIndex = params.activeIndex;
        this.isHorizontal = params.direction === HORIZONTAL;
        this.timer = null; // 是否处于过渡期

        this.transitional = [];
        var triggerType = params.triggerType;
        this.panels.forEach(function (panel, index) {
          if (_this.activeIndex === index) {
            addClass(panel, params.panelActiveClass);
            addClass(_this.labels[index], params.labelActiveClass);
            animate(panel).fadeIn({
              duration: 0
            });
          } else {
            removeClass(panel, params.panelActiveClass);
            removeClass(_this.labels[index], params.labelActiveClass);
            animate(panel).fadeOut({
              duration: 0
            });
          }
        });

        if (triggerType === MOUSEOVER || triggerType === MOUSEENTER) {
          this.labels.forEach(function (label, index) {
            on(label, triggerType + _this.namespace, function () {
              _this.timer = setTimeout(function () {
                _this.trigger(index);
              }, params.triggerDelay);
            });
            on(label, (triggerType === MOUSEOVER ? MOUSEOUT : MOUSELEAVE) + _this.namespace, function () {
              if (_this.timer) {
                clearTimeout(_this.timer);
                _this.timer = null;
              }
            });
          });
        } else {
          this.labels.forEach(function (label, index) {
            on(label, params.triggerType + _this.namespace, function () {
              _this.trigger(index);
            });
          });
        }
      }
    }, {
      key: "trigger",
      value: function trigger(index) {
        var params = this.params;

        if (!params.instant && this.transitional.some(function (item) {
          return item;
        })) {
          return;
        }

        if (params.multiple) {
          this.toggle(index);
        } else {
          if (params.atLeastOne) {
            this.onlyShow(index);
          } else {
            this.hideOthersAndToggle(index);
          }
        }
      }
    }, {
      key: "show",
      value: function show(index) {
        var _this2 = this;

        var params = this.params;
        var activeLabel = this.labels[index];
        var activePanel = this.panels[index];

        if (activeLabel && activePanel && !hasClass(activePanel, params.panelActiveClass)) {
          addClass(activeLabel, params.labelActiveClass);
          addClass(activePanel, params.panelActiveClass);
          animate(activePanel).clearQueue().finish();
          this.transitional[index] = true;
          animate(activePanel)[this.isHorizontal ? 'slideRight' : 'slideDown']({
            duration: params.duration,
            easing: params.easing,
            complete: function complete() {
              _this2.transitional[index] = false;
            }
          });
        }

        return this;
      }
    }, {
      key: "hide",
      value: function hide(index) {
        var _this3 = this;

        var params = this.params;
        var activeLabel = this.labels[index];
        var activePanel = this.panels[index];

        if (activeLabel && activePanel && hasClass(activePanel, params.panelActiveClass)) {
          removeClass(activeLabel, params.labelActiveClass);
          removeClass(activePanel, params.panelActiveClass);
          animate(activePanel).clearQueue().finish();
          this.transitional[index] = true;
          animate(activePanel)[this.isHorizontal ? 'slideLeft' : 'slideUp']({
            duration: params.duration,
            easing: params.easing,
            complete: function complete() {
              _this3.transitional[index] = false;
            }
          });
        }

        return this;
      }
    }, {
      key: "toggle",
      value: function toggle(index) {
        var activePanel = this.panels[index];

        if (activePanel) {
          if (hasClass(activePanel, this.params.panelActiveClass)) {
            this.hide(index);
          } else {
            this.show(index);
          }

          return this;
        }
      }
    }, {
      key: "showAll",
      value: function showAll() {
        var _this4 = this;

        this.panels.forEach(function (panel, index) {
          _this4.show(index);
        });
        return this;
      }
    }, {
      key: "hideAll",
      value: function hideAll() {
        var _this5 = this;

        this.panels.forEach(function (panel, index) {
          _this5.hide(index);
        });
        return this;
      }
    }, {
      key: "onlyShow",
      value: function onlyShow(index) {
        var _this6 = this;

        this.panels.forEach(function (panel, i) {
          if (i === index) {
            _this6.show(i);
          } else {
            _this6.hide(i);
          }
        });
        return this;
      }
    }, {
      key: "onlyHide",
      value: function onlyHide(index) {
        var _this7 = this;

        this.panels.forEach(function (panel, i) {
          if (i !== index) {
            _this7.show(i);
          } else {
            _this7.hide(i);
          }
        });
        return this;
      }
    }, {
      key: "hideOthersAndToggle",
      value: function hideOthersAndToggle(index) {
        var _this8 = this;

        this.panels.forEach(function (panel, i) {
          if (i === index) {
            _this8.toggle(i);
          } else {
            _this8.hide(i);
          }
        });
        return this;
      }
    }, {
      key: "showOthersAndToggle",
      value: function showOthersAndToggle(index) {
        var _this9 = this;

        this.panels.forEach(function (panel, i) {
          if (i === index) {
            _this9.toggle(i);
          } else {
            _this9.show(i);
          }
        });
        return this;
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        var _this10 = this;

        this.labels.forEach(function (label) {
          off(label, _this10.namespace);
        });
        this.panels.forEach(function (panel, index) {
          animate(panel).clearQueue().finish();
        });
      }
    }]);

    return Accordion;
  }(Module);

  var defaults$4 = {
    init: true,
    // 实例化后是否立即初始化
    labels: null,
    // 标签元素或选择器
    panels: null,
    // 面板元素或选择器
    instant: true,
    // 切换时，如果上一个动画还没有过渡完，立即完成上一次动画并开始新的动画。
    triggerType: 'click',
    // labels触发事件的类型：可选'click', 'mouseenter'
    triggerDelay: 150,
    // 当triggerType为'mouseenter'时，为避免无意间滑动鼠标导致展开折叠
    duration: 300,
    // 滑块切换持续时间，单位毫秒
    easing: 'easeInOutQuad',
    // 缓动公式
    activeIndex: 0,
    // 默认活动滑块的下标
    labelActiveClass: 'galaxy-label-active',
    panelActiveClass: 'galaxy-panel-active'
  };

  var Tabs = /*#__PURE__*/function (_Module) {
    _inherits(Tabs, _Module);

    var _super = _createSuper(Tabs);

    function Tabs(el, params) {
      _classCallCheck(this, Tabs);

      return _super.call(this, el, params, defaults$4);
    }

    _createClass(Tabs, [{
      key: "_init",
      value: function _init() {
        var _this = this;

        var params = this.params;
        this.labels = $$(params.labels, this.el);
        this.panels = $$(params.panels, this.el);
        this.activeIndex = params.activeIndex;
        this.timer = null; // 是否处于过渡期

        this.transitional = false;
        var triggerType = params.triggerType;
        this.panels.forEach(function (panel, index) {
          if (_this.activeIndex === index) {
            addClass(panel, params.panelActiveClass);
            addClass(_this.labels[index], params.labelActiveClass);
            animate(panel).fadeIn({
              duration: 0
            });
          } else {
            removeClass(panel, params.panelActiveClass);
            removeClass(_this.labels[index], params.labelActiveClass);
            animate(panel).fadeOut({
              duration: 0
            });
          }
        });

        if (triggerType === MOUSEOVER || triggerType === MOUSEENTER) {
          this.labels.forEach(function (label, index) {
            on(label, triggerType + _this.namespace, function () {
              _this.timer = setTimeout(function () {
                _this.trigger(index);
              }, params.triggerDelay);
            });
            on(label, (triggerType === MOUSEOVER ? MOUSEOUT : MOUSELEAVE) + _this.namespace, function () {
              if (_this.timer) {
                clearTimeout(_this.timer);
                _this.timer = null;
              }
            });
          });
        } else {
          this.labels.forEach(function (label, index) {
            on(label, params.triggerType + _this.namespace, function () {
              _this.trigger(index);
            });
          });
        }
      }
    }, {
      key: "trigger",
      value: function trigger(index) {
        if (!this.params.instant && this.transitional) {
          return;
        }

        this["goto"](index);
      }
    }, {
      key: "show",
      value: function show(index) {
        var _this2 = this;

        var params = this.params;
        var activeLabel = this.labels[index];
        var activePanel = this.panels[index];

        if (activeLabel && activePanel && !hasClass(activePanel, params.panelActiveClass)) {
          addClass(activeLabel, params.labelActiveClass);
          addClass(activePanel, params.panelActiveClass);
          animate(activePanel).clearQueue().finish();
          this.transitional = true;
          animate(activePanel).fadeIn({
            duration: params.duration,
            easing: params.easing,
            complete: function complete() {
              _this2.transitional = false;
            }
          });
        }

        return this;
      }
    }, {
      key: "hide",
      value: function hide(index) {
        var params = this.params;
        var activeLabel = this.labels[index];
        var activePanel = this.panels[index];

        if (activeLabel && activePanel && hasClass(activePanel, params.panelActiveClass)) {
          removeClass(activeLabel, params.labelActiveClass);
          removeClass(activePanel, params.panelActiveClass);
          animate(activePanel).clearQueue().finish().fadeOut({
            duration: 0
          });
        }

        return this;
      }
    }, {
      key: "goto",
      value: function goto(index) {
        var _this3 = this;

        this.panels.forEach(function (panel, i) {
          if (i === index) {
            _this3.show(i);
          } else {
            _this3.hide(i);
          }
        });
        return this;
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        var _this4 = this;

        this.panels.forEach(function (panel) {
          animate(panel).clearQueue().finish();
        });
        this.labels.forEach(function (label) {
          off(label, _this4.namespace);
        });
      }
    }]);

    return Tabs;
  }(Module);

  var defaults$5 = {
    init: true,
    // 实例化后是否立即初始化
    togglePoint: 600,
    // 隐藏和显示的临界点高度
    duration: 400,
    // 滚到顶部需要的时间
    fadeDuration: 300,
    // 淡入淡出需要的时间
    threshold: 25 // 触发滚动的阈值

  };

  var Marquee$1 = /*#__PURE__*/function (_Module) {
    _inherits(Marquee, _Module);

    var _super = _createSuper(Marquee);

    function Marquee(el, params) {
      _classCallCheck(this, Marquee);

      return _super.call(this, el, params, defaults$5);
    }

    _createClass(Marquee, [{
      key: "_init",
      value: function _init() {
        var _this = this;

        var toggle = throttle(this.toggle.bind(this), this.params.threshold);

        if (this.params.togglePoint > 0) {
          on(window, 'scroll' + this.namespace, function () {
            toggle();
          });
        }

        on(this.el, 'click' + this.namespace, function () {
          [document.documentElement, document.body].forEach(function (el) {
            animate(el).clearQueue().finish().custom({
              scrollTop: 0
            }, {
              duration: _this.params.duration
            });
          });
        });
        toggle(true);
      }
    }, {
      key: "getScrollTop",
      value: function getScrollTop() {
        return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      }
    }, {
      key: "toggle",
      value: function toggle(init) {
        var show = this.getScrollTop() >= this.params.togglePoint;

        if (show !== this.show) {
          this.show = show;
          animate(this.el).clearQueue().finish()[show ? 'fadeIn' : 'fadeOut']({
            duration: init ? 0 : this.params.fadeDuration
          });
        }
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        off(this.el, this.namespace);

        if (this.params.togglePoint > 0) {
          off(window, this.namespace);
        }

        [document.documentElement, document.body, this.el].forEach(function (el) {
          animate(el).clearQueue().finish();
        });
      }
    }]);

    return Marquee;
  }(Module);

  var defaults$6 = {
    init: true,
    // 实例化后是否立即初始化
    labels: null,
    // 标签元素或选择器
    scrollBox: window,
    // 被监听滚动的盒子
    offsetTop: 1,
    // 偏移顶部距离，默认值为1是为避免有些浏览器定位到hash时，元素与浏览器顶部仍然有一个像素的距离导致无法切换
    threshold: 25,
    // 触发滚动事件的阈值
    activeClass: 'galaxy-label-active' // 当前活动的标签元素添加的类名

  };

  var ScrollSpy = /*#__PURE__*/function (_Module) {
    _inherits(ScrollSpy, _Module);

    var _super = _createSuper(ScrollSpy);

    function ScrollSpy(el, params) {
      _classCallCheck(this, ScrollSpy);

      return _super.call(this, el, params, defaults$6);
    }

    _createClass(ScrollSpy, [{
      key: "_init",
      value: function _init() {
        var _this = this;

        var params = this.params;
        this.labels = $$(params.labels, this.el);
        this.targets = [];
        this.scrollBox = $(params.scrollBox);
        this.currentTarget = null;
        this.labels.forEach(function (label) {
          var el = $(label.getAttribute('href'));

          if (el) {
            _this.targets.push([el, getOffsetTop(el, _this.scrollBox)]);
          }
        });
        this.targets.sort(function (a, b) {
          return a[1] - b[1];
        });
        var scrollHandler = throttle(this.scrollHandler.bind(this), params.threshold);
        on(this.scrollBox, 'scroll' + this.namespace, function () {
          scrollHandler();
        });
        scrollHandler();
      }
    }, {
      key: "scrollHandler",
      value: function scrollHandler() {
        var _this2 = this;

        var params = this.params;
        var scrollTop = getScrollTop(this.scrollBox);
        var currentTarget = this.currentTarget;
        this.refresh();
        var current = this.targets[0];

        if (this.isScrollToBottom()) {
          current = this.targets[this.targets.length - 1];
        } else {
          this.targets.forEach(function (target) {
            if (scrollTop + params.offsetTop >= target[1]) {
              current = target;
            }
          });
        }

        if (current && (!currentTarget || currentTarget[0] !== current[0])) {
          this.currentTarget = current;
          this.labels.forEach(function (label) {
            if (matchesSelector(current[0], label.getAttribute('href'))) {
              addClass(label, _this2.params.activeClass);
            } else {
              removeClass(label, _this2.params.activeClass);
            }
          });
        }
      }
    }, {
      key: "isScrollToBottom",
      value: function isScrollToBottom() {
        var scrollBox = this.scrollBox;
        return getClientHeight(scrollBox) + getScrollTop(scrollBox) >= getScrollHeight(scrollBox);
      }
    }, {
      key: "refresh",
      value: function refresh() {
        var _this3 = this;

        this.targets.forEach(function (target) {
          target[1] = getOffsetTop(target[0], _this3.scrollBox);
        });
        this.targets.sort(function (a, b) {
          return a[1] - b[1];
        });
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        off(this.scrollBox, this.namespace);
      }
    }]);

    return ScrollSpy;
  }(Module);

  var defaults$7 = {
    init: true,
    // 实例化后是否立即初始化
    fixedBox: null,
    // 用于固定的盒子，默认为el的第一个子元素
    scrollBox: window,
    // 被监听滚动的盒子
    threshold: 25,
    // 触发滚动事件的阈值
    offsetTop: 0,
    // 偏移顶部距离
    fixedClass: 'galaxy-fixed'
  };

  var ScrollFixed = /*#__PURE__*/function (_Module) {
    _inherits(ScrollFixed, _Module);

    var _super = _createSuper(ScrollFixed);

    function ScrollFixed(el, params) {
      _classCallCheck(this, ScrollFixed);

      return _super.call(this, el, params, defaults$7);
    }

    _createClass(ScrollFixed, [{
      key: "_init",
      value: function _init() {
        var params = this.params;
        this.scrollBox = $(params.scrollBox);
        this.fixedBox = $(params.fixedBox, this.el) || this.el.children[0];
        this.isFixed = false;
        var scrollHandler = throttle(this.scrollHandler.bind(this), params.threshold);
        on(this.scrollBox, 'scroll' + this.namespace, function () {
          scrollHandler();
        });
        scrollHandler();
      }
    }, {
      key: "scrollHandler",
      value: function scrollHandler() {
        var params = this.params;
        var fixedClass = params.fixedClass;
        var scrollTop = getScrollTop(this.scrollBox);
        var offsetTop = getOffsetTop(this.el, this.scrollBox);
        var willFixed = scrollTop + params.offsetTop >= offsetTop;

        if (willFixed && !this.isFixed) {
          addClass(this.fixedBox, fixedClass);
        } else if (!willFixed && this.isFixed) {
          removeClass(this.fixedBox, fixedClass);
        }

        this.isFixed = willFixed;
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        off(this.scrollBox, this.namespace);
      }
    }]);

    return ScrollFixed;
  }(Module);

  var defaults$8 = {
    init: true,
    // 实例化后是否立即初始化
    menuItems: null,
    // 菜单项元素或选择器
    subMenu: null,
    // 子菜单元素或选择器
    effect: 'fade',
    // 菜单项显示/隐藏效果，可选'fade', 'slide'
    activeClass: 'galaxy-menu-item-active',
    // 当前活动菜单项添加的类名
    duration: 300,
    // 切换持续时间，单位毫秒
    showDelay: 50,
    // 延迟显示的时间，单位毫秒，为避免短时间类重复多次切换菜单
    hideDelay: 50 // 延迟隐藏的时间，单位毫秒，可在彻底隐藏前把鼠标移到菜单项上阻止隐藏

  };

  var MenuItem = /*#__PURE__*/function () {
    function MenuItem(item, host) {
      _classCallCheck(this, MenuItem);

      this.item = item;
      this.host = host;
      this.subMenu = $(host.params.subMenu, this.item);
      this.hidden = true;
      this.state = 0; // 0: hidden, 1: shown, 2: hiding, 3: showing
    }

    _createClass(MenuItem, [{
      key: "init",
      value: function init() {
        var _this = this;

        var host = this.host;

        var enterHandler = function enterHandler() {
          // 还未隐藏
          if (_this.hideTimer) {
            clearTimeout(_this.hideTimer);
            _this.hideTimer = null; // 已经隐藏
          } else if (_this.state === 0) {
            _this.showTimer = setTimeout(function () {
              _this.showTimer = null;

              _this.show();
            }, host.params.showDelay); // 正在隐藏
          } else {
            _this.show(true);
          }
        };

        var leaveHandler = function leaveHandler() {
          // 还未显示
          if (_this.showTimer) {
            clearTimeout(_this.showTimer);
            _this.showTimer = null; // 已经显示
          } else {
            _this.hideTimer = setTimeout(function () {
              _this.hideTimer = null;

              _this.hide();
            }, host.params.hideDelay);
          }
        };

        on(this.item, MOUSEENTER + host.namespace, enterHandler);
        on(this.item, MOUSELEAVE + host.namespace, leaveHandler);

        this.showHandler = function (target) {
          if (target !== _this) {
            if (_this.hideTimer) {
              clearTimeout(_this.hideTimer);
              _this.hideTimer = null;
            }

            _this.hide(true);
          }
        };

        this.host.on('show', this.showHandler);
      }
    }, {
      key: "show",
      value: function show(instant) {
        var _this2 = this;

        if (this.state === 1) {
          return;
        }

        if (this.state === 3) {
          if (instant) {
            animate(this.subMenu).finish();
          }

          return;
        }

        this.state = 3; // showing

        var host = this.host;
        var activeClass = host.params.activeClass;

        var complete = function complete() {
          _this2.state = 1; // shown
        };

        this.host.emit('show', this);

        if (this.subMenu) {
          animate(this.subMenu).clearQueue().finish()[host.showType]({
            duration: host.params.duration,
            easing: host.params.easing,
            complete: complete
          });

          if (instant) {
            animate(this.subMenu).finish();
          }
        } else {
          complete();
        }

        if (host.activeItem) {
          removeClass(host.activeItem, host.params.activeClass);
        }

        addClass(this.item, activeClass);
      }
    }, {
      key: "hide",
      value: function hide(instant) {
        var _this3 = this;

        if (this.state === 0) {
          return;
        }

        if (this.state === 2) {
          if (instant) {
            animate(this.subMenu).finish();
          }

          return;
        }

        this.state = 2; // hiding

        var host = this.host;
        var activeClass = host.params.activeClass;

        var complete = function complete() {
          removeClass(_this3.item, activeClass);
          _this3.state = 0; // hidden

          if (host.activeItem) {
            addClass(host.activeItem, activeClass);
          }
        };

        if (this.subMenu) {
          animate(this.subMenu).clearQueue().finish()[host.hideType]({
            duration: host.params.duration,
            easing: host.params.easing,
            complete: complete
          });

          if (instant) {
            animate(this.subMenu).finish();
          }
        } else {
          complete();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.subMenu) {
          animate(this.subMenu).clearQueue().finish();
        }

        off(item, this.host.namespace);
        this.host.off('show', this.showHandler);
      }
    }]);

    return MenuItem;
  }();

  var Menu = /*#__PURE__*/function (_Module) {
    _inherits(Menu, _Module);

    var _super = _createSuper(Menu);

    function Menu(el, params) {
      _classCallCheck(this, Menu);

      return _super.call(this, el, params, defaults$8);
    }

    _createClass(Menu, [{
      key: "_init",
      value: function _init() {
        var _this = this;

        this.items = $$(this.params.menuItems, this.el);
        this.activeItem = this.items.filter(function (item) {
          return matchesSelector(item, '.' + _this.params.activeClass);
        })[0];
        this.menuItems = this.items.map(function (item) {
          return new MenuItem(item, _this);
        });

        switch (this.params.effect) {
          case 'slide':
            this.showType = 'slideDown';
            this.hideType = 'slideUp';
            break;

          default:
            this.showType = 'fadeIn';
            this.hideType = 'fadeOut';
            break;
        }

        this.menuItems.forEach(function (menuItem) {
          return menuItem.init();
        });
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        this.menuItems.forEach(function (menuItem) {
          return menuItem.destroy();
        });
      }
    }]);

    return Menu;
  }(Module);

  var modules = {
    Carousel: Carousel,
    Marquee: Marquee,
    Accordion: Accordion,
    Tabs: Tabs,
    GotoTop: Marquee$1,
    ScrollSpy: ScrollSpy,
    ScrollFixed: ScrollFixed,
    Menu: Menu
  };

  var galaxy = {};
  utils.extend(galaxy, modules);
  galaxy.Module = Module;
  galaxy.animate = animate;
  galaxy.vivid = vivid;
  galaxy.utils = utils;

  return galaxy;

})));
