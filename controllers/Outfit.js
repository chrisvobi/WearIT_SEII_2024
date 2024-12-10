'use strict';

var utils = require('../utils/writer.js');
var Outfit = require('../service/OutfitService');

module.exports.createOutfit = async function createOutfit (req, res, next, body, userId) {
    await Outfit.createOutfit(body, userId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };