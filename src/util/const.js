goog.provide('ma.CONST');

goog.require('goog.debug.Logger');
/**
 * @const
 * @type {goog.debug.Logger.Level}
 */
ma.CONST.DEFAULT_LOG_LEVEL = goog.debug.Logger.Level.ALL;

/**
 * @const
 * @type {string}
 */
ma.CONST.PRIMARY_SERVER_URL = './cgi-bin/server.pl';


goog.provide('ma.GLOBAL');
/**
 * @type {Element}
 */

ma.GLOBAL.primaryContainer = goog.dom.getElement('mainContent');
/**
 * @type {number}
 */

ma.GLOBAL.serverRequestId = 0;

