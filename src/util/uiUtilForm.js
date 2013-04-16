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

goog.require('goog.dom.classes');

/**
 * @param {string=} opt_resource the default resource for the form.
 * @param {string=} opt_action the default action for the form.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */

ma.uiUtilForm = function(opt_resource, opt_action, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.inputs = new Array();
  this.resource = opt_resource;
  this.action = opt_action;
  /**
   * Event handler for this object.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eh_ = new goog.events.EventHandler(this);


};
goog.inherits(ma.uiUtilForm, goog.ui.Component);

/**
 * Creates an initial DOM representation for the component.
 * @param {string=} opt_class the form class.
 * @return {!Element} Reference to a DOM node.
 */
ma.uiUtilForm.prototype.createDom = function(opt_class) {
  //goog.dom.createDom('div', {'class': 'control-group'})
  opt_class = opt_class || 'form-horizontal';
  return this.decorateInternal(goog.dom.createDom('form', opt_class));
};


/**
 * @param {...(Object|string|Array|NodeList)} var_args inputs to add.
 */
ma.uiUtilForm.prototype.addInput = function(var_args) {
  var inputCount = arguments.length;
  for (var ndx = 0; ndx < inputCount; ndx++) {
    this.inputs.push(arguments[ndx]);
  }
};

/**
 *
 * @return {string} the forms query data string.
 */
ma.uiUtilForm.prototype.getFormDataString = function() {
  var qdstr = '&spwfResource=' + this.resource + '&spwfAction=' + this.action;
  return goog.dom.forms.getFormDataString(this.element_) + qdstr;
};


/**
 *
 * @param {Element} element the form to decorate.
 * @return {Element} the created Form.
 */
ma.uiUtilForm.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
  var fs = goog.dom.createDom('fieldset', null);
  var rowCount = this.inputs.length;
  for (var i = 0; i < rowCount; i++) {
    goog.dom.appendChild(fs, this.inputs[i].createDom());
  this.addChild(this.inputs[i]);
  }
  goog.dom.appendChild(this.element_, fs);
  return this.element_;

};


/** @override */
ma.uiUtilForm.prototype.dispose = function() {
  this.eh_.dispose();
  if (!this.getDisposed()) {
    if (this.kh_) { this.kh_.dispose(); }
    this.eh_.dispose();
    goog.base(this, 'dispose');
  }
};

/**
 * Called when component's element is known to be in the document.
 */
ma.uiUtilForm.prototype.enterDocument = function() {
  ma.uiUtilFormInput.superClass_.enterDocument.call(this);
  this.eh_.listen(this.getElement(), goog.events.EventType.CLICK,
      this.onDivClicked_);
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.uiUtilForm.prototype.exitDocument = function() {

 // this.eh_.unlisten(this.getElement(), goog.events.EventType.CLICK,
 //     this.onDivClicked_);
goog.base(this, 'exitDocument');
};


