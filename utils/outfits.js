// A valid dummy outfit object used for testing purposes
const validOutfit = {
    "garments" : [ { // First garment in the outfit
      "size" : "M",
      "imagePath" : "../images/CameraRoll/PIC01_12_01_2024.jpeg", // Relative path to garment image
      "name" : "BlackHoodie",// Name of the garment
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

const invalidOutfit = {  // Missing the "name" property to simulate an invalid outfit
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
// Exporting the objects for use in other files (e.g., tests)
module.exports = {validOutfit, invalidOutfit};