'use strict';
var getExamples = require("../utils/calendarExamples.js");

// GET users/{userId}/calendar
exports.getUserCalendar = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = getExamples();
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
exports.getUserCalendarEvent = function(userId,date,eventName) {
  return new Promise(function(resolve, reject) {
    var examples = getExamples();
    if (userId > 120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    }
    else if (Object.keys(examples).length > 0) { // check that events exist
      const events = examples[Object.keys(examples)];
      const eventIndex = events.findIndex(event => event.title === eventName); // find event that matches the eventName
      if (eventIndex !== -1) { // eventName exists
        const date_array = date.split("-").map(Number); // make array [MM, DD]
        const matchedEvent = events[eventIndex];
        const [givenMonth, givenDay] = date_array;
        if (givenMonth === matchedEvent.month && givenDay === matchedEvent.date) { // check if the dates match
          resolve({
            body: matchedEvent
          });
        } else { // dates dont match
          reject({
            statusCode: 404,
            body: "Cannot find event, date and name don't match"
          })
        }
      } else { // eventName doesnt exist
        reject({
          statusCode: 404,
          body: "Event name doesn't exist"
        })
      }
    }
  });
}

// PUT users/{userId}/calendar/{date}/{eventName}
exports.updateUserCalendarEvent = function(body,userId,date,eventName) {
  return new Promise(function(resolve, reject) {
    var examples = getExamples();
    if (userId > 120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    }
    else if (Object.keys(examples).length > 0) { // check that events exist
      const events = examples[Object.keys(examples)];
      const eventIndex = events.findIndex(event => event.title === eventName); // find event that matches the eventName
      if (eventIndex !== -1) { // eventName exists
        const date_array = date.split("-").map(Number); // make array [MM, DD]
        const matchedEvent = events[eventIndex];
        const [givenMonth, givenDay] = date_array;
        if (givenMonth === matchedEvent.month && givenDay === matchedEvent.date) { // check if the dates match
          examples[Object.keys(examples)][eventIndex] = body; // update with new event
          resolve({
            body: examples[Object.keys(examples)][eventIndex]
          });
        } else {
          reject({ // dates dont match
            statusCode: 404,
            body: "Cannot find event, date and name don't match"
          })
        }
      } else { // eventName doesnt exist
        reject({
          statusCode: 404,
          body: "Event name doesn't exist"
        })
      }
    }
  });
}

// DELETE users/{userId}/calendar/{date}/{eventName}
exports.deleteUserCalendarEvent = function(userId,date,eventName) {
  return new Promise(function(resolve, reject) {
    var examples = getExamples();
    if (userId > 120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      })
    }
    else if (Object.keys(examples).length > 0) {
      var events = examples[Object.keys(examples)];
      var eventIndex = events.findIndex(event => event.title === eventName); // find eventIndex by name
      if (eventIndex !== -1) {
          const date_array = date.split("-").map(Number); // make array [MM, DD]
          const matchedEvent = events[eventIndex];
          const [givenMonth, givenDay] = date_array;
          if (givenMonth === matchedEvent.month && givenDay === matchedEvent.date) { // check if date and eventName match
              examples[Object.keys(examples)].splice(eventIndex, 1); // remove said event from examples
              events = examples[Object.keys(examples)];
              eventIndex = events.findIndex(event => event.title === eventName); // check if event was successfully removed
                if (eventIndex === -1) {
                  resolve({
                    body: "Event deleted successfully"
                });
                }    
        } else { // event and date dont match
          reject({
            statusCode: 404,
            body: "Cannot find event, date and name don't match"
          })
        }
  } else { // eventIndex === -1 event with given title doesnt exist
    reject({
      statusCode: 404,
      body: "Event name doesn't exist"
    })
  }
    }
  });
}