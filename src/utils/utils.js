const toString = Object.prototype.toString;

export function isPlainObject(target) {
  return toString.call(target) === '[object Object]';
}

// 支持深复制
export function extend() {
  let target = arguments[0],
    i = 1,
    l = arguments.length,
    options, name, src, copy, deep, copyIsArray, clone;

  // 深复制
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1];
    // 跳过 boolean 和 target
    i = 2;
  }

  // 只传递一个对象情况下，把对象合并到调用extend函数的对象上
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
        copy = options[name];

        // 防止有环
        if (target === copy) {
          continue;
        }

        // 深复制
        if (deep && copy && (isPlainObject(copy) ||
          (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          // 只克隆对象，不移动
          target[name] = extend(deep, clone, copy);

          // 不添加未定义的值
        } else if (copy !== void 0) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

export function sandbox(callback) {
  let
    sandbox,
    win,
    doc,
    html,
    body;

  sandbox = document.createElement('iframe');
  sandbox.style.cssText = 'display:none !important';
  document.body.appendChild(sandbox);

  win = sandbox.contentWindow;
  doc = win.document;
  html = doc.documentElement;
  body = doc.body;

  // 针对IE10-(含)
  if (!html) {
    html = doc.createElement('html');
    doc.appendChild(html);
  }
  // 针对IE10-(含)
  if (!body) {
    body = doc.createElement('body');
    html.appendChild(body);
  }

  callback(win, doc, html, body);
}

export function matchesSelector(elem, selector) {
  return (
    elem.matches ||
    elem.matchesSelector ||
    elem.webkitMatchesSelector ||
    elem.mozMatchesSelector ||
    elem.msMatchesSelector ||
    elem.oMatchesSelector
  ).call(elem, selector);
}

// 支持字符串数组
export function uniqueArray(array) {
  return Object.keys(array.reduce((obj, item) => (obj[item] = 1) && obj, {}));
}

export function addClass(elem, ...classes) {
  if (elem.classList) {
    return classes.forEach(item => elem.classList.add(item));
  }
  elem.className = uniqueArray((elem.className.match(/\S+/g) || [])
    .concat(classes))
    .join(' ');
}

export function removeClass(elem, ...classes) {
  if (elem.classList) {
    return classes.forEach(item => elem.classList.remove(item));
  }

  elem.className = (elem.className.match(/\S+/g) || [])
    .filter(item => classes.indexOf(item) === -1)
    .join(' ');
}

export function toggleClass(elem, ...classes) {
  if (elem.classList) {
    return classes.forEach(item => elem.classList.toggle(item));
  }
  let srcClasses = (elem.className.match(/\S+/g) || []);
  elem.className = srcClasses.filter(item => classes.indexOf(item) === -1)
    .concat(classes.filter(item => srcClasses.indexOf(item) === -1))
    .join(' ');
}

export function hasClass(elem, cls) {
  return (elem.className.match(/\S+/g) || []).indexOf(cls) !== -1;
}

export function $(selector, context) {
  if (typeof selector === 'string') {
    return (context || document).querySelector(selector);
  }
  return selector;
}

export function $$(selector, context) {
  if (typeof selector === 'string') {
    selector = (context || document).querySelectorAll(selector);
  }
  return Array.prototype.slice.call(selector || []);
}

// 函数防抖
export function debounce(fn, wait) {
  let timer = null;
  return function () {
    let args = arguments;

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait != null ? wait : 150);
  }
}

// 函数节流
export function throttle(fn, wait) {
  let timer = null,
    first = true;

  return function () {
    let args = arguments;

    // 第一次执行
    if (first) {
      fn.apply(this, args);
      first = false;
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, args);
        }, wait != null ? wait : 150);
      }
    }
  };
}

let uuidCounter = 0;
export function uuid() {
  return 'galaxy' + ++uuidCounter + Math.random().toString().slice(2);
}

export function namespace() {
  return '.' + uuid();
}

export function offset(elem) {
  let top = 0,
    left = 0;

  while (elem.offsetParent) {
    top += elem.offsetTop;
    left += elem.offsetLeft;
    elem = elem.offsetParent;
  }
  return { top, left };
}

export function getOffsetTop(elem, target) {
  const offsetTop = offset(elem).top;
  if (!target || target === window) {
    return offsetTop;
  } else {
    return offsetTop - offset(target).top;
  }
}

export function getScrollTop(target) {
  return !target || target === window ? window.pageYOffset : target.scrollTop;
}

export function getScrollHeight(target) {
  return !target || target === window ? Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  ) : target.scrollHeight;
}

export function getClientHeight(target) {
  return target === window ? document.documentElement.clientHeight : target.clientHeight;
}

export default {
  isPlainObject,
  extend,
  sandbox,
  matchesSelector,
  uniqueArray,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  $,
  $$,
  debounce,
  throttle,
  uuid,
  offset,
  getOffsetTop,
  getScrollTop,
  getScrollHeight,
  getClientHeight,
};