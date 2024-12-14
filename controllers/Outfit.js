'use strict';

var utils = require('../utils/writer.js');
var Outfit = require('../service/OutfitService');

// POST /users/{userId}/outfit
module.exports.createOutfit = function createOutfit (req, res, next, body, userId) {
  Outfit.createOutfit(body, userId)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
};