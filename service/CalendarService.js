'use strict';

var { event_check } = require("../utils/event_check.js");
var { correct_date } = require("../utils/correct_date.js");

// GET users/{userId}/calendar
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
    examples['application/json'] = {"date" : 2,
  "day" : "Monday",
  "month" : 12,
  "title" : "Afternoon Coffee",
  "planndedOutfit" :  {
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
  },};
    if (userId > 120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      })
    }
    else if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
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
        statusCode: 200,
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

// DELETE users/{user-id}/calendar/{date}/{event-name}
exports.deleteUserCalendarEvent = function(userId,date,eventName) {
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
      var events = examples[Object.keys(examples)];
      var eventIndex = events.findIndex(event => event.title === eventName); // find eventIndex by name
      if (eventIndex !== -1) {
          const matchedEvent = events[eventIndex];
          const [givenMonth, givenDay] = date;
          if (givenMonth === matchedEvent.month && givenDay === matchedEvent.date) { // check if date and eventName match
              examples[Object.keys(examples)].splice(eventIndex, 1); // remove said event from examples
              events = examples[Object.keys(examples)];
              eventIndex = events.findIndex(event => event.title === eventName); // check if event was successfully removed
                if (eventIndex === -1) {
                  resolve({
                    statusCode: 200,
                    message: "Event deleted successfully"
        });
                }    
        } else { // event and date dont match
          reject({
            statusCode: 404,
            message: "Cannot find event, date and name don't match"
          })
        }
  } else { // eventIndex === -1 event with given title doesnt exist
    reject({
      statusCode: 404,
      message: "Event name doesn't exist"
    })
  }
    } else if (userId >= 1 && userId <= 120 && typeof(eventName) === 'string' && !correct_date(date)) {
      reject({
        statusCode: 400,
        message: "Date given in wrong format"
    })
  }
  });
}