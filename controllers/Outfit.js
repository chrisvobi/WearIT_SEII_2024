'use strict';

var utils = require('../utils/writer.js');
var Outfit = require('../service/OutfitService');

// POST users/{userId}/outfit
module.exports.createOutfit = function createOutfit (req, res, next, body, userId) {
  Outfit.createOutfit(body, userId)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
};

// GET users/{userId}/outfits/{name}
module.exports.getOutfit = function getOutfit (req, res, next, userId, name) {
  Outfit.getOutfit(userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
};

// PUT users/{userId}/outfits/{name}
module.exports.updateOutfit = function updateOutfit (req, res, next, body, userId, name) {
  Outfit.updateOutfit(body, userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
};