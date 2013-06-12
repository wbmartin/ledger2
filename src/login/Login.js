// Copyright 2013 martinanalytics. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview A login component.
 *
 */
goog.provide('ma.Login');

goog.require('goog.Uri');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.KeyHandler.EventType');
goog.require('goog.net.XhrIo');
goog.require('goog.ui.Component');
goog.require('ma.LoginWebView');
goog.require('ma.pages');
goog.require('ma.uiUtil');
goog.require('ma.uiUtilForm');
goog.require('ma.uiUtilFormInput');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
ma.Login = function(opt_domHelper) {

  goog.ui.Component.call(this, opt_domHelper);


  /**
   * Event handler for this object.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eh_ = new goog.events.EventHandler(this);

  /**
   * Keyboard handler for this object. This object is created once the
   * component's DOM element is known.
   *
   * @type {goog.events.KeyHandler?}
   * @private
   */
  this.kh_ = null;
  /**
   * A reference to the class logger
   * @type {goog.debug.Logger}
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('ma.Login');
  this.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
  this.logger_.finest('Constructor Called');
};
goog.inherits(ma.Login, goog.ui.Component);



/**
 * Creates an initial DOM representation for the component.
 */
ma.Login.prototype.createDom = function() {
  this.logger_.finest('createDom Called');
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing HTML DIV element.
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 */
ma.Login.prototype.decorateInternal = function(element) {

  this.logger_.finest('decorateInternal Called');
  this.setElementInternal(element);

  this.container = goog.dom.createDom('div', 'span4 offset4');
  soy.renderElement(this.container, ma.LoginWebView.top);
  this.userid = new ma.uiUtilFormInput('Username', 'user_id');
  this.password = new ma.uiUtilFormInput('Password',
      'password', 'password');
  this.f1 = new ma.uiUtilForm('SECURITY_USER', 'AUTHENTICATE');
  this.f1.addInput(this.userid, this.password);
  this.f1.setFormStyle('form-horizontal');
  this.loginButton = goog.dom.createDom('button', 
      {'class': 'btn btn-large btn-primary', 'type':'button'}, 'Login');
  this.f1.addAction(this.loginButton);
  ma.uiUtil.stageRender(this, this.f1, this.container);
  this.f1.bind({'user_id': 'ledger', 'password': 'ledger'});
  this.f1.action='AUTHENTICATE'
  goog.dom.appendChild(this.element_, this.container);
  this.eh_.listen(this.loginButton,
      goog.events.EventType.CLICK, this.submitLoginCreds);
  //this.kh_ = new goog.events.KeyHandler(element);
  //this.eh_.listen(this.kh_,
      //goog.events.KeyHandler.EventType.KEY, this.onKey_);
};



/** @override */
ma.Login.prototype.dispose = function() {

  this.logger_.finest('dispose Called');
  goog.base(this, 'dispose');
  this.eh_.dispose();
  if (this.kh_) { this.kh_.dispose(); }
};


/**
 * Called when component's element is known to be in the document.
 */
ma.Login.prototype.enterDocument = function() {

  this.logger_.finest('enterDocument Called');
  goog.base(this, 'enterDocument');
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.Login.prototype.exitDocument = function() {

  this.logger_.finest('exitDocument Called');
  goog.base(this, 'exitDocument');
};


/**
 *
 *
 */
ma.Login.prototype.submitLoginCreds = function() {

  goog.net.XhrIo.send(ma.CONST_PRIMARY_SERVER_URL,
        this.handleLoginResponse, 'POST', this.f1.getFormDataString());
};


/**
 * @param {goog.events.Event} e the event.
 *
 *
 */
ma.Login.prototype.handleLoginResponse = function(e) {

    /** @type {Object} */
    var obj = e.target.getResponseJson();
    /** @type {string} */
    var session = obj['rows'][0]['session_id'];
    /** @type {string} */
    var userId = obj['rows'][0]['user_id'];
    /** @type {number} */
    var sessionExpirationSeconds = 60 * 20;

    if (session !== '') {
      goog.net.cookies.set('session_id', session, sessionExpirationSeconds);
      goog.net.cookies.set('user_id', userId, sessionExpirationSeconds);
      app.hist.setToken('MainLauncher');
    } else {
      alert('failed');
    }
};

ma.pages.addEventListener('LOGIN',
    function(e) {
      if (app.loginWeb === undefined) {
        app.loginWeb = new ma.Login();
      }
      ma.uiUtil.changePage(app.loginWeb);
    }, false);
