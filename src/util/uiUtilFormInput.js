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



goog.require('goog.debug.Logger');
goog.require('goog.dom.classes');
goog.require('ma.uiUtil');

/**
 * @param {string} resource the resource name.
 * @param {string} action the action name.
 * @return {string} the resource and action to append.
 */
//ma.uiUtil.resourceAction = function(resource, action) {
//  return '&spwfResource=' + resource + '&spwfAction=' + action;
//};

goog.provide('ma.uiUtilFormInput');

/**
 * @param {string} lblText the label.
 * @param {string} inptName the input.
 * @param {string=} opt_inputType the type of input.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */

ma.uiUtilFormInput = function(lblText, inptName, opt_inputType,
    opt_domHelper) {

  goog.ui.Component.call(this, opt_domHelper);
  this.lblText = lblText;
  this.inputType = opt_inputType || 'text';
  this.inptName = inptName;

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
  //this.kh_ = null;
 /**
   * A reference to the class logger
   * @type {goog.debug.Logger}
   * @private
   */
  this.logger_ = goog.debug.Logger.getLogger('ma.uiUtilFormInput');
  this.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
  this.logger_.finest('Constructor Called');

};
goog.inherits(ma.uiUtilFormInput, goog.ui.Component);




/**
 * Creates an initial DOM representation for the component.
 */
ma.uiUtilFormInput.prototype.createDom = function() {

  this.logger_.finest('createDom Called');
  this.decorateInternal(this.dom_.createDom('div', 'control-group'));
};

/**
 * Decorates an existing HTML DIV element .
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 */
ma.uiUtilFormInput.prototype.decorateInternal = function(element) {

  this.logger_.finest('decorateInternal Called');
  this.setElementInternal(element);

  //  this.kh_ = new goog.events.KeyHandler(element);
  //this.eh_.listen(this.kh_, goog.events.KeyHandler.EventType.KEY,
  //this.onKey_);
  //this.controlGroupDiv = element;
  this.label = goog.dom.createDom('label', null, this.lblText);
  if (this.inputType !== 'select') {
    this.input = goog.dom.createDom('input',
        {'name': this.inptName, 'type': this.inputType });
  }else {
    this.input = goog.dom.createDom('select', {'name': this.inptName});
  }

  this.helpBlock = goog.dom.createDom('p', {'class': 'help-block'});

  goog.dom.classes.add(this.label, 'control-label');
  goog.dom.classes.add(this.input, 'input-xlarge');

  this.controlsDiv = goog.dom.createDom('div', {'class': 'controls'},
      this.input, this.helpBlock);

  goog.dom.appendChild(this.element_, this.label);
  goog.dom.appendChild(this.element_, this.controlsDiv);
};

/** @override */
ma.uiUtilFormInput.prototype.dispose = function() {

  this.logger_.finest('dispose Called');
  //if (this.kh_) { this.kh_.dispose(); }
  goog.base(this, 'dispose');
};

/**
 * Called when component's element is known to be in the document.
 */
ma.uiUtilFormInput.prototype.enterDocument = function() {

  this.logger_.finest('enterDocument Called');
  goog.base(this, 'enterDocument');
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.uiUtilFormInput.prototype.exitDocument = function() {

  this.logger_.finest('exitDocument Called');
  //this.eh_.unlisten(this.getElement(), goog.events.EventType.CLICK,
  //    this.onDivClicked_);
  goog.base(this, 'exitDocument');
};








