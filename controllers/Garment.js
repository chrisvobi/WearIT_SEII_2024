'use strict';

var utils = require('../utils/writer.js');
var Garment = require('../service/GarmentService');

module.exports.getGarment = async function getGarment (req, res, next, userId, categoryName, name) {
    await Garment.getGarment(userId, categoryName, name)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  module.exports.editGarment = async function editGarment (req, res, next, body, userId, categoryName, name) {
    await Garment.editGarment(body, userId, categoryName, name)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };