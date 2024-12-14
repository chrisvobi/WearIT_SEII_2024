const validOutfit = { // dummy outfit to add
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
};

const invalidOutfit = { // missing name property
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
  } ]
};

module.exports = {validOutfit, invalidOutfit};