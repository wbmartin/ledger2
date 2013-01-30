goog.provide('LoginWeb');
goog.require('ma.ui');
goog.require('ma.form.ColumnLayout');
//goog.require('LoginWeb.View');

/**
 * @extends {PageHelper}
 * @constructor
 */
LoginWeb = function(){

};


LoginWeb.prototype.show = function(container) {
  //app.LoginWeb.LoginWeb.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  //this.init('Login');
  //goog.events.listenOnce(App.GLOBAL.onScreenPageTarget, 'DIPOSE_ALL', this.dispose, false, this);
  //goog.Disposable.call(this);
  //
  //  app.setMainContent(app.LoginWeb.View.getPrimary(null, null));
  var fl1 = new ma.form.ColumnLayout();
  fl1.addField('userid');
  fl1.render(container);
  //var tbl = goog.dom.createDom('table');
  //this.userfld = new ma.ui.inputTextValidation(tbl);
  //goog.dom.append(container, tbl);
  //goog.dom.append(container, this.userfld);
  
 // this.eh1.listen(
 //     goog.dom.getElement('cmdlogin'),
 //     goog.events.EventType.CLICK,
 //     this.attemptLogin
 //     );
}

/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
//app.LoginWeb.prototype.logger_ = goog.debug.Logger.getLogger('Login');


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


