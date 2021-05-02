import Module from '../Module';
import defaults from './defaults';
import { $$, matchesSelector } from '../../utils/utils';
import MenuItem from './MenuItem';

export default class Menu extends Module {
  constructor(el, params) {
    super(el, params, defaults);
  }

  _init() {
    this.items = $$(this.params.menuItems, this.el);
    this.activeItem = this.items.filter(item => matchesSelector(item, '.' + this.params.activeClass))[0];
    this.menuItems = this.items.map(item => new MenuItem(item, this));

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

    this.menuItems.forEach(menuItem => menuItem.init());
  }

  _destroy() {
    this.menuItems.forEach(menuItem => menuItem.destroy());
  }
}