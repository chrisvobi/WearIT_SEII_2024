// Common garments array shared between valid and invalid outfits
const sharedGarments = [
  {
    "size": "M",
    "imagePath": "../images/CameraRoll/PIC01_12_01_2024.jpeg",
    "name": "BlackHoodie",
    "brand": "Nike"
  },
  {
    "size": "M",
    "imagePath": "../images/CameraRoll/PIC02_12_01_2024.jpeg",
    "name": "GreySweatpants",
    "brand": "Nike"
  },
  {
    "size": "M",
    "imagePath": "../images/CameraRoll/PIC03_12_01_2024.jpeg",
    "name": "WhiteShoes",
    "brand": "Converse"
  }
];

// Valid outfit object
const validOutfit = {
  garments: sharedGarments,
  name: "EverydayOutfit"
};

// Invalid outfit object, built without the "name" property
const invalidOutfit = {
  garments: sharedGarments
};

// Shared outfit examples
const sharedOutfits = [
  validOutfit, // Reference the valid outfit
  {
    "garments": [
      {
        "size": "M",
        "imagePath": "../images/CameraRoll/PIC04_12_01_2024.jpeg",
        "name": "GreyCrewneck",
        "brand": "Zara"
      },
      {
        "size": "M",
        "imagePath": "../images/CameraRoll/PIC05_12_01_2024.jpeg",
        "name": "BlackFormalPants",
        "brand": "H&M"
      },
      {
        "size": "M",
        "imagePath": "../images/CameraRoll/PIC06_12_01_2024.jpeg",
        "name": "WhiteAirforceShoes",
        "brand": "Nike"
      }
    ],
    "name": "CoffeeDate"
  }
];

// Exporting the objects for use in other files (e.g., tests)
module.exports = { validOutfit, invalidOutfit, sharedOutfits };
