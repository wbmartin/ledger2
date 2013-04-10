goog.provide('ma.uiutil');

/**
 * @param {string} resource the resource name.
 * @param {string} action the action name.
 * @return {string} the resource and action to append.
 */
ma.uiutil.resourceAction = function(resource, action) {
  return '&spwfResource=' + resource + '&spwfAction=' + action;
};

ma.uiutil.makerow = function(lbl,inpt){
  var td1 = goog.dom.createDom('td',null, lbl);
  var td2 = goog.dom.createDom('td',null, inpt);
 return goog.dom.createDom('tr',null, td1, td2);
}


