goog.provide('ma.input');
/**
 *@constructor
 */
ma.input = function(inptName){
  this.name = inptName;
  this.label = '';
  this.type = 'text';
}

ma.input.prototype.create = function(){
 return goog.dom.createDom('input',{'name': this.name, 'type': this.type});
}
  

