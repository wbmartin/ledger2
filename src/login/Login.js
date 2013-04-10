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
goog.require('goog.dom.classes');
goog.require('goog.dom.forms');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.KeyHandler.EventType');
goog.require('goog.net.XhrIo');
goog.require('goog.ui.Component');
goog.require('ma.LoginWebView');
goog.require('ma.form.ColumnLayout');
goog.require('ma.uiutil');


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
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing HTML DIV element as a SampleComponent.
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 */
ma.Login.prototype.decorateInternal = function(element) {
  ma.Login.superClass_.decorateInternal.call(this, element);
  //goog.dom.appendChild(element,
    //goog.dom.htmlToDocumentFragment(ma.LoginWebView.top()));
  //goog.dom.appendChild(element, \
      //soy.renderAsFragment(ma.LoginWebView.top));
  soy.renderElement(element, ma.LoginWebView.top);
  
  this.lblUserId = goog.dom.createDom('label',null,'Username');
  this.txtUserId = goog.dom.createDom('input',{'name': 'user_id','type': 'text'});
  var trUserId =  ma.uiutil.makerow(this.lblUserId, this.txtUserId);  

  this.lblPassword = goog.dom.createDom('label',null,'Password');
  this.txtPassword = goog.dom.createDom('input',{'name': 'password','type': 'password'});
  var trPassword =  ma.uiutil.makerow(this.lblPassword, this.txtPassword);

  var t = goog.dom.createDom('table', null, trUserId, trPassword);
  this.f1 = goog.dom.createDom('form',null,t);
  goog.dom.appendChild(element,this.f1);
  //this.fl1 = new ma.form.ColumnLayout();
  
  //var userid = new ma.input('user_id');
  //userid.label = 'User Id';
  //userid.value = 'ledger';
  //userid.type = 'text';
  //this.fl1.addField(userid);

  //var passwd = new ma.input('password');
  //passwd.label = 'Password';
  //passwd.type = 'password';
  //passwd.value = 'ledger';
  //this.fl1.addField(passwd);

  //this.fl1.render(element);
  //var d = goog.dom.createDom('div', {'id': 'form1' });
  //this.fl1.decorate(d);
  //goog.dom.appendChild(element, d);

  this.loginButton = goog.dom.createDom('button', null, 'Login');
  goog.dom.appendChild(element, this.loginButton);

  this.eh_.listen(this.loginButton,
      goog.events.EventType.CLICK, this.submitLoginCreds);

  //this.kh_ = new goog.events.KeyHandler(element);
  //this.eh_.listen(this.kh_,
      //goog.events.KeyHandler.EventType.KEY, this.onKey_);
};



/** @override */
ma.Login.prototype.disposeInternal = function() {
  ma.Login.superClass_.disposeInternal.call(this);
  this.eh_.dispose();
  if (this.kh_) {
    this.kh_.dispose();
  }
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
  ma.Login.superClass_.exitDocument.call(this);
 // this.eh_.unlisten(this.getElement(), goog.events.EventType.CLICK,
 //     this.onDivClicked_);
};


/**
 *
 *
 */
ma.Login.prototype.submitLoginCreds = function() {
  var qdstr = goog.dom.forms.getFormDataString(this.f1);
  qdstr += ma.uiutil.resourceAction('SECURITY_USER', 'AUTHENTICATE');
  goog.net.XhrIo.send(ma.CONST.PRIMARY_SERVER_URL,
        this.handleLoginResponse, 'POST', qdstr);
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
      ma.GLOBAL.pages.dispatchEvent(new ma.plEvent('TEST', '2'));
    } else {
      alert('failed');
    }
};
