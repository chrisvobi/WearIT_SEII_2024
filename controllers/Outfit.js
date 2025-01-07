'use strict';

var utils = require('../utils/writer.js');
var Outfit = require('../service/OutfitService');

// POST users/{userId}/outfit
module.exports.createOutfit = function createOutfit(_, res,_next, body, userId) {
  Outfit.createOutfit(body, userId)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
      _next();
    });
};

// GET users/{userId}/outfits/{name}
module.exports.getOutfit = function getOutfit(_, res,_next, userId, name) {
  Outfit.getOutfit(userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
      _next();
    });
};

// PUT users/{userId}/outfits/{name}
module.exports.updateOutfit = function updateOutfit(_, res,_next, body, userId, name) {
  Outfit.updateOutfit(body, userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
      _next();
    });
};

// DELETE users/{userId}/outfits/{name}
module.exports.deleteOutfit = function deleteOutfit(_, res,_next, userId, name) {
  Outfit.deleteOutfit(userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
      _next();
    });
};
