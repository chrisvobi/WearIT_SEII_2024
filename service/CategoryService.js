'use strict';

exports.getCategories = function(userId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [
        { "name": "Jackets" },
        { "name": "Tops" },
        { "name": "Pants" },
        { "name": "Shoes" },
        { "name": "Accessories" }
      ];
      if (userId >= 1 && userId <= 100) {
        resolve({
            body: examples[Object.keys(examples)[0]],
            statusCode: 200
        });
      } else if (userId > 120) {
        reject({
            body: "User doesn't exist",
            statusCode: 404
        });
      } else if (userId < 1) {
        reject({
            body: "User Id should be greater than 1",
            statusCode: 400
        });
      } else if (!Number.isInteger(userId)) {
        reject({
            body: "User Id should be integer",
            statusCode: 400
        });
      }
    });
  }

  /**
 * Get all garments in a specific category for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Displays the garments of a category to the user 
 *
 * userId String ID of the user
 * categoryName String Name of the category
 * returns List
 **/
exports.getCategoryGarments = function(userId,categoryName) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [ [{ // Dummy data for user 45
    "size" : "M",
    "imagePath" : "../images/45/Black_Hoodie.jpeg",
    "name" : "Black Hoodie",
    "brand" : "Nike"
  }, {
    "size" : "M",
    "imagePath" : "../images/45/Grey_Crewneck.jpeg",
    "name" : "Grey Crewneck",
    "brand" : "Zara"
  }],
  [{ // Dummy data for user 57
    "size" : "41",
    "imagePath" : "../images/57/White_Shoes.jpeg",
    "name" : "White Shoes",
    "brand" : "Converse"
  }, {
    "size" : "40",
    "imagePath" : "../images/57/White_Airforce_Shoes.jpeg",
    "name" : "White Airforce Shoes",
    "brand" : "Nike"
  }] ];
      if (userId >= 1 && userId <= 100 && categoryName === "Tops") {
        resolve({
            body: examples[Object.keys(examples)][0],
            statusCode: 200
          });
      } else if (userId >= 1 && userId <= 100 && categoryName === "Shoes") {
        resolve({
            body: examples[Object.keys(examples)][1],
            statusCode: 200
        });
      } else if (userId >= 1 && userId <= 100 && typeof(categoryName) !== 'string') {
        reject({
            body: "Category isn't a string",
            statusCode: 400
        });
      } else if (userId >= 1 && userId <= 100 && !(categoryName === "Shoes" || categoryName === "Tops" || categoryName === "Pants" || categoryName === "Jackets" || categoryName === "Accessories")) {
        reject({
            body: "Category doesn't exist",
            statusCode: 404
        });
      }
    });
  }
  