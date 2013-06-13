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
  /** @type {ma.uiUtilFormInput} */
  this.profileName =  new ma.uiUtilFormInput('Profile name', 'profile_name');

  /** @type {ma.uiUtilFormInput} */
  this.lastUpdateDate = new ma.uiUtilFormInput('', 'last_update','hidden');

  /** @type {ma.uiUtilFormInput} */
  //this.

  
  this.logger_.finest('decorateInternal Called');
  this.setElementInternal(element);
  this.pageRow = goog.dom.createDom('div', {'class': 'row'});
  this.accessGroupsList = goog.dom.createDom('div',
      {'class': 'span6'});
  this.accessGroupsEditPage = goog.dom.createDom('div',
      {'class': 'span6', 'style': ''});
  this.selectorTable = new ma.uiUtilTable();
  this.selectorTable.render(this.accessGroupsList);
  this.selectorTable.columns_ = [
    {src: 'profile_name', displayName: 'Profile Name'},
    { displayName: 'I want to',
      src: function(accessGroup, ndx) {
        return soy.renderAsFragment(ma.AccessGroupSOY.iWantTo,
            {w: accessGroup, ndx:ndx});
        // variable must be wrapped for soy advanced optimizations
      }
    }

  ];
  /** @type {ma.uiUtilForm} */
  this.f1 = new ma.uiUtilForm('SECURITY_PROFILE','INSERT');
  this.f1.addInput(this.profileName);
  this.f1.addHidden('last_update');
  this.f1.addHidden('security_profile_id');
  this.saveButton = goog.dom.createDom('button', 
      {'class:': 'btn btn-large btn-primary', 'type':'button'},'Save');
  this.f1.addAction(this.saveButton);

  this.eh_.listen(this.saveButton,
      goog.events.EventType.CLICK, this.save);
  ma.uiUtil.stageRender(this,  this.f1, this.accessGroupsEditPage);

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
  this.serverCall.make(this.handleSelectResponse, qstr);
};


/**
 * @param {goog.events.Event} e the event.
 *
 *
 */
ma.AccessGroups.prototype.handleSelectResponse = function(e) {
  this.logger_.finest('handler called');
  /** @type {Object} */
  var obj = e.target.getResponseJson();
  if (!obj['SERVER_SIDE_FAIL']) {
      rowNdx = 0;
      rowCount = obj.rows.length;
      this.selectorTable.clearData();
      this.selectorTable.data_ = obj.rows;
  }
  this.selectorTable.refreshData();
};



/**
 *
 * @param {goog.Uri.QueryData} queryData the query data object.
 */
ma.AccessGroups.prototype.processQueryStr = function(queryData) {
  var securityProfileId = queryData.get('security_profile_id');
  var cacheId = queryData.get('cacheid');
  if (securityProfileId !== undefined) {
    if (cacheId !== undefined && 
        this.selectorTable.data_[cacheId] !== undefined &&
        securityProfileId == this.selectorTable.data_[cacheId].security_profile_id){
      this.f1.bind(this.selectorTable.data_[cacheId], cacheId);
    } else {
      this.selectById(securityProfileId);
    }
  } else {
    this.f1.clear();
  }
};

/**
 *@param {number} id the identifier toquery
 */
ma.AccessGroups.prototype.selectById = function (id){
var qstr = ma.uiUtil.buildResourceActionString('SECURITY_PROFILE', 'SELECT');
 qstr += '&where_clause=security_profile_id%3D' + id;
  this.serverCall = new ma.ServerCall(this.serverURL, this);
  this.serverCall.make(this.handleSelectByIdResponse, qstr);
};


/**
 * @param {goog.events.Event} e the event.
 */
ma.AccessGroups.prototype.handleSelectByIdResponse = function(e){
  var obj = e.target.getResponseJson();
  this.f1.bind(obj.rows[0]);
  
};

/**
 *
 *
 */
ma.AccessGroups.prototype.save = function(){
  /** @type {string} */
  var qstr = this.f1.getFormDataString();
  this.serverCall = new ma.ServerCall(this.serverURL, this);
  this.serverCall.make(this.handleSaveResponse, qstr);
}

/**
 * @param {goog.events.Event} e the event.
 *
 *
 */
ma.AccessGroups.prototype.handleSaveResponse = function(e){
  var obj = e.target.getResponseJson();
  this.f1.bind(obj.rows[0], obj.cacheid);
  if(obj.cacheid && this.selectorTable.data_[obj.cacheid].security_profile_id == obj.rows[0].security_profile_id ){
    this.selectorTable.data_[obj.cacheid] = obj.rows[0];
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


