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
  /** @type {Date} */
  this.selectorCacheRefreshed;
  /** @type {number} */
  this.selectorCacheExpireMs = 60000;
  /** @type {string} */
  this.stdOrderBy = 'profile_name';
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
  this.profileName = new ma.uiUtilFormInput('Profile name', 'profile_name');
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
            {w: accessGroup, ndx: ndx});
        // variable must be wrapped for soy advanced optimizations
      }
    }

  ];
  /** @type {ma.uiUtilForm} */
  this.f1 = new ma.uiUtilForm('SECURITY_PROFILE', 'INSERT');
  this.f1.addInput(this.profileName);
  this.f1.addHidden('last_update');
  this.f1.addHidden('security_profile_id');
  this.saveButton = goog.dom.createDom('button',
      {'class:': 'btn btn-large btn-primary', 'type': 'button'},'Add');
  this.f1.addAction(this.saveButton);
  this.eh_.listen(this.saveButton,
      goog.events.EventType.CLICK, this.save);
  this.clearButton = goog.dom.createDom('button',
      {'class:': 'btn btn-large', 'type': 'button'},'Clear');
  this.f1.addAction(this.clearButton);
  this.eh_.listen(this.clearButton,
      goog.events.EventType.CLICK, this.clearForm);

  ma.uiUtil.stageRender(this, this.f1, this.accessGroupsEditPage);

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
 * @param {string=} opt_orderby the orderby clause.
 */
ma.AccessGroups.prototype.selectAccessGroups = function(opt_orderby) {
  this.logger_.finest('selectAccessGroups Called');
  /** @type {string} */
  var qstr = ma.uiUtil.buildResourceActionString('SECURITY_PROFILE', 'SELECT');
  var orderby = opt_orderby || this.stdOrderBy;
  qstr += '&orderby_clause=' + orderby;
  this.serverCall = new ma.ServerCall(this.serverURL, this);
  this.serverCall.make(this.hdlRspSelect, qstr);
};


/**
 * @param {goog.events.Event} e the event.
 *
 *
 */
ma.AccessGroups.prototype.hdlRspSelect = function(e) {
  this.logger_.finest('handle Response Select called');
  /** @type {Object} */
  var obj = e.target.getResponseJson();
  if (!obj['SERVER_SIDE_FAIL']) {
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
  this.logger_.finest('processQueryStr called');
  /** @type {number} */
  var securityProfileId = /** @type {number} */
        parseInt(queryData.get('security_profile_id'), 10) || -1;
  /** @type {number} */
  var cacheId = /** @type {number}*/ (queryData.get('cacheid')) || -1;
  if (securityProfileId !== -1) {
    if (cacheId !== -1 &&
      this.selectorTable.data_[cacheId] !== undefined &&
      securityProfileId === this.selectorTable.data_[cacheId].
      security_profile_id) {
        this.f1.bind(this.selectorTable.data_[cacheId], cacheId);
    } else {
      this.selectById(securityProfileId);
    }
  } else {
    this.f1.clear();
  }
};

/**
 * @param {?number} id the identifier toquery.
 */
ma.AccessGroups.prototype.selectById = function(id) {
  this.logger_.finest('selectById called');
  var qstr = ma.uiUtil.buildResourceActionString('SECURITY_PROFILE', 'SELECT');
  qstr += '&where_clause=security_profile_id%3D' + id;
  this.serverCall = new ma.ServerCall(this.serverURL, this);
  this.serverCall.make(this.hdlRspSelectById, qstr);
};


/**
 * @param {goog.events.Event} e the event.
 */
ma.AccessGroups.prototype.hdlRspSelectById = function(e) {
  this.logger_.finest('hdlRspSelectById called');
  var obj = e.target.getResponseJson();
  this.f1.bind(obj.rows[0], obj.cacheid);
};

/**
 *
 *
 */
ma.AccessGroups.prototype.save = function() {
  this.logger_.finest('save called');
  /** @type {string} */
  var qstr = this.f1.getFormDataString();
  this.serverCall = new ma.ServerCall(this.serverURL, this);
  this.serverCall.make(this.hdlRspSave, qstr);
};

/**
 * @typedef {{
 *      security_profile_id: number
 *  }}
 */
ma.SECURITY_PROFILE;

/**
 * @param {goog.events.Event} e the event.
 *
 *
 */
ma.AccessGroups.prototype.hdlRspSave = function(e) {
  this.logger_.finest('handle Response Save called');
  /** @type {Object} */
  var obj = e.target.getResponseJson();
  /** @type {ma.SECURITY_PROFILE} */
  var securityProfile =  /** @type {ma.SECURITY_PROFILE} */(obj.rows[0]);
  /** @type {number} */
  var cacheId = this.selectorTable.update(obj.rows[0],
      obj.cacheid, 'security_profile_id', obj['spwfAction']);
  if (obj['spwfAction'] === 'INSERT') {
    window.location.hash = '#AccessGroup?security_profile_id=' +
      obj.rows[0]['security_profile_id'] + '&cacheid=' + cacheId;
  } else {
    this.f1.bind(obj.rows[0], obj.cacheid);
  }
};

/**
 *
 *
 */
ma.AccessGroups.prototype.clearForm = function() {
  this.logger_.finest('clearForm');
  window.location.hash = '#AccessGroup';
};

/**
 *
 *
 *
 */
ma.AccessGroups.prototype.refreshSelectorCache = function() {
    if (!this.isSelectorCacheValid()) {
      this.selectAccessGroups();
      this.selectorCacheRefreshed = new Date();
    }
};


/**
 *
 * @return {boolean} true if cache is valid.
 */
ma.AccessGroups.prototype.isSelectorCacheValid = function() {
/** @type {number} */
  var cacheAge = new Date() - this.selectorCacheRefreshed;
  if (this.selectorCacheRefreshed === undefined ||
      cacheAge > this.selectorCacheExpireMs) {
        return false;
  }else {
        return true;
  }
};


ma.pages.addEventListener('AccessGroup',
    function(e) {
      if (app.accessGroupsWeb === undefined) {
        app.accessGroupsWeb = new ma.AccessGroups();
      }
      ma.uiUtil.changePage(app.accessGroupsWeb);
      app.accessGroupsWeb.refreshSelectorCache();
    }, false);


