'use strict';


/**
 * Get all categories for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Displays the categories to the user 
 *
 * userId String ID of the user
 * returns List
 **/
exports.getCategories = function(userId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [
        "Jackets", "Tops", "Pants", "Shoes", "Accessories"
      ];
      if (userId > 100) {
        reject({
            body: "User doesn't exist",
            statusCode: 404
        });
      } else if (Object.keys(examples).length > 0) {
        resolve({body: examples[Object.keys(examples)[0]]});
      } 
    });
  }

  /**
 * Get all garments in a specific category for a user
 * FR2 - The user must be able to manage their virtual wardrobe. Displays the garments of a category to the user 
 *
 * userId String ID of the user
 * categoryName String Name of the category
 * returns List
 **/
exports.getCategoryGarments = function(userId,categoryName) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = { 
        "45" : { "Tops": [
          {
            "size": "M",
            "imagePath": "../images/45/Black_Hoodie.jpeg",
            "name": "Black Hoodie",
            "brand": "Nike"
          },{
            "size" : "M",
            "imagePath" : "../images/45/Grey_Crewneck.jpeg",
            "name" : "Grey Crewneck",
            "brand" : "Zara"
          }
        ]},
        "57": { "Shoes": [
          {
            "size" : "41",
            "imagePath" : "../images/57/White_Shoes.jpeg",
            "name" : "White Shoes",
            "brand" : "Converse"
          },{
            "size" : "40",
            "imagePath" : "../images/57/White_Airforce_Shoes.jpeg",
            "name" : "White Airforce Shoes",
            "brand" : "Nike"
          }
        ]}
      };
      if (Object.keys(examples).length > 0) {
        resolve({body: examples[Object.keys(examples)][userId][categoryName]});
      } 
    });
  }
  
  /**
 * Add a new garment to a specific category for a user
 * FR3 - The user must be able to manage their virtual wardrobe. Add a new garment to a specific category for a user 
 *
 * body Garment Garment model
 * userId String ID of the user
 * categoryName String Name of the category
 * returns Garment
 **/
exports.addGarment = function(body,userId,categoryName) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = { 
        "45" : { "Tops": [
          {
            "size": "M",
            "imagePath": "../images/45/Black_Hoodie.jpeg",
            "name": "Black Hoodie",
            "brand": "Nike"
          }
        ]},
        "57": { "Shoes": [
          {
            "size" : "41",
            "imagePath" : "../images/57/White_Shoes.jpeg",
            "name" : "White Shoes",
            "brand" : "Converse"
          }
        ]}
      };
      // Check if garment name already exists
      const garments = examples[Object.keys(examples)][userId][categoryName];
      const garmentIndex = garments.findIndex(garment => (garment.name == body.name));
      if (garmentIndex != -1){
          reject({
              body: "Garment with given name already exists",
              statusCode: 409
          });
      } else if (Object.keys(examples).length > 0) {
        examples['application/json'][userId][categoryName].push(body); // add to DB
        resolve({body: 
          examples[Object.keys(examples)][userId][categoryName][1],
          statusCode: 201
        });
      } 
    });
  }
  