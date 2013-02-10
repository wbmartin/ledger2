goog.provide('ma.ui.util');

/**
 * @param {string} resource the resource name.
 * @param {string} action the action name.
 * @return {string} the resource and action to append.
 */
ma.ui.util.resourceAction = function(resource, action) {
  return '&spwfResource=' + resource + '&spwfAction=' + action;
};

