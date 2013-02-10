goog.provide('ma.input');
/**
 * @constructor
 * @param {string} inptName the input Name.
 */
ma.input = function(inptName) {
  this.name = inptName;
  this.label = '';
  this.type = 'text';
};

/**
 * @return {Element}  the dom.
 */
ma.input.prototype.create = function() {
 return goog.dom.createDom('input',
     {'name': this.name,
      'type': this.type, 'value': this.value
     });
};


