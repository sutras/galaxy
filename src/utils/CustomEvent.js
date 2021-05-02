/*
|-------------------------------------------------------------------------------
| CustomEvent
|-------------------------------------------------------------------------------
|
| 解决IE不支持 `new CustomEvent()` 的形式
|
*/

const CustomEvent = typeof window.CustomEvent === 'function'
  ? window.CustomEvent
  : (function () {
    return function (event, params) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      const evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }
  })();

export default CustomEvent;