'use strict';

// POST /users/{userId}/outfit
exports.createOutfit = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [];
    examples['application/json'].push(body);
    if (userId>120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      })
    }
    else if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)][0]);
    }
  });
}

// GET users/{userId}/outfits/{name}
exports.getOutfit = function(userId,name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
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
  },
  {
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
  }];
    if (userId > 120) {
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      })
    }
    else if (Object.keys(examples).length > 0) {
      const outfits = examples[Object.keys(examples)];
      const index = outfits.findIndex(outfit => outfit.name === name);
      if (index !== -1) { // outfit with given name exists
        resolve({body: outfits[index]});
      }
      else { // outfit doesn't exist
        reject({
          statusCode: 404,
          body: "Outfit with this name doesn't exist"
        })
      };
    }
  });
}

// PUT users/{userId}/outfits/{name}
exports.updateOutfit = function(body,userId,name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
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
  },
  {
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
  }];
    if (Object.keys(examples).length > 0) { // check that outfits exist
      const outfits = examples[Object.keys(examples)];
      const index = outfits.findIndex(outfit => outfit.name === name);
      if (index !== -1) { // outfit with given name exists
        examples[Object.keys(examples)][index] = body
        resolve({body: examples[Object.keys(examples)][index]});
      }
      else { // outfit doesn't exist
        reject({
          statusCode: 404,
          body: "Outfit with this name doesn't exist"
        })
      };
    }
  });
}

// DELETE users/{userId}/outfits/{name}
exports.deleteOutfit = function(userId,name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
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
  },
  {
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
  }];
  if (userId > 120) {
    reject({
      statusCode: 404,
      body: "User doesn't exist"
    })
  }
  else if (Object.keys(examples).length > 0) { // check that outfits exist
    var outfits = examples[Object.keys(examples)];
    var index = outfits.findIndex(outfit => outfit.name === name);
    if (index !== -1) { // outfit with given name exists
      examples[Object.keys(examples)].splice(index, 1);
      outfits = examples[Object.keys(examples)];
      index = outfits.findIndex(outfit => outfit.name === name);
      if (index === -1) { // check that outfit was removed
        resolve({body: "Outfit deleted successfully"});
      }
    }
    else { // outfit doesn't exist
      reject({
        statusCode: 404,
        body: "Outfit with this name doesn't exist"
      })
    };
  }
  });
}