/*
|-------------------------------------------------------------------------------
| 基础模块类，运用了“模板方法模式”，此类定义了各个功能模块的算法骨架。
|-------------------------------------------------------------------------------
|
| 骨架算法如下：
| 1. 传参
| 2. 监听传参事件
| 3. 合并参数
| 4. 预设模块类独立的属性
| 5. 使用组件
| 6. 初始化
|
| 其中步骤4和6由子类实现。
| 各个模块功能由其安装的各个组件来实现。
|
*/

import EventTarget from './EventTarget';
import { extend, isPlainObject, uuid, namespace } from '../utils/utils';

export default class Module extends EventTarget {
  constructor(el, passedParams = {}, defaults) {
    super();

    if (typeof el === 'string') {
      el = document.querySelector(el);
    }
    if (!(el instanceof Element)) {
      return;
    }

    this.el = el;
    this.initialized = false;
    this.namespace = namespace();

    // 合并默认参数和模块参数
    this.params = extend({}, defaults);
    this.useComponentsParams(this.params);

    if (!this.components) {
      this.components = {};
    }

    // 处理传递参数
    Object.keys(this.components).forEach(componentName => {
      const component = this.components[componentName];
      if (!component.params) {
        return;
      }
      const componentParamsName = Object.keys(component.params)[0];
      const componentParams = component.params[componentParamsName];
      if (!isPlainObject(componentParams) ||
        !passedParams.hasOwnProperty(componentParamsName) ||
        !componentParams.hasOwnProperty('enabled')) {
        return;
      }
      const paramValue = passedParams[componentParamsName];
      if (!isPlainObject(paramValue)) {
        passedParams[componentParamsName] = {
          enabled: !!paramValue
        };
      } else {
        paramValue.enabled = paramValue.hasOwnProperty('enabled') ? !!paramValue.enabled : true;
      }
    });

    // 合并传递参数
    extend(true, this.params, passedParams);
    this.passedParams = passedParams;

    this.useComponents();

    // 监听传参事件
    if (passedParams && passedParams.on) {
      Object.keys(passedParams.on).forEach(key => {
        this.on(key, passedParams.on[key]);
      });
    }

    if (this.params.init) {
      this.init();
    }
  }

  init() {
    if (this.initialized) {
      return;
    }

    this._init();

    this.emit('init');
    this.initialized = true;
  }

  destroy() {
    if (!this.initialized) {
      return;
    }

    this._destroy();

    this.emit('destroy');
    this.initialized = false;
  }

  useComponentsParams(instanceParams) {
    if (!this.components) {
      return this;
    }
    Object.keys(this.components).forEach(key => {
      const component = this.components[key];
      if (component.params) {
        extend(true, instanceParams, component.params);
      }
    });
    return this;
  }

  useComponents() {
    if (!this.components) {
      return this;
    }
    Object.keys(this.components).forEach(key => {
      const component = this.components[key];

      if (component.instance) {
        Object.keys(component.instance).forEach(key => {
          const value = component.instance[key];
          if (typeof value === 'function') {
            this[key] = value.bind(this);
          } else {
            this[key] = value;
          }
        });
      }

      if (component.on) {
        Object.keys(component.on).forEach(key => {
          this.on(key, component.on[key], true);
        });
      }

      if (component.create) {
        component.create.call(this, this);
      }
    });
    return this;
  }

  installComponent(component, ...params) {
    let components,
      name;

    if (Array.isArray(component)) {
      return component.forEach(m => this.installComponent(m, ...params));
    }

    if (!(components = this.components)) {
      components = this.components = {};
    }
    name = component.name || uuid();
    components[name] = component;

    if (component.proto) {
      Object.keys(component.proto).forEach(key => {
        this[key] = component.proto[key];
      });
    }

    if (component.static) {
      Object.keys(component.static).forEach(key => {
        this[key] = component.static[key];
      });
    }

    if (component.install) {
      component.install.apply(this, params);
    }
  }
}