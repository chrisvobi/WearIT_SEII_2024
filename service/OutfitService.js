'use strict';

const { validOutfit } = require('../utils/outfits');

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

// POST /users/{userId}/outfit
exports.createOutfit = function (body, userId) {
  return new Promise(function (resolve, reject) {
    const examples = { 'application/json': [] };
    examples['application/json'].push(body);

    if (userId > 120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    } else if (Object.keys(examples).length > 0) {
      resolve(examples['application/json'][0]); // Return the first outfit
    }
  });
};

// GET users/{userId}/outfits/{name}
exports.getOutfit = function (userId, name) {
  return new Promise(function (resolve, reject) {
    const examples = { 'application/json': sharedOutfits };

    if (userId > 120) {
      reject({
        statusCode: 404,//User doesn't exist error code
        body: "User doesn't exist"
      });
    } else {
      const outfits = examples['application/json'];
      const index = outfits.findIndex(outfit => outfit.name === name);

      if (index !== -1) {
        resolve({ body: outfits[index] });
      } else {
        reject({
          statusCode: 404,//error code
          body: "Outfit with this name doesn't exist"
        });
      }
    }
  });
};

// PUT users/{userId}/outfits/{name}
exports.updateOutfit = function (body, _userId, name) {
  return new Promise(function (resolve, reject) {
    const examples = { 'application/json': sharedOutfits };
if (Object.keys(examples).length > 0) {
      const outfits = examples['application/json'];
      const index = outfits.findIndex(outfit => outfit.name === name);

      if (index !== -1) {
        examples['application/json'][index] = body;
        resolve({ body: examples['application/json'][index] });
      } else {
        reject({
          statusCode: 404,//error code
          body: "Outfit with this name doesn't exist"
        });
      }
    }
  });
};

// DELETE users/{userId}/outfits/{name}
exports.deleteOutfit = function (userId, name) {
  return new Promise(function (resolve, reject) {
    const examples = { 'application/json': sharedOutfits };

    if (userId > 120) {
      reject({
        statusCode: 404,//User doesn't exist error code
        body: "User doesn't exist"
      });
    } else if (Object.keys(examples).length > 0) {
      let outfits = examples['application/json'];
      const index = outfits.findIndex(outfit => outfit.name === name);

      if (index !== -1) {
        outfits.splice(index, 1);
        resolve({ body: "Outfit deleted successfully" });
      } else {
        reject({
          statusCode: 404,//error code
          body: "Outfit with this name doesn't exist"
        });
      }
    }
  });
};