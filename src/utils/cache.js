/*
|-------------------------------------------------------------------------------
| 缓存模块
|-------------------------------------------------------------------------------
|
| 使用WeakMap，让系统自动回收不需要使用到的数据
|
*/
import WeakMap from './WeakMap';

class Data {
  constructor() {
    this.cache = new WeakMap();
  }

  // 获取储物柜，没有则开一个
  locker(obj) {
    let cache = this.cache.get(obj);

    if (!cache) {
      this.cache.set(obj, (cache = {}));
    }
    return cache;
  }

  set(obj, key, value) {
    let cache = this.locker(obj);

    if (typeof key === 'string') {
      cache[key] = value;
    } else {
      for (let i in key) {
        cache[i] = key[i];
      }
    }
  }

  get(obj, key) {
    let cache = this.locker(obj);
    return key === void 0 ? cache : cache[key];
  }

  // 存取操作
  access(obj, key, value) {
    // 取
    if (key === void 0 || key && typeof key === 'string' && value === void 0) {
      return this.get(obj, key);
    }

    // 存
    this.set(obj, key, value);
    return value === void 0 ? key : value;
  }

  delete(obj, key) {
    let i, l, cache;

    if (!key) {
      return this.discard(obj);
    }

    cache = this.locker(obj);

    // 支持数组和空格分割的字符串来批量删除数据
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
  }

  // 抛弃储物柜
  discard(obj) {
    this.cache.delete(obj);
  }
}

let data_priv = new Data();

function data(obj, key, value) {
  return data_priv.access(obj, key, value);
}

function removeData(obj, key) {
  return data_priv.delete(obj, key);
}

export { data, removeData };