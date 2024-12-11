'use strict';

var { correct_garment } = require("../utils/correct_garment.js");


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
        "Tops": [
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
        ],
        "Shoes": [
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
        ]
      };
      if (userId >= 1 && userId <= 100 && categoryName === "Tops") {
        resolve({
            body: examples[Object.keys(examples)][categoryName],
            statusCode: 200
          });
      } else if (userId >= 1 && userId <= 100 && categoryName === "Shoes") {
        resolve({
            body: examples[Object.keys(examples)][categoryName],
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
        "Tops": [
          {
            "size": "M",
            "imagePath": "../images/45/Black_Hoodie.jpeg",
            "name": "Black Hoodie",
            "brand": "Nike"
          }
        ],
        "Shoes": [
          {
            "size" : "41",
            "imagePath" : "../images/57/White_Shoes.jpeg",
            "name" : "White Shoes",
            "brand" : "Converse"
          }
        ]
      };
      if ( userId < 1 || userId > 100) {
        reject({
            body: "User doesn't exist",
            statusCode: 400
        });
      } else if (correct_garment(body) && userId >= 1 && userId <= 100 && body.name != examples[Object.keys(examples)][categoryName][0].name) {
        examples['application/json'][categoryName].push(body); // add body to examples
        resolve({
            body: examples[Object.keys(examples)][categoryName][1],
            statusCode: 201
        });
      } else if (correct_garment(body) && userId >= 1 && userId <= 100 && body.name === examples[Object.keys(examples)][categoryName][0].name) {
        reject({
            body: "Garment with given name already exists",
            statusCode: 409
        });
      } else if (!correct_garment(body)) {
        reject({
            body: "Garment object not given correctly",
            statusCode: 400
        });
      }
    });
  }
  