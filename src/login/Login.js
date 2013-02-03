// Copyright 2007 martinanalytics. All Rights Reserved.
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
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.KeyHandler.EventType');
goog.require('goog.ui.Container');
goog.require('ma.LoginWebView');



/**
  * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Container}
 * @constructor
 */
ma.Login = function( opt_domHelper) {
  goog.ui.Container.call(this, opt_domHelper);

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
goog.inherits(ma.Login, goog.ui.Container);



/**
 * Creates an initial DOM representation for the component.
 */
ma.Login.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing HTML DIV element as a SampleContainer.
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 */
ma.Login.prototype.decorateInternal = function(element) {
  ma.Login.superClass_.decorateInternal.call(this, element);
   
   goog.dom.appendChild(element,
      goog.dom.htmlToDocumentFragment(ma.LoginWebView.top() ));
  
  this.kh_ = new goog.events.KeyHandler(element);
  this.eh_.listen(this.kh_, goog.events.KeyHandler.EventType.KEY, this.onKey_);
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
  this.eh_.listen(this.getElement(), goog.events.EventType.CLICK,
      this.onDivClicked_);
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.Login.prototype.exitDocument = function() {
  ma.Login.superClass_.exitDocument.call(this);
  this.eh_.unlisten(this.getElement(), goog.events.EventType.CLICK,
      this.onDivClicked_);
};

