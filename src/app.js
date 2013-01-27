goog.provide('app');
goog.require('goog.dom');
/**
 *
 * @param {string} elementId the divId to work on.
 */
app.start = function(elementId) {
  app.primaryContainer = goog.dom.getElement(elementId);
  app.primaryContainer.innerHTML = 'It worked';

};


