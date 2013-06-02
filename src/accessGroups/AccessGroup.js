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
 * @fileoverview A accessGroups component.
 *
 */
goog.provide('ma.AccessGroup');

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
goog.require('ma.AccessGroupSOY');
goog.require('ma.ServerCall');
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
ma.AccessGroups = function(opt_domHelper) {

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
  this.logger_ = goog.debug.Logger.getLogger('ma.AccessGroups');
  this.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
  this.logger_.finest('Constructor Called');
  this.serverURL = ma.CONST_SERVER_CONTEXT + '/server.pl';
};
goog.inherits(ma.AccessGroups, goog.ui.Component);



/**
 * Creates an initial DOM representation for the component.
 */
ma.AccessGroups.prototype.createDom = function() {

  this.logger_.finest('createDom Called');
  this.decorateInternal(this.dom_.createElement('div'));
};


/**
 * Decorates an existing HTML DIV element.
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 */
ma.AccessGroups.prototype.decorateInternal = function(element) {

  this.logger_.finest('decorateInternal Called');
  this.setElementInternal(element);
  this.pageRow = goog.dom.createDom('div', {'class': 'row'});
  this.accessGroupsList = goog.dom.createDom('div',
      {'class': 'span6'});
  this.accessGroupsEditPage = goog.dom.createDom('div',
      {'class': 'span6', 'style': 'background:red'},'ok');
  this.accessGroupsTable = new ma.uiUtilTable();
  this.accessGroupsTable.render(this.accessGroupsList);
  this.accessGroupsTable.columns_ = [
    {src: 'profile_name', displayName: 'Profile Name'},
    { displayName: 'I want to',
      src: function(accessGroup) {
        return soy.renderAsFragment(ma.AccessGroupSOY.iWantTo,
            {w: accessGroup});
        // variable must be wrapped for soy advanced optimizations
      }
    }

  ];
  goog.dom.appendChild(this.pageRow, this.accessGroupsList);
  goog.dom.appendChild(this.pageRow, this.accessGroupsEditPage);
  goog.dom.appendChild(this.element_, this.pageRow);
};



/** @override */
ma.AccessGroups.prototype.dispose = function() {

  this.logger_.finest('dispose Called');
  goog.base(this, 'dispose');
  this.eh_.dispose();
  if (this.kh_) { this.kh_.dispose(); }
};


/**
 * Called when component's element is known to be in the document.
 */
ma.AccessGroups.prototype.enterDocument = function() {

  this.logger_.finest('enterDocument Called');
  goog.base(this, 'enterDocument');
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.AccessGroups.prototype.exitDocument = function() {

  this.logger_.finest('exitDocument Called');
  goog.base(this, 'exitDocument');
};


/**
 *
 *
 */
ma.AccessGroups.prototype.selectAccessGroups = function() {

  /** @type {string} */
  var qstr = ma.uiUtil.buildResourceActionString('SECURITY_PROFILE', 'SELECT');
  this.serverCall = new ma.ServerCall(this.serverURL, this);
  this.serverCall.make(this.handleSelectAccessGroupsResponse, qstr);
};


/**
 * @param {goog.events.Event} e the event.
 *
 *
 */
ma.AccessGroups.prototype.handleSelectAccessGroupsResponse = function(e) {

  this.logger_.finest('handler called');
  /** @type {Object} */
  var obj = e.target.getResponseJson();
  /** @type {number} */
  var rowNdx;
  /** @type {number} */
  var rowCount;

    if (!obj['SERVER_SIDE_FAIL']) {
      rowNdx = 0;
      rowCount = obj.rows.length;
      this.accessGroupsTable.clearData();
      for (rowNdx = 0; rowNdx < rowCount; rowNdx++) {
        this.accessGroupsTable.data_.push(obj.rows[rowNdx]);
        this.logger_.finest('test worked');
      }
    }
  this.accessGroupsTable.refreshData();
};
/**
 *
 * @param {goog.Uri.QueryData} queryData the query data object.
 */
ma.AccessGroups.prototype.processQueryStr = function(queryData) {

  if (queryData.containsKey('security_profile_id')) {
  alert(queryData.get('security_profile_id'));
  }

};

ma.pages.addEventListener('AccessGroup',
    function(e) {
      if (app.accessGroupsWeb === undefined) {
        app.accessGroupsWeb = new ma.AccessGroups();
      }
      ma.uiUtil.changePage(app.accessGroupsWeb);
      app.accessGroupsWeb.selectAccessGroups();
    }, false);


