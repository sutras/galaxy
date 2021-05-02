import animate from './utils/animate';
import vivid from 'vivid';
import utils from './utils/index';
import modules from './modules/modules';
import Module from './modules/Module';

const galaxy = {};

utils.extend(galaxy, modules);

galaxy.Module = Module;
galaxy.animate = animate;
galaxy.vivid = vivid;
galaxy.utils = utils;

export default galaxy;
