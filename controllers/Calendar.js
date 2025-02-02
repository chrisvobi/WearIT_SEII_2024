'use strict';

var utils = require('../utils/writer.js'); // Utility for sending JSON responses
var Calendar = require('../service/CalendarService'); // Service to handle calendar-related actions

// GET users/{userId}/calendar
module.exports.getUserCalendar = function getUserCalendar (_, res, __, userId) {
    Calendar.getUserCalendar(userId)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  // POST users/{userId}/calendar
  module.exports.addUserCalendarEvent = function addUserCalendarEvent (_, res, __, body, userId) {
    Calendar.addUserCalendarEvent(body, userId)
      .then(function (response) {
        utils.writeJson(res, response, 201);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body,response.statusCode);
      });
  };

  // GET users/{userId}/calendar/{date}/{eventName}
  module.exports.getUserCalendarEvent = function getUserCalendarEvent (_, res, __, userId, date, eventName) {
    Calendar.getUserCalendarEvent(userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  // PUT users/{userId}/calendar/{date}/{eventName}
  module.exports.updateUserCalendarEvent = function updateUserCalendarEvent (_, res, __, body, userId, date, eventName) {
    Calendar.updateUserCalendarEvent(body, userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  // DELETE users/{userId}/calendar/{date}/{eventName}
  module.exports.deleteUserCalendarEvent = function deleteUserCalendarEvent (_, res, __, userId, date, eventName) {
    Calendar.deleteUserCalendarEvent(userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };