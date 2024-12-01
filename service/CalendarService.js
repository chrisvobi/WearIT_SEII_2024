'use strict';

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