import Component from '@ember/component';
import layout from '../templates/components/ember-scroll-up-bar';
import { get, set, computed } from '@ember/object';
import { bind, later, debounce } from '@ember/runloop';
import { assert } from '@ember/debug';

export default Component.extend({
  layout,

  /**
   * avoids multiple requestAnimationFrames from firing, potentially causing thrashing
   * 
   * @property _scheduleAnimationFrame
   */
  _scheduledAnimationFrame: false,
  /**
   * @property _initialRender
   */
  _initialRender: false,
  /**
   * hides or shows the maybe-in-element helper 
   * 
   * @property _showMe
   */
  _showMe: false,

  /**
   * user specified from top of document
   * 
   * @property componentHeight
   * @required
   */
  componentHeight: null,
  /**
   * see index.js
   * 
   * @property destination
   */
  destination: 'ember-scroll-up-bar-wormhole',

  to: computed('destination', {
    get() {
      return this.get('destination');
    },
    set(_, v) {
      return v === undefined ? this.get('destination') : v;
    }
  }),

  /**
   * render at root w/ id of #ember-scroll-up-bar-wormhole
   * passed to maybe-in-element helper
   * 
   * @property destinationElement
   */
  destinationElement: computed('to', function () {
    return document.getElementById(get(this, 'to'));
  }),

  /**
   * @property slideOutUp
   */
  slideOutUp: false,
  /**
   * @property slideInDown
   */
  slideInDown: false,
  
  init() {
    this._super();
    
    this._boundScrollClosure = this._scrollClosure.bind(this);
  },

  didInsertElement() {
    assert('You must pas componentHeight to ember-scroll-up-bar', get(this, 'componentHeight'));

    // get nav showing on initial load
    set(this, '_initialRender', true);

    this.top = window.pageYOffset || document.documentElement.scrollTop;
    this._originalBottom = get(this, 'componentHeight');// this.element.offsetHeight + this.element.offsetTop;

    document.addEventListener('scroll', this._boundScrollClosure, false);   
    document.addEventListener('touchmove', this._boundScrollClosure, false);

    later(this, () => set(this, '_initialRender', false), 50);
  },

  /**
   * process reset, scroll up, and scroll down events 
   * 
   * @method _scrollClosure
   */
  _scrollClosure() {
    if (this._scheduledAnimationFrame) return;

    // read before requestAnimationFrame to avoid layout thrashing
    // pageYOffset is an alias for scrollY and best for cross-browser support
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
    document.removeEventListener('scroll', this._boundScrollClosure, false);   
    document.removeEventListener('touchmove', this._boundScrollClosure, false);   
  }
});
