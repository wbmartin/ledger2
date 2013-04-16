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
};
goog.inherits(ma.Login, goog.ui.Component);



/**
 * Creates an initial DOM representation for the component.
 */
ma.Login.prototype.createDom = function() {
  return this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing HTML DIV element as a SampleComponent.
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 */
ma.Login.prototype.decorateInternal = function(element) {
  //ma.Login.superClass_.decorateInternal.call(this, element);
  this.setElementInternal(element);

  this.container = goog.dom.createDom('div', 'span4 offset4');
  soy.renderElement(this.container, ma.LoginWebView.top);
  this.userid = new ma.uiUtilFormInput('Username', 'user_id');
  this.password = new ma.uiUtilFormInput('Password',
      'password', 'password');
  this.f1 = new ma.uiUtilForm('SECURITY_USER', 'AUTHENTICATE');
  this.f1.addInput(this.userid, this.password);
    goog.dom.appendChild(this.container, this.f1.createDom('form-horizontal'));
  this.userid.input.value = 'ledger';
  this.password.input.value = 'ledger';

  this.loginButton = goog.dom.createDom('button', null, 'Login');
  goog.dom.appendChild(this.container, this.loginButton);
  goog.dom.appendChild(this.element_, this.container);
  this.addChild(this.f1);

  this.eh_.listen(this.loginButton,
      goog.events.EventType.CLICK, this.submitLoginCreds);
  return this.element_;
  //this.kh_ = new goog.events.KeyHandler(element);
  //this.eh_.listen(this.kh_,
      //goog.events.KeyHandler.EventType.KEY, this.onKey_);
};



/** @override */
ma.Login.prototype.disposeInternal = function() {
  ma.Login.superClass_.disposeInternal.call(this);
  this.eh_.dispose();
  if (this.kh_) { this.kh_.dispose(); }
};


/**
 * Called when component's element is known to be in the document.
 */
ma.Login.prototype.enterDocument = function() {
  ma.Login.superClass_.enterDocument.call(this);
  //this.eh_.listen(this.getElement(), goog.events.EventType.CLICK,
  //    this.onDivClicked_);
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.Login.prototype.exitDocument = function() {

 // this.eh_.unlisten(this.getElement(), goog.events.EventType.CLICK,
 //     this.onDivClicked_);
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
    var session = obj['rows'][0]['session_id'];
    if (session !== '') {
      ma.pages.dispatchEvent(new ma.plEvent('TEST', '2'));
    } else {
      alert('failed');
    }
};

ma.pages.addEventListener('LOGIN_PAGE',
    function(e) {
      //alert(e.payload);
      //app.logger_.finest('showLoginWeb called');
      if (app.loginWeb === undefined) {
        app.loginWeb = new ma.Login();
      }
      app.loginWeb.render(ma.GLOBAL_primaryContainer);
    }, false);

