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
goog.require('ma.CONST');
goog.require('goog.debug.Logger');

goog.debug.Logger.getLogger('ma.Login').setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
/**
 *
 * @param {goog.ui.Component} pComponent the child.
 * @param {goog.ui.Component} cComponent the child.
 * @param {Element} opt_pElement the element to add.
 */
ma.uiUtil.stageRender = function(pComponent, cComponent, opt_pElement) {
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
  if (ma.pages.currentPage !== undefined) {
    ma.pages.currentPage.dispose();
  }
  newpage.render(ma.GLOBAL_primaryContainer);
  ma.pages.currentPage = newpage;
};


/**
 * @return {boolean} is authenticated.
 */
ma.uiUtil.authenticate = function() {
 goog.debug.Logger.getLogger('ma.uiUtil').finest('authenticate called:');
  if (goog.net.cookies.get('session_id') === undefined) {
    return false;
  }
  return true;
};


/**
 *
 * @param {goog.events.Event} e the event.
 */
ma.uiUtil.navCallback = function(e) {
 goog.debug.Logger.getLogger('ma.uiUtil').finest(
     'app.navCallback called:' + e.token);
  if (e.token === 'LOGIN') { return; }
  if (ma.uiUtil.authenticate()) {
    ma.uiUtil.dispatcher(e.token);
  } else {
    app.TARGET_PAGE = location.hash.substr(1);
    location.hash = 'LOGIN';
    ma.pages.dispatchEvent(new ma.plEvent('LOGIN'));
  }
};

/**
 * @param {string} request_ the request to dispatch.
 *
 */
ma.uiUtil.dispatcher = function(request_) {
  goog.debug.Logger.getLogger('ma.uiUtil').finest('dispatcher Called');
  /** @type {goog.Uri} */
  var urlData = goog.Uri.parse(request_);
  /** @type string*/
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


