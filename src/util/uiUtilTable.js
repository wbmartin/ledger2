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


goog.provide('ma.uiUtilTable');

goog.require('goog.debug.Logger');
goog.require('goog.dom.classes');
goog.require('ma.uiUtil');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 * @extends {goog.ui.Component}
 * @constructor
 */

ma.uiUtilTable = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

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
  this.logger_ = goog.debug.Logger.getLogger('ma.uiUtilTable');
  this.logger_.setLevel(ma.CONST_DEFAULT_LOG_LEVEL);
  this.logger_.finest('Constructor Called');
  /** @type {Array}
   *  @private
   */
  this.data_ = new Array();
  /** @type {Array}
   *  @private
   */
  this.columns_ = new Array();

};
goog.inherits(ma.uiUtilTable, goog.ui.Component);

/**
 * Creates an initial DOM representation for the component.
 * @param {string} style the form style.
 */
ma.uiUtilTable.prototype.setFormStyle = function(style) {
this.formStyle_ = style;
};

/**
 * Creates an initial DOM representation for the component.
 */
ma.uiUtilTable.prototype.createDom = function() {
  this.logger_.finest('createDom Called');
  this.decorateInternal(this.dom_.createDom('table'));
  /** @type {Element} */
};




/**
 *
 * @param {Element} element the form to decorate.
 */
ma.uiUtilTable.prototype.decorateInternal = function(element) {
  this.logger_.finest('decorateInternal Called');
  this.wrappingDiv = goog.dom.createDom('div');
  this.table = element;
  goog.dom.appendChild(this.wrappingDiv, this.table);
  this.setElementInternal(this.wrappingDiv);
  this.tBody_ = goog.dom.createDom('tbody');
  this.tHeader_ = goog.dom.createDom('thead');
  goog.dom.appendChild(this.table, this.tHeader_);
  goog.dom.appendChild(this.table, this.tBody_);
};


/** @override */
ma.uiUtilTable.prototype.dispose = function() {
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
ma.uiUtilTable.prototype.enterDocument = function() {
  this.logger_.finest('enterDocument Called');
  goog.base(this, 'enterDocument');
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.uiUtilTable.prototype.exitDocument = function() {
  this.logger_.finest('exitDocument Called');
  goog.base(this, 'exitDocument');
};


/**
 *
 *
 *
 */
ma.uiUtilTable.prototype.refreshHeader = function() {
  this.displayColumnCount = this.columns_.length;
  var colNdx;
  var tempTHeader = goog.dom.createDom('thead');
  this.activeRow = goog.dom.createDom('tr');
  for (colNdx = 0; colNdx < this.displayColumnCount; colNdx++) {
    goog.dom.appendChild(this.activeRow,
        goog.dom.createDom('th', null, this.columns_[colNdx].displayName));

  }
  goog.dom.appendChild(tempTHeader, this.activeRow);
  this.tHeader_.remove();
  this.tHeader_ = tempTHeader;
  goog.dom.appendChild(this.table, this.tHeader_);
};

/**
 *
 *
 *
 */
ma.uiUtilTable.prototype.refreshData = function() {
  /** @type {number} */
  var rowNdx;
  /** @type {number} */
  var colNdx;
  this.localRowCount = this.data_.length;
  this.displayColumnCount = this.columns_.length;
  /** @type {Element} */
  var tempTBody = goog.dom.createDom('tbody');
  /** @type {Element} */
  var tdSpan= null;
  /** @type {string} */
  var displayFragment = null;

  for (rowNdx = 0; rowNdx < this.localRowCount; rowNdx++) {
    this.activeRow = goog.dom.createDom('tr');
    for (colNdx = 0; colNdx < this.displayColumnCount; colNdx++) {
      if (typeof (this.columns_[colNdx].src) === 'function') {
        displayFragment = this.columns_[colNdx].src(this.data_[rowNdx]);
      } else {
        displayFragment =  this.data_[rowNdx][this.columns_[colNdx].src];
      }
      tdSpan = goog.dom.createDom('span',null,displayFragment);
      goog.dom.appendChild(this.activeRow, 
          goog.dom.createDom('td', null,tdSpan)
      );
    }
     goog.dom.appendChild(tempTBody, this.activeRow);
  }

  this.refreshHeader();

  this.tBody_.remove();
  this.tBody_ = tempTBody;
  goog.dom.appendChild(this.table, this.tBody_);
};

/**
 *
 *
 *
 */
ma.uiUtilTable.prototype.clearData = function() {
  this.data_ = new Array();
}




