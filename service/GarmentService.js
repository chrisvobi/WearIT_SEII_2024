'use strict';

var getExamples = require('../utils/examples');
/**
 * Get a specific garment in a specific category for a user
 * FR4 - The user must be able to manage their virtual wardrobe. Retrieve a specific garment in a specific category for a user. 
 *
 * userId String ID of the user
 * categoryName String Name of the category
 * name String Name of the garment
 * returns Garment
 **/
exports.getGarment = function(userId,categoryName,name) {
    return new Promise(function(resolve, reject) {
      var examples = getExamples();
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
                  statusCode: 404
          });
        } else {
          resolve({body: examples[Object.keys(examples)][userId][categoryName][garmentIndex]});
        }
      } 
    });
  }

  /**
 * Edit a specific garment in a specific category for a user
 * FR5 - The user must be able to manage their virtual wardrobe. Edit a specific garment in a specific category for a user 
 *
 * body Garment Garment model
 * userId String ID of the user
 * categoryName String Name of the category
 * name String Name of the garment
 * returns Garment
 **/
exports.editGarment = function(body,userId,categoryName,name) {
    return new Promise(function(resolve, reject) {
      var examples = getExamples();
      // check if edit of garment already exists
      const garments = examples[Object.keys(examples)][userId][categoryName];
      var garmentIndex = garments.findIndex(garment => (garment.size == body.size && garment.imagePath == body.imagePath && garment.name == body.name && garment.brand == body.brand));
      if (garmentIndex != -1){
          reject({
              body: "Garment already exists",
              statusCode: 409
          });
      }
      // check if name of garment to be edited exists
      garmentIndex = garments.findIndex(garment => garment.name === name);
      if (garmentIndex != -1) {
          examples[Object.keys(examples)][userId][categoryName][garmentIndex] = body;
          resolve({
              body: examples[Object.keys(examples)][userId][categoryName][garmentIndex],
              statusCode: 200
          });
      } else {
          reject({
              body: "Garment doesn't exist",
              statusCode: 404
          })
      }
    });
}  

/**
 * Remove a specific garment in a specific category for a user
 * FR6 - The user must be able to manage their virtual wardrobe. Remove a specific garment in a specific category for a user 
 *
 * userId String ID of the user
 * categoryName String Name of the category
 * name String Name of the garment
 * returns Error
 **/
exports.deleteGarment = function(userId,categoryName,name) {
    return new Promise(function(resolve, reject) {
      var examples = getExamples();
      // check if name of garment to be deleted exists
      var garments = examples[Object.keys(examples)][userId][categoryName];
      var garmentIndex = garments.findIndex(garment => garment.name === name);
      if (garmentIndex !== -1) {
        examples[Object.keys(examples)][userId][categoryName].splice(garmentIndex, 1); // remove said garment from DB
        garments = examples[Object.keys(examples)][userId][categoryName];
        garmentIndex = garments.findIndex(garment => garment.name === name);// check if garment was successfully removed
        if (garmentIndex == -1) {
          resolve({
            body: "Garment deleted successfully"
          })
        } else {
          reject({
            body: "Something went wrong",
          })
        }
      } else {
        reject({
            body: "Garment doesn't exist",
            statusCode: 404
        })
      }  
    });
}  