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
 * @fileoverview A accessGroups component.
 *
 */
goog.provide('ma.ServerCall');


/**
 *
 * @constructor
 * @param {string} URL the target Server URL.
 * @param {Object} opt_caller the original caller.
 */
ma.ServerCall = function(URL, opt_caller) {
  /** @type {string} */
  this.url = URL;
  /** @type {string} */
  this.serverMethod = 'POST';
  /**
   * @type {goog.debug.Logger}
   * @private
   * */
  this.logger_ = opt_caller.logger_ ||
    goog.debug.Logger.getLogger('ma.ServerCall');
  this.logger_.finest('servercall constructed');
  /** @type {Object} */
  this.caller = opt_caller || this;
};

/** @type {number} the number of Server Calls awaiting response. */
ma.ServerCall.pendingServerCalls = 0;

/**
 * @param {Function} responseHandler the actual Response Handler.
 * @param {Object} caller the original caller.
 * @param {goog.events.Event} e the event.
 */
ma.ServerCall.prototype.responseHandlerWrapper =
 function(responseHandler, caller, e) {
  caller.logger_.finest('handlerWrapper');
  if (ma.ServerCall.pendingServerCalls > 0) {
    ma.ServerCall.pendingServerCalls--;
  }
  goog.bind(responseHandler, caller)(e);
};


/**
 * Make the server call
 * @param {Function} responseHandler  the response handler.
 * @param {string} queryStr the query String to send.
 */
ma.ServerCall.prototype.make = function(responseHandler, queryStr) {
  this.logger_.finest('server call made');
  ma.ServerCall.pendingServerCalls++;
  var wrapperPartial = goog.partial(this.responseHandlerWrapper,
      responseHandler, this.caller);
  goog.net.XhrIo.send(this.url, wrapperPartial,
      this.serverMethod, queryStr);
};


