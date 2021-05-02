import utils from './utils';
import event from './event';
import WeakMap from './WeakMap';

utils.extend(utils, event);
utils.WeakMap = WeakMap;

export default utils;