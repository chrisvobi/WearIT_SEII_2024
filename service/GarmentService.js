'use strict';

var { correct_garment } = require("../utils/correct_garment.js");
/**
 * Get a specific garment in a specific category for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Retrieve a specific garment in a specific category for a user. 
 *
 * userId String ID of the user
 * categoryName String Name of the category
 * name String Name of the garment
 * returns Garment
 **/
exports.getGarment = function(userId,categoryName,name) {
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
      if (userId > 100) {
        reject({
            body: "User doesn't exist",
            statusCode: 404
        });
      } else if (Object.keys(examples).length > 0) {
        const garments = examples[Object.keys(examples)][userId][categoryName];
        const garmentIndex = garments.findIndex(garment => (garment.name == name));
        if (garmentIndex == -1){ // Check if garment name doesn't exist in DB 
          reject({
                  body: "Garment doesn't exist",
                  statusCode: 400
          });
        } else {
          resolve({body: examples[Object.keys(examples)][userId][categoryName][garmentIndex]});
        }
      } 
    });
  }

  /**
 * Edit a specific garment in a specific category for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Edit a specific garment in a specific category for a user 
 *
 * body Garment Garment model
 * userId String ID of the user
 * categoryName String Name of the category
 * name String Name of the garment
 * returns Garment
 **/
// categoryName is the category of the garment to be edited
// name is the existing name of the garment to be edited
// body has all the info of the edit to take place
exports.editGarment = function(body,userId,categoryName,name) {
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
      if (userId < 1 || userId > 100) {
        reject({
            body: "User doesn't exist",
            statusCode: 400
        });
      } else if (!(categoryName === "Tops" || categoryName === "Shoes")){
        reject({
            body: "Category doesn't exist",
            statusCode: 400
        });
      } else if (correct_garment(body)){
        const garments = examples[Object.keys(examples)][categoryName];
        // check if edited garment name already exists
        const garmentIndex1 = garments.findIndex(garment => (garment.size == body.size && garment.imagePath == body.imagePath && garment.name == body.name && garment.brand == body.brand));
        if (garmentIndex1 != -1){
            reject({
                body: "Garment already exists",
                statusCode: 409
            });
        }
        // check if name of garment to be edited exists
        const garmentIndex2 = garments.findIndex(garment => garment.name === name);
        if (garmentIndex2 !== -1) {
            examples[Object.keys(examples)][categoryName][garmentIndex2] = body;
            resolve({
                body: examples[Object.keys(examples)][categoryName][garmentIndex2],
                statusCode: 200
            });
        } else {
            reject({
                body: "Garment doesn't exist",
                statusCode: 400
            })
        }
        }
    });
}  

/**
 * Remove a specific garment in a specific category for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Remove a specific garment in a specific category for a user 
 *
 * userId String ID of the user
 * categoryName String Name of the category
 * name String Name of the garment
 * returns Error
 **/
exports.deleteGarment = function(userId,categoryName,name) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = examples['application/json'] = {
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
      if (userId < 1 || userId > 100) {
        reject({
            body: "User doesn't exist",
            statusCode: 400
        });
      } else if (!(categoryName === "Tops" || categoryName === "Shoes")){
        reject({
            body: "Category doesn't exist",
            statusCode: 400
        });
      } else if (typeof(name) === 'string') {
        const garments = examples[Object.keys(examples)][categoryName];
        // check if name of garment to be deleted exists
        const garmentIndex = garments.findIndex(garment => garment.name === name);
        if (garmentIndex !== -1) {
            examples[Object.keys(examples)][categoryName].splice(garmentIndex, 1); // remove said garment from examples
            const garments1 = examples[Object.keys(examples)][categoryName];
            const garmentIndex1 = garments1.findIndex(garment => garment.name === name);// check if garment was successfully removed
            if (garmentIndex1 === -1) {
                resolve({
                    body: "Garment deleted successfully",
                    statusCode: 200
                });
            } 
        } else {
            reject({
                body: "Garment doesn't exist",
                statusCode: 400
                })
        }
    }
});
}  