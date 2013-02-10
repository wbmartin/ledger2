goog.provide('ma.pages');
goog.require('goog.events.EventTarget');







/**
 * @constructor
 * @param {string=} opt_type  the event type.
 * @param {Object|string=} opt_payload the payload.
 */
ma.plEvent = function(opt_type, opt_payload) {
this.type = opt_type || 'EVENT';
this.payload = opt_payload;
};
