goog.provide('ma.form.ColumnLayout');
goog.require('ma.form.ColumnInput');
goog.require('ma.input');
goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.KeyHandler.EventType');
/**
 * 
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper to use.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
ma.form.ColumnLayout = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.fieldList = new Array();
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
  this.kh_ = null;

}
goog.inherits(ma.form.ColumnLayout, goog.ui.Component);

/**
 *
 * @param {ma.input} fld
 */
ma.form.ColumnLayout.prototype.addField = function(fld){
  this.fieldList.push(fld);

}
/**
 * Creates an initial DOM representation for the component.
 */
ma.form.ColumnLayout.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('table'));
};

/**
 * Decorates an existing HTML DIV element as a SampleComponent.
 *
 * @param {Element} element The DIV element to decorate. The element's
 *    text, if any will be used as the component's label.
 */
ma.form.ColumnLayout.prototype.decorateInternal = function(element) {
  ma.form.ColumnLayout.superClass_.decorateInternal.call(this, element);

  var elem = this.getElement();
  //goog.dom.classes.add(elem, goog.getCssName('goog-sample-component'));
  //elem.style.backgroundColor = this.color_;
  //elem.tabIndex = 0;
  //var tr = goog.dom.createDom('tr');
  //goog.dom.appendChild(elem, tr);
  var fieldListLength = this.fieldList.length;
  this.inputs = new Array();
  for (var i = 0; i < fieldListLength; i++){
    this.inputs.push(new ma.form.ColumnInput(this.fieldList[i]));
    this.inputs[i].render(elem);
  }
  //this.kh_ = new goog.events.KeyHandler(elem);
  //this.eh_.listen(this.kh_, goog.events.KeyHandler.EventType.KEY, this.onKey_);
};

/** @override */
ma.form.ColumnLayout.prototype.disposeInternal = function() {
  ma.form.ColumnLayout.superClass_.disposeInternal.call(this);
  this.eh_.dispose();
  if (this.kh_) {
    this.kh_.dispose();
  }
};
/**
 * Called when component's element is known to be in the document.
 */
ma.form.ColumnLayout.prototype.enterDocument = function() {
  ma.form.ColumnLayout.superClass_.enterDocument.call(this);
  //this.eh_.listen(this.getElement(), goog.events.EventType.CLICK,
  //    this.onDivClicked_);
};

/**
 * Called when component's element is known to have been removed fromgoog.require('ma.form.ColumnLayout'); the
 * document.
 */
ma.form.ColumnLayout.prototype.exitDocument = function() {
  ma.form.ColumnLayout.superClass_.exitDocument.call(this);
  // this.eh_.unlisten(this.getElement(), goog.events.EventType.CLICK,
  //     this.onDivClicked_);
};




