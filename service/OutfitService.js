const outfits = require('../utils/outfits');  // Mock data
const { validOutfit, invalidOutfit } = outfits;

// Create Outfit - POST /users/{userId}/outfits
exports.addOutfit = function(userId, outfit) {
  return new Promise(function(resolve, reject) {
    if (!userId || isNaN(userId) || userId <= 0) {
      reject({
        statusCode: 400,
        body: "userId must be a valid positive integer"
      });
    } else if (!outfit || !outfit.name || !outfit.description) {
      reject({
        statusCode: 400,
        body: "Outfit missing required properties"
      });
    } else {
      resolve({
        statusCode: 201,
        body: outfit
      });
    }
  });
};

// Delete Outfit - DELETE /users/{userId}/outfits/{name}
exports.deleteOutfit = function(userId, name) {
  return new Promise(function(resolve, reject) {
    if (!userId || isNaN(userId) || userId <= 0) {
      reject({
        statusCode: 400,
        body: "userId must be a valid positive integer"
      });
    }

    if (!name) {
      reject({
        statusCode: 405,
        body: "Outfit name not given"
      });
    }

    const index = outfits.findIndex(outfit => outfit.name === name);
    if (index === -1) {
      reject({
        statusCode: 404,
        body: "Outfit with this name doesn't exist"
      });
    } else {
      outfits.splice(index, 1);  // Delete outfit from array
      resolve({
        statusCode: 200,
        body: "Outfit deleted successfully"
      });
    }
  });
};

// Edit Outfit - PUT /users/{userId}/outfits/{name}
exports.editOutfit = function(userId, name, updatedOutfit) {
  return new Promise(function(resolve, reject) {
    if (!userId || isNaN(userId) || userId <= 0) {
      reject({
        statusCode: 400,
        body: "userId must be a valid positive integer"
      });
    }

    if (!name) {
      reject({
        statusCode: 405,
        body: "Outfit name not given"
      });
    }

    if (!updatedOutfit || !updatedOutfit.name || !updatedOutfit.description) {
      reject({
        statusCode: 400,
        body: "Outfit missing required properties"
      });
    }

    const index = outfits.findIndex(outfit => outfit.name === name);
    if (index === -1) {
      reject({
        statusCode: 404,
        body: "Outfit with this name doesn't exist"
      });
    } else {
      outfits[index] = { ...outfits[index], ...updatedOutfit };  // Update the outfit
      resolve({
        statusCode: 200,
        body: outfits[index]
      });
    }
  });
};

// Get Outfit - GET /users/{userId}/outfits/{name}
exports.getOutfit = function(userId, name) {
  return new Promise(function(resolve, reject) {
    if (!userId || isNaN(userId) || userId <= 0) {
      reject({
        statusCode: 400,
        body: "userId must be a valid positive integer"
      });
    }

    if (!name) {
      reject({
        statusCode: 405,
        body: "Outfit name not given"
      });
    }

    const index = outfits.findIndex(outfit => outfit.name === name);
    if (index === -1) {
      reject({
        statusCode: 404,
        body: "Outfit with this name doesn't exist"
      });
    } else {
      resolve({
        statusCode: 200,
        body: outfits[index]
      });
    }
  });
};
