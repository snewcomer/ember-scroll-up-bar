import Component from '@ember/component';
import layout from '../templates/components/ember-scroll-up-bar';
import { get, set, computed } from '@ember/object';
import { bind, later, debounce } from '@ember/runloop';
import { assert } from '@ember/debug';

export default Component.extend({
  layout,

  _scheduledAnimationFrame: false,
  /**
   * user specified from top of document
   * @property componentHeight
   */
  componentHeight: null,

  destination: 'ember-scroll-up-bar-wormhole',

  to: computed('destination', {
    get() {
      return this.get('destination');
    },
    set(_, v) {
      return v === undefined ? this.get('destination') : v;
    }
  }),
  destinationElement: computed('to', function () {
    return document.getElementById(get(this, 'to'));
  }),

  _initialRender: false,
  _showMe: false,
  slideOutUp: false,
  slideInDown: false,
  // _originalPosTop: 0,

  didInsertElement() {
    assert('You must pas componentHeight to ember-scroll-up-bar', get(this, 'componentHeight'));

    // get nav showing on initial load
    set(this, '_initialRender', true);

    this.top = window.pageYOffset || document.documentElement.scrollTop;
    this._originalBottom = get(this, 'componentHeight');// this.element.offsetHeight + this.element.offsetTop;

    document.addEventListener('scroll', this._scrollClosure.bind(this), false);   
    document.addEventListener('touchmove', this._scrollClosure.bind(this), false);   

    later(this, () => set(this, '_initialRender', false), 50);
  },

  /**
   * on scroll listeners
   * pageYOffset is an alias for scrollY and best for cross-browser support
   * @method _scrollClosure
   */
  _scrollClosure() {
    if (this._scheduledAnimationFrame) return;

    // read before requestAnimationFrame to avoid layout thrashing
    let newTop = window.pageYOffset || document.documentElement.scrollTop;

    // reset
    if (newTop < this._originalBottom) {
      set(this, '_scheduledAnimationFrame', true);
      // requestAnimationFrame to run visual changes in order to not block scrolling/touch events
      window.requestAnimationFrame(bind(this, this._resetBar));
    }

    // scrolled down
    if (newTop > this.top) {
      set(this, '_scheduledAnimationFrame', true);
      // requestAnimationFrame to run visual changes in order to not block scrolling/touch events
      window.requestAnimationFrame(bind(this, this._scrolledDown));
    }

    // scrolled up
    if (newTop < this.top || this._initialRender) {
      // ensure not in container of header
      if (this._originalBottom < newTop) {
        set(this, '_scheduledAnimationFrame', true);
        // requestAnimationFrame to run visual changes in order to not block scrolling/touch events
        window.requestAnimationFrame(bind(this, this._scrolledUp));
      }
    }

    this.top = newTop;
  },

  _resetBar() {
    set(this, '_scheduledAnimationFrame', false);
    set(this, '_showMe', false);
    set(this, 'slideOutUp', true);
    set(this, 'slideInDown', false);
  },

  _scrolledUp() {
    set(this, '_scheduledAnimationFrame', false);
    set(this, '_showMe', true);
    set(this, 'slideOutUp', false);
    set(this, 'slideInDown', true);
  },

  _scrolledDown() {
    set(this, 'slideOutUp', true);
    set(this, 'slideInDown', false);
    set(this, '_scheduledAnimationFrame', false);
    // delay to allow for scrollOutUp
    debounce(this, () => set(this, '_showMe', false), 15);
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener('scroll', this._scrollClosure, false);   
    document.removeEventListener('touchmove', this._scrollClosure, false);   
  }
});
