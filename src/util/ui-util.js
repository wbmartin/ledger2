goog.provide('ma.ui');
goog.require('goog.dom');

/**
 * @constructor
 */
ma.ui.inputTextValidation = function(container){
  this.inpt = goog.dom.createDom('input',null);
  var labelSpan = goog.dom.createDom('span',null);
  var labelTd = goog.dom.createDom('td',null,labelSpan);
  var errorSpan = goog.dom.createDom('span',null);
  var errorTd = goog.dom.createDom('td',null, errorSpan);
  var inputTd = goog.dom.createDom('td',null, this.inpt);
  var tr = goog.dom.createDom('tr',null, labelTd, inputTd, errorTd);


this.component = goog.dom.createDom('input',null);
goog.dom.append(container, tr);
return this;

}
ma.ui.inputTextValidation.prototype.getValue = function(){
return this.inpt.value;
}


