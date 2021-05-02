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
const WeakMap = window.WeakMap || (function () {
  function rand() {
    return Math.random().toString().slice(2);
  }

  function isObject(target) {
    return Object(target) === target;
  }

  return class {
    constructor() {
      this._id = '_WeakMap_' + rand() + '.' + rand();
    }

    set(key, value) {
      if (isObject(key)) {
        const entry = key[this._id];
        if (entry && entry[0] === key) {
          entry[1] === value;
        } else {
          key[this._id] = [key, value];
        }
      }

      return this;
    }

    get(key) {
      if (!isObject(key)) {
        return void 0;
      }

      const entry = key[this._id];
      if (entry && entry[0] === key) {
        return entry[1];
      }
    }

    has(key) {
      if (!isObject(key)) {
        return false;
      }

      const entry = key[this._id];
      if (entry && entry[0] === key) {
        return true;
      }
      return false;
    }

    delete(key) {
      if (!isObject(key)) {
        return false;
      }

      const entry = key[this._id];
      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }
      return false;
    }
  }
})();

export default WeakMap;