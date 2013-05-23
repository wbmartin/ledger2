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
 * @fileoverview User Interface Utils.
 *
 */


goog.provide('ma.uiUtil');
goog.require('goog.debug.Logger');
goog.require('ma.CONST');

/** @type {goog.debug.Logger}
 * @private
 */
ma.uiUtil.logger_ = goog.debug.Logger.getLogger('ma.uiUtil');
ma.uiUtil.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
/**
 *
 * @param {goog.ui.Component} pComponent the child.
 * @param {goog.ui.Component} cComponent the child.
 * @param {Element} opt_pElement the element to add.
 */
ma.uiUtil.stageRender = function(pComponent, cComponent, opt_pElement) {
 ma.uiUtil.logger_.finest('StageRender called:');
  cComponent.createDom();
  opt_pElement = opt_pElement || pComponent.getElement();
  goog.dom.appendChild(opt_pElement, cComponent.getElement());
  pComponent.addChild(cComponent);
};

/**
 *
 * @param {goog.ui.Component} newpage the new page.
 */
ma.uiUtil.changePage = function(newpage) {
 ma.uiUtil.logger_.finest('ChangePage called:');
  if (ma.pages.currentPage !== undefined) {
  goog.dom.removeChildren(ma.GLOBAL_primaryContainer);
    ma.pages.currentPage.exitDocument();
  }
  newpage.render(ma.GLOBAL_primaryContainer);
  ma.pages.currentPage = newpage;
};


/**
 * @return {boolean} is authenticated.
 */
ma.uiUtil.authenticate = function() {
 ma.uiUtil.logger_.finest('authenticate called:');
  if (goog.net.cookies.get('session_id') === undefined) {
    return false;
  }
  return true;
};

/** @type {boolean} */
ma.uiUtil.loginPending = false;

/**
 *
 * @param {goog.events.Event} e the event.
 */
ma.uiUtil.navCallback = function(e) {
 ma.uiUtil.logger_.finest('navCallback called:' + e.token);
  if (e.token === 'LOGIN' && ma.uiUtil.loginPending) { return; }
  if (ma.uiUtil.authenticate()) {
    ma.uiUtil.dispatcher(e.token);
    ma.uiUtil.loginPending = false;
  } else {
    app.TARGET_PAGE = location.hash.substr(1);
    location.hash = 'LOGIN';
    ma.uiUtil.loginPending = true;
    ma.pages.dispatchEvent(new ma.plEvent('LOGIN'));
  }
};

/**
 * @param {string} request_ the request to dispatch.
 *
 */
ma.uiUtil.dispatcher = function(request_) {
 ma.uiUtil.logger_.finest('dispatcher called');
  /** @type {goog.Uri} */
  var urlData = goog.Uri.parse(request_);
  /** @type {string}*/
  var key;
  /** @type {Object} */
  var qdObject = {};
  for (key in urlData.queryData_.getKeys()) {
    qdObject.key = urlData.queryData_.getValues(key);
  }
  if (urlData.path_ == undefined || urlData.path_ == '') {
    urlData.path_ = 'MainLauncher';
  }
  ma.pages.dispatchEvent(new ma.plEvent(urlData.path_, qdObject));

};


goog.provide('ma.pages');
goog.require('goog.events.EventTarget');

/**
 * @type {goog.events.EventTarget}
 */
ma.pages = new goog.events.EventTarget();
ma.pages.addEventListener('TEST',
    function(e) { alert('test'); }, false);

/**
 * @constructor
 * @param {string=} opt_type  the event type.
 * @param {Object|string=} opt_payload the payload.
 */
ma.plEvent = function(opt_type, opt_payload) {
  this.type = opt_type || 'EVENT';
  this.payload = opt_payload;
};


