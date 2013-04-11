goog.provide('ma.pages');
goog.require('goog.events.EventTarget');

/**
 * @type {goog.events.EventTarget}
 */
ma.pages = new goog.events.EventTarget();
ma.pages.addEventListener('TEST',
    function(e) { alert('test'); }, false);

/**
 * @constructor
 * @param {string=} opt_type  the event type.
 * @param {Object|string=} opt_payload the payload.
 */
ma.plEvent = function(opt_type, opt_payload) {
  this.type = opt_type || 'EVENT';
  this.payload = opt_payload;
};
