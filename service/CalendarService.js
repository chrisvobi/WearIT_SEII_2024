'use strict';

var { event_check } = require("../utils/event_check.js");
var { correct_date } = require("../utils/correct_date.js");

// GET users/{user-id}/calendar
exports.getUserCalendar = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : 1,
  "day" : "Sunday",
  "month" : 12,
  "title" : "Morning Walk",
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC01_12_01_2024.jpeg",
      "name" : "BlackHoodie",
      "brand" : "Nike"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC02_12_01_2024.jpeg",
      "name" : "GreySweatpants",
      "brand" : "Nike"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC03_12_01_2024.jpeg",
      "name" : "WhiteShoes",
      "brand" : "Converse"
    } ],
    "name" : "EverydayOutfit"
  } ],
},
{
  "date" : 2,
  "day" : "Monday",
  "month" : 12,
  "title" : "Afternoon Coffee",
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC04_12_01_2024.jpeg",
      "name" : "GreyCrewneck",
      "brand" : "Zara"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC05_12_01_2024.jpeg",
      "name" : "BlackFormalPants",
      "brand" : "H&M"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC06_12_01_2024.jpeg",
      "name" : "WhiteAirforceShoes",
      "brand" : "Nike"
    } ],
    "name" : "CoffeeDate"
  } ],
}];
    if (Object.keys(examples).length > 0 && userId >= 1 && userId <= 120 && userId != 32) {
      resolve({
        statusCode: 200,
        body: examples[Object.keys(examples)]
      });
    } else if (userId > 120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    }
    else if (userId < 1) {
      reject({
        statusCode: 400,
        body: "UserId should be greater than 1"
      });
    }
    else if (!Number.isInteger(userId)) {
      reject({
        statusCode: 400,
        body: "UserId should be integer"
      });
    }
    else if (userId === 32) {
      resolve({
        statusCode: 204,
        body: "User doesn't have any events planned"
      });
    }
    
    
  });
}

// POST users/{user-id}/calendar
exports.addUserCalendarEvent = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [];
    // event_check function checks if body is given in correct format
    if (event_check(body) && userId >= 1 && userId <= 120) {
      examples['application/json'].push(body); // add body to examples
      resolve({
        statusCode: 201,
        message: examples[Object.keys(examples)][0]
      });
    } else if (userId > 120) {
      reject({
        statusCode: 404,
        message: "User doesn't exist"
      });
    }
    else if (!Number.isInteger(userId)) {
      reject({
        statusCode: 400,
        message: "UserId should be integer"
      });
    }
    else if (!event_check(body) && userId >= 1 && userId <= 120) {
      reject({
        statusCode: 400,
        message: "Event object not given correctly"
      });
    }
  });
}

// GET users/{user-id}/calendar/{date}/{event-name}
exports.getUserCalendarEvent = function(userId,date,eventName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : 1,
  "day" : "Sunday",
  "month" : 12,
  "title" : "Morning Walk",
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC01_12_01_2024.jpeg",
      "name" : "BlackHoodie",
      "brand" : "Nike"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC02_12_01_2024.jpeg",
      "name" : "GreySweatpants",
      "brand" : "Nike"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC03_12_01_2024.jpeg",
      "name" : "WhiteShoes",
      "brand" : "Converse"
    } ],
    "name" : "EverydayOutfit"
  } ],
},
{
  "date" : 2,
  "day" : "Monday",
  "month" : 12,
  "title" : "Afternoon Coffee",
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC04_12_01_2024.jpeg",
      "name" : "GreyCrewneck",
      "brand" : "Zara"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC05_12_01_2024.jpeg",
      "name" : "BlackFormalPants",
      "brand" : "H&M"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC06_12_01_2024.jpeg",
      "name" : "WhiteAirforceShoes",
      "brand" : "Nike"
    } ],
    "name" : "CoffeeDate"
  } ],
}];
    if (Object.keys(examples).length > 0 && userId >= 1 && userId <= 120 && correct_date(date) && typeof(eventName) === 'string') {
      const events = examples[Object.keys(examples)];
      const eventIndex = events.findIndex(event => event.title === eventName);
      if (eventIndex !== -1) {
        const matchedEvent = events[eventIndex];
        const [givenMonth, givenDay] = date;
        if (givenMonth === matchedEvent.month && givenDay === matchedEvent.date) {
          resolve({
            statusCode: 200,
            body: matchedEvent
          });
        } else {
          reject({
            statusCode: 404,
            body: "Cannot find event, date and name don't match"
          })
        }
      } else {
        reject({
          statusCode: 404,
          body: "Event name doesn't exist"
        })
      }
    } else if (userId >= 1 && userId <= 120 && correct_date(date) && typeof(eventName) !== 'string') {
      reject({
        statusCode: 400,
        body: "Event name must be string"
      });
    } else if (userId >= 1 && userId <= 120 && typeof(eventName) === 'string' && !correct_date(date)) {
      reject({
        statusCode: 400,
        body: "Date given in wrong format"
      })
    }
  });
}

// PUT users/{user-id}/calendar/{date}/{event-name}
exports.updateUserCalendarEvent = function(body,userId,date,eventName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : 1,
  "day" : "Sunday",
  "month" : 12,
  "title" : "Morning Walk",
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC01_12_01_2024.jpeg",
      "name" : "BlackHoodie",
      "brand" : "Nike"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC02_12_01_2024.jpeg",
      "name" : "GreySweatpants",
      "brand" : "Nike"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC03_12_01_2024.jpeg",
      "name" : "WhiteShoes",
      "brand" : "Converse"
    } ],
    "name" : "EverydayOutfit"
  } ],
},
{
  "date" : 2,
  "day" : "Monday",
  "month" : 12,
  "title" : "Afternoon Coffee",
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC04_12_01_2024.jpeg",
      "name" : "GreyCrewneck",
      "brand" : "Zara"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC05_12_01_2024.jpeg",
      "name" : "BlackFormalPants",
      "brand" : "H&M"
    }, {
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC06_12_01_2024.jpeg",
      "name" : "WhiteAirforceShoes",
      "brand" : "Nike"
    } ],
    "name" : "CoffeeDate"
  } ],
}];
if (Object.keys(examples).length > 0 && userId >= 1 && userId <= 120 && correct_date(date) && typeof(eventName) === 'string' && event_check(body)) {
  const events = examples[Object.keys(examples)];
  const eventIndex = events.findIndex(event => event.title === eventName);
  if (eventIndex !== -1) {
    const matchedEvent = events[eventIndex];
    const [givenMonth, givenDay] = date;
    if (givenMonth === matchedEvent.month && givenDay === matchedEvent.date) {
      examples[Object.keys(examples)][eventIndex] = body;
      resolve({
        statusCode: 201,
        message: examples[Object.keys(examples)][eventIndex]
      });
    } else {
      reject({
        statusCode: 404,
        body: "Cannot find event, date and name don't match"
      })
    }
  } else {
    reject({
      statusCode: 404,
      body: "Event name doesn't exist"
    })
  }
} else if (Object.keys(examples).length > 0 && userId >= 1 && userId <= 120 && correct_date(date) && typeof(eventName) === 'string' && !event_check(body)) {
      reject({
        statusCode: 400,
        message: "Event object not given correctly"
      });
    } else if (userId >= 1 && userId <= 120 && typeof(eventName) === 'string' && !correct_date(date)) {
        reject({
          statusCode: 400,
          body: "Date given in wrong format"
      })
    }
  });
}