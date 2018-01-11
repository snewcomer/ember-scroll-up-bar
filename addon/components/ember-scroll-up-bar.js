import Component from '@ember/component';
import { get, set } from '@ember/object';
import { bind } from '@ember/runloop';

export default Component.extend({
  classNameBindings: ['_showMe:ember-scroll-up-bar'],

  _scheduledAnimationFrame: false,
  /**
   * user specified from top of document
   * @property topPos
   */
  topPos: 0,

  _showMe: false,
  _originalPosTop: 0,

  didInsertElement() {
    this.top = window.pageYOffset || document.documentElement.scrollTop;
    this._originalPosTop = this.element.getBoundingClientRect().top;
    this.element.style.top = get(this, 'topPos') || this._originalPosTop;
    // if start out in middle of page
    this.cachedTop = `${this.top}px`;
    this._originalBottom = this.element.offsetHeight + this.element.offsetTop;

    document.addEventListener('scroll', this._scrollClosure.bind(this), false);   
    document.addEventListener('touchmove', this._scrollClosure.bind(this), false);   
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
    if (newTop === 0) {
      set(this, '_scheduledAnimationFrame', true);
      // requestAnimationFrame to run visual changes in order to not block scrolling/touch events
      window.requestAnimationFrame(bind(this, this._resetBar, newTop));
    }

    // scrolled down
    if (newTop > this.top) {
      set(this, '_scheduledAnimationFrame', true);
      // requestAnimationFrame to run visual changes in order to not block scrolling/touch events
      window.requestAnimationFrame(bind(this, this._scrolledDown, newTop));
    }

    // scrolled up
    if (newTop < this.top) {
      // ensure not in container of header
      if (this._originalBottom < newTop) {
        set(this, '_scheduledAnimationFrame', true);
        // requestAnimationFrame to run visual changes in order to not block scrolling/touch events
        window.requestAnimationFrame(bind(this, this._scrolledUp, newTop));
      }
    }

    this.top = newTop;
  },

  _resetBar() {
    this.element.style.position = '';
    this.element.style.top = '';
    this.element.style.right = '';
    this.element.style.left = '';
    set(this, '_scheduledAnimationFrame', false);
    set(this, '_showMe', false);
  },

  _scrolledUp(newTop) {
    this.element.style.position = 'fixed';
    this.element.style.top = '0px';
    this.element.style.right = '0px';
    this.element.style.left = '0px';
    this.cachedTop = `${newTop}px`;
    set(this, '_scheduledAnimationFrame', false);
    set(this, '_showMe', true);
  },

  _scrolledDown(newTop) {
    this.element.style.position = 'absolute';
    if (this._originalBottom > newTop) {
      this.element.style.top = 0;
    } else if (this._originalBottom * 2 < newTop) {
      this.element.style.top = this.cachedTop;
    }
    this.element.style.right = '0px';
    this.element.style.left = '0px';
    set(this, '_scheduledAnimationFrame', false);
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener('scroll', this._scrollClosure, false);   
  }
});
