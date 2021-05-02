import Marquee from './Marquee';
import autoplay from './components/autoplay';
import navigation from './components/navigation';

Marquee.prototype.installComponent([
  autoplay,
  navigation
]);

export default Marquee;