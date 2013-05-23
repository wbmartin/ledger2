goog.provide('app');

goog.require('goog.History');
goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.net.Cookies');
goog.require('ma.AccessGroup');
goog.require('ma.CONST');
goog.require('ma.Login');
goog.require('ma.MainLauncher');
goog.require('ma.Page2');
goog.require('ma.pages');
goog.require('ma.uiUtil');

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
  //debug.FancyWindow is another option - the div console however
  //can be hidden and collecting the whole time
  var logconsole =
    new goog.debug.DivConsole(goog.dom.getElement('loggerConsole'));
  logconsole.setCapturing(true);
  app.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
  app.logger_.finest('start called');

    //ma.pages.dispatchEvent(new ma.plEvent('LOGIN_PAGE'));
  /** @type {HTMLInputElement} */
  var trackingElement = /** @type {HTMLInputElement} */
    (goog.dom.getElement('historyTrackerId'));
  app.hist = new goog.History(false, undefined, trackingElement);
  goog.events.listen(app.hist,
      goog.history.EventType.NAVIGATE,
      ma.uiUtil.navCallback);
  app.hist.setEnabled(true);

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

