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
 * @fileoverview User Interface Utils - table.
 *
 */


goog.provide('ma.uiUtilTable');

goog.require('goog.debug.Logger');
goog.require('goog.dom.classes');
goog.require('goog.ui.Option');
goog.require('goog.ui.Select');
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
  /**
   * @type {Array}
   * @private
   */
  this.data_ = [];
  /**
   * @type {Array}
   * @private
   */
  this.columns_ = [];

  /**
   * @type {Array}
   * @private
   */
  this.tableRows_ = [];

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
  /** @type {Element} */
  this.displayRequestCountSelect = goog.dom.createDom('Select',
      {style: 'width:5em;'});
  goog.dom.appendChild(this.displayRequestCountSelect,
      goog.dom.createDom('option', null, '10'));
  goog.dom.appendChild(this.displayRequestCountSelect,
      goog.dom.createDom('option', null, '25'));
  goog.dom.appendChild(this.displayRequestCountSelect,
      goog.dom.createDom('option', null, '50'));
  goog.dom.appendChild(this.displayRequestCountSelect,
      goog.dom.createDom('option', null, 'All'));
  goog.dom.appendChild(this.wrappingDiv, this.displayRequestCountSelect);
  this.eh_.listen(this.displayRequestCountSelect,
      goog.events.EventType.CHANGE, this.refreshData);


  this.paginationSpan = goog.dom.createDom('span');
  goog.dom.appendChild(this.wrappingDiv, this.paginationSpan);
  /** @type {number} */
  this.page = 1;
  /** @type {Element} */
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
  /** @type {number} */
  var colNdx;
  /** @type {Element} */
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
  this.tableRows_ = [];
  /** @type {Element} */
  var tr;
  /** @type {number} */
  this.startRow;
  /** @type {number} */
  this.lastRow;
  /** @type {number|string} */
  var displayPerPage = this.displayRequestCountSelect.value;

  //determine start/stop rows
  if (displayPerPage !== 'All') {
    displayPerPage = parseInt(displayPerPage, 10);
    this.startRow = this.page * displayPerPage;
    this.lastRow = this.startRow + displayPerPage;
    this.lastRow = (this.lastRow < this.localRowCount) ?
      this.lastRow : this.localRowCount;
    this.startRow = (this.startRow < this.lastRow) ?
      this.startRow : this.lastRow - displayPerPage;
    this.startRow = (this.startRow > 0) ? this.startRow : 0;
  } else {
    this.startRow = 0;
    this.lastRow = this.localRowCount;
  }

  this.paginationSpan.innerHTML = 'Showing ' + (this.startRow + 1) +
    ' thru ' + this.lastRow + ' of ' + this.localRowCount;

  for (rowNdx = this.startRow; rowNdx < this.lastRow; rowNdx++) {
    this.tableRows_[rowNdx] = goog.dom.createDom('tr');
    this.buildDataRow(this.tableRows_[rowNdx], rowNdx);
    goog.dom.appendChild(tempTBody, this.tableRows_[rowNdx]);
  }

  this.refreshHeader();

  this.tBody_.remove();
  this.tBody_ = tempTBody;
  goog.dom.appendChild(this.table, this.tBody_);
};

/**
 * @param {Element} rowElement the row to add to.
 * @param {number} rowNdx the ndx of the row to build.
 */
ma.uiUtilTable.prototype.buildDataRow = function(rowElement, rowNdx) {
  /** @type {?Element} */
  var tdSpan;
  goog.dom.removeChildren(rowElement);
  /** @type {number} */
  var colNdx;
  for (colNdx = 0; colNdx < this.displayColumnCount; colNdx++) {
    tdSpan = this.buildCellSpan(rowNdx, colNdx);
    goog.dom.appendChild(rowElement, goog.dom.createDom('td', null, tdSpan));
  }
};

/**
 *
 * @param {number} row the row to refresh.
 */
ma.uiUtilTable.prototype.refreshRow = function(row)  {
  this.buildDataRow(this.tableRows_[row], row);

};


/**
 *
 * @param {number} row the row id.
 * @param {number} col the column id.
 * @return {Element} the span.
 */
ma.uiUtilTable.prototype.buildCellSpan = function(row, col) {
/** @type {string} */
  var displayFragment;
  if (typeof (this.columns_[col].src) === 'function') {
     displayFragment = this.columns_[col].src(this.data_[row], row);
  } else {
     displayFragment = this.data_[row][this.columns_[col].src];
  }
  return goog.dom.createDom('span', null, displayFragment);
};

/**
 *
 *
 *
 */
ma.uiUtilTable.prototype.clearData = function() {
  this.data_ = [];
};

/**
 *
 * @param {Object} newObj the row object.
 * @param {number=} opt_cacheId the expected row Id.
 * @param {string=} opt_checkField the field to validate on.
 * @param {string=} opt_type INSERT if add is needed.
 * @return {number} the table index, useful for inserts.
 *
 */
ma.uiUtilTable.prototype.update = function(newObj, opt_cacheId,
    opt_checkField, opt_type) {
      /** @type {number} */
    var newId;
  if (opt_type !== 'INSERT' && opt_cacheId &&
       opt_checkField !== undefined &&
      this.data_[opt_cacheId][opt_checkField] === newObj[opt_checkField]) {
    this.data_[opt_cacheId] = newObj;
    this.refreshRow(opt_cacheId);
  } else if (opt_type === 'INSERT') {
    /** @type {number} */
    newId = this.data_.push(newObj) - 1; //push returns length
    this.addRowToEndOfDisplay(newId);

  } else { // Look for the checkField's match and set it when found
    /** @type {number} */
    var rowNdx;
    /** @type {number} */
    var rowCnt = this.data_.length;
    for (rowNdx = 0; rowNdx < rowCnt; rowNdx++) {
      if (this.data_[rowNdx][opt_checkField] === newObj[opt_checkField]) {
        this.data_[rowNdx] = newObj;
        this.refreshRow(rowNdx);
      }
    }
  }
  return newId || opt_cacheId || -1;
};

/**
 *
 * @param {number} rowId the rowNdx in the data_ table to add.
 */
ma.uiUtilTable.prototype.addRowToEndOfDisplay = function(rowId) {
  this.tableRows_[rowId] = goog.dom.createDom('tr');
    this.buildDataRow(this.tableRows_[rowId], rowId);
    goog.dom.appendChild(this.tBody_, this.tableRows_[rowId]);

};




