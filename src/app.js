goog.provide('app');
goog.require('goog.dom');
goog.require('LoginWeb');
/**
 *
 * @param {string} elementId the divId to work on.
 */
app.start = function(elementId) {
  app.primaryContainer = goog.dom.getElement(elementId);
  //app.primaryContainer.innerHTML = LoginWebView.getPrimary();
app.showLoginWeb();
};

/**
 * SRC: [% SRC_LOC %]
 * @param {string} contentBlock the div content to replace.
 */
app.setMainContent = function(contentBlock) {
  //app.GLOBAL.onScreenPageTarget.dispatchEvent('DISPOSE_ALL');
  goog.dom.getElement('mainContent').innerHTML = contentBlock;
};

app.showLoginWeb = function (){
  app.loginWeb = new LoginWeb();
  app.loginWeb.show(app.primaryContainer);

}




