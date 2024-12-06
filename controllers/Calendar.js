'use strict';

var utils = require('../utils/writer.js');
var Calendar = require('../service/CalendarService');

// POST users/{user-id}/calendar
module.exports.getUserCalendar = async function getUserCalendar (req, res, next, userId) {
    await Calendar.getUserCalendar(userId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  // POST users/{user-id}/calendar
  module.exports.addUserCalendarEvent = async function addUserCalendarEvent (req, res, next, body, userId) {
    await Calendar.addUserCalendarEvent(body, userId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  // GET users/{user-id}/calendar/{date}/{event-name}
  module.exports.getUserCalendarEvent = async function getUserCalendarEvent (req, res, next, userId, date, eventName) {
    await Calendar.getUserCalendarEvent(userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  // PUT users/{user-id}/calendar/{date}/{event-name}
  module.exports.updateUserCalendarEvent = async function updateUserCalendarEvent (req, res, next, body, userId, date, eventName) {
    await Calendar.updateUserCalendarEvent(body, userId, date, eventName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
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