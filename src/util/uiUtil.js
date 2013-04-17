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
/**
 *
 * @param {goog.ui.Component} pComponent the child.
 * @param {goog.ui.Component} cComponent the child.
 * @param {Element} opt_pElement the element to add.
 */
ma.uiUtil.stageRender = function(pComponent, cComponent, opt_pElement ){
  cComponent.createDom();
  opt_pElement = opt_pElement || pComponent.getElement();
  goog.dom.appendChild(opt_pElement, cComponent.getElement());
  pComponent.addChild(cComponent); 
};
