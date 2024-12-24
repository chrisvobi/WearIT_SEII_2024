'use strict';

var utils = require('../utils/writer.js');
var Calendar = require('../service/CalendarService');

// GET users/{userId}/calendar
module.exports.getUserCalendar = function getUserCalendar (_req, res, _next, userId) {
    Calendar.getUserCalendar(userId)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  // POST users/{userId}/calendar
  module.exports.addUserCalendarEvent = function addUserCalendarEvent (_req, res, _next, body, userId) {
    Calendar.addUserCalendarEvent(body, userId)
      .then(function (response) {
        utils.writeJson(res, response, 201);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body,response.statusCode);
      });
  };

  // GET users/{userId}/calendar/{date}/{eventName}
  module.exports.getUserCalendarEvent = function getUserCalendarEvent (_req, res, _next, userId, date, eventName) {
    Calendar.getUserCalendarEvent(userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  // PUT users/{userId}/calendar/{date}/{eventName}
  module.exports.updateUserCalendarEvent = function updateUserCalendarEvent (_req, res, _next, body, userId, date, eventName) {
    Calendar.updateUserCalendarEvent(body, userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  // DELETE users/{userId}/calendar/{date}/{eventName}
  module.exports.deleteUserCalendarEvent = function deleteUserCalendarEvent (_req, res, _next, userId, date, eventName) {
    Calendar.deleteUserCalendarEvent(userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };