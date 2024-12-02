'use strict';

var utils = require('../utils/writer.js');
var Calendar = require('../service/CalendarService');

module.exports.getUserCalendar = async function getUserCalendar (req, res, next, userId) {
    await Calendar.getUserCalendar(userId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  module.exports.addUserCalendarEvent = async function addUserCalendarEvent (req, res, next, body, userId) {
    await Calendar.addUserCalendarEvent(body, userId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };