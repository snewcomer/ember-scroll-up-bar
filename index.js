'use strict';

module.exports = {
  name: 'ember-scroll-up-bar',

  contentFor(type, config) {
    if (config.environment !== 'test' && type === 'body-footer' && !config._emberScrollUpBarContentForInvoked) {
      config._emberScrollUpBarContentForInvoked = true;
      return '<div id="ember-scroll-up-bar-wormhole"></div>';
    }
  }
};
