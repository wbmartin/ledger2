goog.provide('LoginWeb');
goog.require('ma.CONST');
goog.require('ma.ui');
goog.require('ma.form.ColumnLayout');
goog.require('goog.debug.Logger');
goog.require('ma.LoginWebView');

/**
 * @extends {PageHelper}
 * @constructor
 */
LoginWeb = function(){
 this.logger_.setLevel(ma.CONST.DEFAULT_LOG_LEVEL);
};

/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
LoginWeb.prototype.logger_ =
    goog.debug.Logger.getLogger('LoginWeb');


LoginWeb.prototype.show = function(container) {
  this.logger_.severe('show called'); 
  app.setMainContent(ma.LoginWebView.getPrimary());
  this.fl1 = new ma.form.ColumnLayout();
  this.fl1.addField('userid');
  this.fl1.render(container);
}

/**
 *  
 *  @return {boolean} false to not refresh the page.
 */
LoginWeb.attemptLogin = function() {
  app.logger_.finest('Call start');
  app.GLOBAL.TRUSTED_DEVICE =
    goog.dom.getElement('LoginForm-trustedDeviceId').checked;
  /** @type {string} */
  var qstr = app.buildQDStrForm('SECURITY_USER', 'AUTHENTICATE', 'LoginForm');

  /** @type {function({goog.events.Event})} */
  var callBack;
  callBack = function(e) {
    app.logger_.finest('CallBack: Login Request ');
    /** @type {Object} */
    var obj = e.target.getResponseJson();
    var session = obj['rows'][0]['session_id'];
    if (session != '') {
      app.standardSuccessfulLogin(session);
    } else {
      alert ('failed');
    }
  };
  app.svrCall(callBack, qstr);
  return false;
};


