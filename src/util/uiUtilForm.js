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


goog.provide('ma.uiUtilForm');

goog.require('goog.debug.Logger');
goog.require('goog.dom.classes');
goog.require('ma.uiUtil');

/**
 * @param {string=} opt_resource the default resource for the form.
 * @param {string=} opt_action the default action for the form.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */

ma.uiUtilForm = function(opt_resource, opt_action, opt_domHelper) {

  goog.ui.Component.call(this, opt_domHelper);
  /** @type {Array} */
  this.inputs = [];
  /** @type {Array */
  this.actions = [];
  /** @type {string} */
  this.resource = opt_resource || '';
  /** @type {string} */
  this.action = opt_action || '';
  /**
   * Event handler for this object.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eh_ = new goog.events.EventHandler(this);
  /**
   * A reference to the class logger
   * @type {goog.debug.Logger}
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('ma.uiUtilForm');
  this.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
  this.logger_.finest('Constructor Called');
  this.formStyle_ = 'form-horizontal';

};
goog.inherits(ma.uiUtilForm, goog.ui.Component);

/**
 * Creates an initial DOM representation for the component.
 * @param {string} style the form style.
 */
ma.uiUtilForm.prototype.setFormStyle = function(style) {

  this.formStyle_ = style;
};

/**
 * Creates an initial DOM representation for the component.
 */
ma.uiUtilForm.prototype.createDom = function() {

  this.logger_.finest('createDom Called');
  this.decorateInternal(this.dom_.createDom('form', this.formStyle_));
};




/**
 *
 * @param {Element} element the form to decorate.
 */
ma.uiUtilForm.prototype.decorateInternal = function(element) {

  this.logger_.finest('decorateInternal Called');
  this.setElementInternal(element);
  /** @type {Element} */
  this.fieldSet = goog.dom.createDom('fieldset', null);
  /** @type {Element}*/
  this.actionSet = goog.dom.createDom('div',{'class':'form-actions'});
  /** @type {number} */
  var itemCount = this.inputs.length;
  /** @type {number} */
  var i;
  for (i = 0; i < itemCount; i++) {
    //TODO may need to optionally append Child if Element is found
    ma.uiUtil.stageRender(this, this.inputs[i], this.fieldSet);
  }
  itemCount = this.actions.length;
  for (i = 0; i < itemCount; i++){
    //TODO may need to optionally stageRender if Element is not found
    goog.dom.appendChild(this.actionSet, this.actions[i]);
  }
  if (itemCount > 0){
    goog.dom.appendChild(this.fieldSet, this.actionSet);
  }
  goog.dom.appendChild(this.element_, this.fieldSet);
};


/** @override */
ma.uiUtilForm.prototype.dispose = function() {
  this.logger_.finest('dispose Called');
  this.eh_.dispose();
  if (!this.isDisposed()) {
    if (this.kh_) { this.kh_.dispose(); }
    this.eh_.dispose();
    goog.base(this, 'dispose');
  }
};

/**
 * Called when component's element is known to be in the document.
 */
ma.uiUtilForm.prototype.enterDocument = function() {
  this.logger_.finest('enterDocument Called');
  goog.base(this, 'enterDocument');
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.uiUtilForm.prototype.exitDocument = function() {
  this.logger_.finest('exitDocument Called');
  goog.base(this, 'exitDocument');
};

/**
 * @param {...(Object|string|Array|NodeList)} var_args inputs to add.
 */
ma.uiUtilForm.prototype.addInput = function(var_args) {
  /** @type {number} */
  var inputCount = arguments.length;
  /** @type {number} */
  var ndx;
  for (ndx = 0; ndx < inputCount; ndx++) {
    this.inputs.push(arguments[ndx]);
  }
};

/**
 *
 *
 *
 */
ma.uiUtilForm.prototype.addAction = function(var_args){
/** @type {number} */
  var actionCount = arguments.length;
  /** @type {number} */
  var ndx;
  for (ndx = 0; ndx < actionCount; ndx++) {
    this.actions.push(arguments[ndx]);
  }
}

/**
 *
 * @return {string} the forms query data string.
 */
ma.uiUtilForm.prototype.getFormDataString = function() {
  /** @type {number} */
  var inptNdx;
  /** @type {number} */
  var inptCount = this.inputs.length; 
  /** @type {string}*/
  var formDataStr = ma.uiUtil.buildResourceActionString(this.resource, this.action);
  for (inptNdx = 0; inptNdx < inptCount; inptNdx++){
    formDataStr += '&' + this.inputs[inptNdx].inptName + 
      '=' + goog.string.urlEncode(this.inputs[inptNdx].input.value);
  }
  //formDataStr = goog.dom.forms.getFormDataString(
  //    /** @type {HTMLFormElement}*/ (this.element_)) + '&' + 
        //ma.uiUtil.buildResourceActionString(this.resource, this.action);
  return formDataStr;
};

/**
 * @param {Object} bindObj the object to bind.
 */
ma.uiUtilForm.prototype.bind = function(bindObj) {
  /** @type {number} */
  var inptNdx;
  /** @type {number} */
  var inptCount = this.inputs.length;
  /** @type {string} */
  var fieldId;
  for (inptNdx = 0; inptNdx < inptCount; inptNdx++) {
    fieldId = this.inputs[inptNdx].inptName;
    if (typeof bindObj[fieldId] !== 'undefined') {
      this.inputs[inptNdx].input.value = bindObj[fieldId];
    }
  }
  this.action = 'UPDATE';
};

ma.uiUtilForm.prototype.clear = function() {
 /** @type {number} */
  var inptNdx;
  /** @type {number} */
  var inptCount = this.inputs.length;
  /** @type {string} */
  var fieldId;
  for (inptNdx = 0; inptNdx < inptCount; inptNdx++) {
    if (typeof this.inputs[inptNdx].clear === 'function') {
      this.inputs[inptNdx].clear();
    }
  }
  this.action = 'INSERT';
};


/**
 * test if the form is prepared for insert or update
 *
 * @param {string} qstr the query string 
 */
ma.uiUtilForm.insertOrUpdate = function(qstr){
  return 'INSERT';

};

