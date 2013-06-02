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
 * @fileoverview A page2 component.
 *
 */
goog.provide('ma.Page2');

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
goog.require('ma.Page2WebView');
goog.require('ma.pages');
goog.require('ma.uiUtil');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
ma.Page2 = function(opt_domHelper) {
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
  this.logger_ = goog.debug.Logger.getLogger('ma.Page2');
  this.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
  this.logger_.finest('Constructor Called');
};
goog.inherits(ma.Page2, goog.ui.Component);



/**
 * Creates an initial DOM representation for the component.
 */
ma.Page2.prototype.createDom = function() {
  this.logger_.finest('createDom Called');
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing HTML DIV element as a SampleComponent.
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 */
ma.Page2.prototype.decorateInternal = function(element) {
  this.logger_.finest('decorateInternal Called');
  this.setElementInternal(element);
  var row = goog.dom.createDom('div', {'class': 'row'});

  soy.renderElement(this.getElement(), ma.Page2WebView.top);


 // this.eh_.listen(this.page2Button,
 //     goog.events.EventType.CLICK, this.submitPage2Creds);
  //this.kh_ = new goog.events.KeyHandler(element);
  //this.eh_.listen(this.kh_,
      //goog.events.KeyHandler.EventType.KEY, this.onKey_);
};



/** @override */
ma.Page2.prototype.dispose = function() {
  this.logger_.finest('dispose Called');
  goog.base(this, 'dispose');
  this.eh_.dispose();
  if (this.kh_) { this.kh_.dispose(); }
};


/**
 * Called when component's element is known to be in the document.
 */
ma.Page2.prototype.enterDocument = function() {
  this.logger_.finest('enterDocument Called');
  goog.base(this, 'enterDocument');
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.Page2.prototype.exitDocument = function() {
  this.logger_.finest('exitDocument Called');
  goog.base(this, 'exitDocument');
};





/**
 * Handles specific idon clicks.
 * @param {goog.events.Event} event The click event.
 * @private
 */
ma.Page2.prototype.onKolfIconClicked_ = function(event) {
//alert('ok');
  };






ma.pages.addEventListener('PAGE2',
    function(e) {
      if (app.page2Web === undefined) {
        app.page2Web = new ma.Page2();
      }
      //ma.pages.currentPage.dispose();
      //app.page2Web.render(ma.GLOBAL_primaryContainer);
      ma.uiUtil.changePage(app.page2Web);
    }, false);

