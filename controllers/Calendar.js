'use strict';

var utils = require('../utils/writer.js');
var Calendar = require('../service/CalendarService');

// GET users/{userId}/calendar
module.exports.getUserCalendar = function getUserCalendar (req, res, next, userId) {
    Calendar.getUserCalendar(userId)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  // POST users/{userId}/calendar
  module.exports.addUserCalendarEvent = function addUserCalendarEvent (req, res, next, body, userId) {
    Calendar.addUserCalendarEvent(body, userId)
      .then(function (response) {
        utils.writeJson(res, response, 201);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body,response.statusCode);
      });
  };

  // GET users/{userId}/calendar/{date}/{eventName}
  module.exports.getUserCalendarEvent = function getUserCalendarEvent (req, res, next, userId, date, eventName) {
    Calendar.getUserCalendarEvent(userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  // PUT users/{userId}/calendar/{date}/{eventName}
  module.exports.updateUserCalendarEvent = function updateUserCalendarEvent (req, res, next, body, userId, date, eventName) {
    Calendar.updateUserCalendarEvent(body, userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  // DELETE users/{user-id}/calendar/{date}/{event-name}
  module.exports.deleteUserCalendarEvent = async function deleteUserCalendarEvent (req, res, next, userId, date, eventName) {
    await Calendar.deleteUserCalendarEvent(userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };