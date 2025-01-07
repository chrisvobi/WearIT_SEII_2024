'use strict';

var utils = require('../utils/writer.js');
var Outfit = require('../service/OutfitService');

// POST users/{userId}/outfit
module.exports.createOutfit = function createOutfit (req, res, __, body, userId) {
  Outfit.createOutfit(body, userId)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
};

// GET users/{userId}/outfits/{name}
module.exports.getOutfit = function getOutfit (req, res, __, userId, name) {
  Outfit.getOutfit(userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
};

// PUT users/{userId}/outfits/{name}
module.exports.updateOutfit = function updateOutfit (req, res, __, body, userId, name) {
  Outfit.updateOutfit(body, userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
};

// DELETE users/{userId}/outfits/{name}
module.exports.deleteOutfit = function deleteOutfit (req, res,__, userId, name) {
  Outfit.deleteOutfit(userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
};