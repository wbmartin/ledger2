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
 * @param {string} resource the resource name.
 * @param {string} action the action name.
 * @return {string} the resource and action to append.
 */
ma.uiUtil.resourceAction = function(resource, action) {
  return '&spwfResource=' + resource + '&spwfAction=' + action;
};

/**
 * @param {Element} lbl the label.
 * @param {Element} inpt the input.
 * @return {Element} the table row.
 */
ma.uiUtil.buildJustifiedFormRow = function(lbl, inpt) {
  var td1 = goog.dom.createDom('td', null, lbl);
  var td2 = goog.dom.createDom('td', null, inpt);
 return goog.dom.createDom('tr', null, td1, td2);
};


/**
 *
 * @param {Array} formRows the array of form rows built by above function.
 * @return {Element} a form element.
 */
ma.uiUtil.buildJustifiedForm = function(formRows) {
  var t = goog.dom.createDom('table', null);
  var rowCount = formRows.length;
  for (var i = 0; i < rowCount; i++) {
    goog.dom.appendChild(t, formRows[i]);
  }
  var f = goog.dom.createDom('form', null, t);
  return f;
};


