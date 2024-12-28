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

module.exports = {correctEvent, falseEvent, falseEvent2, getExamples};