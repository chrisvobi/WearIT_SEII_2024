const correctEvent = { // dummy event user wants to add to calendar
    "date" : 2,
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
    },
  };
  
  const falseEvent = { // plannedOutfit not Object
    "date" : 2,
    "day" : "Monday",
    "month": 12,
    "title" : "Afternoon Coffee",
    "planndedOutfit" :  [{
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
    }] ,
  };
  
  const falseEvent2 = { // missing month property
    ...correctEvent,
    month: undefined
}
delete falseEvent2.month

  module.exports = {correctEvent, falseEvent, falseEvent2};