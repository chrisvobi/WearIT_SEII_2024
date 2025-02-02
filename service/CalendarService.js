'use strict';
var {getExamples, findEvent} = require("../utils/events.js");

// GET users/{userId}/calendar
exports.getUserCalendar = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = JSON.parse(JSON.stringify(getExamples));
    if (userId === 32) {
      resolve({
        statusCode: 204
      })
    }
    else if (userId > 120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    }
    else if (Object.keys(examples).length > 0) {
      resolve({body: examples[Object.keys(examples)]});
    } 
  });
}

// POST users/{userId}/calendar
exports.addUserCalendarEvent = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [];
    examples['application/json'].push(body);
    if (userId > 120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      })
    }
    else if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)][0]);
    }
  });
}

// GET users/{userId}/calendar/{date}/{eventName}
exports.getUserCalendarEvent = function(userId, date, eventName) {
  return findEvent(userId, date, eventName).then(({ matchedEvent }) => {
    return { body: matchedEvent };
  });
};

// PUT users/{userId}/calendar/{date}/{eventName}
exports.updateUserCalendarEvent = function(body, userId, date, eventName) {
  return findEvent(userId, date, eventName).then(({ events, eventIndex }) => {
    events[eventIndex] = body; // Update event
    return { body: events[eventIndex] };
  });
};

// DELETE users/{userId}/calendar/{date}/{eventName}
exports.deleteUserCalendarEvent = function(userId, date, eventName) {
  return findEvent(userId, date, eventName).then(({ events, eventIndex }) => {
    events.splice(eventIndex, 1); // Remove event
    return { body: "Event deleted successfully" };
  });
};