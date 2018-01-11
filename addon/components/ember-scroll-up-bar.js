import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  classNames: ['ember-scroll-up-bar', 'animated-fast'],
  // classNameBindings: ['showMe:ember-scroll-up-bar--show'],//, 'slideInDown:slideInDown', 'slideOutUp:slideOutUp'],

  // /**
  //  * @property showMe
  //  */
  // showMe: null,
  /**
   * user specified from top of document
   * @property topPos
   */
  topPos: 0,

  _originalPosTop: 0,

  slideTimer: 400,

  didInsertElement() {
    this.top = window.pageYOffset || document.documentElement.scrollTop;
    this._originalPosTop = this.element.getBoundingClientRect().top;
    this.element.style.top = get(this, 'topPos') || this._originalPosTop;
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
    let newTop = window.pageYOffset || document.documentElement.scrollTop;

    // reset
    if (newTop === 0) {
      this.element.style.position = 'absolute';
      this.element.style.top = this._originalPosTop;
    }

    // scrolled down
    if (newTop > this.top) {
      this._scrolledDown(newTop);
    }

    // scrolled up
    if (newTop < this.top) {
      // ensure not in container of header
      if (this._originalBottom < newTop) {
        this.element.style.position = 'fixed';
        this.element.style.top = '0px';
        this.cachedTop = `${newTop}px`;
      }
    }

    this.top = newTop;
  },

  _scrolledDown(newTop) {
    this.element.style.position = 'absolute';
    if (this._originalBottom > newTop) {
      this.element.style.top = 0;
    } else if (this._originalBottom * 2 < newTop) {
      this.element.style.top = this.cachedTop;
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener('scroll', this._scrollClosure, false);   
  }
});
