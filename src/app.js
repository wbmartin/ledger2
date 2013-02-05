goog.provide('app');
goog.require('goog.dom');
goog.require('LoginWeb');
goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Logger');
goog.require('ma.CONST');
goog.require('ma.Login');

app.logger_ =goog.debug.Logger.getLogger('app');
/**
 *
 * @param {string} elementId the divId to work on.
 */
app.start = function(elementId) {
  
  app.primaryContainer = goog.dom.getElement(elementId);
  /** @type {goog.debug.DivConsole} */
  var logconsole =
    new goog.debug.DivConsole(goog.dom.getElement('loggerConsole'));
  logconsole.setCapturing(true);
  app.logger_.setLevel(ma.CONST.DEFAULT_LOG_LEVEL);
  app.logger_.finest('start called');
  
app.showLoginWeb();
};

/**
 * SRC: [% SRC_LOC %]
 * @param {string} contentBlock the div content to replace.
 */
app.setMainContent = function(contentBlock) {
  //app.GLOBAL.onScreenPageTarget.dispatchEvent('DISPOSE_ALL');
  app.primaryContainer.innerHTML = contentBlock;
};

app.showLoginWeb = function (){
  app.logger_.finest('showLoginWeb called');
  if (app.loginWeb === undefined){
    app.loginWeb = new ma.Login();
  }
  app.loginWeb.render(app.primaryContainer);
}

app.closeOpenViews = function (){

}

app.registerOpenView = function(){

}





