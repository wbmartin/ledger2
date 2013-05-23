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
 * @fileoverview A mainLauncher component.
 *
 */
goog.provide('ma.MainLauncher');

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
goog.require('ma.MainLauncherWebView');
goog.require('ma.pages');
goog.require('ma.uiUtil');
goog.require('ma.uiUtilTable');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
ma.MainLauncher = function(opt_domHelper) {
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
  this.logger_ = goog.debug.Logger.getLogger('ma.MainLauncher');
  this.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
  this.logger_.finest('Constructor Called');
};
goog.inherits(ma.MainLauncher, goog.ui.Component);



/**
 * Creates an initial DOM representation for the component.
 */
ma.MainLauncher.prototype.createDom = function() {
  this.logger_.finest('createDom Called');
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing HTML DIV element as a SampleComponent.
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 */
ma.MainLauncher.prototype.decorateInternal = function(element) {
  this.logger_.finest('decorateInternal Called');
  this.setElementInternal(element);
  var row = goog.dom.createDom('div', {'class': 'row'});

  soy.renderElement(this.getElement(), ma.MainLauncherWebView.top);

  this.accessGroupsIcon = goog.dom.createDom('div',
      {'class': 'span2 largeIcon'},
      goog.dom.createDom('div',
        {'class': 'sprite64Icon keyIcon center'}),
      'AccessGroups');
  this.eh_.listen(this.accessGroupsIcon, goog.events.EventType.CLICK,
      this.onAccessGroupsIconClicked_);
  goog.dom.appendChild(row, this.accessGroupsIcon);





  goog.dom.appendChild(this.getElement(), row);
  this.tbl = new ma.uiUtilTable();
  this.tbl.render(this.getElement());
  this.tbl.data_ = [{'a': '1', 'b': '2', 'c': '3'},
    {'a': '4', 'b': '5', 'c': '6'}
  ];
  this.tbl.columns_ = [{srcName: 'a', displayName: 'A'},
  {srcName: 'b', displayName: 'B'}, {srcName: 'c', displayName: 'C'}];
  this.tbl.refreshData();


 // this.eh_.listen(this.mainLauncherButton,
 //     goog.events.EventType.CLICK, this.submitMainLauncherCreds);
  //this.kh_ = new goog.events.KeyHandler(element);
  //this.eh_.listen(this.kh_,
      //goog.events.KeyHandler.EventType.KEY, this.onKey_);
};



/** @override */
ma.MainLauncher.prototype.dispose = function() {
  this.logger_.finest('dispose Called');
  goog.base(this, 'dispose');
  this.eh_.dispose();
  if (this.kh_) { this.kh_.dispose(); }
};


/**
 * Called when component's element is known to be in the document.
 */
ma.MainLauncher.prototype.enterDocument = function() {
  this.logger_.finest('enterDocument Called');
  goog.base(this, 'enterDocument');
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.MainLauncher.prototype.exitDocument = function() {
  this.logger_.finest('exitDocument Called');
  goog.base(this, 'exitDocument');
};





/**
 * Handles specific icon clicks.
 * @param {goog.events.Event} event The click event.
 * @private
 */
ma.MainLauncher.prototype.onAccessGroupsIconClicked_ = function(event) {
  app.hist.setToken('AccessGroup');
};












ma.pages.addEventListener('MainLauncher',
    function(e) {
      if (app.mainLauncherWeb === undefined) {
        app.mainLauncherWeb = new ma.MainLauncher();
      }
      //ma.pages.currentPage.dispose();
      //app.mainLauncherWeb.render(ma.GLOBAL_primaryContainer);
      ma.uiUtil.changePage(app.mainLauncherWeb);
    }, false);

