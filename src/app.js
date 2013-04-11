goog.provide('app');

goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('ma.CONST');
goog.require('ma.Login');
goog.require('ma.pages');

/**
 * A reference to the class logger
 * @type {goog.debug.Logger}
 * @private
 */
app.logger_ = goog.debug.Logger.getLogger('app');


/**
 *
 */
app.start = function() {
  /** @type {goog.debug.DivConsole} */
  var logconsole =
    new goog.debug.DivConsole(goog.dom.getElement('loggerConsole'));
  logconsole.setCapturing(true);
  app.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
  app.logger_.finest('start called');
  ma.pages.dispatchEvent(new ma.plEvent('LOGIN_PAGE', '2'));
};

/**ma.pages.addEventListener('LOGIN_PAGE', app.showLoginWeb, false);
 * SRC: [% SRC_LOC %]
 * @param {string} contentBlock the div content to replace.
 */
app.setMainContent = function(contentBlock) {
  //app.GLOBAL.onScreenPageTarget.dispatchEvent('DISPOSE_ALL');
  ma.GLOBAL_primaryContainer.innerHTML = contentBlock;
};


/**
 * @type {Element}
 */
ma.GLOBAL_primaryContainer = goog.dom.getElement('mainContent');


/**
 * @type {number}
 */
ma.GLOBAL_serverRequestId = 0;

