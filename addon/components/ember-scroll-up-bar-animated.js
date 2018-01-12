import Component from '@ember/component';
import layout from '../templates/components/ember-scroll-up-bar-animated';

export default Component.extend({
  layout,

  tagName: 'ember-scroll-up-bar',
  classNames: ['animated-fast'],
  classNameBindings: [
    'slideOutUp:slideOutUp',
    'slideInDown:slideInDown',
  ],

  slideOutUp: false,
  slideInDown: false
});
