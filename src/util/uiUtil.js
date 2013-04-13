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

goog.require('goog.dom.classes');

/**
 * @param {string} resource the resource name.
 * @param {string} action the action name.
 * @return {string} the resource and action to append.
 */
ma.uiUtil.resourceAction = function(resource, action) {
  return '&spwfResource=' + resource + '&spwfAction=' + action;
};


/**
 * @param {string} lblText the label.
 * @param {string} inptName the input.
 * @param {string=} opt_inputType the type of input.
 * @constructor
 */

ma.uiUtil.formInput = function(lblText, inptName, opt_inputType) {
  this.label = goog.dom.createDom('label', null, lblText);
  this.inputType = opt_inputType || 'text';
  if (this.inputType !== 'select') {
    this.input = goog.dom.createDom('input',
        {'name': inptName, 'type': this.inputType });
  }else {
    this.input = goog.dom.createDom('select', {'name': inptName});
  }
  goog.dom.classes.add(this.label, 'control-label');
  goog.dom.classes.add(this.input, 'input-xlarge');
  this.helpBlock = goog.dom.createDom('p', {'class': 'help-block'});
};

/**
 *
 * @return {Element} the form input.
 */
ma.uiUtil.formInput.prototype.make = function() {
  this.controlsDiv = goog.dom.createDom('div', {'class': 'controls'},
      this.input, this.helpBlock);
  this.controlGroupDiv = goog.dom.createDom('div',
      {'class': 'control-group'}, this.label, this.controlsDiv);
  return this.controlGroupDiv;
};

/**
 * @param {string=} opt_resource the default resource for the form.
 * @param {string=} opt_action the default action for the form.
 * @constructor
 */
ma.uiUtil.form = function(opt_resource, opt_action) {
  this.inputs = new Array();
  this.resource = opt_resource;
  this.action = opt_action;

};

/**
 * @param {...(Object|string|Array|NodeList)} var_args inputs to add.
 */
ma.uiUtil.form.prototype.addInput = function(var_args) {
  var inputCount = arguments.length;
  for (var ndx = 0; ndx < inputCount; ndx++) {
    this.inputs.push(arguments[ndx]);
  }
};

/**
 *
 * @return {string} the forms query data string.
 */
ma.uiUtil.form.prototype.getFormDataString = function() {
  var qdstr = '&spwfResource=' + this.resource + '&spwfAction=' + this.action;
  return goog.dom.forms.getFormDataString(this.form) + qdstr;
};


/**
 *
 * @param {string=} opt_class the form class.
 * @return {Element} the created Form.
 */
ma.uiUtil.form.prototype.make = function(opt_class) {
  this.renderClass = opt_class || 'form-horizontal';
  var fs = goog.dom.createDom('fieldset', null);
  var rowCount = this.inputs.length;
  for (var i = 0; i < rowCount; i++) {
    goog.dom.appendChild(fs, this.inputs[i].make());
  }
  this.form = goog.dom.createDom('form', {'class': this.renderClass}, fs);
  return this.form;

};




