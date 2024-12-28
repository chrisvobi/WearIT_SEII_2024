const garments = [ // garments for the plannedOutfit
  {
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
  }
]

const correctEvent = { // dummy event user wants to add to calendar
    "date" : 2,
    "day" : "Monday",
    "month" : 12,
    "title" : "Afternoon Coffee",
    "planndedOutfit" :  {
      "garments" : garments,
      "name" : "CoffeeDate"
    },
  };
  
  const falseEvent = { // plannedOutfit not Object
    "date" : 2,
    "day" : "Monday",
    "month": 12,
    "title" : "Afternoon Coffee",
    "planndedOutfit" :  [{
      "garments" : garments,
      "name" : "CoffeeDate"
    }] ,
  };
  
  const falseEvent2 = { // missing month property
    ...correctEvent,
    month: undefined
}
delete falseEvent2.month

const getExamples = [ // examples for dummy db to be used in the service
  {
      "date" : 1,
      "day" : "Sunday",
      "month" : 12,
      "title" : "Morning Walk",
      "planndedOutfit" :  {
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
      }
    },
    correctEvent
  ]

// Helper function to handle common event lookup logic used in CalendarService
function findEvent(userId, date, eventName) {
  return new Promise((resolve, reject) => {
    const examples = { 'application/json': JSON.parse(JSON.stringify(getExamples)) };

    if (userId > 120) { // check if user exists (~120 users)
      return reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    }

    if (Object.keys(examples).length > 0) { // if we have anything saved
      const events = examples['application/json'];
      const eventIndex = events.findIndex(event => event.title === eventName);

      if (eventIndex !== -1) { // event name exists
        const [givenMonth, givenDay] = date.split("-").map(Number);
        const matchedEvent = events[eventIndex];

        if (givenMonth === matchedEvent.month && givenDay === matchedEvent.date) {
          return resolve({ events, eventIndex, matchedEvent }); // date matches
        } else {
          return reject({ // date doesn't match
            statusCode: 404,
            body: "Cannot find event, date and name don't match"
          });
        }
      } else { // event name doesn't exist
        return reject({
          statusCode: 404,
          body: "Event name doesn't exist"
        });
      }
    }
  });
}

module.exports = {correctEvent, falseEvent, falseEvent2, getExamples, findEvent};