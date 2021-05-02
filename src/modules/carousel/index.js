import Carousel from './Carousel';
import core from './components/core';
import effectFade from './components/effectFade';
import effectDeck from './components/effectDeck';
import effectSlide from './components/effectSlide';
import effectStack from './components/effectStack';
import resize from '../../components/resize';
import pagination from './components/pagination';
import navigation from './components/navigation';
import autoplay from './components/autoplay';

Carousel.prototype.installComponent([
  core,
  effectFade,
  effectDeck,
  effectSlide,
  effectStack,
  resize,
  pagination,
  navigation,
  autoplay,
]);

export default Carousel;