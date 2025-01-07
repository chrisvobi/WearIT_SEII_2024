'use strict';

// Import outfits from the utils file
const { validOutfit, invalidOutfit } = require('../utils/outfits.js');

// POST /users/{userId}/outfit
// Function to create an outfit for a specific user
exports.createOutfit = function(body, userId) {
  return new Promise(function(resolve, reject) {
    if (userId > 120) { // Check if the user ID is valid (mock logic)
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    } else {
      resolve(body); // Return the body of the outfit as it is
    }
  });
}

// GET /users/{userId}/outfits/{name}
exports.getOutfit = function(userId, name) {
  return new Promise(function(resolve, reject) {
    if (userId > 120) { // User validation
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    } else {
      // Use the imported outfits from the utils
      const outfits = [validOutfit, invalidOutfit];
      const index = outfits.findIndex(outfit => outfit.name === name); // Find the outfit by name
      if (index !== -1) { // Outfit with given name exists
        resolve({ body: outfits[index] });
      } else { // Outfit doesn't exist
        reject({
          statusCode: 404,
          body: "Outfit with this name doesn't exist"
        });
      }
    }
  });
}

// PUT /users/{userId}/outfits/{name}
// Function to update an existing outfit for a user
exports.updateOutfit = function(body, userId, name) {
  return new Promise(function(resolve, reject) {
    if (userId > 120) { // User validation
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    } else {
      // Use the imported outfits from the utils
      const outfits = [validOutfit, invalidOutfit];
      const index = outfits.findIndex(outfit => outfit.name === name); // Find the outfit by name
      if (index !== -1) { // Outfit with given name exists
        outfits[index] = body; // Update the outfit
        resolve({ body: outfits[index] });
      } else { // Outfit doesn't exist
        reject({
          statusCode: 404,
          body: "Outfit with this name doesn't exist"
        });
      }
    }
  });
}

// DELETE /users/{userId}/outfits/{name}
// Function to delete a specific outfit
exports.deleteOutfit = function(userId, name) {
  return new Promise(function(resolve, reject) {
    if (userId > 120) { // User validation
      reject({
        statusCode: 404,
        body: "User doesn't exist"
      });
    } else {
      // Use the imported outfits from the utils
      let outfits = [validOutfit, invalidOutfit];
      const index = outfits.findIndex(outfit => outfit.name === name); // Find the outfit by name
      if (index !== -1) { // Outfit with given name exists
        outfits.splice(index, 1); // Remove the outfit
        resolve({ body: "Outfit deleted successfully" });
      } else { // Outfit doesn't exist
        reject({
          statusCode: 404,
          body: "Outfit with this name doesn't exist"
        });
      }
    }
  });
}
